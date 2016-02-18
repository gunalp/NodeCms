/**
 * Created by alpuysal on 16/02/16.
 */
var home = require(__dirname + "/../app/controllers/home");
var auth = require(__dirname + "/../app/controllers/auth");

module.exports = function (app){
	app.post("/", home.index);
	app.post("/auth/register", auth.register);
	app.post("/auth/login", auth.login);
	app.post("/auth/logout", auth.logout);
};