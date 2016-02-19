/**
 * Created by alpuysal on 10/02/16.
 */
var sha512 = require('js-sha512').sha512;
var randomToken = require('rand-token');

module.exports = {
	register: function (req, res) {
		models.users.findOne({where: {uname: req.body.username}})
			.then(function (user) {
				if (!user) {
					var data = {
						uname: req.body.username,
						password: sha512(req.body.password),
						tokens: (randomToken.generate(32))
					};

					return models.users.create(data)
						.then(function (userAfterSave) {
							res.json({
								err: false,
								data: {_id: userAfterSave.id}
							});
						});
				} else {
					res.json({
						err: true,
						msg: "Already Registered"
					});
				}
			})
			.then(null, function (err) {
				res.json({
					err: true,
					msg: err.name + " " + err.message
				});
			});
	},
	login: function (req, res) {

		models.users.findOne({
			'uname': req.body.username,
			'pwd': sha512(req.body.password)
		})
			.then(function (user) {
				if (user) {
					var createToken = randomToken.generate(32);

					user.tokens.push(createToken);
					return user.save()
						.then(function (userAfterSave) {
							res.cookie("token", createToken).json({
								"err": false,
								"msg": "First Login Success",
								"username": user.uname
							});
						});
				} else {
					res.status(404).json({
						"err": true,
						"msg": "User not found."
					});
				}
			})

			.then(null, function (err) {
				res.json({
					err: true,
					msg: err.name + " " + err.message
				});
			});
	},
	logout: function (req, res) {

		var cookieToken = req.cookies['token'];

		User.findOne({'tokens': cookieToken}).exec()

			.then(function (user) {

				if (user) {
					res.cookie("token", "").json({
						'err': false,
						'msg': "Users Logout",
						'status': 'OK'
					});
				} else {
					res.status(404).json({
						"err": true,
						"msg": "Token not found."
					});
				}
			})

			.then(null, function (err) {
				res.json({
					err: true,
					msg: err.name + " " + err.message
				});
			});
	}
};