const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

require("./firebase");
const preloadJobs = require("./preloadJobs");

const jobsRouter = require("./routes/jobs");
const appsRouter = require("./routes/applications");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/api/jobs", jobsRouter);
app.use("/api/applications", appsRouter);

// Frontend
app.use(express.static(path.join(__dirname, "..", "public")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

// Preload jobs on server start
preloadJobs();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running on port " + PORT));
