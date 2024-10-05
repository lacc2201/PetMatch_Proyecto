// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // Importar Firestore


const firebaseConfig = {
  apiKey: "AIzaSyBwoSLUFAKBeIJBekQVPt69vmvjAtiUW48",
  authDomain: "petmatch-d2975.firebaseapp.com",
  projectId: "petmatch-d2975",
  storageBucket: "petmatch-d2975.appspot.com",
  messagingSenderId: "435278411099",
  appId: "1:435278411099:web:aef675c36f09155f01167e",
  measurementId: "G-7GHRV79LF5"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Inicializar Authentication y Firestore
const auth = getAuth(app);
const db = getFirestore(app); // Crear instancia de Firestore

export { auth, db }; // Exportar ambos auth y db