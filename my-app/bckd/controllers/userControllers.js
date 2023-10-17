// [SECTION] DEPENDENCIES
const User = require("../models/User");
const Item = require("../models/Item");
const Order = require("../models/Order");
const bcrypt = require("bcryptjs");
const auth = require("../auth")

// [SECTION] USER REGISTRATION / ALSO CHECK IF EMAIL EXISTS
module.exports.registerUser = (req, res) => {

	console.log(req.body);

	// >> If statement to check if email exists, if it does, it won't register the user.

	User.findOne({email: req.body.email}).then(result => {
	if(result === null){		
	const hashedPW = bcrypt.hashSync(req.body.password, 10);

	let newUser = new User({
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		email: req.body.email,
		mobileNo: req.body.mobileNo,
		password: hashedPW
	});

	newUser.save()
	.then(user => res.send(user))
	.catch(err => res.send(err));

	} else {
		return res.send("Email is already registered. Please choose a different email.")
	}

	})
	.catch(error => res.send(error))

};

// [SECTION] GETTING SINGLE USER DETAILS

module.exports.getUserDetails = (req, res) => {

	User.findById(req.user.id)
	.then(result => res.send(result))
	.catch(err => res.send(err));
};

// [SECTION] CHECK EMAIL EXISTS

module.exports.checkEmailExists = (req,res) => {

	//console.log(req.body.email);//check if you can receive the email from our client's request body.
	
	//You can use find({email: req.body.email}), however, find() returns multiple documents in an ARRAY.

	User.findOne({email: req.body.email})
	.then(result => {

		//console.log(result)

		if(result === null){
			return res.send(false);
		} else {
			return res.send(true);
		}

	})
	.catch(err => res.send(err));
}

// [SECTION] USER AUTHENTICATION/LOGIN
module.exports.loginUser = (req, res) => {

	console.log(req.body)

	User.findOne({email: req.body.email}).then(foundUser => {

		if(foundUser === null){
			return res.send(false)

		} else {

			const isPasswordCorrect = bcrypt.compareSync(req.body.password, foundUser.password)
			console.log(isPasswordCorrect);

			if(isPasswordCorrect){

				return res.send({accessToken: auth.createAccessToken(foundUser)})

			} else {

				return res.send(false)
			}
		}
	})
}

// [SECTION] RETRIEVE ALL USERS ------> NON-REQUIREMENT
module.exports.getAllUsers = (req, res) => {

	User.find({})
	.then(result => res.send(result))
	.catch(err => res.send(err));
};


// [SECTION] SET USER AS AN ADMIN (Admin only)
module.exports.updateAdmin = (req, res) => {

	console.log(req.user.id); // >> admin
	console.log(req.params.id) // >> user to be updated 

	let updates = {

		isAdmin: true
	}

	User.findByIdAndUpdate(req.params.id, updates, {new:true})
	.then(updatedUser => res.send(updatedUser))
	.catch(err => res.send(err));
 };

// [SECTION] CREATE ORDER (Regular user)

module.exports.addToCart = async (req, res) => {

	alert('Feature not yet available');

 	if(req.user.isAdmin){
 		return res.send(false)
 	} 

 	// wait for the function to finish finding the user id of the user who will be paired with an order id. 
 	let user = await User.findById(req.user.id).then(user => {

 		// >> like in registrering user, order ID doesn't exist, so once you add items in your cart that's the only time a user will generate its own orderId
 		// >> just like in real shopping, the order Id is the basket, unless you put anything in it, you won't really need it. 
 		if(user.orderId === ""){

 			// an order object was created where the user ID was assigned. 
 			let newOrder = new Order({
 				userId: req.user.id
 			}) 

 			newOrder.save()
			// after saving, an order id will be obtained which will be stored and saved in the user.
 			.then(order => {
 				// the empty user.orderID string will now contain the newly generated order id.
 				user.orderId = order.id
 				user.save()
 			})
 			.catch(err => res.send(err));
 		}
 		// to retrieve the orderId from the user which will be used in the next function. 
 		return user
 	})

	// wait for the function to finish finding the order id of the user who will add an item to the cart. 
	 let order = await Order.findById(user.orderId).then(order => {

	 	// look for the item by its Id 
	 	Item.findById(req.body.itemId).then(item => {

	 		if(!item.isActive){
	 			return res.send({message: "Out of stock!"})
	 		}

	 		// add the itemId  in an object and push that object into order's transactions array
	 		let newItem = {
	 			itemId: item.id,
	 			name: item.name,
	 			price: item.price
	 		}

	 		// not pushed sa db but showing in terminal
	 		console.log(newItem);

	 		console.log(order);

	 		order.transactions.push(newItem)

	 		order.totalAmount += item.price

	 		order.save()
	 		.then(order => true)
	 		.catch(err => err.message)

	 		return res.send({message: "Item added to cart"})
	 	})
	 })
};

// [SECTION] RETRIEVE ITEMS FROM SHOPPING CART (Authenticated User)
module.exports.getItemsFromCart = (req, res) => {

	User.findById(req.user.id)
	.then(user => {
		Order.findById(user.orderId).then(order => res.send(order))
	})
	.catch(err => res.send(err));
};



