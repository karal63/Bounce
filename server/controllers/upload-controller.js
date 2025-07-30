const cloudinary = require("../cloudinary");
const { Readable } = require("stream");

class UploadController {
    async uploadImage(req, res, next) {
        try {
            console.log("== upload image ==");
            const result = cloudinary.uploader.upload_stream(
                (error, result) => {
                    if (error) return res.status(500).json(error);
                    return res.json({ url: result.secure_url });
                }
            );

            // TODO:
            // add one more field in db (images) or add new table images with reference to message id
            // this api call returns an image, create attachments panel that will show selected image

            require("stream").Readable.from(req.file.buffer).pipe(result);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = UploadController;
