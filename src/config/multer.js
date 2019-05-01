const multer = require("multer");
const path = require("path");
const crypto = require("crypto");
const aws = require("aws-sdk");
const multerS3 = require("multer-s3");
const config = require("../config/config");

const storageTypes = {
    local: multer.diskStorage({
        destination: (req, file, callback) => {
            callback(null, path.resolve(__dirname, "..", "..", "tmp", "uploads"));
        },
        filename: (req, file, callback) => {
            crypto.randomBytes(16, (err, hash) => {
                if (err) callback(err);
                else {
                    file.key = `${hash.toString("hex")}-${file.originalname}`;
                    callback(null, file.key);
                }
            });
        }
    }),
    s3: multerS3({
        s3: new aws.S3(),
        bucket: process.env.BUCKET_NAME,
        contentType: multerS3.AUTO_CONTENT_TYPE,
        acl: "public-read",
        key: (req, file, callback) => {
            crypto.randomBytes(16, (err, hash) => {
                if (err) callback(err);
                const fileName = `${hash.toString("hex")}-${file.originalname}`;
                callback(null, fileName);
            });
        }
    })
};

module.exports = {
    dest: path.resolve(__dirname, "..", "..", "tmp", "uploads"),
    storage: storageTypes[process.env.STORAGE_TYPE],
    limits: {
        fileSize: 2 * 1024 * 1024
    },
    fileFilter: (req, file, callback) => {
        const allowedMimes = ["image/jpeg", "image/pjpeg", "image/png", "image/gif"];
        if (allowedMimes.includes(file.mimetype)) {
            callback(null, true);
        } else {
            callback(new Error("invalid file type"));
        }
    }
};
