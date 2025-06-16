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
            console.log("================");
            return res.status(400).json({ messege: "Database error" });
            // add error handling, show where duplicate keys or whatever
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
            res.sendStatus(401);
            console.log(error);
        }
    }

    async logout(req, res, next) {
        res.clearCookie("refreshToken");
        res.status(200).send("logout");
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
            console.log(error);
            res.status(401).json({ message: "Error during refreshing tokens" });
        }
    }

    async activate(req, res, next) {}
}

module.exports = AuthController;
