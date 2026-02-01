const WebSocket = require("ws");

// Create WebSocket server on port 8080
const wss = new WebSocket.Server({ port: 8080 });

wss.on("connection", (socket) => {
  console.log("A user connected");

  // Receive data from one client
  socket.on("message", (data) => {
    // Send it to all connected clients
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data.toString());
      }
    });
  });

  socket.on("close", () => {
    console.log("A user disconnected");
  });
});

console.log("Server running on port 8080");
