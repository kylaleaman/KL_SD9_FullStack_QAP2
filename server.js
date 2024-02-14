const http = require('http');

const server = http.createServer((request, response) => {
    const url = request.url;
    switch (url) {
        case '/about':
            console.log("About page requested");
            response.end("About page");
            break;
        case '/contact':
            console.log("Contact page requested");
            response.end("Contact page");
            break;
        case '/products':
            console.log("Products page requested");
            response.end("Products page");
            break;
        case '/subscribe':
            console.log("Subscribe page requested");
            response.end("Subscribe page");
            break;
        default:
            console.log("Unknown page requested");
            response.end('Unknown page');
    }
});

server.listen(3000, () => {
    console.log('Server is running on port 3000');
});