const StickerService = require("../services/sticker-service");

const sticker = new StickerService();

class StickerController {
    async get(req, res, next) {
        try {
            const stickers = await sticker.get();
            res.json(stickers);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = StickerController;
