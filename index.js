var express = require('express');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

var app = express();
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    console.log('Un usuario se ha conectado');

    var username;

    socket.on('crearUsuario', function(data){
      username = data;
    });

    socket.on('mensajeNuevo', function(data){
      
      socket.broadcast.emit('mensaje', {
        usuario: username,
        mensaje: data
      });

      socket.emit('mensaje', {
        usuario: username,
        mensaje: data
      });
    });

    socket.on('peopleConectadas', function(data){

      socket.broadcast.emit('username', {
        usuario: username
      });
    });
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});
