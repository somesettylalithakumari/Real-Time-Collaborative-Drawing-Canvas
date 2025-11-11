#  Real-Time Collaborative Drawing Canvas

## Assignment Overview

This project is a **multi-user collaborative whiteboard** that allows multiple users to draw together in real time on a shared canvas.  
Each participant’s drawings, cursor movements, and canvas actions (clear, undo, redo) are instantly synchronized across all connected clients.

Built entirely from scratch using **Vanilla JavaScript**, **HTML5 Canvas**, and **Node.js + Socket.IO** — without frontend frameworks or drawing libraries — to demonstrate mastery of real-time systems and raw canvas APIs.

---

##  Core Functionalities

###  Drawing Tools
- Pencil, Eraser, and Color Picker (black, red, blue, green)
- Adjustable stroke width via slider
- Clear canvas button

###  Real-Time Synchronization
- Drawings broadcast live to all users via WebSocket (Socket.IO)
- Cursor tracking with unique color identifiers
- Smooth and low-latency drawing updates

###  Collaboration Features
- Live user count
- Room-based sessions (users join via a unique room code)
- Undo/Redo synchronized across all users
- Canvas cleared globally for all users

---

##  Tech Stack

| Layer | Technology |
|--------|-------------|
| Frontend | HTML5, CSS3, Vanilla JavaScript |
| Backend | Node.js + Express.js |
| Real-time Engine | WebSockets (Socket.IO) |
| Styling | CSS / Tailwind (optional) |

---

##  Project Structure

```bash
collaborative-canvas/
├── client/
│   ├── index.html          
│   ├── style.css           
│   ├── main.js             
│   ├── canvas.js           
│   ├── websocket.js        
│   └── utils.js            
├── server/
│   ├── server.js           
│   ├── rooms.js            
│   └── drawing-state.js    
├── package.json
├── README.md
└── ARCHITECTURE.md
```
---

##  How to Test with Multiple Users

1️ Run the backend server locally using:
```bash
npm start
```


2️ Open two or more tabs of client/index.html in Chrome or Firefox.  . <br>
3️ Draw in one tab — lines will appear instantly in all tabs.<br>
4️ Move cursors — see colored live cursor indicators.  <br>
5️ Try undo/redo, clear, and color change — all sync instantly across tabs.  <br>
6️ Optionally, test from two devices on the same Wi-Fi by connecting to your local IP.  <br>

---

## ⚙️ Setup Instructions

###  Clone Repository
git clone https://github.com/your-username/collaborative-canvas.git
cd collaborative-canvas

###  Install Dependencies
npm install


###  Start Server
npm start

---




## Time Spent on the Project

| Task | Time Spent |
|------|-------------|
| Canvas drawing logic (brush, eraser, stroke smoothing) | 1 hours |
| WebSocket integration (Socket.IO setup + sync) | 1hours |
| Undo/Redo & clear logic | 1 hours |
| Room management + live user tracking | 1.5 hours |
| Testing and bug fixes | 1.5 hours |
| **Total Development Time** | **6 hours (approx.)** |

---

## Evaluation Alignment

| Evaluation Area | Implementation Highlights |
|------------------|-----------------------------|
| Technical Implementation  | Efficient canvas operations, modular JavaScript structure |
| Real-time Features  | Smooth WebSocket updates, minimal latency, real-time cursor tracking |
| Advanced Features  | Undo/Redo, global state management, multi-user consistency |
| Code Quality  | Clean separation of logic, documented methods, scalable folder structure |

---

## Features Summary

 Real-time drawing synchronization  
 Cursor position sharing  
 Global undo/redo  
 Room-based collaboration  
 Multi-tab synchronization  
 Active user tracking  

---
##  Planned Enhancements

- Persistent canvas storage (MongoDB)  
- Mobile touch support  
- Drawing history saving and replay feature  


---
## Author

**Lalitha Somisetty**  
 *B.Tech — Computer Science (Artificial Intelligence and Engineering)*  
 *Amrita Vishwa Vidyapeetham*  
 *Interests:* Real-Time Applications, AI/ML Systems, IoT, and Web Development  

 **Email:** slalithakumari15@gmail.com
 **GitHub:** [https://github.com/somesettylalithakumari](https://github.com/somesettylalithakumari)

---

##  License

**MIT License © 2025 Lalitha Somisetty**

