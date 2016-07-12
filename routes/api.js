var request = require('request');
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var config = require('../config.js')
var User = require('../models/user.js')

var api = express.Router();
api.use(bodyParser.urlencoded({ extended: false }));
api.use(bodyParser.json());

api.post('/alert', function(req, res) {
	console.log(req);
	console.log('hit the body');
});

module.exports = api;