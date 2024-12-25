// Middleware for handling auth
function adminMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;
    const token = authHeader.split(' ')[1];
    if (!token)
        return res.status(401).send({ message: 'Unauthorized' });
    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decodedToken;
        next();
    } catch (error) {
        return res.status(401).send({ message: 'Unauthorized' });
    }
}

module.exports = adminMiddleware;