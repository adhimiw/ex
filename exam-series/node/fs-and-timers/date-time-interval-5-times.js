let count = 0;

const timer = setInterval(() => {
  count++;
  const now = new Date();
  console.log(`Run ${count}: ${now.toLocaleString()}`);

  if (count === 5) {
    clearInterval(timer);
    console.log("Timer stopped after 5 runs");
  }
}, 2000);
