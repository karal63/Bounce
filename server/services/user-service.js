const bcrypt = require("bcrypt");
const TokenService = require("../services/token-service");
const redisClient = require("../redisClient");
const token = new TokenService();
const uuid = require("uuid");
const db = require("../db");
const ApiError = require("../exceptions/api-error");
const MailService = require("./mail-service");

const mail = new MailService();

class UserService {
    async signup(email, password, name) {
        // check if exists
        const [rows] = await db.query(
            "SELECT * FROM users WHERE email = ? OR name = ?",
            [email, name]
        );
        if (rows.length > 0) {
            throw ApiError.BadRequest(
                "User with this email or name already exists."
            );
        }
        const hashPassword = await bcrypt.hash(password, 10);
        const activationLink = uuid.v4();

        await db.query(
            "INSERT INTO users (email, password, name, activationLink) VALUES (?, ?, ?, ?)",
            [email, hashPassword, name, activationLink]
        );
        await mail.sendActivationMail(
            email,
            `${process.env.SERVER_HOST}/api/activate/${activationLink}`
        );

        const tokens = await token.generateTokens(email, name);
        return { ...tokens };

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
        const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [
            email,
        ]);

        const matchingPassword = await bcrypt.compare(
            password,
            rows[0].password
        );

        if (!matchingPassword || !rows[0])
            throw ApiError.BadRequest("Email or password are not correct.");

        const tokens = await token.generateTokens(email, rows[0].name);
        const dbUser = rows[0];

        return { tokens, dbUser };
    }

    async refresh(refreshToken, userDto) {
        if (!refreshToken) throw ApiError.BadRequest("Token is not provided.");
        const tokens = await token.generateTokens(userDto.email, userDto.name);

        const query = "SELECT * FROM users WHERE email = ?";
        const [rows] = await db.query(query, [userDto.email]);
        const dbUser = rows[0];
        return {
            tokens,
            dbUser,
        };
    }

    async activate(activationLink) {
        const [rows] = await db.query(
            "SELECT * FROM users WHERE activationLink = ?",
            [activationLink]
        );
        if (!rows[0]) throw ApiError.BadRequest("Invalid activation link.");
        await db.query(
            "UPDATE users SET isActivated = TRUE WHERE activationLink = ?",
            [activationLink]
        );
    }
}

module.exports = UserService;
