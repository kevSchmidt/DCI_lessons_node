console.log("Hello from the module"); // this is only call once when loaded
module.exports = () => console.log("Log this beautiful text 😘"); // this is call 3 times (caching)
