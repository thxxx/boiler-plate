var express = require('express');
var router = express.Router();

var connection = require('./connection');

/* GET users listing. */
router.route('/registUser').get((req, res) => {
    console.log(req);
    res.send('success');
})
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

module.exports = router;