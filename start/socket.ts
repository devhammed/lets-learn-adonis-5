import Ws from 'App/Services/Ws';
import Logger from '@ioc:Adonis/Core/Logger';

/**
 * Boot WS server.
 */
Ws.boot();

/**
 * Listen for incoming socket connections.
 */
Ws.on('connection', (socket) => {
  Logger.info(`[${socket.id}] joined`);

  socket.emit('news', { hello: 'world' });

  socket.on('my other event', (data) => {
    Logger.info(`[${socket.id}] data: ${JSON.stringify(data)}`);
  });

  socket.on('disconnect', (reason) => {
    Logger.info(`[${socket.id}] disconnected: ${reason}`);
  });
});
