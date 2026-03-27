const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");

const app = express();
app.use(express.json());

const client = new MongoClient("mongodb://127.0.0.1:27017");
let collection;

async function bootstrap() {
  await client.connect();
  collection = client.db("collegeDB").collection("students");
  console.log("Connected to MongoDB");
}

app.post("/students", async (req, res) => {
  const result = await collection.insertOne(req.body);
  res.status(201).json({ insertedId: result.insertedId });
});

app.get("/students", async (req, res) => {
  res.json(await collection.find().toArray());
});

app.put("/students/:id", async (req, res) => {
  const id = req.params.id;
  await collection.updateOne({ _id: new ObjectId(id) }, { $set: req.body });
  res.json({ message: "Updated" });
});

app.delete("/students/:id", async (req, res) => {
  const id = req.params.id;
  await collection.deleteOne({ _id: new ObjectId(id) });
  res.json({ message: "Deleted" });
});

bootstrap().then(() => {
  app.listen(5000, () => console.log("CRUD server at http://localhost:5000"));
});
