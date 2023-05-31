const express = require('express');
const admin = require('firebase-admin');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

//Initialize Firebase Admin SDK
admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    // Firebase project's service account key JSON
    databaseURL: '<https://project-id.firebaseio.com>',
});
//Registration endpoint
app.post('/register', async (req, res)=> {
    const {email, password} = req.body;
    try{
        const userRecord = await admin.auth().createUser({email, password});
        res.json({message: 'User registered successfully', data: userRecord.toJSON()});
    } catch (error){
        res.status(400).json({ error: error.message});
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

//Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

