const http = require('http');
const fs = require('fs');
const server = http.createServer((req, res) => {
    console.log(req.url, req.method, req.headers);
    const url = req.url;
    const method = req.method;
    if(url === '/') {
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<head><title>Enter Massage</title><head>');
        res.write('<body><form action="/massage" method="POST"><input type="text"><button type="submit">send</form><body>');
        res.write('</html>');
        res.end();  
    }
    // process.exit();
    if(url === '/massage' && method === 'POST') {
        const body = [];
       req.on('data', (chunk) =>{
        console.log(chunk);
        body.push(chunk);

      });
      return req.on('end', () => {
        const parsedBody = Buffer.concat(body).toString();
        const message = parsedBody.split('=')[1];
        fs.writeFile('massage.text', message, (error) =>{
            res.statusCode = 302;
            res.setRedirct('Location', '/');
            return res.end();
        });
      });
    }
    res.setHeader('content-type', 'text/html');
    res.write('<html>');
    res.write('<head><title>My first page</title><head>');
    res.write('<body><h1>Hello from my node js server</h1><body>');
    res.write('</html>');
    res.end();
});
server.listen(3000,() =>{
console.log('server is running');
});

