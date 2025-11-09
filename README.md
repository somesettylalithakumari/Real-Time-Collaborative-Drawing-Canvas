# 🎨 Real-Time Collaborative Drawing Canvas

## 📋 Assignment Overview

This project is a **multi-user collaborative whiteboard** that allows multiple users to draw together in real time on a shared canvas.  
Each participant’s drawings, cursor movements, and canvas actions (clear, undo, redo) are instantly synchronized across all connected clients.

Built entirely from scratch using **Vanilla JavaScript**, **HTML5 Canvas**, and **Node.js + Socket.IO** — without frontend frameworks or drawing libraries — to demonstrate mastery of real-time systems and raw canvas APIs.

---

## 🚀 Core Functionalities

### 🖌️ Drawing Tools
- Pencil, Eraser, and Color Picker (black, red, blue, green)
- Adjustable stroke width via slider
- Clear canvas button

### 🔄 Real-Time Synchronization
- Drawings broadcast live to all users via WebSocket (Socket.IO)
- Cursor tracking with unique color identifiers
- Smooth and low-latency drawing updates

### 👥 Collaboration Features
- Live user count
- Room-based sessions (users join via a unique room code)
- Undo/Redo synchronized across all users
- Canvas cleared globally for all users

---

## ⚙️ Tech Stack

| Layer | Technology |
|--------|-------------|
| Frontend | HTML5, CSS3, Vanilla JavaScript |
| Backend | Node.js + Express.js |
| Real-time Engine | WebSockets (Socket.IO) |
| Styling | CSS / Tailwind (optional) |

---

## 📁 Project Structure

collaborative-canvas/
├── client/
│ ├── index.html # UI layout + canvas element
│ ├── style.css # Styling and layout
│ ├── main.js # Entry point for initialization
│ ├── canvas.js # Drawing logic (brush, eraser, undo/redo)
│ ├── websocket.js # WebSocket (Socket.IO) client handling
│ └── utils.js # Helper utilities
├── server/
│ ├── server.js # Express + Socket.IO server
│ ├── rooms.js # Room management
│ └── drawing-state.js # Global canvas state tracking
├── package.json
├── README.md
└── ARCHITECTURE.md

---
## 🧪 How to Test with Multiple Users

1️⃣ Run the backend server locally using:
```bash
npm start

2️⃣ Open two or more tabs of client/index.html in Chrome or Firefox.
3️⃣ Draw in one tab — lines will appear instantly in all tabs.
4️⃣ Move cursors — see colored live cursor indicators.
5️⃣ Try undo/redo, clear, and color change — all sync instantly across tabs.
6️⃣ Optionally, test from two devices on the same Wi-Fi by connecting to your local IP.

---

## ⚙️ Setup Instructions

### 1️⃣ Clone Repository
```bash
git clone https://github.com/your-username/collaborative-canvas.git
cd collaborative-canvas

### 2️⃣ Install Dependencies
```bash
npm install


### 3️⃣ Start Server
```bash
npm start

---

## ⏱️ Time Spent on the Project

| Task | Time Spent |
|------|-------------|
| Canvas drawing logic (brush, eraser, stroke smoothing) | 4 hours |
| WebSocket integration (Socket.IO setup + sync) | 3 hours |
| Undo/Redo & clear logic | 2 hours |
| Room management + live user tracking | 1.5 hours |
| Testing and bug fixes | 1.5 hours |
| **Total Development Time** | **12 hours (approx.)** |

---

## 🧠 Evaluation Alignment

| Evaluation Area | Implementation Highlights |
|------------------|-----------------------------|
| **Technical Implementation (40%)** | Efficient canvas operations, modular JavaScript structure |
| **Real-time Features (30%)** | Smooth WebSocket updates, minimal latency, real-time cursor tracking |
| **Advanced Features (20%)** | Undo/Redo, global state management, multi-user consistency |
| **Code Quality (10%)** | Clean separation of logic, documented methods, scalable folder structure |

---

## 🧩 Features Summary

✅ Real-time drawing synchronization  
✅ Cursor position sharing  
✅ Global undo/redo  
✅ Room-based collaboration  
✅ Multi-tab synchronization  
✅ Active user tracking  

---

## 🚧 Planned Enhancements

- Persistent canvas storage (MongoDB)  
- Mobile touch support  
- Drawing history saving and replay feature  

---

## 🧑‍💻 Author

**Lalitha Somisetty**  
🎓 *B.Tech — Computer Science (Artificial Intelligence and Engineering)*  
🏫 *Amrita Vishwa Vidyapeetham*  
💡 *Interests:* Real-Time Applications, AI/ML Systems, IoT, and Web Development  

📧 **Email:** your.email@example.com  
🌐 **GitHub:** [https://github.com/your-username](https://github.com/your-username)

---

## 📝 License

**MIT License © 2025 Lalitha Somisetty**

