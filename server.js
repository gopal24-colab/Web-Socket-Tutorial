const http = require("http");
const express = require("express");
const path = require("path");
const app = express();
const PORT = 3000;
const server = http.createServer(app);

const { Server } = require("socket.io");
// # Socket.io connection
const io = new Server(server);
io.on("connection", (socket) => {
  console.log("A new socket connection is established", socket.id);
  socket.on("broadcast", (message) => {
    io.emit("active-broadcast", message);
  });
});

app.use(express.static(path.resolve("./public")));

app.get("/", (req, res) => {
  res.sendFile("./public/index.html");
});

server.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
