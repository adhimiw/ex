const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/collegeDB")
  .then(() => console.log("Mongo connected"))
  .catch((err) => console.error(err.message));

const studentSchema = new mongoose.Schema({
  name: String,
  course: String,
  college: String
});

const Student = mongoose.model("Student", studentSchema);

app.post("/students", async (req, res) => {
  const student = await Student.create(req.body);
  res.status(201).json(student);
});

app.get("/students", async (req, res) => {
  const students = await Student.find();
  res.json(students);
});

app.listen(4000, () => {
  console.log("Server running on http://localhost:4000");
});
