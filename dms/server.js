const express = require("express");
const multer = require("multer");
const cors = require("cors");
const app = express();
const fs = require("fs");
const path = require("path");
const admin = require("firebase-admin");

const corsOptions = {
  origin: "http://localhost:8080",
  methods: "GET, POST, PUT, DELETE",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use("/uploads", express.static("uploads"));
app.use("/rms_uploads", express.static("rms_uploads"));
app.use("/ops_uploads", express.static("ops_uploads"));
app.use("/cs_uploads", express.static("cs_uploads"));
app.use("/cash_uploads", express.static("cash_uploads"));

const storage = multer.diskStorage({
  destination: function (_req, _file, cb) {
    let destinationFolder = "uploads";

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
    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "application/pdf",
    ];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Incorrect file"), false);
    }
  },
  limits: {
    fileSize: 10000000,
  },
});

const PORT = process.env.PORT || "3000";

app.post("/api/upload/:fileType", upload.single("file"), (req, res) => {
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
});
app.use((err, _req, res, _next) => {
  if (err.message === "Incorrect file") {
    res.status(422).json({ error: "Only images and PDFs are allowed" });
  } else {
    res.status(500).json({ error: "An error occurred" });
  }
});
app.delete("/api/upload/data/delete/:fileType/:fileName", (req, res) => {
  const { fileType, fileName } = req.params;
  const filePath = path.join(__dirname, `${fileType}_uploads`, fileName);
  console.log("Deleting file at path:", filePath);

  fs.unlink(filePath, (err) => {
    if (err) {
      console.error("Error deleting file:", err);
      res.status(500).json({ error: "Error deleting file" });
      return;
    }

    res.json({ message: "File deleted successfully" });
  });
});


app.get("/api/upload/data/:fileType", (_req, res) => {
  const directoryPath = path.join(__dirname, _req.params.fileType + "_uploads");

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
