const express = require("express");

const app = express();
const PORT = 3001;

app.get("/", (req, res) => {
  const username = req.query.username || "Guest";
  res.send(`Received username: ${username}`);
});

app.listen(PORT, () => {
  console.log(`Query server at http://localhost:${PORT}`);
});
