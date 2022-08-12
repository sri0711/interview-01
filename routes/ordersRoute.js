const express = require('express');
const router = express.Router();
const Orders = require('../model/orders');

router.post('/create', async (req, res) => {
	let postData = req.body;
	try {
		let orders = await Orders(postData);
		await orders.save();
		res.status(200).send({ status: 'ok', data: orders });
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
		let result = await Orders.find(postData);
		if (!result) {
			return res.status(200).send({
				status: 'error',
				errorMessage: 'Orders Details Not found!'
			});
		}
		await Orders.updateOne(postData);
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
		if (postData.id) {
			result = await Orders.findById(postData.id);
		} else if (postData.customerID) {
			result = await Orders.find({ customerid: postData.customerID });
		} else {
			result = await Orders.find({});
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
		await Orders.deleteOne({ _id: postData.ID });
		res.status(200).send({ status: 'ok', data: 'deleted successfully!' });
	} catch (err) {
		console.error(err);
		return res
			.status(200)
			.send({ status: 'error', errorMessage: 'internal server error' });
	}
});
module.exports = router;
