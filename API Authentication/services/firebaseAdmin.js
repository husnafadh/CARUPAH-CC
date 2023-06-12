const admin = require('firebase-admin');

//Initialize Firebase Admin SDK
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  projectId: 'carupah-backend-878a3'
});

module.exports = db;
