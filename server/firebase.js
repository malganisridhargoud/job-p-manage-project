// server/firebase.js
const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");

// Initialize only once
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

module.exports = admin;
