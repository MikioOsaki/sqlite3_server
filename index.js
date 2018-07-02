var http = require('http');

http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write("<h1>Landing Page for SQLite3 Data Server</h1>");
    res.end();
}).listen(process.env.PORT ||8080);