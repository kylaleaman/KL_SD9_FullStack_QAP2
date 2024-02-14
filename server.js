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

// Capture HTTP status codes
//  - Description: Capture common HTTP status codes (ex/ 200, 404, 500) 
//                 and write a message to the console indicating the status code
//                 with the corresponding request
//  - Event Name: 'statusCode'
server.on('request', (request, response) => {
    response.on('finish', () => {
        const statusCode = response.ststusCode;
        console.log(`HTTP Status Code: ${statusCode} - Request URL: ${request.url}`);
    });
});

// Warnings and Errors
//  - Description: Capture any warning or error events that occur within the server
//  - Event Name: 'serverError'
server.on('error', (error) => {
    console.error('Server error:', error);
});

// File Successfully Read
//  - Description: Capture when a file is successfully read
//  - Event Name: 'fileRead'
const EventEmitter = require('events');
const fileEventEmitter = new EventEmitter();

fileEventEmitter.on('fileReadSuccess', (filePath) => {
    console.log(`File successfully read: ${filePath}`);
});

fileEventEmitter.on('fileReadError', (error, filePath) => {
    console.error(`Error reading file ${filePath}:`, error);
});

const filePath = 'example.txt';
fs.readFile(filePath, (error, data) => {
    if (error) {
        fileEventEmitter.emit('fileReadError', error, filePath);
    } else {
        fileEventEmitter.emit('fileReadSuccess', filePath);
        response.writeHead(200, { 'Content-Type': 'text/plain' });
        response.write(data);
        response.end();
    }
})

server.listen(3000, () => {
    console.log('Server is running on port 3000');
});







