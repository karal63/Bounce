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

    async login(email, password) {
        try {
            const query = "SELECT * FROM users WHERE email = ?";
            const [rows] = await db.query(query, [email]);
            if (!rows[0]) return { messege: "User doesnt exist" };

            const matchingPassword = await bcrypt.compare(
                password,
                rows[0].password
            );
            if (!matchingPassword) return { messege: "Wrong password" };

            const tokens = await token.generateTokens(email, rows[0].name);
            const dbUser = rows[0];

            return { tokens, dbUser };
        } catch (error) {
            console.log(error);
        }
    }

    async refresh(refreshToken, userDto) {
        if (!refreshToken) return { messege: "Token is not provided" };
        const tokens = await token.generateTokens(userDto.email, userDto.name);

        try {
            const query = "SELECT * FROM users WHERE email = ?";
            const [rows] = await db.query(query, [userDto.email]);
            const dbUser = rows[0];
            return {
                tokens,
                dbUser,
            };
        } catch (error) {
            return { message: "Database error" };
        }
    }
}

module.exports = UserService;
