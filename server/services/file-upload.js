const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
const { v4: uuidv4 } = require("uuid");

aws.config.update({
	accessKeyId: "AKIAIW4QE2SE3ZBAOYJQ",
	secretAccessKey: "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",
	region: "us-east-1",
});

const s3 = new aws.S3();

const MIME_TYPE_MAP = {
	"image/png": "png",
	"image/jpeg": "jpeg",
	"image/jpg": "jpg",
};

const upload = multer({
	storage: multerS3({
		s3: s3,
		bucket: "komuna-image",
		acl: "public-read",
		metadata: function (req, file, cb) {
			cb(null, { fieldName: "TASTING_MATA_DATA" });
		},
		key: function (req, file, cb) {
			cb(null, uuidv4().toString());
		},
	}),

	fileFilter: (req, file, cb) => {
		const isValid = !!MIME_TYPE_MAP[file.mimetype];
		let error = isValid ? null : new Error("Invalid mime type!");
		cb(error, isValid);
	},
});

module.exports = upload;
