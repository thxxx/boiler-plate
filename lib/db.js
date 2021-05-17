var mysql = require('mysql');
var db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'dataghwls159@',
    database: 'kut'
});
db.connect();

module.exports = db;