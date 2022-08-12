const mongoose = require('mongoose');

const checkoutModel = new mongoose.Schema({
	customerid: {
		type: String
	},
	orderid: {
		type: String
	},
	total: {
		type: Number
	},
	createdat: {
		type: Date,
		default: Date.now()
	}
});

const CheckOut = mongoose.model('checkout', checkoutModel);

module.exports = CheckOut;
