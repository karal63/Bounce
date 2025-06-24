const db = require("../db");
const jwt = require("jsonwebtoken");
const ApiError = require("../exceptions/api-error");

const verifyToken = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) next(ApiError.UnauthorizedError());

    const accessToken = authHeader.split(" ")[1];
    if (!accessToken) next(ApiError.UnauthorizedError());

    try {
        const user = jwt.verify(accessToken, process.env.ACCESS_TOKEN);
        req.user = user;
        next();
    } catch (error) {
        next(ApiError.UnauthorizedError());
    }
};

module.exports = verifyToken;
