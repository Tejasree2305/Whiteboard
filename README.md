🎨 Real-Time Collaborative Whiteboard


An interactive, browser-based whiteboard built with HTML, CSS, JavaScript, the Canvas API, Node.js, and WebSockets. Draw on a digital canvas, choose colors, erase strokes, and undo or redo local changes. A lightweight WebSocket server relays drawing coordinates to connected clients.
📸 Screenshots
Whiteboard interface

Drawing on the canvas

✨ Features
- Canvas drawing: Draw freehand using mouse movements.
- Color picker: Select different pen colors.
- Pen and eraser: Switch between drawing and erasing tools.
- Undo and redo: Restore previous local canvas snapshots.
- WebSocket messaging: Send drawing coordinates and pen/eraser state to the server; the server broadcasts messages to connected clients.
- Clean dark-themed interface: Toolbar and white drawing canvas with a simple layout.
🛠️ Tech Stack
Technology	Use
HTML5	Page structure and canvas element
CSS3	Dark-themed styling and toolbar
JavaScript	Drawing logic, tools, undo/redo, and WebSocket client
Canvas API	Rendering strokes on the canvas
Node.js	Running the WebSocket server
ws npm package	WebSocket server implementation


📁 Project Structure
Whiteboard/
├── index.html
├── style.css
├── script.js
├── server.js
├── package.json
├── package-lock.json
├── screenshots/
│   ├── whiteboard-interface.png
│   └── whiteboard-drawing.png
└── README.md
Ensure your HTML file is named index.html (not index(1).html) in the repository.

🚀 Getting Started
Prerequisites
- Node.js and npm
- A modern web browser
- VS Code with Live Server (optional, recommended)
1. Clone the repository
git clone https://github.com/Tejasree2305/Whiteboard.git
cd Whiteboard
2. Install the WebSocket dependency
npm install
3. Start the WebSocket server
node server.js
Expected terminal output:
Server running on port 8080
4. Open the frontend
Open index.html using VS Code Live Server (for example, at http://127.0.0.1:5500/index.html), or open the HTML file in your browser.
Keep the terminal running while using the application. The client connects to ws://localhost:8080, so the server must be running on the same computer unless you update the connection URL.
5. Try the controls
1. Drag your mouse across the white canvas to draw.
2. Choose a new color with the color picker.
3. Select Eraser to erase with white strokes, or Pen to draw again.
4. Select Undo or Redo to navigate local canvas history.
5. To experiment with messaging, open the page in another browser tab while the WebSocket server is running.
⚙️ How It Works
1. The browser uses mouse events to capture drawing coordinates.
2. JavaScript draws strokes on the HTML5 canvas.
3. The client sends drawing data to ws://localhost:8080.
4. The Node.js server receives each message and broadcasts it to connected clients.
5. Each client processes incoming drawing messages and renders strokes.
⚠️ Current Limitations
This is a learning project, not yet a production-ready collaborative editor.
- Undo/redo is local only; these operations are not sent to other clients.
- Canvas history is not persisted; refreshing the page clears the drawing.
- Newly connected users do not receive earlier drawings.
- The current message format sends drawing points without explicit stroke-start/stroke-end events; multi-user strokes may connect incorrectly. This should be improved before claiming reliable real-time synchronization.
- The client currently sends drawing messages without checking whether the WebSocket is open, so drawing before connection may cause errors.
- Mouse input is implemented; touch-device support is not yet provided.
🔮 Future Improvements
- Synchronize separate stroke start/end events across clients.
- Implement room-based collaboration and consistent multi-user canvas state.
- Add save/export and persistent drawing history.
- Add touch and mobile drawing support.
- Synchronize undo/redo operations between users.
- Add connection status and reconnection handling.
👩‍💻 Author
Mangali Tejasree
B.Tech, Computer Science and Engineering (2026)
- GitHub
- LinkedIn
Built as a hands-on project to practice frontend development, Canvas API interactions, and WebSocket communication.
