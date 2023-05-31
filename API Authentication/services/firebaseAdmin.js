const admin = require('firebase-admin');

//Initialize Firebase Admin SDK
admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    // Firebase project's service account key JSON
    databaseURL: '<https://project-id.firebaseio.com>',
});

module.exports = db;
