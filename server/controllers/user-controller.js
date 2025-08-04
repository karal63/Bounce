const UserService = require("../services/user-service");

const user = new UserService();

class UserController {
    async getMessagedUsers(req, res, next) {
        try {
            const { userId } = req.params;
            const users = await user.getMessagedUsers(userId);
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

    async deleteMessagedUser(req, res, next) {
        try {
            const { id } = req.params;
            await user.deleteMessagedUser(id);
            res.sendStatus(200);
        } catch (error) {
            next(error);
        }
    }

    async update(req, res, next) {
        try {
            const data = req.body;
            const updatedUser = await user.update(req.user.id, data);
            res.json(updatedUser);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = UserController;
