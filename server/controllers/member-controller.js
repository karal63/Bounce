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
}

module.exports = MemberController;
