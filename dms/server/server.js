const express = require('express');
const multer = require('multer');
const uuid = require('uuid').v4;
const cors = require('cors');
const app = express();
 
app.use(cors());

const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/jpg", "image/png","application/pdf"];
  if (!allowedTypes.includes(file.mimetype)) {
    const error = new Error("Incorrect file");
    error.code = "INCORRECT_FILETYPE";
    return cb(error, false)
  }
  cb(null, true);
}
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/');
    },

    // By default, multer removes file extensions so let's add them back
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-'  + (file.originalname));
    }
});
const upload = multer({ storage: storage, fileFilter, limits: {
    fileSize: 10000000}, }); 

const PORT = '5000' || process.env.PORT;

app.post('/upload', upload.single('file'), (req, res) => {
  res.json({ file: req.file });
});

app.use((err, req, res, next) => {
  if (err.code === "INCORRECT_FILETYPE") {
    res.status(422).json({ error: 'Only images are allowed' });
    return;
  }
  if (err.code === "LIMIT_FILE_SIZE") {
    res.status(422).json({ error: 'Allow file size is 500KB' });
    return;
  }
});       

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));