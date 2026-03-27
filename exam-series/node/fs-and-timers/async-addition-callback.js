function addAsync(a, b, callback) {
  setTimeout(() => {
    callback(a + b);
  }, 1000);
}

addAsync(12, 8, (result) => {
  console.log("Sum:", result);
});
