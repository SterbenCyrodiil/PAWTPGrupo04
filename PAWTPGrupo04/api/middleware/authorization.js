const authorize = (opts) => {
	opts = opts || [];
	return (req, res, next) => {
		if (!req.session) {
			next({
				message: 'Not authenticated. Access Denied',
				status: 401
			})
		} else {
			const hasAuthorization = opts.includes(req.session.role);
		
			if (hasAuthorization) {
				next();
			} else {
				next({
					message: 'Not authorized. Access Denied',
					status: 403
				})
			}
		}
	}
}

module.exports = authorize