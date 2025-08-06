const db = require("../db");

class StickerService {
    async get() {
        const [rows] = await db.query("SELECT * FROM stickers");
        return rows;
    }
}

module.exports = StickerService;
