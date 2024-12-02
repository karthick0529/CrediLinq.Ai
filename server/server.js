const express = require("express");
const multer = require("multer");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const Submission = require("./models/Submission");

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use("/uploads", express.static("uploads")); // Serve uploaded files

// Ensure that uploads directory exists (create it if not)
const fs = require('fs');
const path = require('path');
const uploadsDir = path.join(__dirname, 'uploads');

if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// File Upload Configuration (Multer)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({
  storage,
  limits: { files: 6, fileSize: 10 * 1024 * 1024 }, // Limit to 6 files and 10MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "application/pdf") {
      cb(null, true);
    } else {
      cb(new Error("Only PDF files are allowed!"), false);
    }
  },
});

// Middleware to handle multer errors
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({ message: `Multer error: ${err.message}` });
  } else if (err) {
    return res.status(400).json({ message: `Error: ${err.message}` });
  }
  next();
});

// Routes
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Submit Form Data
app.post("/api/submit", upload.array("files", 6), async (req, res) => {
  try {
    // Log the incoming data to check it
    console.log("Request body:", req.body);
    console.log("Uploaded files:", req.files);

    // If there are no files uploaded, log and return an error
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No files uploaded." });
    }

    const { companyUEN, companyName, fullName, position, email, phoneNumber, termsAccepted } = req.body;

    // Validate data
    if (!companyUEN || !companyName || !fullName || !position || !email || !phoneNumber || !termsAccepted) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Save to MongoDB
    const submission = new Submission({
      companyUEN,
      companyName,
      fullName,
      position,
      email,
      phoneNumber,
      termsAccepted: termsAccepted === "true", // Convert to boolean
      files: req.files.map((file) => file.path), // Save file paths
    });

    await submission.save();
    res.status(201).json({ message: "Form submitted successfully!" });
  } catch (error) {
    console.error("Error submitting form:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Fetch Submissions
app.get("/api/submissions", async (req, res) => {
  try {
    const submissions = await Submission.find().sort({ createdAt: -1 });
    res.status(200).json(submissions);
  } catch (error) {
    console.error("Error fetching submissions:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
