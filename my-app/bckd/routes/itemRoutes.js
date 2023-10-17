// [SECTION] DEPENDENCIES
const express = require("express");
const router = express.Router();

// [SECTION] IMPORTED MODULES
const itemControllers = require("../controllers/itemControllers");
const auth = require("../auth");

// ----> Destructring of the auth module
const {verify, verifyAdmin} = auth;

// [SECTION] ROUTES
// ----> Create Item (Admin only)
router.post("/createItem", verify, verifyAdmin, itemControllers.addItem);

// ----> Retrieve all items
router.get("/", itemControllers.getAllItems);

// ----> Retrieve all active items only
router.get("/getAllActiveItems", itemControllers.getAllActiveItems);

// ----> Retrieve single items
router.get("/getSingleItem/:id", itemControllers.getSingleItem);

// ----> Update item information (Admin only)
router.put("/updateItem/:id", verify, verifyAdmin, itemControllers.updateItem);

// ----> Archive an item (Admin only)
router.put("/archiveItem/:id", verify, verifyAdmin, itemControllers.archiveItem);

// ----> Archive an item (Admin only)
router.put("/activateItem/:id", verify, verifyAdmin, itemControllers.activateItem);

module.exports = router;