const socket = new WebSocket("ws://localhost:8080");

// Canvas setup
const canvas = document.getElementById("board");
const ctx = canvas.getContext("2d");

let drawing = false;
let color = "black";
let erasing = false;

// Undo / Redo stacks
let undoStack = [];
let redoStack = [];

// ======= Color picker =======
document.getElementById("color").onchange = (e) => {
  color = e.target.value;
};

// ======= Eraser / Pen =======
document.getElementById("eraser").onclick = () => { erasing = true; };
document.getElementById("pen").onclick = () => { erasing = false; };

// ======= Undo / Redo buttons =======
document.getElementById("undo").onclick = () => {
  if (undoStack.length === 0) return;
  redoStack.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
  const prev = undoStack.pop();
  ctx.putImageData(prev, 0, 0);
};

document.getElementById("redo").onclick = () => {
  if (redoStack.length === 0) return;
  undoStack.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
  const next = redoStack.pop();
  ctx.putImageData(next, 0, 0);
};

// ======= Drawing =======
canvas.addEventListener("mousedown", () => {
  drawing = true;
  ctx.beginPath();

  // Save current state for undo
  undoStack.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
  redoStack = []; // clear redo stack
});

canvas.addEventListener("mousemove", (e) => {
  if (!drawing) return;

  ctx.strokeStyle = erasing ? "white" : color;
  ctx.lineWidth = erasing ? 20 : 2;
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();

  // Send drawing data to server
  socket.send(JSON.stringify({
    x: e.offsetX,
    y: e.offsetY,
    color: erasing ? "white" : color,
    erasing: erasing
  }));
});

canvas.addEventListener("mouseup", () => {
  drawing = false;
});

// ======= Receive drawing from other users =======
socket.onmessage = (message) => {
  const data = JSON.parse(message.data);
  ctx.strokeStyle = data.color;
  ctx.lineWidth = data.erasing ? 20 : 2;
  ctx.lineTo(data.x, data.y);
  ctx.stroke();
};
