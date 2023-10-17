const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

	firstName: {
		type: String,
		required: [true, "User first name is required."]
	},

	lastName: {
		type: String,
		required: [true, "User last name is required."]
	},

	email: {
		type: String,
		required: [true, "User email is required."]
	},

	password: {
		type: String,
		required: [true, "User password is required."] 
	},

	mobileNo: {
		type: String,
		required: [true, "User mobile number is required."]
	},

	isAdmin: {
		type: Boolean,
		default: false
	},

	orderId: {
		type: String,
		default: ""
	}

});

module.exports = mongoose.model("User", userSchema);