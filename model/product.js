const mongoose = require('mongoose');

const productModel = new mongoose.Schema({
	name: {
		type: String,
		unique: true
	},
	amount: {
		type: String
	},
	quantity: {
		type: Number
	},
	description: {
		type: String
	}
});

const Product = mongoose.model('products', productModel);

module.exports = Product;
