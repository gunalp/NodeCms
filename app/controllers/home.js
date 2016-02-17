/**
 * Created by alpuysal on 16/02/16.
 */
module.exports = {
	index: function (req, res) {
		var cookieToken = req.cookies['token'];

	},
	default: function (req, res) {
		res.status(404).json({
			err: true,
			msg: "Not found."
		});
	}
};