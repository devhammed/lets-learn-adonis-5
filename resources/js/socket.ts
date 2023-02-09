import { io } from 'socket.io-client';

const socket = io();

console.log('We are connected to Socket.');

socket.on('news', (data) => {
  console.log(data);
  socket.emit('my other event', { my: 'data' });
});
