const { User } = require('../db');

async function userMiddleware(req, res, next) {
    const username = req.headers['username'];
    const password = req.headers['password'];

    if (!username || !password || !await validateUser(req, username, password)) {
        return res.status(403).json({
            message: "User authentication failed"
        });
    }
    next();
}

const validateUser = async (req, username, password) => {
    try {
        const user = await User.findOne({ username: username });

        if (!user || user.password != password) {
            return false;
        }
        req.user = user;  // embed the user in the req for the route service
        return true;
    }
    catch (e) {
        return false;
    }
}

module.exports = userMiddleware;