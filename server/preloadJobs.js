// server/preloadJobs.js
const admin = require("./firebase");
const db = admin.firestore();

// ==================== SAMPLE JOB DATA (30 JOBS) ====================
const sampleJobs = [
  {
    title: "Frontend Developer",
    company: "TechNova Solutions",
    location: "Bangalore, India",
    description: "Develop UI components using React.js and TypeScript.",
    salary: "₹10,00,000 - ₹18,00,000"
  },
  {
    title: "Backend Engineer",
    company: "CyberCore Systems",
    location: "Hyderabad, India",
    description: "Build scalable Node.js APIs, optimize database performance.",
    salary: "₹12,00,000 - ₹20,00,000"
  },
  {
    title: "Cloud Architect",
    company: "BlueSky Cloud Corp",
    location: "Remote",
    description: "Architect and maintain solutions on AWS, Azure or GCP.",
    salary: "₹25,00,000 - ₹45,00,000"
  },
  {
    title: "Full Stack Developer",
    company: "NextGen Innovations",
    location: "Mumbai, India",
    description: "React, Node, MongoDB, CI/CD pipelines.",
    salary: "₹8,00,000 - ₹16,00,000"
  },
  {
    title: "Data Scientist",
    company: "Insight Analytics Ltd.",
    location: "Chennai, India",
    description: "Build ML models, work with Python, TensorFlow.",
    salary: "₹14,00,000 - ₹28,00,000"
  },
  {
    title: "AI Engineer",
    company: "NeuroTech AI Labs",
    location: "Remote",
    description: "LLM fine-tuning, prompt engineering, model deployment.",
    salary: "₹22,00,000 - ₹40,00,000"
  },
  {
    title: "UI/UX Designer",
    company: "CreativeHub Studio",
    location: "Delhi, India",
    description: "Design mobile/web interfaces, wireframes, prototypes.",
    salary: "₹6,00,000 - ₹12,00,000"
  },
  {
    title: "DevOps Engineer",
    company: "CloudForge",
    location: "Pune, India",
    description: "Docker, Kubernetes, Jenkins, CI/CD pipelines.",
    salary: "₹15,00,000 - ₹28,00,000"
  },
  {
    title: "Mobile App Developer",
    company: "AppCraft Pvt Ltd",
    location: "Remote",
    description: "Flutter/React Native development for Android/iOS.",
    salary: "₹9,00,000 - ₹18,00,000"
  },
  {
    title: "Cybersecurity Analyst",
    company: "ShieldGuard Security",
    location: "Gurgaon, India",
    description: "Perform vulnerability assessment and incident response.",
    salary: "₹10,00,000 - ₹22,00,000"
  },
  {
    title: "QA Automation Engineer",
    company: "TestFlow Technologies",
    location: "Chennai, India",
    description: "Selenium, Jest, Cypress, automation testing.",
    salary: "₹7,00,000 - ₹14,00,000"
  },
  {
    title: "Product Manager",
    company: "Visionary Products Inc.",
    location: "Bangalore, India",
    description: "Handle product lifecycle, roadmap planning.",
    salary: "₹18,00,000 - ₹32,00,000"
  },
  {
    title: "Database Administrator",
    company: "DataSphere Solutions",
    location: "Hyderabad, India",
    description: "Manage SQL/NoSQL databases, backups, tuning.",
    salary: "₹12,00,000 - ₹24,00,000"
  },
  {
    title: "Business Analyst",
    company: "Strategic Insights LLP",
    location: "Mumbai, India",
    description: "Requirements gathering, data interpretation.",
    salary: "₹8,00,000 - ₹15,00,000"
  },
  {
    title: "Network Engineer",
    company: "NetSecure Pvt Ltd",
    location: "Delhi, India",
    description: "Manage firewalls, routers, VPN, troubleshooting.",
    salary: "₹6,00,000 - ₹13,00,000"
  },
  {
    title: "AI Prompt Engineer",
    company: "QuantumMind AI",
    location: "Remote",
    description: "Develop prompts for LLM models for production workflows.",
    salary: "₹18,00,000 - ₹38,00,000"
  },
  {
    title: "Machine Learning Engineer",
    company: "DataForge AI",
    location: "Bangalore, India",
    description: "Model training, feature engineering, MLOps pipeline.",
    salary: "₹20,00,000 - ₹36,00,000"
  },
  {
    title: "System Administrator",
    company: "CoreTech Infra",
    location: "Pune, India",
    description: "Linux/Windows servers, shell scripting, backups.",
    salary: "₹6,00,000 - ₹12,00,000"
  },
  {
    title: "Blockchain Developer",
    company: "ChainLabs Global",
    location: "Remote",
    description: "Solidity, smart contracts, Ethereum/Web3.",
    salary: "₹20,00,000 - ₹45,00,000"
  },
  {
    title: "AR/VR Developer",
    company: "RealityOne Interactive",
    location: "Hyderabad, India",
    description: "Unity, Unreal Engine, immersive experience development.",
    salary: "₹12,00,000 - ₹28,00,000"
  },
  {
    title: "SEO Specialist",
    company: "RankBoost Media",
    location: "Remote",
    description: "SEO strategy, ranking optimization, analytics.",
    salary: "₹4,00,000 - ₹10,00,000"
  },
  {
    title: "Content Writer",
    company: "WriteCore Digital",
    location: "Chennai, India",
    description: "Technical content, blogs, documentation writing.",
    salary: "₹3,00,000 - ₹7,00,000"
  },
  {
    title: "Technical Support Engineer",
    company: "HelpDesk Pro",
    location: "Gurgaon, India",
    description: "Customer technical issue resolution.",
    salary: "₹4,00,000 - ₹9,00,000"
  },
  {
    title: "HR Recruiter",
    company: "TalentBridge",
    location: "Delhi, India",
    description: "End-to-end recruitment process.",
    salary: "₹3,50,000 - ₹8,00,000"
  },
  {
    title: "Game Developer",
    company: "PixelForge Studios",
    location: "Remote",
    description: "Unity/C# gameplay mechanics development.",
    salary: "₹10,00,000 - ₹22,00,000"
  },
  {
    title: "Video Editor",
    company: "MotionHive Productions",
    location: "Mumbai, India",
    description: "Adobe Premiere, After Effects editing + motion graphics.",
    salary: "₹3,00,000 - ₹8,00,000"
  },
  {
    title: "Social Media Manager",
    company: "BrandPulse Agency",
    location: "Remote",
    description: "Content strategy, analytics, brand management.",
    salary: "₹4,00,000 - ₹12,00,000"
  },
  {
    title: "IT Support Technician",
    company: "QuickFix IT",
    location: "Pune, India",
    description: "Troubleshoot hardware/software for clients.",
    salary: "₹2,50,000 - ₹5,50,000"
  },
  {
    title: "Web Developer",
    company: "WebCraft Studio",
    location: "Chennai, India",
    description: "HTML, CSS, JS, hosting, responsive design.",
    salary: "₹5,00,000 - ₹12,00,000"
  },
  {
    title: "Embedded Systems Engineer",
    company: "MicroTech Circuits",
    location: "Bangalore, India",
    description: "Firmware, C/C++, microcontroller debugging.",
    salary: "₹10,00,000 - ₹20,00,000"
  }
];

// ==================== PRELOAD FUNCTION ====================
const preloadJobs = async () => {
  try {
    const snapshot = await db.collection("jobs").get();

    if (!snapshot.empty) {
      console.log("Jobs already exist → Skipping seeding.");
      return;
    }

    console.log("Jobs collection empty → Seeding 30 job listings...");

    const batch = db.batch();

    sampleJobs.forEach((job) => {
      const ref = db.collection("jobs").doc();
      batch.set(ref, job);
    });

    await batch.commit();
    console.log("✔ Job seeding complete.");
  } catch (err) {
    console.error("❌ Error seeding jobs:", err);
  }
};

module.exports = preloadJobs;
