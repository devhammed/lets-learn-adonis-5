import Ws from 'App/Services/Ws';

/**
 * Boot WS server.
 */
Ws.boot();

/**
 * Listen for incoming socket connections.
 */
Ws.on('connection', (socket) => {
  socket.emit('news', { hello: 'world' });

  socket.on('my other event', (data) => {
    console.log(data);
  });
});
