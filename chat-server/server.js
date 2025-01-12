const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

// initialize the app
const app = express();
app.use(cors);

// initialize server
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

// real-time connection handler
io.on("connection", (socket) => {
  console.log("User conected: ", socket.id);

  //listener
  socket.on("send_message", (data) => {
    io.emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log("Disconnected user: ", socket.id);
  });
});

const PORT = 4000;
server.listen(PORT, () => {
  console.log("Server runnin on port: ", PORT);
});
