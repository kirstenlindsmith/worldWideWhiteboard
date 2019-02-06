const path = require('path')
const express = require('express')
const app = express();
const socketio = require('socket.io')
const whiteboard = require('./client/whiteboard')

// app.listen() returns an http.Server object
// http://expressjs.com/en/4x/api.html#app.listen
const server = app.listen(1337, () => {
  console.log(`Listening on http://localhost:${server.address().port}`)
})

let io = socketio(server) //IN THE WORKSHOP THIS IS VAR NOT CONST/LET!

let clients = 0;
io.on('connection', function(socket){
  clients ++;
  console.log('A new client has connected!!!')
  console.log(socket.id)

  socket.on('disconnect', function() {
    console.log('A client has disconnected :(');
    console.log(socket.id)
  })  
  
  io.emit('broadcast', `${clients} clients`)

  // io.to(socket.id).emit('hellooô')
})

whiteboard.on('draw', (start, end, strokeColor) => {
  console.log('listener recieved from clientside', start, end, strokeColor)
});

app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req,res)=>{
  res.sendFile(path.join(__dirname, 'index.html'))
})

