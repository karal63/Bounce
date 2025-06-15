const UserService = require("../services/user-service");
const user = new UserService();

class AuthController {
    async signup(req, res, next) {
        try {
            const { email, password, name } = req.body;
            const userData = await user.signup(email, password, name);

            res.cookie("refreshToken", userData.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true,
            });

            return res.status(200).json(userData.accessToken);
        } catch (error) {
            console.log(error);
            return res.status(400);
        }
    }

    async login(req, res, next) {}
    async logout(req, res, next) {}
    async refresh(req, res, next) {}
    async activate(req, res, next) {}
}

module.exports = AuthController;
