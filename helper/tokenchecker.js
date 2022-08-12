const jwt = require('jsonwebtoken');
const allowedRoutes = ['/customer/login', '/customer/create', '/product/get'];
const adminRoutes = ['/product/create', '/product/update', '/product/delete'];

const tokenChecker = async (req, res, next) => {
	let path = String(req.originalUrl).toLowerCase();
	let token = req.headers['x-access-token'] || req.headers['authorization'];
	if (token) {
		token = token.replace('Bearer ', '');
		try {
			jwt.verify(token, process.env.SECRET);
			if (adminRoutes.includes(path)) {
				let data = jwt.decode(token, process.env.SECRET);
				if (!data.result.isadmin) {
					return res.status(200).send({
						status: 'error',
						errorMessage: 'you not allowed to access this path ' + path
					});
				}
				next();
			} else {
				next();
			}
		} catch (err) {
			return res.status(403).json({
				status: 'error',
				errorMessage: err
			});
		}
	} else if (allowedRoutes.includes(path)) {
		console.log('ok');
		next();
	} else {
		return res.status(403).json({
			status: 'error',
			errorMessage: 'No Token Provided!.'
		});
	}
};

module.exports = tokenChecker;
