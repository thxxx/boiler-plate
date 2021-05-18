var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'dataghwls159@',
    database: kut
});

connection.connect(function(err) {
    if (err) {
        console.log('err is born');
        throw err;
    } else {
        console.log('mysql connection success');
    }
});

module.exports = connection;