const bcrypt = require("bcrypt");
const TokenService = require("../services/token-service");
const token = new TokenService();

class UserService {
    async signup(email, password, name) {
        const hashPassword = await bcrypt.hash(password, 10);

        // ===
        // store in databse
        // ===

        const tokens = await token.generateTokens(email, name);

        return { ...tokens };
    }
}

module.exports = UserService;
