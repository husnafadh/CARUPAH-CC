const { Storage } = require('@google-cloud/storage');

// Inisialisasi Google Cloud Storage
const storage = new Storage({
    projectId: 'carupah-backend-878a3',
    keyFilename: '../serviceAccountKey.json.json'
});

// Fungsi-fungsi terkait Google Cloud Storage

module.exports = storage;
