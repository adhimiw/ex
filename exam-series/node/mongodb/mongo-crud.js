const { MongoClient, ObjectId } = require("mongodb");

const uri = "mongodb://127.0.0.1:27017";
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    const db = client.db("collegeDB");
    const students = db.collection("students");

    const insertResult = await students.insertOne({
      name: "Adit",
      course: "MCA",
      age: 22
    });
    console.log("Inserted ID:", insertResult.insertedId);

    const allStudents = await students.find().toArray();
    console.log("Read:", allStudents);

    await students.updateOne(
      { _id: new ObjectId(insertResult.insertedId) },
      { $set: { course: "MERN Stack" } }
    );
    console.log("Update complete");

    await students.deleteOne({ _id: new ObjectId(insertResult.insertedId) });
    console.log("Delete complete");
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
}

run();
