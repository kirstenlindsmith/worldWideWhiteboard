// Import from the module './whiteboard':
//   The default export, naming it draw,
//   An export named `events`, calling it `whiteboard`.
import whiteboard, {draw} from './whiteboard'

whiteboard.on('draw', brushCoords => console.log('Brush is at x,y:', brushCoords))

whiteboard.emit('draw', start, end, strokeColor);

// Example: Draw a single stroke.
// draw([0, 0], [250, 250], 'red', true) // that's the annoying red line in the corner

let socket = io(window.location.orgin)

socket.on('connect', function(){
  console.log('I have made a persistent two-way connection to the server!')
})

socket.on('broadcast', function(broadcast){
  console.log(broadcast);
})

