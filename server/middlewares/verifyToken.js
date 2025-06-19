const db = require("../db");
const jwt = require("jsonwebtoken");
const ApiError = require("../exceptions/api-error");

const verifyToken = async (req, res, next) => {
    const token = req.cookies.refreshToken;
    if (!token) throw ApiError.UnauthorizedError();

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
