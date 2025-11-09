# 🧩 Real-Time Collaborative Drawing Canvas — Architecture

---

## **1. Overview**

This document describes the architecture of the Real-Time Collaborative Drawing Canvas.  
The application enables multiple users to draw simultaneously on a shared canvas using WebSockets for real-time communication.  

It supports drawing, undo/redo, clearing the canvas, and synchronizing all actions across connected clients.

---

## **2. Data Flow Diagram**

Below is a simplified representation of how data moves through the system:

```text
     ┌───────────────┐
     │    User A     │
     │ Draws on Canvas│
     └───────┬────────┘
             │ (1) Emit 'draw' event
             ▼
     ┌─────────────────────┐
     │      Server         │
     │  (Node.js + Socket.io) │
     └───────┬─────────────┘
             │ (2) Broadcast to others
             ▼
     ┌───────────────┐     ┌───────────────┐
     │    User B     │     │    User C     │
     │ Receives 'draw' │   │ Receives 'draw'│
     │ Updates Canvas  │   │ Updates Canvas │
     └────────────────┘     └───────────────┘

