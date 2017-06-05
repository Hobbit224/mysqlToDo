var express = require('express');
var router = express.Router();


var config = require('../config/config');

var mysql = require('mysql');
var connection = mysql.createConnection({
	host: config.host,
	user: config.userName,
	password: config.password,
	database: config.database
})

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/addItem', function(req, res) {
  // res.json(req.body)
  var newTask = req.body.newTask
  var DueDate = req.body.newTaskDate
});

module.exports = router;
