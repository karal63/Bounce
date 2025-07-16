const { io } = require("../socket");

const MemberService = require("../services/member-service");
const member = new MemberService();

class MemberController {
    async getMembers(req, res, next) {
        try {
            const { groupId } = req.params;
            const { senderId } = req.body;
            const members = await member.get(groupId);
            io.to(senderId).emit("members-list", members);
            return res.status(200).json(members);
        } catch (error) {
            console.log(error);
            next();
        }
    }

    async kickMember(req, res, next) {
        try {
            const { memberId } = req.params;
            const deletedMember = await member.kick(memberId);

            io.to(deletedMember.groupId).emit("member-kicked", memberId);
            const sockets = await io.fetchSockets();
            for (const socket of sockets) {
                if (
                    Number(socket.handshake.query.id) === deletedMember.userId
                ) {
                    io.to(socket.id).emit("deleted:leave-group", deletedMember);
                }
            }
            // make this directly to kicked user

            res.sendStatus(200);
        } catch (error) {
            next(error);
        }
    }

    async banMember(req, res, next) {
        try {
            const { memberId, banReason } = req.body;
            console.log(memberId);
            const bannedMember = await member.ban(memberId, banReason);

            // io.to(deletedMember.groupId).emit("member-kicked", memberId);
            // const sockets = await io.fetchSockets();
            // for (const socket of sockets) {
            //     if (
            //         Number(socket.handshake.query.id) === deletedMember.userId
            //     ) {
            //         io.to(socket.id).emit("deleted:leave-group", deletedMember);
            //     }
            // }
            // send him command to delete group locally and show modal with ban message

            res.sendStatus(200);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = MemberController;
