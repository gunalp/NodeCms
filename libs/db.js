/**
 * Created by alpuysal on 17/02/16.
 */
global.Sequelize = require('sequelize');
global.models = {};
var fs = require('fs');

module.exports = function (callback) {
	global.sequelize = new Sequelize("./carpark.sqlite", null, null, {
		"dialect": "sqlite",
		"storage":"./carpark.sqlite"
	});
	fs.readdirSync(__dirname + '/../app/models').forEach(function (file) {
		if (file.indexOf('.js')) {
			var model = sequelize.import(__dirname + '/../app/models/' + file);
			models[model.name] = model;
		}
	});
	callback();
};