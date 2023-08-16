const express = require("express");
const multer = require("multer");
const cors = require("cors");
const app = express();
const fs = require("fs"); // Import the fs module
const path = require("path"); // Import the path module

const corsOptions = {
  origin: "http://localhost:8080", // Adjust this to match your Vue development server's origin
  methods: "GET, POST, PUT, DELETE",
  optionsSuccessStatus: 200, // Some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));
app.use("/uploads", express.static("uploads"));
const fileFilter = (_req, file, cb) => {
  const allowedTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "application/pdf",
  ];
  if (!allowedTypes.includes(file.mimetype)) {
    const error = new Error("Incorrect file");
    error.code = "INCORRECT_FILETYPE";
    return cb(error, false);
  }
  cb(null, true);
};

const storage = multer.diskStorage({
  destination: function (_req, _file, cb) {
    cb(null, path.join( "uploads"));
  },
  filename: function (_req, file, cb) {
    cb(null, file.fieldname + "-" + file.originalname);
  },
});

const upload = multer({
  storage: storage,
  fileFilter,
  limits: {
    fileSize: 10000000,
  },
});

const PORT = process.env.PORT || "3000";

app.post("/api/upload", upload.single("file"), (req, res) => {
  if (!req.file) {
    console.log("No file received");
    res.status(400).json({ error: "wrong format" });
    return;
  }
  if (req.file) {
    console.log("File uploaded successfully:", req.file.filename);
    res.json({
      message: "File uploaded successfully",
      filename: req.file.filename,
    });
  } else {
    console.log("File upload failed");
    res.status(500).json({ error: "File upload failed" });
  }
});
console.log("hit");
app.use((err, _req, res, _next) => {
  if (err.code === "INCORRECT_FILETYPE") {
    res.status(422).json({ error: "Only images and PDFs are allowed" }); 
    return;
  }
  if (err.code === "LIMIT_FILE_SIZE") {
    res.status(422).json({ error: "Maximum file size is 10MB" });
    return;
  }
});

app.get("/api/upload/data", (_req, res) => {
  const directoryPath = path.join(__dirname, "uploads");
  
  
  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      console.error("Error reading directory:", err);
      res.status(500).json({ error: "Error reading directory" });
      return;
    }

    const imageFiles = files.filter(file => {
      const fileExtension = path.extname(file).toLowerCase();
      return [".jpg", ".jpeg", ".png",".pdf"].includes(fileExtension);
   
      
    });

    res.json({ message: " Files retrieved successfully", files: imageFiles });
  });
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
