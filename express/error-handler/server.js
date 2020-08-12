const http = require("http");
const app = require("./app");

const PORT = process.env.PORT || 3000;

// ===== Create and listen to server ===
const server = http.createServer(app);
server.listen(PORT);
