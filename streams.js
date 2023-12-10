const { createReadStream } = require("fs");
const { join } = require("path");
const { createServer } = require("http");

const port = 3000;

const server = createServer((req, res) => {
  const { url, method } = req;

  if (url === "/" && method === "GET") {
    res.setHeader("Content-Type", "text/html");
    const readStream = createReadStream(join(__dirname, "./public/index.html"));

    readStream.on("error", (err) => {
      console.error(err);
      res.statusCode = 500;
      res.end = "Internal Server Error";
    });

    readStream.pipe(res);
  } else {
    res.statusCode = 404;
    res.setHeader("Content-Type", "text/html");
    const readStream = createReadStream(
      join(__dirname, "./public/notFound404.html")
    );
    readStream.on("error", (err) => {
      console.error(err);
      res.statusCode = 500;
      res.end("Internal Server Error");
    });

    readStream.pipe(res);
  }
});

server.listen(port, () => console.log("Server listening on " + port + "..."));
