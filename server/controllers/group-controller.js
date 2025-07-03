const GroupService = require("../services/group-service");

const group = new GroupService();

class GroupController {
    async getGroups(req, res, next) {
        try {
            const { userId } = req.params;
            const groups = await group.get(userId);
            res.status(200).json(groups);
        } catch (error) {
            console.log(error);
            next();
        }
    }
}

module.exports = GroupController;
