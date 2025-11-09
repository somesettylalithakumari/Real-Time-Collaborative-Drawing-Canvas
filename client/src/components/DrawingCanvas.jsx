// import React, { useRef, useEffect, useState } from "react";
// import Toolbar from "./Toolbar";

// const DrawingCanvas = ({ socket, roomId }) => {
//   const canvasRef = useRef(null);
//   const ctxRef = useRef(null);
//   const [isDrawing, setIsDrawing] = useState(false);
//   const [color, setColor] = useState("black");
//   const [strokeWidth, setStrokeWidth] = useState(3);
//   const [tool, setTool] = useState("pencil");

//   // ✅ Initialize and resize canvas properly
//   useEffect(() => {
//     const canvas = canvasRef.current;
//     const ctx = canvas.getContext("2d");

//     const setCanvasSize = () => {
//       const parent = canvas.parentElement;
//       canvas.width = parent.offsetWidth * 0.95;
//       canvas.height = window.innerHeight * 0.7;
//       ctx.lineCap = "round";
//       ctx.lineJoin = "round";
//       ctx.strokeStyle = color;
//       ctx.lineWidth = strokeWidth;
//       ctxRef.current = ctx;
//     };

//     setCanvasSize();
//     window.addEventListener("resize", setCanvasSize);

//     return () => {
//       window.removeEventListener("resize", setCanvasSize);
//     };
//   }, []);

//   // ✅ Update context when color/tool/width changes
//   useEffect(() => {
//     if (!ctxRef.current) return;
//     ctxRef.current.strokeStyle = tool === "eraser" ? "white" : color;
//     ctxRef.current.lineWidth = strokeWidth;
//   }, [color, strokeWidth, tool]);

//   // ✅ Start drawing
//   const startDrawing = (e) => {
//     const { offsetX, offsetY } = e.nativeEvent;
//     const ctx = ctxRef.current;
//     ctx.beginPath();
//     ctx.moveTo(offsetX, offsetY);
//     setIsDrawing(true);

//     socket.emit("draw-start", { roomId, offsetX, offsetY, color, strokeWidth, tool });
//   };

//   // ✅ Draw as user moves mouse
//   const draw = (e) => {
//     if (!isDrawing) return;
//     const { offsetX, offsetY } = e.nativeEvent;
//     const ctx = ctxRef.current;
//     ctx.lineTo(offsetX, offsetY);
//     ctx.stroke();

//     socket.emit("draw-move", { roomId, offsetX, offsetY });
//   };

//   // ✅ Stop drawing
//   const stopDrawing = () => {
//     if (!isDrawing) return;
//     ctxRef.current.closePath();
//     setIsDrawing(false);
//     socket.emit("draw-end", { roomId });
//   };

//   // ✅ Local + socket-based clear
//   const handleClearCanvas = () => {
//     const canvas = canvasRef.current;
//     const ctx = ctxRef.current;
//     if (ctx && canvas) {
//       ctx.clearRect(0, 0, canvas.width, canvas.height);
//       socket.emit("clear-canvas", { roomId });
//     }
//   };

//   // ✅ Listen for remote draw events
//   useEffect(() => {
//     if (!socket) return;

//     const handleDrawStart = (data) => {
//       const ctx = ctxRef.current;
//       ctx.beginPath();
//       ctx.moveTo(data.offsetX, data.offsetY);
//       ctx.strokeStyle = data.tool === "eraser" ? "white" : data.color;
//       ctx.lineWidth = data.strokeWidth;
//     };

//     const handleDrawMove = (data) => {
//       const ctx = ctxRef.current;
//       ctx.lineTo(data.offsetX, data.offsetY);
//       ctx.stroke();
//     };

//     const handleDrawEnd = () => {
//       ctxRef.current.closePath();
//     };

//     const handleClear = () => {
//       const canvas = canvasRef.current;
//       const ctx = ctxRef.current;
//       ctx.clearRect(0, 0, canvas.width, canvas.height);
//     };

//     socket.on("draw-start", handleDrawStart);
//     socket.on("draw-move", handleDrawMove);
//     socket.on("draw-end", handleDrawEnd);
//     socket.on("clear-canvas", handleClear);

//     return () => {
//       socket.off("draw-start", handleDrawStart);
//       socket.off("draw-move", handleDrawMove);
//       socket.off("draw-end", handleDrawEnd);
//       socket.off("clear-canvas", handleClear);
//     };
//   }, [socket]);

//   return (
//     <div className="flex flex-col items-center justify-center w-full h-full bg-gray-50">
//       {/* Toolbar for color, tool, width, and clear */}
//       <Toolbar
//         color={color}
//         setColor={setColor}
//         strokeWidth={strokeWidth}
//         setStrokeWidth={setStrokeWidth}
//         onClear={handleClearCanvas}
//         tool={tool}
//         setTool={setTool}
//       />

//       {/* Single clean canvas */}
//       <canvas
//         ref={canvasRef}
//         className="border border-gray-400 bg-white mt-4 rounded-lg shadow-md cursor-crosshair w-11/12 h-[80vh]"
//         onMouseDown={startDrawing}
//         onMouseMove={draw}
//         onMouseUp={stopDrawing}
//         onMouseLeave={stopDrawing}
//       />
//     </div>
//   );
// };

// export default DrawingCanvas;


//#################################################
//#############################################################
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%55
//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$




import React, { useRef, useEffect, useState } from "react";

const DrawingCanvas = ({ socket, roomId, color, strokeWidth, tool, onClear }) => {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);

  // ✅ Initialize and resize canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const setCanvasSize = () => {
      const parent = canvas.parentElement;
      canvas.width = parent.offsetWidth * 0.95;
      canvas.height = window.innerHeight * 0.7;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.strokeStyle = color;
      ctx.lineWidth = strokeWidth;
      ctxRef.current = ctx;
    };

    setCanvasSize();
    window.addEventListener("resize", setCanvasSize);

    return () => {
      window.removeEventListener("resize", setCanvasSize);
    };
  }, []);

  // ✅ Update color/tool/width dynamically
  useEffect(() => {
    if (!ctxRef.current) return;
    ctxRef.current.strokeStyle = tool === "eraser" ? "white" : color;
    ctxRef.current.lineWidth = strokeWidth;
  }, [color, strokeWidth, tool]);

  // ✅ Drawing events
  const startDrawing = (e) => {
    const { offsetX, offsetY } = e.nativeEvent;
    const ctx = ctxRef.current;
    ctx.beginPath();
    ctx.moveTo(offsetX, offsetY);
    setIsDrawing(true);

    socket.emit("draw-start", { roomId, offsetX, offsetY, color, strokeWidth, tool });
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const { offsetX, offsetY } = e.nativeEvent;
    const ctx = ctxRef.current;
    ctx.lineTo(offsetX, offsetY);
    ctx.stroke();

    socket.emit("draw-move", { roomId, offsetX, offsetY });
  };

  const stopDrawing = () => {
    if (!isDrawing) return;
    ctxRef.current.closePath();
    setIsDrawing(false);
    socket.emit("draw-end", { roomId });
  };

  // ✅ Local clear function
  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;
    if (ctx && canvas) ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  // ✅ Listen for remote draw events
  useEffect(() => {
    if (!socket) return;

    const handleDrawStart = (data) => {
      const ctx = ctxRef.current;
      ctx.beginPath();
      ctx.moveTo(data.offsetX, data.offsetY);
      ctx.strokeStyle = data.tool === "eraser" ? "white" : data.color;
      ctx.lineWidth = data.strokeWidth;
    };

    const handleDrawMove = (data) => {
      const ctx = ctxRef.current;
      ctx.lineTo(data.offsetX, data.offsetY);
      ctx.stroke();
    };

    const handleDrawEnd = () => ctxRef.current.closePath();
    const handleClear = () => clearCanvas();

    socket.on("draw-start", handleDrawStart);
    socket.on("draw-move", handleDrawMove);
    socket.on("draw-end", handleDrawEnd);
    socket.on("clear-canvas", handleClear);

    return () => {
      socket.off("draw-start", handleDrawStart);
      socket.off("draw-move", handleDrawMove);
      socket.off("draw-end", handleDrawEnd);
      socket.off("clear-canvas", handleClear);
    };
  }, [socket]);

  // ✅ Clear canvas when parent requests
  useEffect(() => {
    if (onClear) onClear.current = clearCanvas;
  }, [onClear]);

  return (
    <div className="flex justify-center items-center w-full h-full bg-gray-50">
      <canvas
        ref={canvasRef}
        className="border border-gray-400 bg-white mt-4 rounded-lg shadow-md cursor-crosshair w-11/12 h-[80vh]"
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
      />
    </div>
  );
};

export default DrawingCanvas;



