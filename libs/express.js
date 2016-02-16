/**
 * Created by alpuysal on 16/02/16.
 */
var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var myRouter = require(__dirname + "/router");
var router = express.Router();

module.exports = function (app, next) {
	app.set('view engine', 'ejs');
	app.set('views', __dirname + "/../public/views");
	app.use("/public", express.static(__dirname + '/../public'));
	app.use(cookieParser());
	app.use(bodyParser());
	myRouter(router);
	app.use('/',router);
	next();
};