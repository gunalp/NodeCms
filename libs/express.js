/**
 * Created by alpuysal on 16/02/16.
 */
var express = require('express');
var indexController = require(__dirname + '/../app/controllers/index');

module.exports = function (app) {
	app.set('view engine', 'ejs');
	app.set('views', __dirname + "/../public/views");
	app.use("/public", express.static(__dirname + '/../public'));
	app.get("/", indexController.index);
};
