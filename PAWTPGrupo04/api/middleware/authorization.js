const authorize = (opts) => {

	opts = opts || [];

	return (req, res, next) => {
		if (!req.user_data)
		{
			res.status(401).json({success: false, msg: 'Not authenticated. Access Denied'});
		}
		const hasAuthorization = opts.includes(req.user_data.role);
		
		if (hasAuthorization)
		{
			next();
		} else 
		{
			res.status(403).json({success: false, msg: 'Not authorized. Access Denied'});
		}
	}
}

module.exports = authorize