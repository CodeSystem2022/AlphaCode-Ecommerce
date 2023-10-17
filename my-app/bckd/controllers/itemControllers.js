// [SECTION] DEPENDENCIES
const Item = require("../models/Item");

// [SECTION] CREATE ITEMS (Admin only) | Check if there are duplicate items
module.exports.addItem = (req, res) => {

	console.log(req.body);

	Item.findOne({name: req.body.name}).then(result => {

	if(result === null){
	
	let newItem = new Item({
		name: req.body.name,
		description: req.body.description,
		price: req.body.price
	});

	newItem.save()
	.then(item => res.send(item))
	.catch(err => res.send(err));

	} else {
		return res.send("This item is already in the database.")
	}

	})
	.catch(err => res.send(err))
};

// [SECTION] RETRIEVE ALL ACTIVE ITEMS
module.exports.getAllItems = (req, res) => {

	Item.find({})
	.then(result => res.send(result))
	.catch(err => res.send(err));
};

// [SECTION] RETRIEVE ALL ACTIVE ITEMS ONLY
module.exports.getAllActiveItems = (req, res) => {

	Item.find({isActive: true})
	.then(result => res.send(result))
	.catch(err => res.send(err));
};

// [SECTION] GET SINGLE ITEM
module.exports.getSingleItem = (req, res) => {

	console.log(req.params)

	Item.findById(req.params.id)
	.then(result => res.send(result))
	.catch(err => res.send(err));
};

// [SECTION] UPDATE ITEM INFO (Admin only)
module.exports.updateItem = (req, res) => {

	console.log(req.user.id) // >> admin
	console.log(req.params.id) // >> item to be updated

	let updates = {

		name: req.body.name,
		description: req.body.description,
		price: req.body.price
	}

	Item.findByIdAndUpdate(req.params.id, updates, {new: true})
	.then(updatedItem => res.send(updatedItem))
	.catch(err => res.end(err));
};

// [SECTION] ARCHIVE ITEM (Admin only)
module.exports.archiveItem = (req, res) => {

	let updates = {

		isActive: false
	}

	Item.findByIdAndUpdate(req.params.id, updates, {new: true})
	.then(result => res.send(result))
	.catch(err => res.send(err));
};

// [SECTION] ACTIVATE ITEM (Admin only)
module.exports.activateItem = (req, res) => {

	let updates = {

		isActive: true
	}

	Item.findByIdAndUpdate(req.params.id, updates, {new: true})
	.then(result => res.send(result))
	.catch(err => res.send(err));
};
