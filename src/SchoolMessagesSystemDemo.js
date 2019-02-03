// prepare inmemory db
var loki = require('lokijs');
var db = new loki('db.json');

var person = db.addCollection('person');
person.insert({id:1, name:'Admin', username: 'admin', email: 'admin@schoolMessagesSystem', password: '1234', isAdmin: 'T'});
person.insert({id:2, name:'User One', username: 'userone', email: 'userone@schoolMessagesSystem', password: '1234', isAdmin: 'F'});
person.insert({id:3, name:'User Two', username: 'usertwo', email: 'usertwo@schoolMessagesSystem', password: '1234', isAdmin: 'F'});

var message = db.addCollection('message');
message.insert({id:1, createdBy: 1, sentTo: 2, isRead: 'F', messageContent: 'First Message'});
message.insert({id:2, createdBy: 1, sentTo: 3, isRead: 'F', messageContent: 'Second Message'});

// implement dao layer
var SystemDAO = (function (){
	function x() {};
	x.prototype.addStudent = function (newStudent) {
		var newId = person.count() + 1;
		var newlyAdded = person.insert({id:newId, 
			name: newStudent.name, 
			username: newStudent.username, 
			email: newStudent.email, 
			password: newStudent.password, 
			isAdmin: 'F'});
		return newlyAdded;
	};

	x.prototype.addMessage = function (newMessage) {
		var newId = message.count() + 1;
		var newlyAdded = message.insert({id: newId,
			createdBy: newMessage.createdBy,
			sentTo: newMessage.sentTo,
			isRead: 'F',
			messageContent: newMessage.messageContent});
		return newlyAdded;
	};

	x.prototype.getStudent = function (loggingStudent) {
		return person.find({username: loggingStudent.username, password: loggingStudent.password, isAdmin: 'F'});
	};

	x.prototype.getAdmin = function (loggingAdmin) {
		return person.find({username: loggingAdmin.username, password: loggingAdmin.password, isAdmin: 'T'});
	};

	x.prototype.getStudents = function () {
		var allStudents = person.find({isAdmin: 'F'});
		allStudents.map(function(item, index) {
			item.password = 'XYX';
		});

		return allStudents;
	};

	x.prototype.getStudentMessages = function (loggedinStudent) {
		return message.find({sentTo: loggedinStudent.id});
	};

	x.prototype.getMessage = function (currentMessage) {
		return message.find({id: currentMessage.id});
	};

	x.prototype.updateMessageToRead = function(readMessage) {
		var tempMessage = message.find({id: readMessage.id});
		tempMessage.isRead = 'T';
		message.update(tempMessage);
	};

	return x;
}());

var systemDAO = new SystemDAO();

// implement service layer
var express = require('express');
var schoolMessagesSystemApp = express();
schoolMessagesSystemApp.post('/student', function (req, res) {
	var loggedInStudent = systemDAO.getStudent({username: req.body.username, password: req.body.password});
	if(loggedInStudent) {
		oggedInStudent.password = '';
	}

   	res.send(loggedInStudent);
});

schoolMessagesSystemApp.post('/admin', function (req, res) {
	var loggedInAdmin = systemDAO.getAdmin({username: req.body.username, password: req.body.password});
	if(loggedInAdmin) {
		loggedInAdmin.password = '';
	}

   	res.send(loggedInAdmin);
});

schoolMessagesSystemApp.get('/studentMessages', function (req, res) {
   var messages = systemDAO.getStudentMessages({id:req.query.studentId});
   res.send(messages);
});

schoolMessagesSystemApp.get('/message', function (req, res) {
	var message = systemDAO.getMessage({id: req.query.messageId})
   	res.send(message);
});

schoolMessagesSystemApp.post('/readMessage', function (req, res) {
	systemDAO.updateMessageToRead({id: req.body.messageId});
});

schoolMessagesSystemApp.get('/students', function (req, res) {
   res.send(systemDAO.getStudents());
});

schoolMessagesSystemApp.put('/student', function (req, res) {
   var newlyAdded = systemDAO.addStudent({name: req.body.name, 
			username: req.body.username, 
			email: req.body.email, 
			password: req.body.password});
   if(newlyAdded) {
   	newlyAdded.password = '';
   }

   res.send(newlyAdded);
});

schoolMessagesSystemApp.put('/message', function (req, res) {
   var newlyAdded = systemDAO.addMessage({createdBy: req.body.createdBy,
			sentTo: req.body.sentTo,
			isRead: 'F',
			messageContent: req.body.messageContent});
   res.send(newlyAdded);
});

var server = schoolMessagesSystemApp.listen(8083, function () {
   var host = server.address().address;
   var port = server.address().port;
   console.log("Example app listening at http://%s:%s", host, port)
});
