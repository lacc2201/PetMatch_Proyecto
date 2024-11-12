import { getFirestore, collection, getDocs, addDoc, updateDoc, doc } from 'firebase/firestore';
import { app } from './firebaseConfig';  // Asegúrate de importar tu instancia de Firebase

// Inicializar Firestore
const db = getFirestore(app);

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
    const querySnapshot = await getDocs(collection(db, 'usuarios'));
    querySnapshot.forEach((doc) => {
        usuarios.push({ id: doc.id, ...doc.data() });
    });
    return usuarios;
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
