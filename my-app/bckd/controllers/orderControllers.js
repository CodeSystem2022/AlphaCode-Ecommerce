// [SECTION] DEPENDENCIES
const Order = require("../models/Order");

// [SECTION] RETRIEVE ALL ORDERS (Admin only)
module.exports.getAllOrders = (req, res) => {

	Order.find({})
	.then(result => res.send(result))
	.catch(err => res.send(err));
};

module.exports.deleteOrder = (req, res) => {

	console.log(req.body);

	Order.findOne({orderId: req.body.orderId})
	.then(result => {

		console.log(result);

		for(let i = 0; i < result.transactions.length; i++){

				if(result.transactions[i].itemId.toString() === req.body.itemId){

					result.transactions.splice(i, 1);

					result.save()
					.then(order => true)
					.catch(err => err.message)

					res.send("Order deleted");

					break;
				}
			}	

	})
	.catch(err => res.send(err));

}
