const mongoose = require('mongoose');

const orderModel = mongoose.Schema({
	customerid: {
		type: String
	},
	cartdetails: [
		{
			productid: {
				type: String,
				required: true
			},
			quantity: {
				type: Number,
				required: true
			}
		}
	],
	createdat: {
		type: Date,
		default: Date.now()
	},
	completed: {
		type: Boolean,
		default: false
	}
});

const Orders = mongoose.model('orders', orderModel);

module.exports = Orders;
