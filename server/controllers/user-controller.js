const UserService = require("../services/user-service");

const user = new UserService();

class UserController {
    async getMessagedUsers(req, res, next) {
        try {
            const { userId } = req.params;
            const users = await user.getMessagedUsers(userId);
            console.log(users);
            res.status(200).json(users);
        } catch (error) {
            next(error);
        }
    }

    async addMessagedUser(req, res, next) {
        try {
            const { targetId } = req.params;
            const { userId } = req.body;
            await user.addMessagedUser(userId, targetId);
            res.sendStatus(200);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = UserController;
