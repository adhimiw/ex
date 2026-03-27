const fs = require("fs");

const name = process.argv[2] || "Student";
const message = `Welcome, ${name}! Have a great day.`;

fs.writeFile("welcome.txt", message, (err) => {
  if (err) {
    console.error("Failed to write file:", err.message);
    return;
  }
  console.log(message);
});
