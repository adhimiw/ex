# Big Data Frameworks Lab — Final Exam Practical Study Guide (2026)
**Official Source:** `2026_final.pdf` (Practical Exam Paper, 20 Questions)  
**Includes:** All 20 Exam Sets (Parts a, b, c), Complete SQL Queries, PySpark Code, HDFS Commands, Expected Outputs, and Viva Prep.

---

# Table of Contents
1. [Exam Structure & Guidelines](#exam-structure--guidelines)
2. [Question 1 — Titanic Hive + HDFS + Narrow RDD](#question-1)
3. [Question 2 — Titanic External Table + HDFS + Wide RDD](#question-2)
4. [Question 3 — Titanic Partition/Bucketing + HDFS + External Sources to RDD/DF](#question-3)
5. [Question 4 — Student Table (Class XII Focus) + HDFS + MongoDB Integration](#question-4)
6. [Question 5 — Order Table 1 (Knee Pads) + HDFS + CSV/JSON/Parquet](#question-5)
7. [Question 6 — Order Table 2 (Rocher) + HDFS + SQL with DataFrame](#question-6)
8. [Question 7 — Employee Table (Department 'i' Filter) + HDFS + SQL with RDD](#question-7)
9. [Question 8 — Employee & Department Join (15% Hike) + HDFS + External to RDD](#question-8)
10. [Question 9 — Employee Bucketing + HDFS + External to DataFrame](#question-9)
11. [Question 10 — Student Blood Group Queries + HDFS getMerge + CSV & JSON](#question-10)
12. [Question 11 — Employee Aggregation + HDFS getMerge + CSV & Parquet](#question-11)
13. [Question 12 — Company Employee Queries + HDFS + JSON & Parquet](#question-12)
14. [Question 13 — Employee Salary Aggregation + HDFS getMerge + CSV & Parquet](#question-13)
15. [Question 14 — Customer & Order Left/Right Outer Joins + Spark CSV & Parquet](#question-14)
16. [Question 15 — Spark DataFrame Employee + HDFS + Static Bucketing](#question-15)
17. [Question 16 — Spark DataFrame Company Employee + HDFS + Dynamic Partitioning](#question-16)
18. [Question 17 — Spark DataFrame Students (Female O+ Focus) + HDFS + Partitioning](#question-17)
19. [Question 18 — Spark SQL with RDD Students + HDFS + Bucketing](#question-18)
20. [Question 19 — Spark DataFrame Order Table 2 + HDFS + Partitioning](#question-19)
21. [Question 20 — Spark SQL Order Table 1 + HDFS + Bucketing](#question-20)
22. [Master Cheat Sheet: HDFS Commands](#master-cheat-sheet-hdfs-commands)
23. [Master Cheat Sheet: Hive Partitioning & Bucketing](#master-cheat-sheet-hive-partitioning--bucketing)
24. [Master Cheat Sheet: PySpark RDD vs DataFrame](#master-cheat-sheet-pyspark-rdd-vs-dataframe)
25. [Viva Voce High-Frequency Questions & Answers](#viva-voce-high-frequency-questions--answers)

---

# Exam Structure & Guidelines
In the practical exam, each candidate receives one question set (from Q1 to Q20). Each set is divided into three components:
* **Part (a)**: Core Practical Problem (Hive or PySpark DataFrame/SQL) — Schema creation, data loading, and 5 analytical queries.
* **Part (b)**: Two specific HDFS file system commands with verification.
* **Part (c)**: Core Framework task (PySpark transformation/file format or Hive Bucketing/Partitioning).

---

# Question 1

### (a) Hive — Titanic Dataset
Create a Hive table with attributes: `Passengers, Survived, Pclass, Name, Sex, Age, Fare`

#### 1. Setup Table & Insert Data
```sql
CREATE DATABASE IF NOT EXISTS bigdata;
USE bigdata;

DROP TABLE IF EXISTS titanic;

CREATE TABLE titanic (
    Passengers INT,
    Survived INT,
    Pclass INT,
    Name STRING,
    Sex STRING,
    Age INT,
    Fare INT
)
ROW FORMAT DELIMITED
FIELDS TERMINATED BY ','
STORED AS TEXTFILE;

INSERT INTO titanic VALUES
(1, 1, 1, 'John Smith', 'male', 35, 100),
(2, 1, 1, 'Mary Johnson', 'female', 28, 80),
(3, 1, 3, 'Tom Brown', 'male', 12, 25),
(4, 1, 1, 'Alice Davis', 'female', 45, 120),
(5, 0, 3, 'Robert Wilson', 'male', 18, 15),
(6, 0, 3, 'James Miller', 'male', 10, 10),
(7, 0, 2, 'Emma Moore', 'female', 30, 50),
(8, 1, 2, 'David Taylor', 'male', 14, 30),
(9, 0, 3, 'William Anderson', 'male', 50, 20),
(10, 1, 1, 'Sophia Thomas', 'female', 8, 150);
```

#### 2. Execute Queries
```sql
-- 1. Displaying Count of Survived
SELECT COUNT(*) AS survived_count 
FROM titanic 
WHERE Survived = 1;
-- Output: 6

-- 2. Displaying Percentage of Survived
SELECT (SUM(CASE WHEN Survived = 1 THEN 1 ELSE 0 END) * 100.0 / COUNT(*)) AS survival_percentage 
FROM titanic;
-- Output: 60.0%

-- 3. How many male and female passengers were in the ship?
SELECT Sex, COUNT(*) AS passenger_count 
FROM titanic 
GROUP BY Sex;
-- Output: male: 6, female: 4

-- 4. Average age of the passengers
SELECT AVG(Age) AS avg_age 
FROM titanic;
-- Output: 25.0

-- 5. Minimum and Maximum fare paid per class
SELECT Pclass, MIN(Fare) AS min_fare, MAX(Fare) AS max_fare 
FROM titanic 
GROUP BY Pclass 
ORDER BY Pclass;
-- Output:
-- Class 1: 80 to 150
-- Class 2: 30 to 50
-- Class 3: 10 to 25

-- 6. Children (age < 16) survived vs adults
SELECT 
    CASE WHEN Age < 16 THEN 'Child' ELSE 'Adult' END AS category,
    COUNT(*) AS survived_count 
FROM titanic 
WHERE Survived = 1 
GROUP BY CASE WHEN Age < 16 THEN 'Child' ELSE 'Adult' END;
-- Output: Child: 3, Adult: 3
```

### (b) HDFS Commands
1. **Create a directory in HDFS:**
```bash
hdfs dfs -mkdir -p /user/cloudera/bigdata
```
2. **Copy a file from Local File System (LFS) to HDFS:**
```bash
hdfs dfs -put /home/cloudera/Desktop/sample.txt /user/cloudera/bigdata/
# Verify:
hdfs dfs -ls /user/cloudera/bigdata/
```

### (c) Spark RDD — Narrow Transformation
Narrow transformations (e.g., `map`, `filter`, `flatMap`) compute partitions independently without requiring a data shuffle across the cluster.
```python
from pyspark.sql import SparkSession

spark = SparkSession.builder.appName("NarrowTransformationDemo").getOrCreate()
sc = spark.sparkContext

# Input RDD
rdd = sc.parallelize([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])

# Narrow Transformations: map (multiply by 2) and filter (even numbers > 10)
mapped_rdd = rdd.map(lambda x: x * 2)
filtered_rdd = mapped_rdd.filter(lambda x: x > 10)

print("Narrow Transformation Output:", filtered_rdd.collect())
# Output: [12, 14, 16, 18, 20]
```

---

# Question 2

### (a) Hive External Table — Titanic Dataset
An **External Table** stores schema metadata in the Hive Metastore while data files reside in an external HDFS directory. Dropping an external table deletes only the metadata, preserving the underlying HDFS files.

```sql
USE bigdata;

DROP TABLE IF EXISTS titanic_external;

CREATE EXTERNAL TABLE titanic_external (
    Passengers INT,
    Survived INT,
    Pclass INT,
    Name STRING,
    Sex STRING,
    Age INT,
    Fare INT
)
ROW FORMAT DELIMITED
FIELDS TERMINATED BY ','
STORED AS TEXTFILE
LOCATION '/user/cloudera/titanic_external';

-- Load or insert data into the external location
INSERT INTO titanic_external VALUES
(1, 1, 1, 'John Smith', 'male', 35, 100),
(2, 1, 1, 'Mary Johnson', 'female', 28, 80),
(3, 1, 3, 'Tom Brown', 'male', 12, 25);

-- Verify characteristics:
DESCRIBE FORMATTED titanic_external;
-- Note: 'Table Type: EXTERNAL_TABLE' and Location: /user/cloudera/titanic_external

SELECT * FROM titanic_external;

-- Drop table demonstration:
DROP TABLE titanic_external;
-- Verification in shell: Data file in /user/cloudera/titanic_external STILL EXISTS!
```

### (b) HDFS Commands
1. **Find the number of files present in a directory:**
```bash
hdfs dfs -count /user/cloudera/bigdata
# Output format: DIR_COUNT   FILE_COUNT   CONTENT_SIZE   PATH
```
2. **Display the directory contents:**
```bash
hdfs dfs -ls /user/cloudera/bigdata
```

### (c) Spark RDD — Wide Transformation
Wide transformations (e.g., `groupByKey`, `reduceByKey`, `distinct`, `sortByKey`) require data from multiple partitions to be grouped, resulting in a **shuffle**.
```python
from pyspark.sql import SparkSession

spark = SparkSession.builder.appName("WideTransformationDemo").getOrCreate()
sc = spark.sparkContext

# Pair RDD
pairs = sc.parallelize([("A", 10), ("B", 20), ("A", 30), ("B", 40), ("C", 50)])

# Wide Transformation: reduceByKey aggregates values across partitions
reduced_rdd = pairs.reduceByKey(lambda x, y: x + y)

print("Wide Transformation Output:", reduced_rdd.collect())
# Output: [('A', 40), ('B', 60), ('C', 50)]
```

---

# Question 3

### (a) Hive — Bucketing and Partitioning
Implement bucketing and dynamic partitioning using the Titanic dataset.

```sql
USE bigdata;

-- Enable Hive dynamic partition and bucketing
SET hive.exec.dynamic.partition = true;
SET hive.exec.dynamic.partition.mode = nonstrict;
SET hive.enforce.bucketing = true;

DROP TABLE IF EXISTS titanic_partition_bucket;

CREATE TABLE titanic_partition_bucket (
    Passengers INT,
    Survived INT,
    Name STRING,
    Sex STRING,
    Age INT,
    Fare INT
)
PARTITIONED BY (Pclass INT)
CLUSTERED BY (Passengers) INTO 2 BUCKETS
ROW FORMAT DELIMITED
FIELDS TERMINATED BY ',';

-- Populate target table from staging table titanic
INSERT OVERWRITE TABLE titanic_partition_bucket PARTITION(Pclass)
SELECT Passengers, Survived, Name, Sex, Age, Fare, Pclass 
FROM titanic;

-- Verify partitions and data:
SHOW PARTITIONS titanic_partition_bucket;
SELECT * FROM titanic_partition_bucket WHERE Pclass = 1;
```

### (b) HDFS Commands
1. **Copy files within HDFS and overwrite if it already exists:**
```bash
hdfs dfs -cp -f /user/cloudera/bigdata/sample.txt /user/cloudera/bigdata/backup.txt
```
2. **Move one or more files within HDFS:**
```bash
hdfs dfs -mv /user/cloudera/bigdata/backup.txt /user/cloudera/bigdata/archive.txt
```

### (c) Spark — Read External Sources into RDD and DataFrame
```python
from pyspark.sql import SparkSession

spark = SparkSession.builder.appName("ExternalSourcesRead").getOrCreate()
sc = spark.sparkContext

# 1. Read external text file into RDD
rdd = sc.textFile("/user/cloudera/bigdata/sample.txt")
print("First RDD record:", rdd.first())

# 2. Read external CSV into DataFrame
df = spark.read.option("header", "true").option("inferSchema", "true").csv("/user/cloudera/bigdata/sample.csv")
df.show(5)
df.printSchema()
```

---

# Question 4

### (a) Hive — Student Table
> **Exam Paper Note:** Suma's state is **Tamilnadu**. Queries strictly focus on **Class XII** analysis!

```sql
USE bigdata;
DROP TABLE IF EXISTS students;

CREATE TABLE students (
    Stud_id INT,
    Name STRING,
    Gender STRING,
    Class STRING,
    Bloodgroup STRING,
    State STRING
)
ROW FORMAT DELIMITED
FIELDS TERMINATED BY ',';

INSERT INTO students VALUES
(1001, 'Sudha', 'F', 'IX', 'O+', 'Tamilnadu'),
(1002, 'Suma', 'F', 'XI', 'AB+', 'Tamilnadu'),
(1005, 'Gowri', 'F', 'XII', 'O-', 'Tamilnadu'),
(1010, 'Rakesh', 'M', 'XII', 'O+', 'Andrapradesh'),
(1011, 'Rajesh', 'M', 'XII', 'O+', 'Kerala'),
(1012, 'Malini', 'F', 'XII', 'AB+', 'Mumbai'),
(1012, 'Shradha Kapoor', 'F', 'IX', 'B+', 'Karnataka'),
(1014, 'Shobin', 'M', 'XII', 'O-', 'Tamilnadu'),
(1015, 'Praveen', 'M', 'XII', 'O+', 'Andrapradesh');

-- 1. How many students are studying in the class XII?
SELECT COUNT(*) AS class_xii_count 
FROM students 
WHERE Class = 'XII';
-- Output: 6 (Gowri, Rakesh, Rajesh, Malini, Shobin, Praveen)

-- 2. How many students are studying in the class XII from Tamilnadu?
SELECT COUNT(*) AS xii_tn_count 
FROM students 
WHERE Class = 'XII' AND State = 'Tamilnadu';
-- Output: 2 (Gowri, Shobin)

-- 3. How many male and female students are studying in XII from Tamilnadu?
SELECT Gender, COUNT(*) AS count 
FROM students 
WHERE Class = 'XII' AND State = 'Tamilnadu' 
GROUP BY Gender;
-- Output: Female: 1 (Gowri), Male: 1 (Shobin)

-- 4. How many students are studying in class XII except Tamilnadu?
SELECT COUNT(*) AS xii_non_tn_count 
FROM students 
WHERE Class = 'XII' AND State <> 'Tamilnadu';
-- Output: 4 (Rakesh, Rajesh, Malini, Praveen)

-- 5. How many male and female students are from except Tamilnadu?
SELECT Gender, COUNT(*) AS count 
FROM students 
WHERE State <> 'Tamilnadu' 
GROUP BY Gender;
-- Output: Male: 3 (Rakesh, Rajesh, Praveen), Female: 2 (Malini, Shradha Kapoor)
```

### (b) HDFS Commands
1. **Change group name of a file:**
```bash
hdfs dfs -chgrp mca /user/cloudera/bigdata/sample.txt
```
2. **Check whether a file has been modified or not in the absence of a user:**
```bash
hdfs dfs -stat "%y %n" /user/cloudera/bigdata/sample.txt
# %y prints modification timestamp (yyyy-MM-dd HH:mm:ss)
```

### (c) Spark — Read and Write Data from MongoDB
```python
from pyspark.sql import SparkSession

mongo_uri = "mongodb://localhost:27017/mydb.student"

spark = SparkSession.builder \
    .appName("MongoDBSparkIntegration") \
    .config("spark.mongodb.read.connection.uri", mongo_uri) \
    .config("spark.mongodb.write.connection.uri", mongo_uri) \
    .config("spark.jars.packages", "org.mongodb.spark:mongo-spark-connector_2.12:3.0.1") \
    .getOrCreate()

# Write DataFrame to MongoDB
data = [("1001", "Sudha", "IX", "Tamilnadu"), ("1002", "Suma", "XI", "Tamilnadu")]
df = spark.createDataFrame(data, ["id", "name", "class", "state"])
df.write.format("mongodb").mode("append").save()

# Read from MongoDB
df_read = spark.read.format("mongodb").load()
df_read.show()
```

---

# Question 5

### (a) Hive — Order Table 1 (Knee Pads)
Attributes: `Customerid, Order_date, Item, Quantity, Price`

```sql
USE bigdata;
DROP TABLE IF EXISTS orders;

CREATE TABLE orders (
    Customerid INT,
    Order_date STRING,
    Item STRING,
    Quantity INT,
    Price INT
)
ROW FORMAT DELIMITED
FIELDS TERMINATED BY ',';

INSERT INTO orders VALUES
(10330, '30-Jun-1999', 'Knee Pads', 3, 150),
(10101, '30-Jun-1999', 'Helmets', 5, 158),
(10298, '01-Jul-1999', 'Skate tool', 2, 1336),
(10299, '06-Jul-1999', 'Shoe', 2, 1000),
(10101, '01-Jul-1999', 'Life Vest', 4, 1250);

-- 1. Find the number of items available.
SELECT COUNT(DISTINCT Item) AS distinct_items, COUNT(*) AS total_order_items 
FROM orders;
-- Output: 5

-- 2. How many customers placed orders in a month?
SELECT SUBSTR(Order_date, 4, 3) AS order_month, COUNT(DISTINCT Customerid) AS customer_count 
FROM orders 
GROUP BY SUBSTR(Order_date, 4, 3);
-- Output: Jun: 2, Jul: 3

-- 3. How many customers placed orders in a day?
SELECT Order_date, COUNT(DISTINCT Customerid) AS customer_count 
FROM orders 
GROUP BY Order_date;
-- Output: 30-Jun-1999: 2, 01-Jul-1999: 2, 06-Jul-1999: 1

-- 4. Which product is sold highest in number?
SELECT Item, SUM(Quantity) AS total_sold 
FROM orders 
GROUP BY Item 
ORDER BY total_sold DESC 
LIMIT 1;
-- Output: Helmets (5 units)

-- 5. Which product is sold lowest in number?
SELECT Item, SUM(Quantity) AS total_sold 
FROM orders 
GROUP BY Item 
ORDER BY total_sold ASC 
LIMIT 1;
-- Output: Skate tool (2 units) / Shoe (2 units)
```

### (b) HDFS Commands
1. **Copy files within HDFS and overwrite:**
```bash
hdfs dfs -cp -f /user/cloudera/bigdata/file1.txt /user/cloudera/bigdata/file2.txt
```
2. **Move one or more files within HDFS:**
```bash
hdfs dfs -mv /user/cloudera/bigdata/file2.txt /user/cloudera/bigdata/moved/
```

### (c) Spark — Read and Write CSV, JSON, and Parquet Files
```python
from pyspark.sql import SparkSession

spark = SparkSession.builder.appName("ReadWriteFormats").getOrCreate()

data = [(1, "Helmet", 158), (2, "Shoe", 1000)]
df = spark.createDataFrame(data, ["id", "item", "price"])

# Write and Read CSV
df.write.mode("overwrite").option("header", "true").csv("/user/cloudera/formats/csv/")
df_csv = spark.read.option("header", "true").csv("/user/cloudera/formats/csv/")
df_csv.show()

# Write and Read JSON
df.write.mode("overwrite").json("/user/cloudera/formats/json/")
df_json = spark.read.json("/user/cloudera/formats/json/")
df_json.show()

# Write and Read Parquet
df.write.mode("overwrite").parquet("/user/cloudera/formats/parquet/")
df_parquet = spark.read.parquet("/user/cloudera/formats/parquet/")
df_parquet.show()
```

---

# Question 6

### (a) Hive — Order Table 2 (Rocher Ferraro)
```sql
USE bigdata;
DROP TABLE IF EXISTS orders_sweet;

CREATE TABLE orders_sweet (
    Customerid INT,
    Order_date STRING,
    Item STRING,
    Quantity INT,
    Price INT
)
ROW FORMAT DELIMITED
FIELDS TERMINATED BY ',';

INSERT INTO orders_sweet VALUES
(10330, '30-Jun-1999', 'Rocher Ferraro', 1, 128),
(10101, '30-Jun-1999', 'Coco Powder', 2, 200),
(10298, '01-Jul-1999', 'Pastery', 1, 33),
(10299, '06-Jul-1999', 'Millets', 1, 1250),
(10101, '01-Jul-1999', 'Sauce', 4, 125);

-- 1. Find the number of items available.
SELECT COUNT(DISTINCT Item) AS item_count FROM orders_sweet;
-- Output: 5

-- 2. How many customers placed orders in a day?
SELECT Order_date, COUNT(DISTINCT Customerid) AS customers_count 
FROM orders_sweet 
GROUP BY Order_date;

-- 3. Which customer placed the highest order amount?
SELECT Customerid, Item, (Quantity * Price) AS total_amount 
FROM orders_sweet 
ORDER BY total_amount DESC 
LIMIT 1;
-- Output: 10299 (Millets, Amount: 1250)

-- 4. On which order date the least order is placed amount?
SELECT Order_date, SUM(Quantity * Price) AS day_total 
FROM orders_sweet 
GROUP BY Order_date 
ORDER BY day_total ASC 
LIMIT 1;
-- Output: 30-Jun-1999 (Day total: 528)

-- 5. What is the price of 8 Sauce? (Unit price: 125)
SELECT Price * 8 AS price_of_8_sauce 
FROM orders_sweet 
WHERE Item = 'Sauce';
-- Output: 1000 (125 * 8)
```

### (b) HDFS Commands
1. **Display the directory contents:**
```bash
hdfs dfs -ls /user/cloudera/bigdata
```
2. **Change the file permission:**
```bash
hdfs dfs -chmod 755 /user/cloudera/bigdata/sample.txt
```

### (c) Spark — Integrate SQL with DataFrame
```python
from pyspark.sql import SparkSession

spark = SparkSession.builder.appName("SQLWithDataFrame").getOrCreate()

data = [(10330, "Rocher Ferraro", 128), (10101, "Coco Powder", 200), (10299, "Millets", 1250)]
df = spark.createDataFrame(data, ["cust_id", "item", "price"])

# Create Temporary View
df.createOrReplaceTempView("orders_view")

# Query with Spark SQL
result = spark.sql("SELECT * FROM orders_view WHERE price > 150")
result.show()
```

---

# Question 7

### (a) Hive — Employee Table
> **Exam Paper Note:** Query 2 strictly asks for department that **DOES NOT have character 'i'**!

```sql
USE bigdata;
DROP TABLE IF EXISTS employee7;

CREATE TABLE employee7 (
    EMP_No INT,
    NAME STRING,
    DEPT STRING,
    SALARY INT,
    DOJ STRING,
    BRANCH STRING
)
ROW FORMAT DELIMITED
FIELDS TERMINATED BY ',';

INSERT INTO employee7 VALUES
(101, 'Amit', 'Production', 45000, '12.03.1996', 'Bangalore'),
(102, 'Amit', 'IT', 70000, '03.07.1994', 'Bangalore'),
(103, 'Sunitha', 'Admin', 50000, '11.01.2001', 'Mysore'),
(104, 'Sunitha', 'HR', 65000, '01.08.2001', 'Mysore'),
(105, 'Mahesh', 'HR', 72000, '20.09.1998', 'Mumbai'),
(106, 'Deepak', 'IT', 58000, '10.10.2010', 'Chennai');

-- 1. How many homonym names are present in the table?
SELECT NAME, COUNT(*) AS occurrences 
FROM employee7 
GROUP BY NAME 
HAVING COUNT(*) > 1;
-- Output: Amit: 2, Sunitha: 2 (2 distinct homonym names, 4 total records)

-- 2. Find details of employees who work in department which DOES NOT have character 'i':
SELECT * 
FROM employee7 
WHERE LOWER(DEPT) NOT LIKE '%i%';
-- Output: Employees in 'Production' and 'HR' (Amit 101, Sunitha 104, Mahesh 105)

-- 3. Find the number of employees in each branch:
SELECT BRANCH, COUNT(*) AS count 
FROM employee7 
GROUP BY BRANCH;
-- Output: Bangalore: 2, Mysore: 2, Mumbai: 1, Chennai: 1

-- 4. Display Employee name whose branch has character 'ore':
SELECT NAME, BRANCH 
FROM employee7 
WHERE LOWER(BRANCH) LIKE '%ore%';
-- Output: Amit, Amit (Bangalore); Sunitha, Sunitha (Mysore)

-- 5. Display the name of employees whose DOJ is in 2000s:
SELECT NAME, DOJ 
FROM employee7 
WHERE CAST(SUBSTR(DOJ, 7, 4) AS INT) >= 2000;
-- Output: Sunitha (2001), Sunitha (2001), Deepak (2010)
```

### (b) HDFS Commands
1. **Display directory contents:**
```bash
hdfs dfs -ls /user/cloudera/bigdata
```
2. **Change file permission:**
```bash
hdfs dfs -chmod 644 /user/cloudera/bigdata/sample.txt
```

### (c) Spark — Integrate SQL with RDD
```python
from pyspark.sql import SparkSession

spark = SparkSession.builder.appName("SQLWithRDD").getOrCreate()
sc = spark.sparkContext

# Create RDD
rdd = sc.parallelize([(101, "Amit", 45000), (102, "Sunitha", 50000), (105, "Mahesh", 72000)])

# Convert RDD to DataFrame and Register View
df = rdd.toDF(["emp_no", "name", "salary"])
df.createOrReplaceTempView("rdd_emp_view")

# Query view with SQL
spark.sql("SELECT name, salary FROM rdd_emp_view WHERE salary >= 50000").show()
```

---

# Question 8

### (a) Hive — Employee and Department Join
> **Exam Paper Note:** Query 1 is a **15% hike**! Query 2 requires **both** name ending in 'a' and department ending in 'e'.

```sql
USE bigdata;
DROP TABLE IF EXISTS emp8;
DROP TABLE IF EXISTS dept8;

CREATE TABLE emp8 (
    Empid INT,
    Name STRING,
    Dept INT,
    Sal INT,
    DoB STRING,
    Branch STRING
)
ROW FORMAT DELIMITED
FIELDS TERMINATED BY ',';

INSERT INTO emp8 VALUES
(101, 'Mahesh', 2, 45000, '12.03.1996', 'Bangalore'),
(102, 'Sathish', 3, 70000, '03.07.1994', 'Bangalore'),
(103, 'Kaveya', 1, 50000, '11.01.1985', 'Mysore'),
(104, 'Chandra', 2, 65000, '01.08.1992', 'Mysore'),
(105, 'Sudha', 1, 72000, '20.09.1986', 'Mumbai'),
(106, 'Krishna', 3, 58000, '10.10.1987', 'Chennai'),
(107, 'Rahul', 1, 55000, '02.02.1989', 'Chennai');

CREATE TABLE dept8 (
    Dept INT,
    Name STRING
)
ROW FORMAT DELIMITED
FIELDS TERMINATED BY ',';

INSERT INTO dept8 VALUES
(1, 'Administration'),
(2, 'Research and Development'),
(3, 'Design and Development');

-- 1. Salary of Research Department employees after 15% hike:
SELECT e.Name, e.Sal, e.Sal * 1.15 AS salary_after_15_hike 
FROM emp8 e 
JOIN dept8 d ON e.Dept = d.Dept 
WHERE d.Dept = 2 OR d.Name LIKE 'Research%';
-- Output: Mahesh: 51750, Chandra: 74750

-- 2. Display employee names ending in 'a' and department ending in 'e':
SELECT e.Name, d.Name AS Dept_Name 
FROM emp8 e 
JOIN dept8 d ON e.Dept = d.Dept 
WHERE LOWER(e.Name) LIKE '%a' AND LOWER(d.Name) LIKE '%e';

-- 3. Total salary amount of all employees of Design and Development:
SELECT d.Name, SUM(e.Sal) AS total_salary 
FROM emp8 e 
JOIN dept8 d ON e.Dept = d.Dept 
WHERE d.Dept = 3 
GROUP BY d.Name;
-- Output: 128000 (Sathish 70000 + Krishna 58000)

-- 4. Find lowest, highest, and mean salary of the departments:
SELECT d.Name, MIN(e.Sal) AS min_sal, MAX(e.Sal) AS max_sal, AVG(e.Sal) AS mean_sal 
FROM emp8 e 
JOIN dept8 d ON e.Dept = d.Dept 
GROUP BY d.Name;

-- 5. Number of employees in department with character 'o' followed by 'r':
SELECT d.Name, COUNT(e.Empid) AS emp_count 
FROM emp8 e 
JOIN dept8 d ON e.Dept = d.Dept 
WHERE LOWER(d.Name) LIKE '%or%' 
GROUP BY d.Name;
```

### (b) HDFS Commands
1. **Count the number of files and directories inside a directory:**
```bash
hdfs dfs -count /user/cloudera/bigdata
```
2. **Use of getMerge command:**
```bash
hdfs dfs -getmerge /user/cloudera/bigdata/parts/ /home/cloudera/Desktop/merged_output.txt
```

### (c) Spark RDD — Read Data from External Sources into RDD
```python
from pyspark.sql import SparkSession

spark = SparkSession.builder.appName("ReadExternalToRDD").getOrCreate()
sc = spark.sparkContext

rdd = sc.textFile("/user/cloudera/bigdata/sample.txt")
print("Total lines read:", rdd.count())
print("First line:", rdd.first())
```

---

# Question 9

### (a) Hive — Bucketing
Dataset: Employee table with `ID, Name, Salary, Designation`.

```sql
USE bigdata;
SET hive.enforce.bucketing = true;

DROP TABLE IF EXISTS employee_bucketed;

CREATE TABLE employee_bucketed (
    ID INT,
    Name STRING,
    Salary INT,
    Designation STRING
)
CLUSTERED BY (Designation) INTO 3 BUCKETS
ROW FORMAT DELIMITED
FIELDS TERMINATED BY ',';

INSERT INTO employee_bucketed VALUES
(1, 'Gaurav', 30000, 'Developer'),
(2, 'Aryan', 20000, 'Manager'),
(3, 'Vishal', 40000, 'Manager'),
(4, 'Sudha', 10000, 'Trainer'),
(5, 'Henry', 25000, 'Developer'),
(6, 'Watson', 9000, 'Developer'),
(7, 'Lisa', 25000, 'Manager'),
(8, 'Rohit', 20000, 'Trainer');

SELECT * FROM employee_bucketed;
```

### (b) HDFS Commands
1. **Create a directory in HDFS:**
```bash
hdfs dfs -mkdir -p /user/cloudera/input_data
```
2. **Copy a file from LFS to HDFS:**
```bash
hdfs dfs -put /home/cloudera/data.csv /user/cloudera/input_data/
```

### (c) Spark DataFrame — Read Data from External Sources into DataFrame
```python
from pyspark.sql import SparkSession

spark = SparkSession.builder.appName("ReadExternalToDF").getOrCreate()

df = spark.read.option("header", "true").option("inferSchema", "true").csv("/user/cloudera/input_data/data.csv")
df.show(5)
```

---

# Question 10

### (a) Hive — Student Blood Group Queries
Using the Student dataset from Question 4:

```sql
USE bigdata;

-- 1. Find the number of boys and girls:
SELECT Gender, COUNT(*) AS count 
FROM students 
GROUP BY Gender;
-- Output: Male: 4, Female: 5

-- 2. How many O+ students are there in the Database?
SELECT COUNT(*) AS o_plus_count 
FROM students 
WHERE UPPER(Bloodgroup) = 'O+';
-- Output: 4 (Sudha, Rakesh, Rajesh, Praveen)

-- 3. How many O+ve Male and female students are there in the database?
SELECT Gender, COUNT(*) AS count 
FROM students 
WHERE UPPER(Bloodgroup) = 'O+' 
GROUP BY Gender;
-- Output: Female: 1 (Sudha), Male: 3 (Rakesh, Rajesh, Praveen)

-- 4. How many O+ students in XII?
SELECT COUNT(*) AS o_plus_xii_count 
FROM students 
WHERE UPPER(Bloodgroup) = 'O+' AND Class = 'XII';
-- Output: 3 (Rakesh, Rajesh, Praveen)

-- 5. How many O+ male and females in XII?
SELECT Gender, COUNT(*) AS count 
FROM students 
WHERE UPPER(Bloodgroup) = 'O+' AND Class = 'XII' 
GROUP BY Gender;
-- Output: Male: 3, Female: 0
```

### (b) HDFS Commands
1. **Count files and directories inside directory:**
```bash
hdfs dfs -count /user/cloudera
```
2. **Use of getMerge command:**
```bash
hdfs dfs -getmerge /user/cloudera/input_files/ /home/cloudera/Desktop/merged.txt
```

### (c) Spark — Read and Write CSV and JSON
```python
from pyspark.sql import SparkSession

spark = SparkSession.builder.appName("CSVandJSON").getOrCreate()

df = spark.createDataFrame([(1, "John"), (2, "Jane")], ["id", "name"])

# Write and Read CSV
df.write.mode("overwrite").option("header", "true").csv("/user/cloudera/data_csv/")
spark.read.option("header", "true").csv("/user/cloudera/data_csv/").show()

# Write and Read JSON
df.write.mode("overwrite").json("/user/cloudera/data_json/")
spark.read.json("/user/cloudera/data_json/").show()
```

---

# Question 11

### (a) Hive — Employee Aggregation
Dataset: `ID, Name, Salary, Designation`

```sql
USE bigdata;
DROP TABLE IF EXISTS emp11;

CREATE TABLE emp11 (
    ID INT,
    Name STRING,
    Salary INT,
    Designation STRING
)
ROW FORMAT DELIMITED
FIELDS TERMINATED BY ',';

INSERT INTO emp11 VALUES
(1, 'Gaurav', 30000, 'Developer'),
(2, 'Aryan', 20000, 'Manager'),
(3, 'Vishal', 40000, 'Manager'),
(4, 'Sudha', 10000, 'Trainer'),
(5, 'Henry', 25000, 'Developer'),
(6, 'Watson', 9000, 'Developer'),
(7, 'Lisa', 25000, 'Manager'),
(8, 'Rohit', 20000, 'Trainer');

-- 1. How many employees are working in each designation?
SELECT Designation, COUNT(*) AS count 
FROM emp11 
GROUP BY Designation;

-- 2. How many employees are working in the organization?
SELECT COUNT(*) AS total_employees FROM emp11;
-- Output: 8

-- 3. Find the amount spent by the organization on employees (total salary):
SELECT SUM(Salary) AS total_expenditure FROM emp11;
-- Output: 179000

-- 4. Arrange the table content based on salary:
SELECT * FROM emp11 ORDER BY Salary ASC;

-- 5. Find the name of employees whose name has 'i' as the second letter:
SELECT Name FROM emp11 WHERE LOWER(Name) LIKE '_i%';
-- Output: Vishal, Lisa
```

### (b) HDFS Commands
1. **Count files and directories inside directory:**
```bash
hdfs dfs -count /user/cloudera
```
2. **Use of getMerge command:**
```bash
hdfs dfs -getmerge /user/cloudera/parts/ /home/cloudera/Desktop/merged.txt
```

### (c) Spark — Read and Write CSV and Parquet Files
```python
from pyspark.sql import SparkSession

spark = SparkSession.builder.appName("CSVandParquet").getOrCreate()

df = spark.createDataFrame([(1, "Gaurav", 30000), (2, "Aryan", 20000)], ["id", "name", "salary"])

# CSV Read / Write
df.write.mode("overwrite").option("header", "true").csv("/user/cloudera/test_csv/")
spark.read.option("header", "true").csv("/user/cloudera/test_csv/").show()

# Parquet Read / Write
df.write.mode("overwrite").parquet("/user/cloudera/test_parquet/")
spark.read.parquet("/user/cloudera/test_parquet/").show()
```

---

# Question 12

### (a) Hive — Company Employee Queries
Attributes: `Id, Name, Gender, Dept, Designation, City, Salary`

```sql
USE bigdata;
DROP TABLE IF EXISTS company_emp12;

CREATE TABLE company_emp12 (
    Id INT,
    Name STRING,
    Gender STRING,
    Dept STRING,
    Designation STRING,
    City STRING,
    Salary INT
)
ROW FORMAT DELIMITED
FIELDS TERMINATED BY ',';

INSERT INTO company_emp12 VALUES
(101, 'Peterson', 'M', 'Production', 'Manager', 'Chennai', 56000),
(102, 'Janet', 'F', 'Sales', 'Manager', 'Mumbai', 48000),
(103, 'Kingsly', 'M', 'HR', 'Jr. Manager', 'Kolkata', 52000),
(104, 'Abraham', 'M', 'Sales', 'Jr. Manager', 'Chennai', 45000),
(105, 'Stella', 'F', 'HR', 'Typist', 'Mumbai', 15000),
(106, 'Mary', 'F', 'Sales', 'Jr. Manager', 'Chennai', 38000),
(107, 'Kiran', 'M', 'Production', 'Operator', 'Kolkata', 10000);

-- 1. How many departments are there in the organization?
SELECT COUNT(DISTINCT Dept) AS dept_count FROM company_emp12;
-- Output: 3 (Production, Sales, HR)

-- 2. How many Managers and Junior Managers are working in the company?
SELECT COUNT(*) AS total_managers 
FROM company_emp12 
WHERE Designation IN ('Manager', 'Jr. Manager');
-- Output: 5 (2 Managers, 3 Jr. Managers)

-- 3. How many male and female Junior Managers are there in the organization?
SELECT Gender, COUNT(*) AS count 
FROM company_emp12 
WHERE Designation = 'Jr. Manager' 
GROUP BY Gender;
-- Output: Male: 2 (Kingsly, Abraham), Female: 1 (Mary)

-- 4. How many Junior Managers are working in Chennai?
SELECT COUNT(*) AS count 
FROM company_emp12 
WHERE Designation = 'Jr. Manager' AND City = 'Chennai';
-- Output: 2 (Abraham, Mary)

-- 5. How many female Junior Managers are working in Chennai?
SELECT COUNT(*) AS count 
FROM company_emp12 
WHERE Designation = 'Jr. Manager' AND City = 'Chennai' AND Gender = 'F';
-- Output: 1 (Mary)
```

### (b) HDFS Commands
1. **Create directory in HDFS:**
```bash
hdfs dfs -mkdir -p /user/cloudera/company_data
```
2. **Copy file from LFS to HDFS:**
```bash
hdfs dfs -put /home/cloudera/company.txt /user/cloudera/company_data/
```

### (c) Spark — Read and Write JSON and Parquet Files
```python
from pyspark.sql import SparkSession

spark = SparkSession.builder.appName("JSONandParquet").getOrCreate()

df = spark.createDataFrame([(101, "Peterson", 56000), (102, "Janet", 48000)], ["id", "name", "salary"])

# JSON
df.write.mode("overwrite").json("/user/cloudera/data_json/")
spark.read.json("/user/cloudera/data_json/").show()

# Parquet
df.write.mode("overwrite").parquet("/user/cloudera/data_parquet/")
spark.read.parquet("/user/cloudera/data_parquet/").show()
```

---

# Question 13

### (a) Hive — Employee Salary Operations
```sql
USE bigdata;

-- 1. Find total salary and count of employees based on their designation:
SELECT Designation, SUM(Salary) AS total_sal, COUNT(*) AS emp_count 
FROM emp11 
GROUP BY Designation;

-- 2. Display designation having total salary >= 35000:
SELECT Designation, SUM(Salary) AS total_sal 
FROM emp11 
GROUP BY Designation 
HAVING SUM(Salary) >= 35000;
-- Output: Developer (84000), Manager (85000)

-- 3. Display designation in descending order:
SELECT DISTINCT Designation 
FROM emp11 
ORDER BY Designation DESC;

-- 4. How many employees are drawing salaries less than 25000?
SELECT COUNT(*) AS count 
FROM emp11 
WHERE Salary < 25000;
-- Output: 4 (Aryan, Sudha, Watson, Rohit)

-- 5. Display the names of developers and the count:
SELECT Name FROM emp11 WHERE Designation = 'Developer';
SELECT COUNT(*) AS dev_count FROM emp11 WHERE Designation = 'Developer';
```

### (b) HDFS Commands
1. **Count files and directories inside directory:**
```bash
hdfs dfs -count /user/cloudera
```
2. **Use of getMerge command:**
```bash
hdfs dfs -getmerge /user/cloudera/input_dir/ /home/cloudera/Desktop/merged.txt
```

### (c) Spark — Read and Write CSV and Parquet Files
```python
from pyspark.sql import SparkSession

spark = SparkSession.builder.appName("CSVandParquet13").getOrCreate()

df = spark.createDataFrame([(1, "Dev1"), (2, "Dev2")], ["id", "name"])

df.write.mode("overwrite").option("header", "true").csv("/user/cloudera/q13_csv/")
spark.read.option("header", "true").csv("/user/cloudera/q13_csv/").show()

df.write.mode("overwrite").parquet("/user/cloudera/q13_parquet/")
spark.read.parquet("/user/cloudera/q13_parquet/").show()
```

---

# Question 14

### (a) Hive — Customer and Order Left & Right Outer Joins
> **Exam Paper Note:** Must include customer **age**, filter order amount **less than 2000**, customer salary **greater than 5000**, and find customer with **most orders**!

```sql
USE bigdata;
DROP TABLE IF EXISTS customer;
DROP TABLE IF EXISTS customer_order;

CREATE TABLE customer (
    Cust_id INT,
    Name STRING,
    Age INT,
    Location STRING,
    Salary INT
)
ROW FORMAT DELIMITED
FIELDS TERMINATED BY ',';

INSERT INTO customer VALUES
(1, 'Ross', 32, 'Ahmadabad', 2000),
(2, 'Rachel', 25, 'Delhi', 1500),
(3, 'Chandler', 23, 'Kolkata', 2000),
(4, 'Monika', 25, 'Mumbai', 6500),
(5, 'Mike', 27, 'Bhopal', 8500),
(6, 'Phoeba', 22, 'Uttarpradesh', 4500),
(7, 'Joey', 24, 'Indore', 10000);

CREATE TABLE customer_order (
    Oid INT,
    Date STRING,
    Cust_id INT,
    Amount INT
)
ROW FORMAT DELIMITED
FIELDS TERMINATED BY ',';

INSERT INTO customer_order VALUES
(102, '08.10.2016', 3, 3000),
(100, '08.10.2013', 3, 1500),
(101, '20.11.2016', 2, 1560),
(103, '20.05.2015', 4, 2060);

-- 1. Display name of customers, age, and order id placed by them:
SELECT c.Name, c.Age, o.Oid 
FROM customer c 
LEFT OUTER JOIN customer_order o ON c.Cust_id = o.Cust_id;

-- 2. Display name and salary of the customer who placed order less than Rs. 2000:
SELECT c.Name, c.Salary, o.Amount 
FROM customer c 
JOIN customer_order o ON c.Cust_id = o.Cust_id 
WHERE o.Amount < 2000;
-- Output: Chandler (Order 100, 1500), Rachel (Order 101, 1560)

-- 3. Display order id and name of customer whose salary is greater than 5000:
SELECT o.Oid, c.Name, c.Salary 
FROM customer c 
JOIN customer_order o ON c.Cust_id = o.Cust_id 
WHERE c.Salary > 5000;
-- Output: Order 103, Monika (Salary: 6500)

-- 4. Display customer name whose name has 'o' as second letter and their order amount:
SELECT c.Name, o.Amount 
FROM customer c 
JOIN customer_order o ON c.Cust_id = o.Cust_id 
WHERE LOWER(c.Name) LIKE '_o%';
-- Output: Monika (Amount: 2060)

-- 5. Display Oid, amount of customer who placed more number of orders:
SELECT o.Oid, o.Amount, o.Cust_id 
FROM customer_order o 
WHERE o.Cust_id = (
    SELECT Cust_id FROM customer_order GROUP BY Cust_id ORDER BY COUNT(*) DESC LIMIT 1
);
-- Output: Chandler (Cust_id 3) placed 2 orders: 102 (3000) and 100 (1500)
```

### (b) Spark — Read and Write CSV and Parquet Files
```python
from pyspark.sql import SparkSession

spark = SparkSession.builder.appName("SparkJoinsCSVParquet").getOrCreate()

df = spark.createDataFrame([(1, "Ross", 2000), (2, "Rachel", 1500)], ["id", "name", "salary"])

df.write.mode("overwrite").option("header", "true").csv("/user/cloudera/q14_csv/")
spark.read.option("header", "true").csv("/user/cloudera/q14_csv/").show()

df.write.mode("overwrite").parquet("/user/cloudera/q14_parquet/")
spark.read.parquet("/user/cloudera/q14_parquet/").show()
```

---

# Question 15

### (a) Spark DataFrame — Employee Operations
```python
from pyspark.sql import SparkSession
from pyspark.sql.functions import col, sum as _sum

spark = SparkSession.builder.appName("Q15EmployeeDF").getOrCreate()

data = [
    (1, "Gaurav", 30000, "Developer"),
    (2, "Aryan", 20000, "Manager"),
    (3, "Vishal", 40000, "Manager"),
    (4, "Sudha", 10000, "Trainer"),
    (5, "Henry", 25000, "Developer"),
    (6, "Watson", 9000, "Developer"),
    (7, "Lisa", 25000, "Manager"),
    (8, "Rohit", 20000, "Trainer")
]
columns = ["ID", "Name", "Salary", "Designation"]
df = spark.createDataFrame(data, columns)

# 1. Total salary based on designation:
df.groupBy("Designation").agg(_sum("Salary").alias("TotalSalary")).show()

# 2. Designation having total salary >= 35000:
df.groupBy("Designation").agg(_sum("Salary").alias("TotalSalary")).filter(col("TotalSalary") >= 35000).show()

# 3. Designation in descending order:
df.select("Designation").distinct().orderBy(col("Designation").desc()).show()

# 4. How many employees draw salaries less than 25000:
print("Salaries < 25000 count:", df.filter(col("Salary") < 25000).count())

# 5. Display developer names and count:
df.filter(col("Designation") == "Developer").select("Name").show()
print("Developer count:", df.filter(col("Designation") == "Developer").count())
```

### (b) HDFS Commands
1. **Copy a file from HDFS to Local File System (LFS):**
```bash
hdfs dfs -get /user/cloudera/bigdata/sample.txt /home/cloudera/Desktop/downloaded.txt
# Alternatively:
hdfs dfs -copyToLocal /user/cloudera/bigdata/sample.txt /home/cloudera/Desktop/
```
2. **Display file contents:**
```bash
hdfs dfs -cat /user/cloudera/bigdata/sample.txt
```

### (c) Hive — Static Bucketing
```sql
USE bigdata;
SET hive.enforce.bucketing = true;

CREATE TABLE emp_static_bucket (
    ID INT,
    Name STRING,
    Salary INT,
    Designation STRING
)
CLUSTERED BY (Designation) INTO 2 BUCKETS
ROW FORMAT DELIMITED
FIELDS TERMINATED BY ',';

INSERT OVERWRITE TABLE emp_static_bucket 
SELECT ID, Name, Salary, Designation FROM emp11;

SELECT * FROM emp_static_bucket;
```

---

# Question 16

### (a) Spark DataFrame & Spark SQL — Company Employee
```python
from pyspark.sql import SparkSession

spark = SparkSession.builder.appName("Q16CompanyEmp").getOrCreate()

data = [
    (101, "Peterson", "M", "Production", "Manager", "Chennai", 56000),
    (102, "Janet", "F", "Sales", "Manager", "Mumbai", 48000),
    (103, "Kingsly", "M", "HR", "Jr. Manager", "Kolkata", 52000),
    (104, "Abraham", "M", "Sales", "Jr. Manager", "Chennai", 45000),
    (105, "Stella", "F", "HR", "Typist", "Mumbai", 15000),
    (106, "Mary", "F", "Sales", "Jr. Manager", "Chennai", 38000),
    (107, "Kiran", "M", "Production", "Operator", "Kolkata", 10000)
]
columns = ["Id", "Name", "Gender", "Dept", "Designation", "City", "Salary"]
df = spark.createDataFrame(data, columns)
df.createOrReplaceTempView("company_employee")

# 1. How many Managers are working in the company?
spark.sql("SELECT COUNT(*) AS manager_count FROM company_employee WHERE Designation = 'Manager'").show()

# 2. How many Managers are working in Mumbai?
spark.sql("SELECT COUNT(*) AS mumbai_managers FROM company_employee WHERE Designation = 'Manager' AND City = 'Mumbai'").show()

# 3. How many departments are there in the organization?
spark.sql("SELECT COUNT(DISTINCT Dept) AS dept_count FROM company_employee").show()

# 4. How many male and female employees are there in the organization?
spark.sql("SELECT Gender, COUNT(*) AS count FROM company_employee GROUP BY Gender").show()

# 5. How many male and female employees are there in EACH department?
spark.sql("SELECT Dept, Gender, COUNT(*) AS count FROM company_employee GROUP BY Dept, Gender ORDER BY Dept, Gender").show()
```

### (b) HDFS Commands
1. **Delete a directory in HDFS:**
```bash
hdfs dfs -rm -r /user/cloudera/old_directory
```
2. **Display directory contents:**
```bash
hdfs dfs -ls /user/cloudera
```

### (c) Hive — Dynamic Partitioning
```sql
USE bigdata;
SET hive.exec.dynamic.partition = true;
SET hive.exec.dynamic.partition.mode = nonstrict;

CREATE TABLE emp_dyn_partition (
    Id INT,
    Name STRING,
    Gender STRING,
    Designation STRING,
    City STRING,
    Salary INT
)
PARTITIONED BY (Dept STRING)
ROW FORMAT DELIMITED
FIELDS TERMINATED BY ',';

INSERT OVERWRITE TABLE emp_dyn_partition PARTITION(Dept)
SELECT Id, Name, Gender, Designation, City, Salary, Dept FROM company_emp12;

SHOW PARTITIONS emp_dyn_partition;
```

---

# Question 17

### (a) Spark DataFrame — Student Table Queries
```python
from pyspark.sql import SparkSession
from pyspark.sql.functions import col

spark = SparkSession.builder.appName("Q17StudentDF").getOrCreate()

data = [
    (1001, "Sudha", "F", "IX", "O+", "Tamilnadu"),
    (1002, "Suma", "F", "XI", "AB+", "Tamilnadu"),
    (1005, "Gowri", "F", "XII", "O-", "Tamilnadu"),
    (1010, "Rakesh", "M", "XII", "O+", "Andrapradesh"),
    (1011, "Rajesh", "M", "XII", "O+", "Kerala"),
    (1012, "Malini", "F", "XII", "AB+", "Mumbai"),
    (1012, "Shradha Kapoor", "F", "IX", "B+", "Karnataka"),
    (1014, "Shobin", "M", "XII", "O-", "Tamilnadu"),
    (1015, "Praveen", "M", "XII", "O+", "Andrapradesh")
]
columns = ["Stud_id", "Name", "Gender", "Class", "Bloodgroup", "State"]
df = spark.createDataFrame(data, columns)

# 1. Find the number of boys and girls:
df.groupBy("Gender").count().show()

# 2. How many female students are O+ve bloodgroup?
print("Female O+ count:", df.filter((col("Bloodgroup") == "O+") & (col("Gender") == "F")).count())

# 3. Display the classes of O+ve female students:
df.filter((col("Bloodgroup") == "O+") & (col("Gender") == "F")).select("Name", "Class").show()

# 4. Display the states of O+ve female students:
df.filter((col("Bloodgroup") == "O+") & (col("Gender") == "F")).select("Name", "State").show()

# 5. How many female O+ students are in Tamilnadu state?
print("Female O+ in Tamilnadu:", df.filter((col("Bloodgroup") == "O+") & (col("Gender") == "F") & (col("State") == "Tamilnadu")).count())
```

### (b) HDFS Commands
1. **Display the last few lines in a file:**
```bash
hdfs dfs -tail /user/cloudera/bigdata/sample.txt
```
2. **Use of appendToFile command:**
```bash
hdfs dfs -appendToFile /home/cloudera/Desktop/new_lines.txt /user/cloudera/bigdata/sample.txt
```

### (c) Hive — Partitioning
```sql
USE bigdata;
SET hive.exec.dynamic.partition = true;
SET hive.exec.dynamic.partition.mode = nonstrict;

CREATE TABLE student_part (
    Stud_id INT,
    Name STRING,
    Gender STRING,
    Class STRING,
    Bloodgroup STRING
)
PARTITIONED BY (State STRING)
ROW FORMAT DELIMITED
FIELDS TERMINATED BY ',';

INSERT OVERWRITE TABLE student_part PARTITION(State)
SELECT Stud_id, Name, Gender, Class, Bloodgroup, State FROM students;

SHOW PARTITIONS student_part;
```

---

# Question 18

### (a) Spark SQL with RDD — Student Table
```python
from pyspark.sql import SparkSession

spark = SparkSession.builder.appName("Q18StudentRDDSparkSQL").getOrCreate()
sc = spark.sparkContext

data = [
    (1001, "Sudha", "F", "IX", "O+", "Tamilnadu"),
    (1002, "Suma", "F", "XI", "AB+", "Tamilnadu"),
    (1005, "Gowri", "F", "XII", "O-", "Tamilnadu"),
    (1010, "Rakesh", "M", "XII", "O+", "Andrapradesh"),
    (1011, "Rajesh", "M", "XII", "O+", "Kerala"),
    (1012, "Malini", "F", "XII", "AB+", "Mumbai"),
    (1012, "Shradha Kapoor", "F", "IX", "B+", "Karnataka"),
    (1014, "Shobin", "M", "XII", "O-", "Tamilnadu"),
    (1015, "Praveen", "M", "XII", "O+", "Andrapradesh")
]

# Read into RDD
rdd = sc.parallelize(data)

# Convert RDD to DataFrame and create view
df = rdd.toDF(["Stud_id", "Name", "Gender", "Class", "Bloodgroup", "State"])
df.createOrReplaceTempView("students_sql")

# 1. Number of boys and girls
spark.sql("SELECT Gender, COUNT(*) AS count FROM students_sql GROUP BY Gender").show()

# 2. How many O+ students in database
spark.sql("SELECT COUNT(*) AS o_plus_count FROM students_sql WHERE Bloodgroup = 'O+'").show()

# 3. How many O+ve male and female students in database
spark.sql("SELECT Gender, COUNT(*) FROM students_sql WHERE Bloodgroup = 'O+' GROUP BY Gender").show()

# 4. How many O+ students in XII
spark.sql("SELECT COUNT(*) FROM students_sql WHERE Bloodgroup = 'O+' AND Class = 'XII'").show()

# 5. How many O+ male and females in XII
spark.sql("SELECT Gender, COUNT(*) FROM students_sql WHERE Bloodgroup = 'O+' AND Class = 'XII' GROUP BY Gender").show()
```

### (b) HDFS Commands
1. **Move one or more files within HDFS:**
```bash
hdfs dfs -mv /user/cloudera/bigdata/file1.txt /user/cloudera/archive/
```
2. **Change file permission:**
```bash
hdfs dfs -chmod 700 /user/cloudera/archive/file1.txt
```

### (c) Hive — Bucketing
```sql
USE bigdata;
SET hive.enforce.bucketing = true;

CREATE TABLE student_bucket (
    Stud_id INT,
    Name STRING,
    Gender STRING,
    Class STRING,
    Bloodgroup STRING,
    State STRING
)
CLUSTERED BY (Bloodgroup) INTO 2 BUCKETS
ROW FORMAT DELIMITED
FIELDS TERMINATED BY ',';

INSERT OVERWRITE TABLE student_bucket SELECT * FROM students;
SELECT * FROM student_bucket;
```

---

# Question 19

### (a) Spark DataFrame — Order Table 2
Attributes: `customerid, order_date, item, quantity, Price/Item`

```python
from pyspark.sql import SparkSession
from pyspark.sql.functions import col, countDistinct, sum as _sum, desc, asc

spark = SparkSession.builder.appName("Q19OrderDataFrame").getOrCreate()

data = [
    (10330, "30-Jun-1999", "Rocher Ferraro", 1, 128),
    (10101, "30-Jun-1999", "Coco Powder", 2, 200),
    (10298, "01-Jul-1999", "Pastery", 1, 33),
    (10299, "06-Jul-1999", "Millets", 1, 1250),
    (10101, "01-Jul-1999", "Sauce", 4, 125)
]
columns = ["customerid", "order_date", "item", "quantity", "price"]
df = spark.createDataFrame(data, columns)

# 1. Find the number of items available:
print("Total items available:", df.select("item").distinct().count())

# 2. How many customers placed orders in a day:
df.groupBy("order_date").agg(countDistinct("customerid").alias("customer_count")).show()

# 3. Which customer placed the highest order:
df.withColumn("order_val", col("quantity") * col("price")) \
  .orderBy(desc("order_val")).select("customerid", "item", "order_val").limit(1).show()

# 4. On which order date the least order is placed:
df.withColumn("order_val", col("quantity") * col("price")) \
  .groupBy("order_date").agg(_sum("order_val").alias("day_total")) \
  .orderBy(asc("day_total")).limit(1).show()

# 5. What is the price of six Sauce? (Unit price: 125)
sauce_price = df.filter(col("item") == "Sauce").select("price").first()[0]
print("Price of 6 Sauce:", sauce_price * 6)
```

### (b) HDFS Commands
1. **Display last few lines in a file:**
```bash
hdfs dfs -tail /user/cloudera/orders.txt
```
2. **Use of appendToFile command:**
```bash
hdfs dfs -appendToFile /home/cloudera/append_data.txt /user/cloudera/orders.txt
```

### (c) Hive — Partitioning
```sql
USE bigdata;
SET hive.exec.dynamic.partition = true;
SET hive.exec.dynamic.partition.mode = nonstrict;

CREATE TABLE orders_part (
    customerid INT,
    item STRING,
    quantity INT,
    price INT
)
PARTITIONED BY (order_date STRING)
ROW FORMAT DELIMITED
FIELDS TERMINATED BY ',';

INSERT OVERWRITE TABLE orders_part PARTITION(order_date)
SELECT customerid, item, quantity, price, order_date FROM orders_sweet;

SHOW PARTITIONS orders_part;
```

---

# Question 20

### (a) Spark SQL — Order Table 1
Attributes: `Customerid, Order_date, Item, Quantity, Price`

```python
from pyspark.sql import SparkSession

spark = SparkSession.builder.appName("Q20OrderSparkSQL").getOrCreate()

data = [
    (10330, "30-Jun-1999", "Knee Pads", 3, 150),
    (10101, "30-Jun-1999", "Helmets", 5, 158),
    (10298, "01-Jul-1999", "Skate tool", 2, 1336),
    (10299, "06-Jul-1999", "Shoe", 2, 1000),
    (10101, "01-Jul-1999", "Life Vest", 4, 1250)
]
columns = ["customerid", "order_date", "item", "quantity", "price"]
df = spark.createDataFrame(data, columns)
df.createOrReplaceTempView("orders_table")

# a) Find the number of items available:
spark.sql("SELECT COUNT(DISTINCT item) AS item_count FROM orders_table").show()

# b) How many customers placed orders in a day:
spark.sql("SELECT order_date, COUNT(DISTINCT customerid) AS customer_count FROM orders_table GROUP BY order_date").show()

# c) Which customer placed the highest order:
spark.sql("SELECT customerid, item, quantity * price AS total_val FROM orders_table ORDER BY total_val DESC LIMIT 1").show()

# d) On which order date the least order is placed:
spark.sql("SELECT order_date, SUM(quantity * price) AS day_total FROM orders_table GROUP BY order_date ORDER BY day_total ASC LIMIT 1").show()

# e) What is the price of seven life vest?
spark.sql("SELECT price * 7 AS price_of_7_life_vest FROM orders_table WHERE item = 'Life Vest'").show()
```

### (b) HDFS Commands
1. **Delete a directory in HDFS:**
```bash
hdfs dfs -rm -r /user/cloudera/temp_dir
```
2. **Display directory contents:**
```bash
hdfs dfs -ls /user/cloudera
```

### (c) Hive — Bucketing
```sql
USE bigdata;
SET hive.enforce.bucketing = true;

CREATE TABLE orders_bucketed (
    customerid INT,
    order_date STRING,
    item STRING,
    quantity INT,
    price INT
)
CLUSTERED BY (customerid) INTO 2 BUCKETS
ROW FORMAT DELIMITED
FIELDS TERMINATED BY ',';

INSERT OVERWRITE TABLE orders_bucketed SELECT * FROM orders;
SELECT * FROM orders_bucketed;
```

---

# Master Cheat Sheet: HDFS Commands

| Operation | Exact Command Syntax | Description |
| :--- | :--- | :--- |
| **Create directory** | `hdfs dfs -mkdir -p /path/to/dir` | Creates directory hierarchy recursively. |
| **Upload file (LFS $	o$ HDFS)** | `hdfs dfs -put /local/path /hdfs/path` | Copies file from local Linux system to HDFS. |
| **Alternative upload** | `hdfs dfs -copyFromLocal /local/path /hdfs/path` | Same as `put`. |
| **Download file (HDFS $	o$ LFS)** | `hdfs dfs -get /hdfs/path /local/path` | Copies file from HDFS to local machine. |
| **Display contents** | `hdfs dfs -cat /hdfs/path/file.txt` | Dumps file text to console. |
| **List directory** | `hdfs dfs -ls /hdfs/path` | Lists files and permissions. |
| **Recursive listing** | `hdfs dfs -ls -R /hdfs/path` | Lists all files recursively. |
| **Count files/dirs** | `hdfs dfs -count /hdfs/path` | Reports directory count, file count, and byte size. |
| **Copy within HDFS** | `hdfs dfs -cp /src /dest` | Copies files within HDFS. |
| **Force overwrite copy** | `hdfs dfs -cp -f /src /dest` | Overwrites existing destination file. |
| **Move within HDFS** | `hdfs dfs -mv /src /dest` | Moves or renames files within HDFS. |
| **Delete file** | `hdfs dfs -rm /hdfs/path/file.txt` | Deletes a file. |
| **Delete directory** | `hdfs dfs -rm -r /hdfs/path/dir` | Recursively deletes a directory and contents. |
| **Change permission** | `hdfs dfs -chmod 755 /hdfs/path` | Sets read/write/execute permissions. |
| **Change group** | `hdfs dfs -chgrp mca /hdfs/path` | Sets group ownership. |
| **Change owner** | `hdfs dfs -chown cloudera:mca /hdfs/path` | Changes user and group owner. |
| **View last lines** | `hdfs dfs -tail /hdfs/path/file.txt` | Displays last 1 KB of file. |
| **Append local to HDFS** | `hdfs dfs -appendToFile /local/f1 /hdfs/f2` | Appends local file contents to existing HDFS file. |
| **Merge files to local** | `hdfs dfs -getmerge /hdfs/dir /local/merged` | Merges all part-files in HDFS dir into single local file. |
| **Check file status/mod** | `hdfs dfs -stat "%y %n" /hdfs/path` | Prints modification date and file name. |

---

# Master Cheat Sheet: Hive Partitioning & Bucketing

### 1. Partitioning vs. Bucketing
| Feature | Partitioning | Bucketing |
| :--- | :--- | :--- |
| **Mechanism** | Creates subdirectories (`state=Tamilnadu/`) | Splits data into fixed hash-based files (`000000_0`, `000001_0`) |
| **Column Cardinality** | Best for low cardinality columns (e.g., State, Year, Department) | Best for high cardinality columns (e.g., ID, UserID, TransactionID) |
| **Query Benefit** | Eliminates unnecessary folder scans (Partition Pruning) | Optimizes Map-side joins and sampling |
| **Keyword** | `PARTITIONED BY (col_name datatype)` | `CLUSTERED BY (col_name) INTO n BUCKETS` |

### 2. Hive Configuration Flags
Always execute before dynamic partitioning and bucketing:
```sql
SET hive.exec.dynamic.partition = true;
SET hive.exec.dynamic.partition.mode = nonstrict;
SET hive.enforce.bucketing = true;
```

---

# Master Cheat Sheet: PySpark RDD vs DataFrame

### 1. Narrow vs. Wide Transformations
* **Narrow Transformation**: Output partition depends on only one input partition. No shuffle needed.
  * Examples: `map()`, `flatMap()`, `filter()`, `mapPartitions()`
* **Wide Transformation**: Output partition depends on multiple input partitions. Requires data shuffle across network.
  * Examples: `groupByKey()`, `reduceByKey()`, `distinct()`, `sortByKey()`, `join()`

### 2. Common RDD to DataFrame Pattern
```python
from pyspark.sql import SparkSession

spark = SparkSession.builder.appName("Demo").getOrCreate()
sc = spark.sparkContext

# RDD
rdd = sc.parallelize([(1, "Alice"), (2, "Bob")])

# Convert to DataFrame
df = rdd.toDF(["id", "name"])

# Register Temp View for SQL
df.createOrReplaceTempView("people")
spark.sql("SELECT * FROM people WHERE id = 1").show()
```

---

# Viva Voce High-Frequency Questions & Answers

### 1. What is the difference between Managed (Internal) and External Tables in Hive?
* **Managed Table**: Hive manages both metadata and data. When dropped, **both metadata and HDFS data files are permanently deleted**.
* **External Table**: Hive manages only metadata while pointing to an existing HDFS path. When dropped, **only metadata is deleted; the actual data in HDFS remains untouched**.

### 2. What is the role of `getmerge` in HDFS?
`hdfs dfs -getmerge <src-dir> <local-dst>` retrieves all files (such as MapReduce/Spark part-files `part-r-00000`, `part-r-00001`) from an HDFS directory, concatenates them into a single continuous stream, and writes them to a local destination file.

### 3. Why is `reduceByKey` preferred over `groupByKey` in Apache Spark?
`reduceByKey` performs **map-side aggregation (combiner)** locally on each partition before shuffling data across the network, drastically reducing network I/O. In contrast, `groupByKey` shuffles all raw key-value pairs across the network before grouping, causing massive memory overhead and disk spills.

### 4. What are lazy evaluations in Spark?
Transformations in Spark (like `map`, `filter`) are lazy; they are not executed immediately when called. Spark builds a Directed Acyclic Graph (DAG) of transformations. Execution is triggered only when an **Action** (such as `count()`, `collect()`, `show()`, `save()`) is invoked, allowing Spark's Catalyst Optimizer to optimize the entire pipeline.

### 5. What is the difference between static and dynamic partitioning in Hive?
* **Static Partitioning**: The user manually specifies the partition value in the INSERT query (e.g., `PARTITION (state='Tamilnadu')`). Used when loading data for a single known partition.
* **Dynamic Partitioning**: Hive automatically inspects the last column of the SELECT query and distributes rows into corresponding partition directories dynamically. Requires `SET hive.exec.dynamic.partition.mode=nonstrict`.
