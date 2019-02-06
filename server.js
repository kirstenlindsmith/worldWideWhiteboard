const path = require('path')
const express = require('express')
const app = express()
const socketio = require('socket.io')

// app.listen() returns an http.Server object
// http://expressjs.com/en/4x/api.html#app.listen
const server = app.listen(1337, () => {
  console.log(`Listening on http://localhost:${server.address().port}`)
})
let io = socketio(server) //IN THE WORKSHOP THIS IS VAR NOT CONST/LET!

io.on('connection', function(socket){
  console.log('A new client has connected!!!')
  console.log(socket.id)
})

app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req,res)=>{
  res.sendFile(path.join(__dirname, 'index.html'))
})

