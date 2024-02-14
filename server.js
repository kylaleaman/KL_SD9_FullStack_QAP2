const http = require('http');

const server = http.createServer((request, response) => {
    const url = request.url;
    switch (url) {
        case '/about':
            console.log("About page requested");
        case '/contact':
            console.log("Contact page requested");
        case '/products':
            console.log("Products page requested");
        case '/subscribe':
            console.log("Subscribe page requested");
        default:
            console.log("Unknown page requested");
            response.end('Unknown page');
    }
});

server.listen(3000, () => {
    console.log('Server is running on port 3000');
});