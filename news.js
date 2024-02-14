// Import required modules
const http = require('http');
const NewsAPI = require('newsapi');


const newsapi = new NewsAPI('83b45d1956704f55a65a7e6d567a878a');


const server = http.createServer((req, res) => {
    
    res.writeHead(200, { 'Content-Type': 'text/html' });

  
    newsapi.v2.topHeadlines({
        language: 'en',
        country: 'us',
        pageSize: 5 
    }).then(response => {
        
        const articles = response.articles;
        let html = '<h1>Top Headlines</h1>';
        html += '<ul>';
        articles.forEach(article => {
            html += `<li><a href="${article.url}">${article.title}</a></li>`;
        });
        html += '</ul>';

        res.end(html);
    }).catch(error => {
        console.error('Error fetching news:', error);
        res.end('Error fetching news');
    });
});

server.listen(3001, () => {
    console.log('Server is running on port 3001');
});
