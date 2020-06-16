const jwt = require('jsonwebtoken')

const parseToken = (req) => {
    if (req.cookies.session && req.cookies.session.length) {
        return req.cookies.session
    } else {
        const authorization = req.header('auth-token')
        if (authorization && authorization.startsWith('Bearer ')) {
            return authorization.substring(7)
        }
    }
    return null
}

const sessionMiddleware = (req, _, next) => {
	const sessionToken = parseToken(req);
    try {
		if (sessionToken) {
			const session = jwt.verify(sessionToken, process.env.JWT_SECRET);
			req.session = session;
		} else {
			req.session = null;
			// res.status(401).send('Access Denied');
		}
	} catch(err) {
		console.error(err);
		req.session = null;
		// res.status(400).send('Invalid Token');
	}
	next();
}

module.exports = sessionMiddleware