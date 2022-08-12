const { Validator } = require('node-input-validator');

let CustomValidate = {
	inputValidate: async function (postData) {
		let error;
		let validation = false;
		let filed = {
			name: 'required|minLength:3|maxLength:25|alpha',
			email: 'required|email',
			phone: 'required|integer',
			password: 'required|minLength:6',
			amount: 'required',
			quantity: 'required',
			description: 'required'
		};

		if (postData.customerCreate) {
			let v = new Validator(postData.postData, {
				name: filed.name,
				email: filed.email,
				phone: filed.phone,
				password: filed.password
			});
			v.check();
			return { validation: validation, error: v.errors };
		} else if (postData.createProduct) {
			let v = new Validator(postData.postData, {
				name: filed.name,
				email: filed.amount,
				phone: filed.quantity,
				password: filed.description
			});
			v.check();
			return { validation: validation, error: v.errors };
		}
	}
};

module.exports = CustomValidate;
