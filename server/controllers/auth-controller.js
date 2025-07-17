const { validationResult } = require("express-validator");
const UserService = require("../services/user-service");
const user = new UserService();
const ApiError = require("../exceptions/api-error");

class AuthController {
    async signup(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest("Validation error."));
            }

            const { email, password, name } = req.body;
            // const userData =
            await user.signup(email, password, name);
            // res.cookie("refreshToken", userData.refreshToken, {
            //     maxAge: 30 * 24 * 60 * 60 * 1000,
            //     httpOnly: true,
            // });
            return res.sendStatus(200);
            // .json(userData.accessToken);
        } catch (error) {
            next(error);
        }
    }

    async login(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest("Validation error."));
            }
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
            const userData = await user.refresh(refreshToken);
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

    async activate(req, res, next) {
        try {
            const activationLink = req.params.link;
            await user.activate(activationLink);
            res.status(200).redirect(process.env.CLIENT_HOST);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = AuthController;
