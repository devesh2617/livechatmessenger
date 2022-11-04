//node server
const express = require('express');
const app = express();
const http = require('http').createServer(app);

// array for storing user id
const users = [];

//getting a port ready for the server 
const port = process.env.PORT || 5000;

app.use(express.static(__dirname + '/public'));

const io = require('socket.io')(http);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/html.html');
})


http.listen(port, () => {
  console.log(`server is running at port ${port}`);
});



io.on('connection', (socket) => {
  console.log('Connected.....');
  // console.log(socket.id);

  socket.on('newUser',(user)=>
  {
  //  console.log(user)
   users[socket.id] = user;
   socket.broadcast.emit('newUser',user);
  });

  socket.on('messageToServer', (msg) => {
    socket.broadcast.emit('messageToClients', msg);
  });

   socket.on('disconnect',()=>
   {
    // console.log(socket.id);
    socket.broadcast.emit('left', users[socket.id]);
   })
});