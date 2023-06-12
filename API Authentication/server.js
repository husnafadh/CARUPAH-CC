const express = require('express');
const admin = require('firebase-admin');
const cors = require('cors');
const authRoutes = require('../routes/auth');
const db = require('./services/firebaseAdmin');
const updateProfileRoute = require('./routes/updateProfile');

const app = express();
app.use(express.json());
app.use(cors());

//authentication
app.use('/auth', auth);

//update profile
app.use('/profile', updateProfileRoute);

//Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

