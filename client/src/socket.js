// import { io } from 'socket.io-client';

// let socket;

// export const getSocket = () => {
//   if (!socket) {
//     socket = io(import.meta.env.VITE_BACKEND_URL, {
//       transports: ['websocket'],
//     });
//   }
//   return socket;
// };
// client/src/socket.js


////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////

// import { io } from "socket.io-client";

// const URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

// export function getSocket() {
//   const socket = io(URL, { transports: ["websocket"], reconnection: true });

//   socket.on("connect", () => {
//     console.log("🔌 Socket connected:", socket.id);
//   });

//   socket.on("connect_error", (err) => {
//     console.error("❌ Socket connection error:", err.message);
//   });

//   return socket;
// }

import { io } from "socket.io-client";

const URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

let socket;

export function getSocket() {
  if (!socket) {
    socket = io(URL, { transports: ["websocket"], reconnection: true });
    socket.on("connect", () => console.log("🔌 Socket connected:", socket.id));
    socket.on("connect_error", (err) => console.error("❌ Socket error:", err.message));
  }
  return socket;
}

