/**
 * Created by alpuysal on 16/02/16.
 */
var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var myRouter = require(__dirname + "/router");
var router = express.Router();

module.exports = function (app, next) {
	app.use(express.static(__dirname + '/../public'));
	app.use(cookieParser());
	app.use(bodyParser());
	myRouter(router);
	app.use('/api/v1', router);
	next();
};