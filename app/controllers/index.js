/**
 * Created by alpuysal on 16/02/16.
 */
module.exports = {
	index: function (req, res) {
		res.render("index", {
			message: "Node First Public Page!"
		});
	},
	default: function (req, res) {
		res.status(404).json({
			err: true,
			msg: "Not found."
		});
	}
};