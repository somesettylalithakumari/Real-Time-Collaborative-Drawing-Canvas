
// import express from "express";
// import dotenv from "dotenv";
// import cors from "cors";
// import http from "http";
// import { Server } from "socket.io";
// import ConnectionDB from "./db/db.js";
// import mainRoute from "./routes/main.routes.js";
// import {socketHandlers} from "./socket/socketHandlers.js";

// // ConnectionDB();
// dotenv.config();

// const app = express();
// const server = http.createServer(app);
// const io = new Server(server, {
//   cors: {
//     origin: '*',
//     methods: ['GET', 'POST'],
//     credentials:true
//   }
// });

// // Middleware
// app.use(cors());
// app.use(express.json());

// // API Routes

// app.use("/api/v1", mainRoute);

// // Default Route
// app.get("/", (req, res) => {
//   res.json({ message: "server is ready" });
// });

// // Socket.IO setup
// socketHandlers(io);

// // Start server
// server.listen(process.env.PORT, () => {
//   console.log(`server is running at ${process.env.PORT}`);
// });







// import express from "express";
// import dotenv from "dotenv";
// import cors from "cors";
// import http from "http";
// import { Server } from "socket.io";
// import { socketHandlers } from "./socket/socketHandlers.js";

// // Load environment variables
// dotenv.config();

// const app = express();
// const server = http.createServer(app);

// // ✅ Allow frontend (Vite dev server)
// const io = new Server(server, {
//   cors: {
//     origin: "http://localhost:5173", // Make sure frontend runs here
//     methods: ["GET", "POST"],
//   },
// });

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Default API route
// app.get("/", (req, res) => {
//   res.json({ message: "Server is running successfully 🚀" });
// });

// // Initialize Socket.io handlers
// socketHandlers(io);

// // Start backend server
// const PORT = process.env.PORT || 5000;
// server.listen(PORT, () => {
//   console.log(`✅ Server running on port ${PORT}`);
// });




import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // during local testing
    methods: ["GET", "POST"],
  },
});

// ✅ Store users per room
const activeUsers = {};

io.on("connection", (socket) => {
  console.log("🟢 A user connected:", socket.id);

  socket.on("join-room", (roomId) => {
    socket.join(roomId);
    if (!activeUsers[roomId]) activeUsers[roomId] = new Set();
    activeUsers[roomId].add(socket.id);

    const userCount = activeUsers[roomId].size;
    console.log(`👥 Room "${roomId}" now has ${userCount} user(s)`);

    // Notify everyone in the room
    io.to(roomId).emit("active-users", userCount);
  });

  socket.on("disconnecting", () => {
    for (const roomId of socket.rooms) {
      if (activeUsers[roomId]) {
        activeUsers[roomId].delete(socket.id);
        const userCount = activeUsers[roomId].size;
        io.to(roomId).emit("active-users", userCount);
      }
    }
  });

  // ✅ Drawing events
  socket.on("draw-start", (data) => socket.to(data.roomId).emit("draw-start", data));
  socket.on("draw-move", (data) => socket.to(data.roomId).emit("draw-move", data));
  socket.on("draw-end", (data) => socket.to(data.roomId).emit("draw-end", data));
  socket.on("clear-canvas", (data) => socket.to(data.roomId).emit("clear-canvas", data));
});

const PORT = 5000;
server.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
