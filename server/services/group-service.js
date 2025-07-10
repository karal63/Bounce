const { nanoid } = require("nanoid");
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

        const invitationLink = nanoid(8);

        const [rows] = await db.query(
            "INSERT INTO groups (name, ownerId, description, invitationLink) VALUES (?, ?, ?, ?)",
            [name, ownerId, description, invitationLink]
        );

        await db.query(
            "INSERT INTO members (groupId, userId, role) VALUES (?, ?, ?)",
            [rows.insertId, ownerId, "member"]
        );

        const [newGroup] = await db.query("SELECT * FROM groups WHERE id = ?", [
            rows.insertId,
        ]);
        return newGroup[0];
    }

    async join(link, userId) {
        const [matchingGroupRows] = await db.query(
            "SELECT * FROM groups WHERE invitationLink = ?",
            [link]
        );
        const isValidLink = matchingGroupRows.length > 0;
        if (!isValidLink) throw ApiError.BadRequest("Link is not valid");

        const groupId = matchingGroupRows[0].id;

        const [membersRows] = await db.query(
            "SELECT userId FROM members WHERE groupId = ? AND userId = ?",
            [groupId, userId]
        );

        if (membersRows.length !== 0)
            throw ApiError.BadRequest("User already exists in this group.");

        await db.query(
            "INSERT INTO members (groupId, userId, role) VALUES (?, ?, ?)",
            [groupId, userId, "member"]
        );
        return matchingGroupRows[0];
    }

    async delete(groupId, userDto) {
        const [userRows] = await db.query(
            "SELECT * FROM users WHERE email = ?",
            [userDto.email]
        );
        const user = userRows[0];

        const [groupRows] = await db.query(
            "SELECT * FROM groups WHERE id = ? AND ownerId = ?",
            [groupId, user.id]
        );
        if (groupRows.length === 0)
            throw ApiError.BadRequest(
                "You have no permission to delete this group."
            );

        await db.query("DELETE FROM groups WHERE id = ? AND ownerId = ?", [
            groupId,
            user.id,
        ]);
    }
}

module.exports = GroupService;
