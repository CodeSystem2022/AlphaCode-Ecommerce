// SECTION [DEPENDENCIES]
const jwt = require("jsonwebtoken");
const secret = "SneakersEcommerceAPI"

module.exports.createAccessToken = (user) => {
	console.log(user);

	const data = {
		id: user._id,
		email: user.email,
		isAdmin: user.isAdmin 
	}

	console.log(data);

	return jwt.sign(data, secret, {})
};

// SECTION [FOR VERIFICATION OF TOKEN]

module.exports.verify = (req, res, next) => {

	let token = req.headers.authorization

	if(typeof token === "undefined"){

		return res.send({auth: "Failed. No Token."})

	} else {

		console.log(token);

		token = token.slice(7, token.length)
		console.log(token);

		jwt.verify(token, secret, (err, decodedToken) => {

			if(err){
				return res.send({
					auth: "Failed",
					message: err.message
				})

			} else {
				console.log(decodedToken);

				req.user = decodedToken

				next();
			}
		})
	}
};

// SECTION [FOR VERIFICATION OF ADMIN]
module.exports.verifyAdmin = (req, res, next) => {

	if(req.user.isAdmin){

		next();
	} else {

		return res.send({
			auth: "Failed",
			message: "Action Forbidden"
		})
	}
};