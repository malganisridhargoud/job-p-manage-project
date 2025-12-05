const express = require("express");
const router = express.Router();
const { db } = require("../firebase");

const JOBS_COL = "jobs";
const APPS_COL = "applications";

// Apply for a job
router.post("/", async (req, res) => {
  try {
    const { jobId, name, email, resume, coverLetter } = req.body;

    if (!jobId || !name || !email || !resume) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
    }

    const job = await db.collection(JOBS_COL).doc(jobId).get();
    if (!job.exists)
      return res.status(404).json({ success: false, message: "Job not found" });

    const appData = {
      jobId,
      jobTitle: job.data().title,
      name,
      email,
      resume,
      coverLetter: coverLetter || "",
      appliedAt: new Date()
    };

    const doc = await db.collection(APPS_COL).add(appData);

    res.json({ success: true, data: { id: doc.id, ...appData } });
  } catch (e) {
    res.status(500).json({ success: false, message: "Error submitting application" });
  }
});

// Fetch applications by email
router.get("/", async (req, res) => {
  try {
    const email = req.query.email;
    const snapshot = await db.collection(APPS_COL).orderBy("appliedAt", "desc").get();

    let apps = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
    if (email) apps = apps.filter((a) => a.email === email);

    res.json({ success: true, data: apps });
  } catch (e) {
    res.status(500).json({ success: false });
  }
});

// Delete application
router.delete("/:id", async (req, res) => {
  try {
    await db.collection(APPS_COL).doc(req.params.id).delete();
    res.json({ success: true, message: "Application deleted" });
  } catch (e) {
    res.status(500).json({ success: false });
  }
});

module.exports = router;
