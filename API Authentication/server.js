const express = require('express');
const admin = require('firebase-admin');
const cors = require('cors');
const db = require('./services/firebaseAdmin');
const updateProfileRoute = require('./routes/updateProfile');

const app = express();
app.use(express.json());
app.use(cors());

//Registration endpoint
app.post('/register', async (req, res) => {
    const { nama, email, password, noTelepon } = req.body;
    try {
        const userRecord = await admin.auth().createUser({ email, password });
        //Simpan data tambahan ke Firestore
        await firestore.collection('users').doc(userRecord.uid).set({
            nama,
            noTelepon
        });
        res.json({ message: 'User registered successfully', data: userRecord.toJSON() });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
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
const client = new OAuth2Client('1077678923255-vjvgc5q5licb5ddr5o0r9s83691704ov.apps.googleusercontent.com');
app.post('/google-signin', async (req, res)=>{
    const { idToken } = req.body;
    try{
        const ticket = await client.verifyIdToken({
            idToken,
            audience: '1077678923255-vjvgc5q5licb5ddr5o0r9s83691704ov.apps.googleusercontent.com',
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

