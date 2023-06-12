const admin = require('firebase-admin');
const firestore = admin.firestore();

// Inisialisasi Firebase Admin SDK
const serviceAccount = require("../serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  projectId: 'carupah-backend-878a3'
});

// Registration handler
async function register(req, res) {
  const { nama, email, password, noTelepon } = req.body;
  try {
    const userRecord = await admin.auth().createUser({ email, password });
    // Simpan data tambahan ke Firestore
    await firestore.collection('users').doc(userRecord.uid).set({
      nama,
      noTelepon
    });
    res.json({ message: 'User registered successfully', data: userRecord.toJSON() });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// Login handler
async function login(req, res) {
  const { email, password } = req.body;
  try {
    const userRecord = await admin.auth().getUserByEmail(email);
    const token = await admin.auth().createCustomToken(userRecord.uid);
    res.json({ message: 'Login successful', token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// Google OAuth sign-in handler
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client('1077678923255-vjvgc5q5licb5ddr5o0r9s83691704ov.apps.googleusercontent.com');

async function googleSignIn(req, res) {
  const { idToken } = req.body;
  try {
    const ticket = await client.verifyIdToken({
      idToken,
      audience: '1077678923255-vjvgc5q5licb5ddr5o0r9s83691704ov.apps.googleusercontent.com',
    });
    const { email } = ticket.getPayload();
    const userRecord = await admin.auth().getUserByEmail(email);
    const token = await admin.auth().createCustomToken(userRecord.uid);
    res.json({ message: 'Google sign-in successful', token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

module.exports = {
  register,
  login,
  googleSignIn
};
