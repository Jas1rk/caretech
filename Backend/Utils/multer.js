const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../../Frondend/src/assets/images"));
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});



const upload = multer({
  storage: storage,
  // limits: { fileSize: 5 * 1024 * 1024 },
  // fileFilter: fileFilter,
});
module.exports = upload;
