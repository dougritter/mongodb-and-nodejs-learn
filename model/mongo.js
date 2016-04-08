var mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/demoDb');
var db = mongoose.connection;
var mongoSchema = mongoose.Schema;

var userSchema = {
	"userEmail" : String,
	"userPassword" : String
};

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function callback() {
  console.log("h");
});

module.exports = mongoose.model('user_login', userSchema);
