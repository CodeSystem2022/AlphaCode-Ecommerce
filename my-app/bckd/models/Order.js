const mongoose = require("mongoose");
const Item = require("../models/Item")

const orderSchema = new mongoose.Schema({

	totalAmount: {
		type: Number,
		default: 0
	},

	createdOn: {
		type: Date,
		default: new Date()
	},

	userId: {
		type: String,
		required: [true, "User Id is required"]
	},

	transactions: [
		{
			itemId: {
				type: String,
				required: [true, "Item Id is required"]
			},

			name: {
				type: String,
				default: ""	
			},

			price: {
				type: Number,
				default: 0	
			}
		}
	]
});

module.exports = mongoose.model("Order", orderSchema);