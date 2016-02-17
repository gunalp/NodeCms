/**
 * Created by alpuysal on 17/02/16.
 */
var Sequelize = require('sequelize');
var sequelize = new Sequelize(null, null, null, {
	"dialect": "sqlite",
	"storage": "./carpark.sqlite"
});

sequelize.query("CREATE TABLE lorem (info TEXT)").spread(function(results, metadata) {
	// Results will be an empty array and metadata will contain the number of affected rows.
})