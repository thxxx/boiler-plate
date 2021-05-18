const express = require('express');
const app = express();

axios.get('/', function(req, res) {
    res.send('Hello World!');
});

axios.get('/signup', function(req, res) {

    res.send('success');
});

var server = app.listen(3000, function() {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Server is working : PORT - ', port);
});