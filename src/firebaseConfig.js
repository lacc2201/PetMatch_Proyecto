import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';  // Asegúrate de importar desde "firebase/storage"

// Tu configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBwoSLUFAKBeIJBekQVPt69vmvjAtiUW48",
  authDomain: "petmatch-d2975.firebaseapp.com",
  projectId: "petmatch-d2975",
  storageBucket: "petmatch-d2975.appspot.com",
  messagingSenderId: "435278411099",
  appId: "1:435278411099:web:aef675c36f09155f01167e",
  measurementId: "G-7GHRV79LF5"
};

// Inicializar la app de Firebase
const app = initializeApp(firebaseConfig);

// Exportar los servicios de Firebase
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app); // Asegúrate de utilizar getStorage para Firebase Storage

// Funciones para cargar datos desde Firestore
export const cargarUsuarios = async () => {
  try {
    const snapshot = await getDocs(collection(db, "usuarios"));
    const usuarios = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    console.log("Usuarios cargados:", usuarios); // Depuración
    return usuarios;
  } catch (error) {
    console.error("Error cargando usuarios:", error);
    return [];
  }
};

export const cargarMascotas = async () => {
  try {
    const snapshot = await getDocs(collection(db, "mascotas"));
    const mascotas = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    console.log("Mascotas cargadas:", mascotas); // Depuración
    return mascotas;
  } catch (error) {
    console.error("Error cargando mascotas:", error);
    return [];
  }
};

export const cargarReseñas = async () => {
  try {
    const snapshot = await getDocs(collection(db, "resenas"));
    const resenas = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    console.log("Reseñas cargadas:", resenas); // Depuración
    return resenas;
  } catch (error) {
    console.error("Error cargando reseñas:", error);
    return [];
  }
};
// Aquí tienes el arreglo completo de mascotas con los datos corregidos según tu estructura
const mascotas = [
  {
    descripcion: "Un perro amigable y enérgico.",
    edad: "2 años",
    estado: "disponible",
    fecha_ingreso: "2024-11-29",
    foto_url: "https://img.freepik.com/fotos-premium/labrador-retriever-negro-realista-sobre-deslumbrante-fondo-natural-al-aire-libre_31965-79641.jpg",
    nomrbre_mas: "Fido",
    raza: "Labrador",
    refugio_id: "refugio123",
    tipo: ["Perro"]
  },
  {
    descripcion: "Una gata elegante y cariñosa.",
    edad: "3 años",
    estado: "disponible",
    fecha_ingreso: "2024-11-29",
    foto_url: "https://img.freepik.com/fotos-premium/gato-siames-realista-sobre-deslumbrante-fondo-natural-al-aire-libre_31965-93050.jpg",
    nomrbre_mas: "Mimi",
    raza: "Siames",
    refugio_id: "refugio123",
    tipo: ["Gato"]
  },
  {
    descripcion: "Leal y protector, ideal para la familia.",
    edad: "4 años",
    estado: "adoptada",
    fecha_ingreso: "2024-11-10",
    foto_url: "https://img.freepik.com/fotos-premium/pastor-aleman-realista-sobre-deslumbrante-fondo-natural-al-aire-libre_31965-98855.jpg",
    nomrbre_mas: "Rex",
    raza: "Pastor Alemán",
    refugio_id: "refugio456",
    tipo: ["Perro"]
  },
  // Agrega el resto de las mascotas siguiendo la misma estructura
];
async function addPets() {
  const batch = db.batch();

  mascotas.forEach(mascota => {
      const mascotaRef = db.collection('mascotas').doc(mascota.id.toString()); // Usamos el id como nombre del documento
      batch.set(mascotaRef, mascota);
  });

  // Commit the batch
  try {
      await batch.commit();
      console.log("¡Mascotas cargadas exitosamente!");
  } catch (error) {
      console.error("Error al cargar las mascotas: ", error);
  }
}

addPets();
// Exportar los servicios para su uso en otras partes de tu aplicación
export { auth, db, storage };
