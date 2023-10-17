// [SECTION] DEPENDENCIES
const express = require("express");
const router = express.Router();

// [SECTION] IMPORTED MODULES
const userControllers = require("../controllers/userControllers");
const auth = require("../auth");

// ----> Destructring of the auth module
const {verify, verifyAdmin} = auth;

// [SECTION] ROUTES
// ----> ADDITIONAL <---- // ----> Retrieve All Users
router.get("/", userControllers.getAllUsers);

// ----> Get Single User Details
router.get('/getUserDetails', verify, userControllers.getUserDetails)

// ----> User registration
router.post("/", userControllers.registerUser);

// ----> Check Email Exists
router.post('/checkEmailExists', userControllers.checkEmailExists);

// ----> User authentication/login
router.post("/login", userControllers.loginUser);

// ----> Set user as an admin
router.put("/updateAdmin/:id", verify, verifyAdmin, userControllers.updateAdmin);

// ----> Create order (Regular user)
router.post("/addToCart", verify, userControllers.addToCart);

// ----> Retrieve items from cart (Authenticated User)
router.get("/getItemsFromCart", verify, userControllers.getItemsFromCart);

// ----> Retrieve all orders (Admin only)
// router.get("/getAllOrders", verify, verifyAdmin, userControllers.getAllOrders);

module.exports = router;

