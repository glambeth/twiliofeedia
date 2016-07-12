var config = require('./config.js');
var express = require('express');
var request = require('request');
var mongoose = require('mongoose');
var twilio = require('twilio')(config.account_SID, config.AUTH_TOKEN);
var app = express();

mongoose.connect(config.database, function(err) {
	if (err) {
		console.log(err);
	} else {
		console.log('connected to the DB');
	}
});

app.listen(config.port, function(req, res) {
	console.log('listening on port ' + config.port);
});
