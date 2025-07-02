const db = require("../db");

class MemberService {
    async get(groupId) {
        const [rows] = await db.query(
            "SELECT * FROM members WHERE groupId = ?",
            [groupId]
        );
        return rows;
    }
}

module.exports = MemberService;
