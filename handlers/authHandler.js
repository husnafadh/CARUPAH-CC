const bcrypt = require('bcrypt');
const db = require('../services/firebaseAdmin');
const admin = require('firebase-admin');
const firestore = admin.firestore();


//Registration handler
const register = async (req, res) => {
  try {
    const { name, email, password, confirm_pw, numberPhone } = req.body;

    // Check if password and confirm_pw same
    if (password !== confirm_pw){
      throw new Error('Password and password confirmation are not equal.');
    }

    // Check if the user already exists
    console.log('email:', email);
    const userSnapshot = await db.collection('users').where('email', '==', email).get();
    if (!userSnapshot.empty) {
      throw new Error('Email is already registered.');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const userRecord = await admin.auth().createUser({
      email,
      password,
    });

    await db.collection('users').doc(userRecord.uid).set({
      name,
      email,
      password: hashedPassword,
      numberPhone,
      updatedAt: new Date(),
      });

    res.send({ message: 'User registered successfully.', data: userRecord });
  } catch(error) {
    console.error('Error registered user:', error);
    res.status(500).json({ error: 'Failed to registered.' });
  }
};

//Login handler
async function login(req, res) {
  const { email, password } = req.body;
  try {
    const userRecord = await admin.auth().getUserByEmail(email);
    const token = await admin.auth().createCustomToken(userRecord.uid);
    res.json({ message: 'Login successful', token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/*Google OAuth sign-in handler
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
} */

module.exports = {
  register,
  login,
//   googleSignIn
};
