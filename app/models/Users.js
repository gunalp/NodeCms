module.exports = function (sequelize, DataTypes) {
	var Users = sequelize.define('users', {
		id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		uname: {
			type: Sequelize.STRING
		},
		password: {
			type: Sequelize.STRING
		},
		tokens: {
			type: Sequelize.STRING
		}
	});
	Users.sync();
	return Users;
};