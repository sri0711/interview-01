const express = require('express');
const router = express.Router();
const CustomValidate = require('../helper/validationhelper');
const Customer = require('../model/customer');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {getSample} = require('../helper/middleware')

router.post('/create', async (req, res) => {
	let postData = req.body;
	postData.isadmin = false;
	try {
		let exist = await Customer.find({ email: postData.email });
		if (exist.length > 0) {
			return res.status(200).send({
				status: 'error',
				errorMessage: 'user Details aldready found!'
			});
		}
		let data = await CustomValidate.inputValidate({
			postData: postData,
			customerCreate: true
		});
		if (data.validation) {
			return res
				.status(200)
				.send({ status: 'error', errorMessage: data.error });
		}
		let customer = await Customer(postData);
		customer.save();
		res.status(200).send({ status: 'ok', data: customer });
	} catch (err) {
		console.error(err);
		return res
			.status(200)
			.send({ status: 'error', errorMessage: 'internal server error' });
	}
});
router.post('/login', async (req, res) => {
	let postData = req.body;
	console.log(getSample());
	console.log(Utils.getSample(),"from Global");
	try {
		let result = await Customer.findOne({ email: postData.email });
		if (!result) {
			return res.status(200).send({
				status: 'error',
				errorMessage: 'user Details Not found!'
			});
		}
		let passwordMatched = await bcrypt.compare(
			postData.password,
			result.password
		);
		if (passwordMatched) {
			let token = jwt.sign({ result }, process.env.SECRET, {
				expiresIn: '1d'
			});
			res.status(200).send({ status: 'ok', data: token });
		} else {
			return res.status(200).send({
				status: 'error',
				errorMessage: 'Password did not Matched!'
			});
		}
	} catch (err) {
		console.error(err);
		return res
			.status(200)
			.send({ status: 'error', errorMessage: 'internal server error' });
	}
});
router.post('/get', async (req, res) => {
	let postData = req.body;
	let result;

	try {
		if (postData.ID) {
			result = await Customer.findById(postData.ID);
		} else {
			result = await Customer.find({});
		}
		res.status(200).send({ status: 'ok', data: result });
	} catch (err) {
		console.error(err);
		return res
			.status(200)
			.send({ status: 'error', errorMessage: 'internal server error' });
	}
});

router.post('/update', async (req, res) => {
	let postData = req.body;
	if (postData.password) {
		return res.status(200).send({
			status: 'error',
			errorMessage: 'Can not allow update password!'
		});
	}
	try {
		let result = await Customer.findById(postData.ID);
		if (!result) {
			return res.status(200).send({
				status: 'error',
				errorMessage: 'user Details Not found!'
			});
		}
		let data = await CustomValidate.inputValidate({
			postData: postData,
			customerCreate: true
		});
		if (data.validation) {
			return res
				.status(200)
				.send({ status: 'error', errorMessage: data.error });
		}
		await Customer.updateOne(postData);
		res.status(200).send({ status: 'ok', data: 'updated successfully!' });
	} catch (err) {
		console.error(err);
		return res
			.status(200)
			.send({ status: 'error', errorMessage: 'internal server error' });
	}
});

router.post('/delete', async (req, res) => {
	let postData = req.body;
	try {
		let data = await Customer.findById(postData.ID);
		if (!data) {
			return res.status(200).send({
				status: 'error',
				errorMessage: 'user Details Not found!'
			});
		}
		if (data.isadmin) {
			return res.status(200).send({
				status: 'error',
				errorMessage: 'unable to delete admin Profile!'
			});
		} else {
			await Customer.deleteOne(data);
		}
		res.status(200).send({ status: 'ok', data: 'deleted successfully!' });
	} catch (err) {
		console.error(err);
		return res
			.status(200)
			.send({ status: 'error', errorMessage: 'internal server error' });
	}
});

module.exports = router;
