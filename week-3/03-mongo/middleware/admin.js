const { Admin } = require("../db");

// Middleware for handling auth
async function adminMiddleware(req, res, next) {
    const username = req.headers['username'];
    const password = req.headers['password'];

    if (!username || !password || !await validateAdmin(username, password)) {
        return res.status(403).json({
            message: "Admin authentication failed"
        });
    }
    next();
}

const validateAdmin = async (username, password) => {
    try {
        const admin = await Admin.findOne({ username: username });
        if (admin && admin.password == password) return true;
        return false;
    }
    catch (e) {
        return false;
    }
}

module.exports = adminMiddleware;