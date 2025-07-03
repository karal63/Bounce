const db = require("../db");

class GroupService {
    async get(userId) {
        const [rows] = await db.query(
            "SELECT groups.*, members.userId FROM groups JOIN members ON members.groupId = groups.id WHERE members.userId = ?",
            [userId]
        );
        return rows;
    }
}

module.exports = GroupService;
