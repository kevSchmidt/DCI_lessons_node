// ========== EVENT LOOP IN NODE.JS ===

const fs = require("fs");
const crypto = require("crypto");

const start = Date.now();
process.env.UV_THREADPOOL_SIZE = 2; //  Changing the thread pool size (4 by default)

setTimeout(() => console.log("Timer 1 finished"), 0); // top-level code => executed first
setImmediate(() => console.log("Immediate 1 finished")); // also top-level code

fs.readFile("test-file.txt", () => {
  console.log("I/O finished"); // also top-level code
  console.log("------------");

  setTimeout(() => console.log("Timer 2 finished"), 0); // code in callback => I/O executed after
  setTimeout(() => console.log("Timer 3 finished"), 3000); // same but with 3s delay
  setImmediate(() => console.log("Immediate 2 finished")); // appear before I/O when queue is empty

  process.nextTick(() => console.log("Process.nextTick")); // micro task queue => run before all loop phase

  // We generate an heavy task to send it to the thread pool
  // Ex: with 4 thread pool => all take the same time, with 2 => they arrive 2 by 2
  crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
    console.log(Date.now() - start, "Password encrypted");
  });
  crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
    console.log(Date.now() - start, "Password encrypted");
  });
  crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
    console.log(Date.now() - start, "Password encrypted");
  });
  crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
    console.log(Date.now() - start, "Password encrypted");
  });
});

console.log("Hello from the top-level code"); // also top-level code
