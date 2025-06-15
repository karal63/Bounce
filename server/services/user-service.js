const bcrypt = require("bcrypt");
const TokenService = require("../services/token-service");
const redisClient = require("../redisClient");
const token = new TokenService();
const uuid = require("uuid");

class UserService {
    async signup(email, password, name) {
        const hashPassword = await bcrypt.hash(password, 10);

        // ===
        // store in databse
        // ===

        const tokens = await token.generateTokens(email, name);

        // ===
        // store refresh key in redis
        // ===
        const sessionId = uuid.v4();
        await redisClient.set(
            `refresh_token:user:${name}:${sessionId}`,
            tokens.refreshToken,
            "EX",
            30 * 24 * 60 * 60 * 1000
        );

        return { ...tokens };
    }
}

module.exports = UserService;
