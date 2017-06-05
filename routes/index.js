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

connection.connect();
// Now we can write some awesome queries

/* GET home page. */
router.get('/', function(req, res, next) {
	var message = req.query.msg;
	if (message == 'added'){
		message = "Your task was added!"
	}
	var selectQuery = "SELECT * FROM tasks;";
	connection.query(selectQuery, function(error,results){
		res.render('index', { 
			message: message,
			taskArray: results
		});
	})
  
});

router.post('/addItem', function(req, res) {
  // res.json(req.body)
  var newTask = req.body.newTask
  var DueDate = req.body.newTaskDate
  var insertQuery = "INSERT INTO tasks (taskName, taskDate) VALUES ('"+newTask+"','"+DueDate+"');"
  // res.send(insertQuery);
  connection.query(insertQuery, function(error, results){
  	if(error) throw error;
  	res.redirect('/?msg=added')
  });
});

module.exports = router;
