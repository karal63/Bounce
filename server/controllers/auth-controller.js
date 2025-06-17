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
            next(error);
        }
    }

    async login(req, res, next) {
        try {
            const { email, password } = req.body;
            const userData = await user.login(email, password);
            const { tokens, dbUser } = userData;
            res.cookie("refreshToken", tokens.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true,
            });
            return res.status(200).json({
                accessToken: tokens.accessToken,
                user: dbUser,
            });
        } catch (error) {
            next(error);
        }
    }

    async logout(req, res, next) {
        try {
            res.clearCookie("refreshToken");
            res.status(200).send("logout");
        } catch (error) {
            next(error);
        }
    }

    async refresh(req, res, next) {
        try {
            const refreshToken = req.cookies.refreshToken;
            const userData = await user.refresh(refreshToken, req.user);
            const { tokens, dbUser } = userData;

            res.cookie("refreshToken", tokens.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true,
            });
            return res.status(200).json({
                accessToken: tokens.accessToken,
                dbUser,
            });
        } catch (error) {
            next(error);
        }
    }

    async activate(req, res, next) {
        try {
            const userDto = req.user;
            console.log(req.params.id);
            const userData = await user.activate(userDto);
            res.status(200).json({ message: "accound activated" });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = AuthController;
