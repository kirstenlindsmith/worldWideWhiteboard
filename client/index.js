// Import from the module './whiteboard':
//   The default export, naming it draw,
//   An export named `events`, calling it `whiteboard`.
import whiteboard, {draw, } from './whiteboard';
import createClientSocket from 'socket.io-client';

const clientSocket = createClientSocket(window.location.origin);
const drawingName = window.location.pathname;

clientSocket.on('connect', () => {
  console.log('Connected to server!');
  clientSocket.emit('join-drawing', drawingName);
});

clientSocket.on('replay-drawing', (instructions) => {
  instructions.forEach(instruction => draw(...instruction, false));
});

clientSocket.on('draw-from-server', (start, end, color) => {
  draw(start, end, color, false);
});

whiteboard.on('draw', (start, end, color) => {
  clientSocket.emit('draw-from-client', drawingName, start, end, color);
});
