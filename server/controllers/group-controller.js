const { validationResult } = require("express-validator");
const ApiError = require("../exceptions/api-error");
const GroupService = require("../services/group-service");

const group = new GroupService();

class GroupController {
    async getGroups(req, res, next) {
        try {
            const { userId } = req.params;
            const groups = await group.get(userId);
            res.status(200).json(groups);
        } catch (error) {
            next(error);
        }
    }

    async createGroup(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest("Validation error."));
            }
            const { name, ownerId, description } = req.body;
            const newGroup = await group.create(name, ownerId, description);
            res.status(200).json(newGroup);
        } catch (error) {
            next(error);
        }
    }

    async joinGroup(req, res, next) {
        try {
            const { link } = req.params;
            const { userId } = req.body;
            const newGroup = await group.join(link, userId);
            res.status(200).json(newGroup);
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    async deleteGroup(req, res, next) {
        try {
            const { groupId } = req.params;
            await group.delete(groupId, req.user);

            res.status(200).json("group deleted");
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    async leaveGroup(req, res, next) {
        try {
            const { groupId } = req.params;
            await group.leave(groupId, req.user);
            res.status(200).json("group left");
        } catch (error) {
            console.log(error);
            next(error);
        }
    }
}

module.exports = GroupController;
