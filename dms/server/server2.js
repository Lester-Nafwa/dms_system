
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


downloadFile (req, res, next) {
        File.findOne({name: req.params.name}, (err, file) => {
            if (err) {
                res.status(400).end();
            }

            if (!file) {
                File.findOne({encodedName: req.params.name}, (err, file) => {
                    if (err) {
                        res.status(400).end();
                    }

                    if (!file) {
                        res.status(404).end();
                    }

                    let fileLocation = path.join(__dirname, '..', 'uploads', file.name)

                    res.download(fileLocation, (err) => {
                        if (err) {
                            res.status(400).end();
                        }
                    })
                })
            }
        })
    },