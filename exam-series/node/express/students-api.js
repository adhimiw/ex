const express = require("express");

const app = express();
const PORT = 3000;

app.get("/students", (req, res) => {
  const students = [
    { id: 1, name: "Adit", course: "MERN" },
    { id: 2, name: "Riya", course: "AI" },
    { id: 3, name: "Kunal", course: "Cloud" }
  ];
  res.json(students);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
