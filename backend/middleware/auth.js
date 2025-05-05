const jwt = require("jsonwebtoken");
const JWT_SECRET = "your-secret-key";

function auth(req, res, next) {
    const token = req.header("Authorization");
    if (!token) return res.status(401).json({ msg: "No auth token" });

    try {
        const verified = jwt.verify(token, JWT_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        res.status(401).json({ msg: "Token verification failed" });
    }
}

module.exports = auth;
