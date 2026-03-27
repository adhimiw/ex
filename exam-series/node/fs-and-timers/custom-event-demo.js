const EventEmitter = require("events");

const emitter = new EventEmitter();

emitter.on("userRegistered", (username) => {
  console.log(`Event received: ${username} successfully registered.`);
});

emitter.emit("userRegistered", "Adit");
