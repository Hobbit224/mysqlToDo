var express = require('express');
var router = express.Router();


var config = require('../config/config');

var mysql = require('mysql');
var connection = mysql.createConnection({
	host: config.host,
	user: config.userName,
	password: config.password,
	database: config.database
});

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
	});
  
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

router.get('/delete/:id', (req, res)=>{
	var idToDelete = req.params.id;
	var deleteQuery = "DELETE FROM tasks WHERE id = " + idToDelete;
	connection.query(deleteQuery, (error, results)=>{
		res.redirect('/?msg=deleted')
	});
	// res.send(idToDelete)
});

router.get('/edit/:id', function(req,res){
	var idToEdit = req.params.id;
	var selectQuery = "SELECT * FROM tasks WHERE id = ?";
	connection.query(selectQuery, [idToEdit], function(error,results){
		// res.json(results);
		res.render('edit',{
			task: results[0]
		});
	});
});

router.post('/editItem',function(req,res){
	// res.json(req.body);
	var newTask = req.body.newTask;
	var newTaskDate = req.body.newTaskDate
	var idToEdit = req.query.id;
	var updateQuery = "UPDATE tasks SET taskName = ?, taskDate = ? WHERE id = ?";
	connection.query(updateQuery, [newTask,newTaskDate,idToEdit], (error,results)=>{
		res.redirect('/?msg=updated');
	})
});

module.exports = router;
