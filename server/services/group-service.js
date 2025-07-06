const db = require("../db");
const ApiError = require("../exceptions/api-error");

class GroupService {
    async get(userId) {
        const [rows] = await db.query(
            "SELECT groups.*, members.userId FROM groups JOIN members ON members.groupId = groups.id WHERE members.userId = ?",
            [userId]
        );
        return rows;
    }

    async create(name, ownerId, description) {
        const [nameRows] = await db.query(
            "SELECT 1 FROM groups WHERE name = ? LIMIT 1",
            [name]
        );
        if (nameRows.length > 0) {
            throw ApiError.BadRequest("Name already exists.");
        }

        const [rows] = await db.query(
            "INSERT INTO groups (name, ownerId, description) VALUES (?, ?, ?)",
            [name, ownerId, description]
        );

        const [newGroup] = await db.query("SELECT * FROM groups WHERE id = ?", [
            rows.insertId,
        ]);
        return newGroup[0];
    }
}

module.exports = GroupService;
