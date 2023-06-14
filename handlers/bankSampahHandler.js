const bcrypt = require('bcrypt');
const db = require('../services/firebaseAdmin');
const admin = require('firebase-admin');

const getAllUsers = async(req, res) => {
    try {
        const usersRef = db.collection('bankSampahUsers');
        const snapshot = await usersRef.get();
        const users = [];
      
        snapshot.forEach((doc) => {
            const user = doc.data();
            users.push(user);
        });
      
        res.status(200).json(users);
    } catch (error) {
        console.error('Error retrieving users:', error);
        res.status(500).json({ error: 'Failed to retrieve users.' });
    }
}

const getAllUsersById = async(req, res) => {
    try {
        const usersRef = db.collection('bankSampahUsers').doc(req.params.userId);
        const snapshot = await usersRef.get();
        const users = snapshot.data();
    
        res.status(200).json(users);
    } catch (error) {
        console.error('Error retrieving user:', error);
        res.status(500).json({ error: 'Failed to retrieve user.' });
    }
}

const createNewUser = async (req, res) => {
    try{
        const { name, email, password, confirm_pw, numberPhone, address } = req.body;
        const file = req.file;

        // Check if password and confirm_pw same
        if (password !== confirm_pw){
            throw new Error('Password and password confirmation are not equal.');
        }
        

        // Check if the user already exists
        console.log('email:', email);
        const userSnapshot = await db.collection('bankSampahUsers').where('email', '==', email).get();
        if (!userSnapshot.empty) {
            throw new Error('Email is already registered.');
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
      
        const evidenceFile = file ? {
            originalname: file.originalname,
            mimetype: file.mimetype,
            file: file.buffer
        } : null;

        const userRecord = await admin.auth().createUser({
            email,
            password,
        });

        await db.collection('bankSampahUsers').doc(userRecord.uid).set({
            name,
            email,
            password: hashedPassword,
            numberPhone,
            address,
            evidenceFile: evidenceFile,
            updatedAt: new Date(),
        })

        res.send({ message: 'User created successfully.', data: userRecord });
    } catch(error) {
        console.error('Error add user:', error);
        res.status(500).json({ error: 'Failed to add user.' });
    }
}

const updateUser = async (req, res) => {
    try {
        const userId = req.params.userId;
        const { name, email, numberPhone, address } = req.body;

        const updateData = {    
            updatedAt: new Date()
        };

        if (name) updateData.name = name;
        if (email) updateData.email = email;
        if (numberPhone) updateData.numberPhone = numberPhone;
        // if (city) updateData.city = city;
        // if (district) updateData.district = district;
        // if (subdistrict) updateData.subdistrict = subdistrict;
        if (address) updateData.address = address;

        const usersRef = await db.collection('bankSampahUsers').doc(userId).update(updateData);
        // Remove the "_writeTime" field from the response
        delete usersRef._writeTime;
        res.send({ message: 'User profile updated successfully.', data: usersRef });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ error: 'Failed to update user' });
    }
}

const deleteUser = async (req, res) => {
    try {
        const userId = req.params.userId;

        // Delete user from Firebase Authentication
        await admin.auth().deleteUser(userId);

        // Delete user document from Firestore
        const response = db.collection('bankSampahUsers').doc(req.params.userId).delete();
        res.send({ message: 'User delete successfully.', data: response })
    } catch(error) {
        console.error('Error delete user:', error);
        res.status(500).json({ error: 'Failed to delete user' });
    }
}

const changeProfilePicture = async (req, res) => {
    try {
        const userId = req.params.userId;
        const imageFile = req.file;
      
        // Retrieve the user's profile document from Firestore
        const userRef = db.collection('bankSampahUsers').doc(userId);
        // const userProfile = await userRef.get();
  
        const updateData = {
            profilePicture: {
                filename: imageFile.filename,
                path: imageFile.path,
            },
            updatedAt: new Date()
        };
      
        const usersRef = await db.collection('bankSampahUsers').doc(userId).update(updateData);
        // Remove the "_writeTime" field from the response
        delete usersRef._writeTime;
        res.send({ message:'Profile image uploaded successfully.', data: usersRef});
    } catch (error) {
        console.error('Error uploading profile image:', error);
        res.status(500).json({ error: 'Failed to upload profile image.' });
    }
}

const changePassword = async (req, res) => {
    try {
        const userId = req.params.userId;
        const { oldPassword, newPassword, confirm_newPassword } = req.body;
  
        const userRef = db.collection('bankSampahUsers').doc(userId);
        const snapshot = await userRef.get();
  
        if (!snapshot.exists) {
            throw new Error('User not found.');
        }
  
        const password = snapshot.data().password;
  
        // Check if old password matches the stored password
        const isPasswordValid = await bcrypt.compare(oldPassword, password);
        if (!isPasswordValid) {
            throw new Error('Invalid old password.');
        }
  
        // Check if new password and confirm_newPassword are the same
        if (newPassword !== confirm_newPassword) {
            throw new Error('New password and confirmation do not match.');
        }
  
        // Hash the new password
        const hashedNewPassword = await bcrypt.hash(newPassword, 10);
  
        const updateData = {
            password: hashedNewPassword,
            updatedAt: new Date(),
        };
  
        await userRef.update(updateData);
  
        // Remove the "_writeTime" field from the response
        delete updateData._writeTime;
        res.send({ message: 'Password changed successfully.', data: updateData });
    } catch (error) {
        console.error('Error changing password:', error);
        res.status(500).json({ error: 'Failed to change password.' });
    }
};

const login = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Check if the user already exists
      const userSnapshot = await db
        .collection('bankSampahUsers')
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
  
      res.send({ message: 'Login successful.' });
    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({ error: 'Failed to login.' });
    }
  };


module.exports = {
    getAllUsers,
    createNewUser,
    getAllUsersById,
    updateUser,
    deleteUser,
    changeProfilePicture,
    changePassword,
    login,
}
