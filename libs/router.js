/**
 * Created by alpuysal on 16/02/16.
 */
var home = require(__dirname + "/../app/controllers/home");
var register = require(__dirname + "/../app/controllers/register");


module.exports = function (app){
	app.get("/", home.index);
	app.post("/register", register.index);
};