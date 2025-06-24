const jwt = require("jsonwebtoken");

class TokenService {
    async generateTokens(email, name) {
        const accessToken = jwt.sign(
            { username: name, email },
            process.env.ACCESS_TOKEN,
            { expiresIn: "15min" }
        );

        const refreshToken = jwt.sign(
            { username: name, email },
            process.env.REFRESH_TOKEN,
            { expiresIn: "30d" }
        );

        return { accessToken, refreshToken };
    }

    async validateRefreshToken(token) {
        try {
            const userData = await jwt.verify(token, process.env.REFRESH_TOKEN);
            return userData;
        } catch (error) {
            return null;
        }
    }
}

module.exports = TokenService;
