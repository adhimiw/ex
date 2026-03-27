const mongoose = require("mongoose");

const uri = "mongodb://127.0.0.1:27017/collegeDB";

mongoose.connect(uri)
  .then(() => {
    console.log("MongoDB connected successfully");
    process.exit(0);
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err.message);
    process.exit(1);
  });
