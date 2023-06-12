const admin = require('firebase-admin');
const bcrypt = require('bcrypt');
const db = require('../services/firebaseAdmin');

// Registration handler
function register = async (req, res) {
  const { name, email, password, confirm_pw, numberPhone } = req.body;
  try {
    
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
      password 
    });
    
    // Simpan data tambahan ke Firestore
    await db.collection('users').doc(userRecord.uid).set({
      name,
      email,
      password: hashedPassword,
      numberPhone,
      updatedAt: new Date(),
    });
    res.json({ message: 'User registered successfully', data: userRecord });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// Login handler
function login = async (req, res) {
  try {
    const { email, password } = req.body;
    
    // Check if the user already exists
    const userSnapshot = await db
      .collection('users')
      .where('email', '==', email)
      .get();
    
    if (userSnapshot.empty) {
      throw new Error('Login error: User not found.');
    }
    
    const user = userSnapshot.docs[0].data();

    if (!user.password) {
      throw new Error('Login error: Password not set.');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new Error('Login error: Invalid password.');
    }
    
    const token = await admin.auth().createCustomToken(userRecord.uid);
    res.json({ message: 'Login successful', token: customToken });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// // Google OAuth sign-in handler
// const { OAuth2Client } = require('google-auth-library');
// const client = new OAuth2Client('1077678923255-vjvgc5q5licb5ddr5o0r9s83691704ov.apps.googleusercontent.com');

// async function googleSignIn(req, res) {
//   const { idToken } = req.body;
//   try {
//     const ticket = await client.verifyIdToken({
//       idToken,
//       audience: '1077678923255-vjvgc5q5licb5ddr5o0r9s83691704ov.apps.googleusercontent.com',
//     });
//     const { email } = ticket.getPayload();
//     const userRecord = await admin.auth().getUserByEmail(email);
//     const token = await admin.auth().createCustomToken(userRecord.uid);
//     res.json({ message: 'Google sign-in successful', token });
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// }

module.exports = {
  register,
  login,
//   googleSignIn
};
