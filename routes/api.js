var request = require('request');
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var config = require('../config.js')
var cors = require('cors');
var User = require('../models/user.js')
var client = require('twilio')(config.account_SID, config.AUTH_TOKEN);

var api = express.Router();
api.use(bodyParser.urlencoded({ extended: false }));
api.use(bodyParser.json());
api.use(cors());

api.post('/alert', function(req, res) {
	console.log(req.body);
	console.log('hit the body');
	User.findOne({userID: req.body.ID}, function(err, user) {
		if (err) { 
			console.log(err);
		} else {
			if (user) {
				client.sendMessage({
					to: '+' + user.phoneNumber,
					from: config.twilioNumber,
					body: req.body.alertName
				}, function(err, responseData) {
	 				if (err) {
						console.log(err);
						console.log('there was an error');
					} else {
						console.log(responseData);
						console.log('no error');
					}
				});
			}
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
