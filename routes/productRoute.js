const express = require('express');
const router = express.Router();
const CustomValidate = require('../helper/validationhelper');
const Product = require('../model/product');

router.post('/create', async (req, res) => {
	let postData = req.body;
	try {
		let data = CustomValidate.inputValidate({
			postData: postData,
			createProduct: true
		});
		if (data.validation) {
			return res
				.status(200)
				.send({ status: 'error', errorMessage: data.error });
		}
		let exist = await Product.find({ name: postData.name });
		if (exist.length > 0) {
			return res.status(200).send({
				status: 'error',
				errorMessage: 'Product Details aldready found!'
			});
		}
		let product = await Product(postData);
		await product.save();
		res.status(200).send({ status: 'ok', data: product });
	} catch (err) {
		console.error(err);
		return res
			.status(200)
			.send({ status: 'error', errorMessage: 'internal server error' });
	}
});

router.post('/update', async (req, res) => {
	let postData = req.body;
	try {
		let result = await Product.findOne({ _id: postData.ID });
		if (!result) {
			return res.status(200).send({
				status: 'error',
				errorMessage: 'Product Details Not found!'
			});
		}
		await Product.updateOne(postData);
		res.status(200).send({ status: 'ok', data: 'updated successfully!' });
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
			result = await Product.findById(postData.ID);
		} else {
			result = await Product.find({});
		}
		res.status(200).send({ status: 'ok', data: result });
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
		await Product.deleteOne({ _id: postData.ID });
		res.status(200).send({ status: 'ok', data: 'deleted successfully!' });
	} catch (err) {
		console.error(err);
		return res
			.status(200)
			.send({ status: 'error', errorMessage: 'internal server error' });
	}
});

module.exports = router;
