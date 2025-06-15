const db = require("../db");
const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
    const token = req.cookies.refreshToken;
    if (!token) return res.status(401).json({ messege: "No token provided" });

    try {
        const user = jwt.verify(
            req.cookies.refreshToken,
            process.env.REFRESH_TOKEN
        );
        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({ messege: "Invalid token." });
    }
};

module.exports = verifyToken;
