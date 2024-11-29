import { getFirestore, doc, getDoc, collection, getDocs, addDoc, updateDoc } from 'firebase/firestore';
import { app } from './firebaseConfig';  // Importa tu configuración de Firebase
import { getAuth } from 'firebase/auth';


// Inicializar Firestore
const db = getFirestore(app);
const auth = getAuth();
const user = auth.currentUser;

if (user) {
  const usuarioId = user.uid;  // Obtén el ID del usuario autenticado
  console.log("Usuario autenticado", usuarioId);
  try {
    const userData = await cargarUsuarioPorId(usuarioId);
    console.log("Datos del usuario:", userData);
  } catch (error) {
    console.log("Error al cargar los datos del usuario:", error);
  }
} else {
  console.log("No hay usuario autenticado");
}

// Función para agregar una mascota
export const agregarMascota = async (mascota) => {
    try {
        const docRef = await addDoc(collection(db, 'mascotas'), mascota);
        console.log("Mascota añadida con ID:", docRef.id);
    } catch (error) {
        console.error("Error añadiendo mascota:", error);
        throw error;
    }
};

// Función para marcar una mascota como adoptada
export const marcarMascotaAdoptada = async (id) => {
    const mascotaRef = doc(db, 'mascotas', id);
    try {
        await updateDoc(mascotaRef, { estado: 'Adoptada' });
        console.log("Mascota marcada como Adoptada:", id);
    } catch (error) {
        console.error("Error al marcar la mascota como Adoptada:", error);
        throw error;
    }
};

// Función para cargar todos los usuarios
export const cargarUsuarios = async () => {
    const usuarios = [];
    try {
        const querySnapshot = await getDocs(collection(db, 'usuarios'));
        console.log('querySnapshot:', querySnapshot); // Verifica que se obtienen datos
        querySnapshot.forEach((doc) => {
            console.log('usuario:', doc.data());  // Verifica los datos de cada documento
            usuarios.push({ id: doc.id, ...doc.data() });
        });
    } catch (error) {
        console.error("Error cargando usuarios:", error);
    }
    return usuarios;
};
// Función para cargar los datos de un usuario por su ID
export const cargarUsuarioPorId = async (id) => {
    const usuarioRef = doc(db, 'usuarios', id);  // Obtén la referencia al documento del usuario
    try {
        const docSnapshot = await getDoc(usuarioRef);  // Obtén los datos del documento
        if (docSnapshot.exists()) {
            return docSnapshot.data();  // Si el documento existe, retorna los datos
        } else {
            console.log("No se encontró el usuario con ese ID");
            return null;
        }
    } catch (error) {
        console.error("Error al cargar los datos del usuario:", error);
        throw error;
    }
};

// Función para cargar todas las mascotas
export const cargarMascotas = async () => {
    const mascotas = [];
    const querySnapshot = await getDocs(collection(db, 'mascotas'));
    querySnapshot.forEach((doc) => {
        mascotas.push({ id: doc.id, ...doc.data() });
    });
    return mascotas;
};

// Función para cargar todas las reseñas
export const cargarReseñas = async () => {
    const reseñas = [];
    const querySnapshot = await getDocs(collection(db, 'reseñas'));
    querySnapshot.forEach((doc) => {
        reseñas.push({ id: doc.id, ...doc.data() });
    });
    return reseñas;
};
