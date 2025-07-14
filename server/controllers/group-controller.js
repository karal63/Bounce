const { validationResult } = require("express-validator");
const ApiError = require("../exceptions/api-error");
const GroupService = require("../services/group-service");
const { io } = require("../socket");
const MemberService = require("../services/member-service");

const group = new GroupService();
const memberService = new MemberService();

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
            const { newGroup, newMember } = await group.join(link, userId);
            io.to(newGroup.id).emit("member-joined", newMember);
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

            const members = await memberService.get(groupId);
            io.fetchSockets().then((sockets) => {
                sockets.forEach((socket) => {
                    for (const member of members) {
                        if (socket.handshake.query.id == member.userId) {
                            if (member.userId === req.user.id) continue;
                            io.to(socket.id).emit("group-deleted", groupId);
                            break;
                        }
                    }
                });
            });
            await res.status(200).json("group deleted");
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    async leaveGroup(req, res, next) {
        try {
            const { groupId } = req.params;
            await group.leave(groupId, req.user);
            io.to(Number(groupId)).emit("member-left", req.user.id);
            res.status(200).json("group left");
        } catch (error) {
            console.log(error);
            next(error);
        }
    }
}

module.exports = GroupController;
