// server/routes/jobs.js
const express = require("express");
const router = express.Router();
const admin = require("../firebase");
const db = admin.firestore();

// GET all jobs
router.get("/", async (req, res) => {
  try {
    const snapshot = await db.collection("jobs").get();

    if (snapshot.empty) {
      return res.json({ success: true, data: [] });
    }

    const jobs = [];
    snapshot.forEach(doc => {
      jobs.push({ id: doc.id, ...doc.data() });
    });

    res.json({ success: true, data: jobs });

  } catch (err) {
    console.error("Error loading jobs:", err);
    res.status(500).json({ success: false, message: "Error loading jobs" });
  }
});

module.exports = router;
