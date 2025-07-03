const db = require("../db");

class MemberService {
    async get(groupId) {
        const [rows] = await db.query(
            "SELECT members.*, users.name FROM members JOIN users ON members.userId = users.id WHERE groupId = ?",
            [groupId]
        );
        return rows;
    }
}

module.exports = MemberService;
