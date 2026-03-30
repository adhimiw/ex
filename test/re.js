const fs = require("fs");
const name = process.argv[2] || "User";

// Read file
fs.readFile("sample.txt", "utf8", (err, data) => {
  if (err) console.log("Read Error:", err.message);
  else console.log("File Content:\n" + data);
});

// Write file
let msg = `Welcome ${name}`;
fs.writeFile("welcome.txt", msg, (err) => {
  if (err) console.log("Write Error:", err.message);
  else {
    console.log(msg);
    console.log("Written to welcome.txt");
  }
});


console.log("Execution Started");

setTimeout(() => {
    console.log("Delayed Message");
}, 3000);

console.log("Execution Ended");

const express = require('express');
const app = express();

app.get('/', (req, res) => {
    let username = req.query.username;
    res.send("Username: " + username);
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});

function add(a, b, callback) {
    setTimeout(() => {
        callback(a + b);
    }, 1000);
}

add(5, 3, (result) => {
    console.log("Sum:", result);
});

const express = require('express');
const app = express();

app.get('/students', (req, res) => {
    res.json([
        { name: "Adhi", age: 21 },
        { name: "John", age: 22 }
    ]);
});

app.listen(3000, () => {
    console.log("Server running");
});

MongoDB Shell Commands
List databases
show dbs
Switch to database
use school
Create collection
db.createCollection("students")
Insert document
db.students.insertOne({name:"Adhi", age:21})
Update document
db.students.updateOne(
  {name:"Adhi"},
  {$set:{age:22}}
)
Delete document
db.students.deleteOne({name:"Adhi"})
Drop collection
db.students.drop()