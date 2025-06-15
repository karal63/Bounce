const bcrypt = require("bcrypt");
const TokenService = require("../services/token-service");
const redisClient = require("../redisClient");
const token = new TokenService();
const uuid = require("uuid");
const db = require("../db");

class UserService {
    async signup(email, password, name) {
        try {
            const hashPassword = await bcrypt.hash(password, 10);
            const query =
                "INSERT INTO users (email, password, name) VALUES (?, ?, ?)";
            await db.query(query, [email, hashPassword, name]);
            const tokens = await token.generateTokens(email, name);
            return { ...tokens };
        } catch (error) {
            console.log(error);
        }

        // ===
        // store refresh key in redis
        // ===
        // const sessionId = uuid.v4();
        // await redisClient.set(
        //     `refresh_token:user:${name}:${sessionId}`,
        //     tokens.refreshToken,
        //     {
        //         EX: 60 * 60 * 24 * 30, // 30 days in seconds
        //     }
        // );
    }
}

module.exports = UserService;
