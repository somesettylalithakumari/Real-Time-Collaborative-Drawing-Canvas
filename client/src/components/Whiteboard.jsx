// import React, { useEffect, useRef, useState } from "react";
// import { useParams } from "react-router-dom";
// import DrawingCanvas from "./DrawingCanvas";
// import Toolbar from "./Toolbar";
// import { getSocket } from "../socket.js";

// const Whiteboard = () => {
//   const { roomId } = useParams();
//   const [userCount, setUserCount] = useState(1);
//   const [color, setColor] = useState("black");
//   const [strokeWidth, setStrokeWidth] = useState(2);
//   const [tool, setTool] = useState("pencil");

//   const socketRef = useRef(null);
//   const hasJoinedRef = useRef(false);
//   const clearCanvasRef = useRef(null); // to trigger clear from Toolbar

//   useEffect(() => {
//     socketRef.current = getSocket();

//     if (roomId && !hasJoinedRef.current) {
//       socketRef.current.emit("join-room", roomId);
//       hasJoinedRef.current = true;
//     }

//     const handleUserCount = (count) => setUserCount(count);
//     socketRef.current.on("user-count", handleUserCount);

//     return () => socketRef.current.off("user-count", handleUserCount);
//   }, [roomId]);

//   // ✅ Clear canvas for all
//   const handleClearCanvas = () => {
//     if (clearCanvasRef.current) clearCanvasRef.current(); // local clear
//     socketRef.current.emit("clear-canvas", { roomId }); // broadcast to others
//   };

//   return (
//     <div className="w-screen h-screen flex flex-col items-center bg-gray-100">
//       <div className="w-full p-4 bg-gray-300 flex items-center justify-between shadow-md text-center">
//         <h1 className="text-xl text-blue-950 font-semibold">
//           RoomId: <span className="text-gray-500">{roomId}</span>
//         </h1>
//         <p className="text-sm text-gray-700">Active users: {userCount}</p>
//       </div>

//       <Toolbar
//         color={color}
//         setColor={setColor}
//         strokeWidth={strokeWidth}
//         setStrokeWidth={setStrokeWidth}
//         onClear={handleClearCanvas}
//         tool={tool}
//         setTool={setTool}
//       />

//       <DrawingCanvas
//         socket={socketRef.current}
//         roomId={roomId}
//         color={color}
//         strokeWidth={strokeWidth}
//         tool={tool}
//         onClear={clearCanvasRef}
//       />
//     </div>
//   );
// };

// export default Whiteboard;
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import DrawingCanvas from "./DrawingCanvas";
import Toolbar from "./Toolbar";
import { getSocket } from "../socket.js";

const Whiteboard = () => {
  const { roomId } = useParams();
  const [userCount, setUserCount] = useState(1);
  const [color, setColor] = useState("black");
  const [strokeWidth, setStrokeWidth] = useState(2);
  const [tool, setTool] = useState("pencil");

  const socketRef = useRef(null);
  const hasJoinedRef = useRef(false);
  const clearCanvasRef = useRef(null);

  useEffect(() => {
    // ✅ Create a single socket instance
    socketRef.current = getSocket();
    const socket = socketRef.current;

    // ✅ Log when connected
    socket.on("connect", () => {
      console.log("✅ Connected with ID:", socket.id);

      // ✅ Join room only after connection
      if (roomId && !hasJoinedRef.current) {
        console.log("🚀 Joining room:", roomId);
        socket.emit("join-room", roomId);
        hasJoinedRef.current = true;
      }
    });

    // ✅ Listen for user count updates
    const handleUserCount = (count) => {
      console.log("👥 Active users update:", count);
      setUserCount(count);
    };
    socket.on("user-count", handleUserCount);

    // ✅ Clean up
    return () => {
      socket.off("connect");
      socket.off("user-count", handleUserCount);
      socket.disconnect();
    };
  }, [roomId]);

  // ✅ Clear canvas for all users
  const handleClearCanvas = () => {
    if (clearCanvasRef.current) clearCanvasRef.current();
    socketRef.current.emit("clear-canvas", { roomId });
  };

  return (
    <div className="w-screen h-screen flex flex-col items-center bg-gray-100">
      <div className="w-full p-4 bg-gray-300 flex items-center justify-between shadow-md text-center">
        <h1 className="text-xl text-blue-950 font-semibold">
          RoomId: <span className="text-gray-500">{roomId}</span>
        </h1>
        <p className="text-sm text-gray-700">Active users: {userCount}</p>
      </div>

      <Toolbar
        color={color}
        setColor={setColor}
        strokeWidth={strokeWidth}
        setStrokeWidth={setStrokeWidth}
        onClear={handleClearCanvas}
        tool={tool}
        setTool={setTool}
      />

      <DrawingCanvas
        socket={socketRef.current}
        roomId={roomId}
        color={color}
        strokeWidth={strokeWidth}
        tool={tool}
        onClear={clearCanvasRef}
      />
    </div>
  );
};

export default Whiteboard;
