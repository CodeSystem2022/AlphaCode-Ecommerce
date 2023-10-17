// [SECTION] DEPENDENCIES 
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require('dotenv').config();

const API_URL = process.env.API_URL;

// [SECTION] SERVER
const app = express();
const port = process.env.PORT || 4000;

// [SECTION] DATABASE CONNECTION
mongoose.connect(API_URL,
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
	}
);

// [SECTION] NOTIFICATION FOR MONGODB CONNECTION
let db = mongoose.connection;

db.on("error", console.error.bind(console, "Connection Error"));
db.once("open", () => console.log("Successfully connected to MongoDB"))

// [SECTION] MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

// [SECTION] GROUP ROUTING
// ----> For Users
const userRoutes = require("./routes/userRoutes")
app.use("/users", userRoutes);
// ----> For Items
const itemRoutes = require("./routes/itemRoutes")
app.use("/items", itemRoutes);
// ----> For Orders
const orderRoutes = require("./routes/orderRoutes")
app.use("/orders", orderRoutes);

// [SECTION] PORT LISTENER
app.listen(port, () => console.log(`Server is running at port ${port}.`))