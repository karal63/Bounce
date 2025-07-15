const db = require("../db");

class MemberService {
    async get(groupId) {
        const [rows] = await db.query(
            "SELECT members.*, users.name FROM members JOIN users ON members.userId = users.id WHERE groupId = ?",
            [groupId]
        );
        return rows;
    }

    async kick(memberId) {
        const [rows] = await db.query("DELETE FROM members WHERE id = ?", [
            memberId,
        ]);
        return rows;
    }
}

module.exports = MemberService;
