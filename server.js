const http = require('http');
const fs = require('fs');

const server = http.createServer((request, response) => {
    const url = request.url;
    let filePath = '';

    switch (url) {
        case '/about':
            filePath = 'views/about.html'
            break;
        case '/contact':
            filePath= 'views/contact.html';
            break;
        case '/products':
            filePath= 'views/products.html';
            break;
        case '/subscribe':
            filePath= 'views/subscribe.html';
            break;
        default:
            response.writeHead(404, {'Content-Type': 'text/plain'});
            response.end('404 Page Not Found');
            return;
    }

    fs.readFile(filePath, (err, data) => {
        if (err) {
            console.error(err);
            response.writeHead(500, { 'Content-Type': 'text/plain' });
            response.end('Server Error');
            return;
        }

        response.writeHead(200, { 'Content-Type': 'text/html' });
        response.write(data);
        response.end();
    })
});

server.listen(3000, () => {
    console.log('Server is running on port 3000');
});