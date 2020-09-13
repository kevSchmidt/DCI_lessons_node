//  =========== MODULES ===

console.log(require("module").wrapper); // wrapper function that contain our code

// module.exports
const C = require("./test-module-1");
const calc1 = new C();
console.log(calc1.add(2, 5));

// exports
const { add, multi, divide } = require("./test-module-2");
console.log(multi(2, 5));

// caching
require("./test-module-3")();
require("./test-module-3")();
require("./test-module-3")();
