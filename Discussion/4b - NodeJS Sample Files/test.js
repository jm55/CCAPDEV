const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    console.log("Request url: " + req.url);
    console.log("headers: ");
    console.log(req.headers);

    switch (req.url) {
        case '/':
            res.setHeader('Content-Type', 'text/html');
            fs.readFile('test.html', (err, data) => {
                if (err) {
                    res.statusCode = 404;
                    res.end();
                } else {
                    console.log('found data: '+ data);
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'text/html');
                    // on file read successfu
                    res.write(data);
                    res.end();
                }
            });
            break;
        case "/favicon.ico":
            // Icon for browser
            res.setHeader('content-type', 'image/png');
            fs.readFile('favicon-16x16.png', (err, data) => {
                if (err) {
                    res.end();
                } else {
                    res.write(data);
                    res.end();
                }
            });
            break;
        case "/home":
            res.statusCode = 308;
            res.setHeader('Location', '/');
            res.end();
        default: 
            res.statusCode = 501;
            res.end();
    }
});

// server.addListener('request', (req, res) => { });

server.listen(3000, 'localhost', () => {
    console.log("Server listening...");
});