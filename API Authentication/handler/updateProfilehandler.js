const db = require('../services/firebaseAdmin');

const updateProfileHandler = async (userId, name, telp, city, district, subdistrict, address) => {
  try {
    // Update the user profile in Firestore
    await db.collection('users').doc(userId).update({
        name,
        telp,
        city,
        district,
        subdistrict,
        address,
    });

    return { message: 'Profile updated successfully!' };
  } catch (error) {
    console.error('Error updating profile:', error);
    throw new Error('Failed to update profile.');
  }
};

module.exports = updateProfileHandler;
