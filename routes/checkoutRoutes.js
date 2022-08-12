const express = require('express');
const router = express.Router();
const CheckOut = require('../model/checkout');
const Customer = require('../model/customer');
const Orders = require('../model/orders');

router.post('/buy', async (req, res) => {
	let postData = req.body;
	try {
		let customerResult = await Customer.findById(postData.customerID);
		if (!customerResult) {
			return res.status(200).send({
				status: 'error',
				errorMessage: 'Customer Details Not found!'
			});
		}
		let orderResult = await Orders.findById(postData.orderID);
		if (!orderResult) {
			return res.status(200).send({
				status: 'error',
				errorMessage: 'Order Details Not found!'
			});
		}
		if (orderResult.completed) {
			return res.status(200).send({
				status: 'error',
				errorMessage: 'This Order already paid!'
			});
		}
		orderResult.completed = true;
		await Orders.updateOne(orderResult);
		let checkOut = await CheckOut(postData);
		await checkOut.save();
		res.status(200).send({ status: 'ok', data: checkOut });
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
		let result = await CheckOut.find(postData);
		if (!result) {
			return res.status(200).send({
				status: 'error',
				errorMessage: 'CheckOut Details Not found!'
			});
		}
		await CheckOut.updateOne(postData);
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
			result = await CheckOut.findById(postData.ID);
		} else if (postData.customerID) {
			result = await CheckOut.find({ customerid: postData.customerID });
		} else {
			result = await CheckOut.find({});
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
		await CheckOut.deleteOne({ _id: postData.ID });
		res.status(200).send({ status: 'ok', data: 'deleted successfully!' });
	} catch (err) {
		console.error(err);
		return res
			.status(200)
			.send({ status: 'error', errorMessage: 'internal server error' });
	}
});
module.exports = router;
