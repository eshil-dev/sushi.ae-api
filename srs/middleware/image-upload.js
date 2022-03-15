import util from 'util';
import multer from 'multer';
import path from 'path';

const __dirname = path.resolve();

const maxSize = 2 * 1024 * 1024;
let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __dirname + '/uploads');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});

let uploadFile = multer({
  storage: storage,
  limits: { fileSize: maxSize },
}).single("file");

let uploadFileMiddleware = util.promisify(uploadFile);

export default uploadFileMiddleware;
