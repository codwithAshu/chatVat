// Socket.js
import { io } from "socket.io-client";

let socket;

const isLocalhost = window.location.hostname === "localhost";

const SOCKET_URL = isLocalhost
  ? "http://localhost:2020"
  : "https://chatbackend-ph5y.onrender.com"; // ✅ Replace with your actual domain



export const connectSocket = () => {
  if (!socket) {
    socket = io(SOCKET_URL, {
      transports: ["websocket"],
      withCredentials: true,
    });
  }
  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};
