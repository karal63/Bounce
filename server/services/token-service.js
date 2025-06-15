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
}

module.exports = TokenService;
