/**
 * Created by alpuysal on 16/02/16.
 */
module.exports = {
	index: function (req, res) {
		var cookieToken = req.cookies['token'];

		models.users.findOne({where:{tokens: cookieToken}})
			.then(function (user) {
				if(user){
					res.json({
						"err":false,
						"msg":"Already Logged",
						"status":"OK",
						"username":user.uname
					});
				}else{
					res.json({
						"err":true,
						"msg":"User Logged out",
						"status":"BAD"
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