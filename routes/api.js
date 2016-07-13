var request = require('request');
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var config = require('../config.js')
var cors = require('cors');
var User = require('../models/user.js')
var htmlParser = require('htmlparser')
var client = require('twilio')(config.account_SID, config.AUTH_TOKEN);

var api = express.Router();
api.use(bodyParser.urlencoded({ extended: false }));
api.use(bodyParser.json());
api.use(cors());

api.post('/alert', function(req, res) {
	console.log(req);
	console.log('hit the body');
	var handler = new htmlParser.defaultHandler(function (err, dom) {
		if (err) {
			console.log(err);
		} else {
			console.log(dom);
		}
	});
	var parser = new htmlParser.Parser(handler);
	parser.parseComplete(req.body.alerts);
	client.sendMessage({
		to: '+15185862845',
		from: config.twilioNumber,
		body: 'test message'
	}, function(err, responseData) {
 		if (err) {
			console.log(err);
			console.log('there was an error');
		} else {
			console.log(responseData);
			console.log('no error');
		}
	});
});

api.post('/addPhoneNumber', function(req, res) {
	console.log(req);
	console.log('got the phone number');
	var user = new User({
		accountID: req.body.accountId,			
		userID: req.body.userId,
		phoneNumber: req.body.phoneNumber
	});
	user.save(function(err) {
		if (err) {
			console.log(err);
		} else {
			console.log('user saved');
		}
	});
});

module.exports = api;
