const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

let customerModel = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	phone: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	isadmin: {
		type: Boolean,
		default: false
	}
});

customerModel.pre('save', async function (next) {
	let hashedPassword = await bcrypt.hashSync(this.password, 13);
	this.password = hashedPassword;
	next();
});

let Customer = mongoose.model('customers', customerModel);

module.exports = Customer;
