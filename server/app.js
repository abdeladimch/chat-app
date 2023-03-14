require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const http = require("http");
const PORT = process.env.PORT || 3001;
const { Server } = require("socket.io");

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("User connected", socket.id);
  socket.on("join_room", (roomId) => {
    socket.join(roomId);
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected", socket.id);
  });
});

app.use(cors());

app.get("/", (req, res) => {
  res.status(200).json({ status: "Success!", msg: "Welcome to chatapp api!" });
});

server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
