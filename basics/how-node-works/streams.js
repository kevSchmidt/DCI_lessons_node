// ========== STREAMS ===

const fs = require("fs");
const server = require("http").createServer();

server.on("request", (req, res) => {
  // ===== Load the entire file in memory before ready ===
  // fs.readFile("test-file.txt", (err, data) => {
  //   if (err) console.log(err);
  //   res.end(data);
  // });

  // ===== Streams without pipe (back-pressure) ===
  //   const readable = fs.createReadStream("test-file.txt");
  //   readable.on("data", (chunck) => {
  //     //   start streaming
  //     res.write(chunck);
  //   });
  //   readable.on("end", () => {
  //     //   stop streaming
  //     res.end();
  //   });
  //   readable.on("error", (err) => {
  //     //   error message
  //     console.log(err);
  //     res.statusCode = 500;
  //     res.end("File not found!");
  //   });

  // ===== Streams with pipe ===
  const readable = fs.createReadStream("test-file.txt");
  readable.pipe(res);
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Listening...");
});
