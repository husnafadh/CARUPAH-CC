const express = require('express');
const admin = require('firebase-admin');
const cors = require('cors');
const db = require('./services/firebaseAdmin');
const updateProfileRoute = require('./routes/updateProfile');

const app = express();
app.use(express.json());
app.use(cors());

//Registration endpoint
app.post('/register', (req, res) => {
  const { name, email, password, confirm_pw, telp } = req.body;

  // Save the user data to Firestore
  db.collection('users')
    .add({ name, email, password, telp })
    .then(() => {
      res.status(201).json({ message: 'User added successfully!' });
    })
    .catch((error) => {
      console.error('Error adding user: ', error);
      res.status(500).json({ error: 'Failed to add user.' });
    });
});

// Login endpoint
app.post('/login', async (req, res) =>{
    const {email, password} = req.body;
    try{
        const userRecord = await admin.auth().getUserByEmail(email);
        const token = await admin.auth().createCustomToken(userRecord.uid);
        res.json({ message: 'Login successful', token});
    } catch (error){
        res.status(400).json({ error: error.message });
    }
});
// Google OAuth sign-in endpoint
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client('google-client-id');
app.post('/google-signin', async (req, res)=>{
    const { idToken } = req.body;
    try{
        const ticket = await client.verifyIdToken({
            idToken,
            audience: 'google-client-id',
        });
        const {email} = ticket.getPayload();
        const userRecord = await admin.auth().getUserByEmail(email);
        const token = await admin.auth().createCustomToken(userRecord.uid);
        res.json({ message: 'Google sign-in successful', token});
    } catch (error){
        res.status(400).json({ error:error.message});
    }
});

//update profile
app.use('/profile', updateProfileRoute);

//Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

