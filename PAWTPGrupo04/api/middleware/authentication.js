const jwt = require('jsonwebtoken')

const sessionMiddleware = (req, _, next) => {
	const sessionToken = req.cookies.user_session;
    try {
		if (sessionToken) {
			const user_data = jwt.verify(sessionToken, process.env.JWT_SECRET);
			req.user_data = user_data;
		} else {
			req.user_data = null;
			// res.status(401).send('Access Denied');
		}
	} catch(err) {
		console.error(err);
		req.user_data = null;
		// res.status(400).send('Invalid Token');
	}
	next();
}

module.exports = sessionMiddleware