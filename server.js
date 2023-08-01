const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  let username;

  socket.on('set username', (name) => {
    username = name;
    io.emit('user connected', username + ' sohbete katıldı.');
  });

  socket.on('chat message', (msg) => {
    io.emit('chat message', username + ': ' + msg);
  });

  socket.on('disconnect', () => {
    if (username) {
      io.emit('user disconnected', username + ' sohbetten ayrıldı.');
    }
  });
});

http.listen(3000, () => {
  console.log('Sunucu çalışıyor. http://localhost:3000');
});
