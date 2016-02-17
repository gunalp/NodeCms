/**
 * Created by alpuysal on 16/02/16.
 */
module.exports = {
	index: function (req, res) {
		res.render("register", {
			message: "Car-Park"
		});
	},
	default: function (req, res) {
		res.status(404).json({
			err: true,
			msg: "Not found."
		});
	}
};