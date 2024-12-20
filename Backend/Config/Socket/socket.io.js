const { Server } = require("socket.io");

let io;

const configSocket = (httpServer) => {
  io = new Server(httpServer, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("Connected with socket", socket.id);

    socket.on("disconnect", (reason) => {
      console.log(`Socket ${socket.id} disconnected: ${reason}`);
    });
  });
};

const getIO = () => {
  if (!io) {
    console.error("Socket.io not initialized!");
    throw new Error("Socket.io not initialized!");
  }
  return io;
};

module.exports = { configSocket, getIO };
