const { MongoClient } = require("mongodb");
const readline = require("readline");

const url = "mongodb://127.0.0.1:27017";
const client = new MongoClient(url);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

async function main() {
  await client.connect();
  console.log("Connected to MongoDB");

  const db = client.db("school");
  const students = db.collection("students");

  function menu() {
    console.log("\n--- MENU ---");
    console.log("1. Insert");
    console.log("2. Read");
    console.log("3. Update");
    console.log("4. Delete");
    console.log("5. Exit");

    rl.question("Enter choice: ", async (choice) => {

      if (choice == 1) {
        rl.question("Enter name: ", async (name) => {
          rl.question("Enter age: ", async (age) => {
            await students.insertOne({ name: name, age: parseInt(age) });
            console.log("Inserted");
            menu();
          });
        });

      } else if (choice == 2) {
        const data = await students.find().toArray();
        console.log("Students:", data);
        menu();

      } else if (choice == 3) {
        rl.question("Enter name to update: ", async (name) => {
          rl.question("Enter new age: ", async (age) => {
            await students.updateOne(
              { name: name },
              { $set: { age: parseInt(age) } }
            );
            console.log("Updated");
            menu();
          });
        });

      } else if (choice == 4) {
        rl.question("Enter name to delete: ", async (name) => {
          await students.deleteOne({ name: name });
          console.log("Deleted");
          menu();
        });

      } else if (choice == 5) {
        console.log("Exiting...");
        rl.close();
        client.close();

      } else {
        console.log("Invalid choice");
        menu();
      }

    });
  }

  menu();
}

main();