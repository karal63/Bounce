const { nanoid } = require("nanoid");
const db = require("../db");
const ApiError = require("../exceptions/api-error");
const UserService = require("./user-service");
const { v4 } = require("uuid");

const userService = new UserService();

class GroupService {
    async get(userId) {
        const [rows] = await db.query(
            "SELECT groups.*, members.userId FROM groups JOIN members ON members.groupId = groups.id WHERE members.userId = ? AND members.isBanned = false",
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
        const groupId = v4();

        const [rows] = await db.query(
            "INSERT INTO groups (id, name, ownerId, description, invitationLink) VALUES (?, ?, ?, ?, ?)",
            [groupId, name, ownerId, description, invitationLink]
        );

        await db.query(
            "INSERT INTO members (id, groupId, userId, role) VALUES (UUID(), ?, ?, ?)",
            [groupId, ownerId, "admin"]
        );

        const [newGroup] = await db.query("SELECT * FROM groups WHERE id = ?", [
            groupId,
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
            "SELECT userId, isBanned FROM members WHERE groupId = ? AND userId = ?",
            [groupId, userId]
        );

        if (membersRows.length !== 0) {
            if (membersRows[0].isBanned) {
                throw ApiError.BadRequest("You are banned from this group.");
            } else {
                throw ApiError.BadRequest("User already exists in this group.");
            }
        }

        const memberId = v4();
        await db.query(
            "INSERT INTO members (id, groupId, userId, role) VALUES (?, ?, ?, ?)",
            [memberId, groupId, userId, "member"]
        );

        const [newMemberRows] = await db.query(
            "SELECT members.*, users.name FROM members JOIN users ON members.userId = users.id WHERE members.id = ?",
            [memberId]
        );
        return { newGroup: matchingGroupRows[0], newMember: newMemberRows[0] };
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

    async leave(groupId, userDto) {
        const user = await userService.getUser(userDto);
        await db.query("DELETE FROM members WHERE groupId = ? AND userId = ?", [
            groupId,
            user.id,
        ]);
    }

    async rename(id, newGroupName) {
        await db.query("UPDATE groups SET name = ? WHERE id = ?", [
            newGroupName,
            id,
        ]);
    }
}

module.exports = GroupService;
