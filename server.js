const express = require('express');
const axios = require('axios');
const {admin} = require('./services/firebaseAdmin');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const updateProfileRoutes = require('./routes/updateProfile');
const bankSampahRoutes = require('./routes/bankSampah');
const nearestBankRoutes = require('./routes/nearestBank');

const app = express();
app.use(express.json());
app.use(cors());

//authentication
app.use('/auth', authRoutes);

//update profile
app.use('/profile', updateProfileRoutes);

//bank sampah
app.use('/bank-sampah', bankSampahRoutes);

//bank terdekat
app.use('/nearest-bank', nearestBankRoutes);

//deployment check
app.get('/', (req, res) => {
    res.send("Response Success");
});  

//Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});