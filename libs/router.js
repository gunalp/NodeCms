/**
 * Created by alpuysal on 16/02/16.
 */
var home = require(__dirname + "/../app/controllers/home");


module.exports = function (app){
	app.get("/", home.index);
};