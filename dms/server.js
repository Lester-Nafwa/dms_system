const express = require("express");
const multer = require("multer");
const cors = require("cors");
const app = express();
const fs = require("fs");
const path = require("path");

const corsOptions = {
  origin: "http://localhost:8080",
  methods: "GET, POST, PUT, DELETE",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use("/uploads", express.static("uploads"));

const storage = multer.diskStorage({
  destination: function (_req, _file, cb) {
    let destinationFolder = "";

    switch (_req.params.fileType) {
      case "cash":
        destinationFolder = "cash_uploads";
        break;
      case "cs":
        destinationFolder = "cs_uploads";
        break;
        case "rms":
          destinationFolder = "rms_uploads";
          break;
      case "ops":
        destinationFolder = "ops_uploads";
        break;
      default:
        destinationFolder = "uploads";
    }

    cb(null, path.join(__dirname, destinationFolder));
  },
  filename: function (_req, file, cb) {
    cb(null, file.fieldname + "-" + file.originalname);
  },
});
const upload = multer({
  storage: storage,
  fileFilter: (_req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "application/pdf"];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Incorrect file"), false);
    }
  },
  limits: {
    fileSize: 10000000, // 10MB
  },
});

const PORT = process.env.PORT || "3000";

app.post(
  "/api/upload/:fileType",
  upload.single("file"),
  (req, res) => {
    if (!req.file) {
      console.log("No file received");
      res.status(400).json({ error: "wrong format" });
      return;
    }
    console.log("File uploaded successfully:", req.file.filename);
    res.json({
      message: "File uploaded successfully",
      filename: req.file.filename,
    });
  }
);

// Error handling middleware
app.use((err, _req, res, _next) => {
  if (err.message === "Incorrect file") {
    res.status(422).json({ error: "Only images and PDFs are allowed" });
  } else {
    res.status(500).json({ error: "An error occurred" });
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

    const imageFiles = files.filter((file) => {
      const fileExtension = path.extname(file).toLowerCase();
      return [".jpg", ".jpeg", ".png", ".pdf"].includes(fileExtension);
    });

    res.json({ message: "Files retrieved successfully", files: imageFiles });
  });
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
