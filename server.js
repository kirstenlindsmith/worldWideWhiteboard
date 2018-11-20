const path = require('path');
const express = require('express');
const createSocketListener = require('socket.io');
const app = express();
const socketio = require('socket.io');


// app.listen() returns an http.Server object
// http://expressjs.com/en/4x/api.html#app.listen
const server = app.listen(1337, function () {
  console.log(`Listening on http://localhost:${server.address().port}`);
});

const socketListener = createSocketListener(server);

// server }==socket=={ client

const drawings = {};
function getDrawing (drawingName) {
  if (drawings[drawingName] === undefined) {
    drawings[drawingName] = [];
  }
  return drawings[drawingName];
}


socketListener.on('connection', (serverSocket) => {
  console.log(`Connection from client ${serverSocket.id}`);

  serverSocket.on('join-drawing', (drawingName) => {
    serverSocket.join(drawingName);
    const drawing = getDrawing(drawingName);
    serverSocket.emit('replay-drawing', drawing);
  });

  serverSocket.on('draw-from-client', (drawingName, start, end, color) => {
    const drawing = getDrawing(drawingName);
    drawing.push([start, end, color, ]);
    serverSocket.broadcast.to(drawingName).emit('draw-from-server', start, end, color);
  });
});

app.use(express.static(path.join(__dirname, 'public')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
