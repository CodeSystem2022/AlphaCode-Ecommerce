const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({

	name: {
		type: String,
		required: [true, "Item name is required."]
	},

	description: {
		type: String,
		required: [true, "Item description is required."]
	},

	price: {
		type: Number,
		required: [true, "Item price is required."]
	},

	isActive: {
		type: Boolean,
		default: true
	},

	createdOn: {
		type: Date,
		default: new Date()
	}
});

module.exports = mongoose.model("Item", itemSchema);