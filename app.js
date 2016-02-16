/**
 * Created by alpuysal on 16/02/16.
 */
var express = require('express');
var config = require("./libs/config");
var expressInit = require("./libs/express");

var app = express();

expressInit(app, function () {
	app.listen(config.port, function () {
		console.log("[express]", config.port);

	});
});