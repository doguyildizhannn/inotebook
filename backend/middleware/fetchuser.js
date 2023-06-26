const jwt = require('jsonwebtoken');

const JWT_SECRET = "f6?.èrtg+/--1>z%";

const fetchuser = async (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Please authenticate using a valid token."
        });
    }
    try {
        const decodedJwt = jwt.verify(token, JWT_SECRET);
        req.userId = decodedJwt.userId;
        next();
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
}

module.exports = fetchuser;