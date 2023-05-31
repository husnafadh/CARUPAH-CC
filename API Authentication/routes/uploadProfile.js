const express = require('express');
const router = express.Router();
// const db = require('../services/firebaseAdmin');
const updateProfileHandler = require('../handler/updateProfileHandler')

router.put('/profile/:userId', async (req, res) => {
  const { userId } = req.params;
  const { name, telp, city, district, subdistrict, address } = req.body;

  try {
    const result = await updateProfileHandler(userId, name, telp, city, district, subdistrict, address);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
