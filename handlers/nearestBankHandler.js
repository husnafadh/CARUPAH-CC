const db = require('../services/firebaseAdmin');
const admin = require('firebase-admin');
const axios = require('axios');
const googleCloud = require('../services/googleCloud');

const nearestBankHandler = {
    async getNearestBank(req, res) {
        try {
            //Dapatkan lokasi pengguna dr parameter permintaan
            const latitude = parseFloat(req.query.latitude);
            const longitude = parseFloat(req.query.longitude);
    
            //Temukan bank sampah terdekat
            const nearestBank = await findNearestBank(latitude, longitude);
    
            res.json(nearestBank);
        } catch (error){
            console.error('Error while getting nearest bank:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },
};

//Fungsi unttuk menemukan bank sampah terdekat
async function findNearestBank(latitude, longitude){
    try{
        const response = await axios.get(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyAYI3qwtN7TjWIdkD1Q4-Oji84fxDobF3g`
        )

        const nearestAddress = response.data.results[0].formatted_address;
    
        //Data bank sampah terdekat
        const nearestBank = {
            name: 'Bank Sampah Terdekat',
            latitude: latitude,
            longitude: longitude,
            address: nearestAddress,
        };
    
        return nearestBank;
    } catch (error) {
        console.error('Error while finding nearest bank:', error);
        throw new Error('Failed to find nearest bank');
    }
}

module.exports = nearestBankHandler;