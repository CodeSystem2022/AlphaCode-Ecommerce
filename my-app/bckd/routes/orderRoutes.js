// [SECTION] DEPENDENCIES
const express = require("express");
const router = express.Router();

// [SECTION] IMPORTED MODULES
const orderControllers = require("../controllers/orderControllers");
const auth = require("../auth");

// ----> Destructring of the auth module
const {verify, verifyAdmin} = auth;

// [SECTION] ROUTES
// ----> Retrieve all orders (Admin only)
router.get("/getAllOrders", verify, verifyAdmin, orderControllers.getAllOrders);

// ----> Delete Order
router.put("/deleteOrder", verify, orderControllers.deleteOrder);

module.exports = router;