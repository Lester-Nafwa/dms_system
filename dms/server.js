const express = require("express");
const multer = require("multer");
const cors = require("cors");
const app = express();
const fs = require("fs");
const path = require("path");
const http = require("http");
const socketIo = require("socket.io");
const { error } = require("console");
const server = http.createServer(app);
const io = socketIo(server);

// Socket.io connection handling
io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });

  socket.on("fileDeleted", ({ fileType, fileName }) => {
    console.log(`File deleted: ${fileType}/${fileName}`);
    // Update your data or perform any necessary actions here
    // For example, remove the deleted file from your docfiles array
    // Send a confirmation back to the client if needed
    socket.emit("fileDeletedConfirmation", {
      message: "File deleted successfully",
    });
  });
});

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

    // Emit a socket event indicating that a file was deleted
    io.emit("fileDeleted", { fileType, fileName });

    res.json({ message: "File deleted successfully" });
  });
});

app.get("/api/upload/data/:fileType", async (req, res) => {
  const directoryPath = path.join(__dirname, req.params.fileType + "_uploads");

  let { page, size } = req.query;
  if (!page) {
    // Make the Default value one.
    page = 1;
  }

  if (!size) {
    size = 8;
  }

  const limit = parseInt(size);
  const offset = (page - 1) * size; // Calculate the offset based on page and size

  try {
    const files = await fs.promises.readdir(directoryPath);

    const imageFiles = files.filter((file) => {
      const fileExtension = path.extname(file).toLowerCase();
      return [".jpg", ".jpeg", ".png", ".pdf"].includes(fileExtension);
    });

    const paginatedFiles = imageFiles.slice(offset, offset + limit); // Apply pagination

    res.json({
      message: "Files retrieved successfully",
      files: paginatedFiles,
    });
  } catch (err) {
    console.error("Error reading directory:", err);
    res.status(500).json({ error: "Error reading directory" });
  }
});
app.get("/api/upload/data/search/:fileType", async (req, res) => {
  console.log("Received search request");
  try {
    const query = req.query.q;
    console.log("Query Parameter:", query);
    const fileType = req.params.fileType;

    // Construct the correct directory path based on the fileType
    let directoryPath;
    switch (fileType) {
      case "cash":
        directoryPath = path.join(__dirname, "cash_uploads");
        break;
      case "cs":
        directoryPath = path.join(__dirname, "cs_uploads");
        break;
      case "rms":
        directoryPath = path.join(__dirname, "rms_uploads");
        break;
      case "ops":
        directoryPath = path.join(__dirname, "ops_uploads");
        break;
      default:
        return res.status(400).json({ error: "Invalid fileType" });
    }
    console.log("Received search request. Query:", query, "File Type:", fileType);

    // Read files from the directory
    const files = await fs.promises.readdir(directoryPath);
    console.log("Directory Path:", directoryPath);


    // Filter files based on the query (contains search)
    const results = files.filter((file) =>
      file?.includes(query)
    );
    
    res.json({ results });
  } catch (err) {
    console.error("Error searching files:", err);
    res.status(500).json({ error: "Error searching files" });
  }
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
