// const roomUsers = {}; // Track connected users per room

// export const socketHandlers = (io) => {
//   io.on("connection", (socket) => {
//     console.log("🟢 New connection:", socket.id);

//     socket.on("join-room", (roomId) => {
//       if (!roomId) return;

//       if (socket.roomId === roomId) {
//         console.log(`Socket ${socket.id} already in room ${roomId}`);
//         return;
//       }

//       socket.roomId = roomId;
//       socket.join(roomId);

//       if (!roomUsers[roomId]) roomUsers[roomId] = new Set();
//       roomUsers[roomId].add(socket.id);

//       const count = roomUsers[roomId].size;
//       console.log(`👤 User ${socket.id} joined room ${roomId} (count: ${count})`);
//       io.to(roomId).emit("user-count", count);
//     });

//     // Drawing events
//     socket.on("draw-start", (data) => socket.to(data.roomId).emit("draw-start", data));
//     socket.on("draw-move", (data) => socket.to(data.roomId).emit("draw-move", data));
//     socket.on("draw-end", (data) => socket.to(data.roomId).emit("draw-end", data));

//     // Clear canvas event
//     socket.on("clear-canvas", ({ roomId }) => {
//       console.log(`🧹 Canvas cleared in room ${roomId}`);
//       io.to(roomId).emit("clear-canvas");
//     });

//     // Cursor sync (optional)
//     socket.on("cursor-move", (data) => {
//       socket.to(data.roomId).emit("cursor-update", data);
//     });

//     // Handle disconnection
//     socket.on("disconnect", () => {
//       const { roomId } = socket;
//       if (roomId && roomUsers[roomId]) {
//         roomUsers[roomId].delete(socket.id);
//         if (roomUsers[roomId].size === 0) delete roomUsers[roomId];
//         const count = roomUsers[roomId]?.size || 0;
//         io.to(roomId).emit("user-count", count);
//       }
//       console.log("🔴 Disconnected:", socket.id);
//     });
//   });
// };



const roomUsers = {}; // To track users in each room

export const socketHandlers = (io) => {
  io.on("connection", (socket) => {
    console.log("🟢 New client connected:", socket.id);
    console.log("🌍 Total connected sockets:", io.engine.clientsCount);

    // When user joins a room
    socket.on("join-room", (roomId) => {
      if (!roomId) return;

      socket.join(roomId);
      socket.roomId = roomId;

      if (!roomUsers[roomId]) roomUsers[roomId] = new Set();
      roomUsers[roomId].add(socket.id);

      const count = roomUsers[roomId].size;
      console.log(`👥 Room "${roomId}" now has ${count} user(s):`, [
        ...roomUsers[roomId],
      ]);

      io.to(roomId).emit("user-count", count);
    });

    // Drawing events
    socket.on("draw-start", (data) =>
      socket.to(data.roomId).emit("draw-start", data)
    );
    socket.on("draw-move", (data) =>
      socket.to(data.roomId).emit("draw-move", data)
    );
    socket.on("draw-end", (data) =>
      socket.to(data.roomId).emit("draw-end", data)
    );

    // Clear canvas event
    socket.on("clear-canvas", ({ roomId }) => {
      console.log(`🧹 Canvas cleared in room ${roomId}`);
      io.to(roomId).emit("clear-canvas");
    });

    // Handle disconnection
    socket.on("disconnect", () => {
      const { roomId } = socket;
      if (roomId && roomUsers[roomId]) {
        roomUsers[roomId].delete(socket.id);
        if (roomUsers[roomId].size === 0) delete roomUsers[roomId];
        const count = roomUsers[roomId]?.size || 0;
        io.to(roomId).emit("user-count", count);
      }
      console.log(`🔴 Disconnected: ${socket.id}`);
      console.log("🌍 Remaining sockets:", io.engine.clientsCount);
    });
  });
};
