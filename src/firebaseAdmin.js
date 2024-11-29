// firebaseAdmin.js
const admin = require('firebase-admin');

// Inicializa el SDK usando el archivo de credenciales descargado
const serviceAccount = require('./firebaseConfig'); // Reemplaza con la ruta correcta

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

// Accede a Firestore
const db = admin.firestore();

module.exports = db; // Exporta db para que puedas acceder a Firestore en otros archivos
