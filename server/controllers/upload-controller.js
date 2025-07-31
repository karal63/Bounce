const cloudinary = require("../cloudinary");
const { Readable } = require("stream");
const { v4 } = require("uuid");

class UploadController {
    async uploadImage(req, res, next) {
        try {
            console.log("== upload image ==");
            const result = cloudinary.uploader.upload_stream(
                (error, result) => {
                    if (error) return res.status(500).json(error);
                    return res.json({ id: v4(), url: result.secure_url });
                }
            );

            require("stream").Readable.from(req.file.buffer).pipe(result);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = UploadController;
