const http = require('http');
const route = require('./route');

console.log(route.someText);

const server = http.createServer(route.handler);

server.listen(3000,() => {
  console.log('server is running 4000');
});

