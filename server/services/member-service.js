const db = require("../db");

class MemberService {
    async get(groupId) {
        const [rows] = await db.query(
            "SELECT members.*, users.name FROM members JOIN users ON members.userId = users.id WHERE groupId = ? AND isBanned = false",
            [groupId]
        );
        return rows;
    }

    async kick(memberId) {
        const [rows] = await db.query("SELECT * FROM members WHERE id = ?", [
            memberId,
        ]);
        await db.query("DELETE FROM members WHERE id = ?", [memberId]);
        return rows[0];
    }

    async ban(memberId, banReason) {
        const [rows] = await db.query(
            "UPDATE members SET isBanned = true WHERE id = ?",
            [memberId]
        );
        return rows[0];
    }
}

module.exports = MemberService;
