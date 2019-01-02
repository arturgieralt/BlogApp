import * as http from 'http';
const server = http.createServer();

server.on('request', (req: http.IncomingMessage, res: http.ServerResponse) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello world\n');
});

server.listen(8000);