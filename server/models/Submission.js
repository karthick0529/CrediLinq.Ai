const mongoose = require("mongoose");

const submissionSchema = new mongoose.Schema({
  companyUEN: { type: String, required: true },
  companyName: { type: String, required: true },
  fullName: { type: String, required: true },
  position: { type: String, required: true },
  email: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  files: [{ type: String }], // File paths
  termsAccepted: { type: Boolean, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Submission", submissionSchema);
