var envs = process.env.NODE_ENV || 'development';
if (envs === 'development') {
	const env = require('dotenv');
	env.config({ path: './config/config.env' });
}
// main import starting here
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 3000;
const morgan = require('morgan');

// basic requirements
require('../mongo/mongoose');
const tokenChecker = require('../helper/tokenchecker');

// routes requirements
const customer = require('../routes/customerRoute');
const product = require('../routes/productRoute');
const orders = require('../routes/ordersRoute');
const checkout = require('../routes/checkoutRoutes');

app.use(express.json());
app.use(tokenChecker);
app.use(cors());
app.use(morgan('dev'));

// route Configurations
app.use('/customer', customer);
app.use('/product', product);
app.use('/orders', orders);
app.use('/checkout', checkout);

app.on('ready', () => {
	app.listen(port, () => {
		console.log('server is running on port ' + port);
	});
});

// addition config
mongoose.connection.on('connected', () => {
	console.clear();
	console.log('MongoDB is connected Successfully.');
	app.emit('ready');
});
