var express = require('express');
var app = express();

var port = process.env.PORT || 8081;

var favicon = require('serve-favicon');
var path = require('path');


app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));

app.use(express.json());
app.use(express.static(__dirname + '/public'));

//retrive data
app.post('/upload', function (req, res) { //post
    res.writeHead(200, {
        'Content-Type': 'application/json'
    });

    res.write("<h1>Landing Page for SQLite3 Data Server</h1>");
    res.write("<p>request: " + req.body + "</p>");
    res.write("<p>Yey! :)</p>");
    res.end();
});

app.listen(port, function () {
    console.log('running app on PORT: ' + port);
});

//________________________________sqlite3_______________________________

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(':memory:');

db.serialize(function () {

    db.run('CREATE TABLE lorem (info TEXT)');
    var stmt = db.prepare('INSERT INTO lorem VALUES (?)');

    for (var i = 0; i < 10; i++) {
        stmt.run('Lololo ' + i);
    }

    stmt.finalize();

    db.each('SELECT rowid AS id, info FROM lorem', function (err, row) {
        console.log(row.id + ': ' + row.info);
    });
});

db.close();