const UserService = require("../services/user-service");

const user = new UserService();

class UserController {
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
