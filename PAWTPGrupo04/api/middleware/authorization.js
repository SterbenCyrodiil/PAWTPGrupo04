const authorize = (opts) => {

	opts = opts || [];

	return (req, _, next) => {
		if (!req.user_data)
		{
			res.status(401).send('Not authenticated. Access Denied');
		}
		const hasAuthorization = opts.includes(req.user_data.role);
		
		if (hasAuthorization)
		{
			next();
		} else 
		{
			res.status(403).send('Not authorized. Access Denied');
		}
	}
}

module.exports = authorize