var Mongoose = require('mongoose');

var Schema = Mongoose.Schema;

var UserSchema = new Schema({
	accountID: { type: String, required: true, index: { unique: false } },
	userID: {type: String, required: true},
	phoneNumber: {type: Number, required: false}
});

module.exports = Mongoose.model('User', UserSchema);