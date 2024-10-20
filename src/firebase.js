// firebase.js
import { db } from './firebaseConfig.js'; // Asegúrate de importar la configuración de Firebase
import { collection, addDoc, getDocs, updateDoc, doc } from 'firebase/firestore';

// Función para agregar una mascota
export const agregarMascota = async (mascota) => {
    try {
        const docRef = await addDoc(collection(db, 'mascotas'), mascota);
        console.log("Mascota añadida con ID:", docRef.id);
    } catch (error) {
        console.error("Error añadiendo mascota:", error);
        throw error; // Lanzar error para manejarlo en el componente
    }
};

// Función para cargar todas las mascotas
export const cargarMascotas = async () => {
    const mascotas = [];
    const querySnapshot = await getDocs(collection(db, 'mascotas'));
    querySnapshot.forEach((doc) => {
        mascotas.push({ id: doc.id, ...doc.data() }); // Agregar ID a cada mascota
    });
    return mascotas;
};

// Función para marcar una mascota como vendida
export const marcarMascotaAdoptada = async (id) => {
    const mascotaRef = doc(db, 'mascotas', id);
    try {
        await updateDoc(mascotaRef, { estado: 'Adoptada' }); // Actualizar el estado a 'vendida'
        console.log("Mascota marcada como Adoptada:", id);
    } catch (error) {
        console.error("Error al marcar la mascota como Adoptada:", error);
        throw error; // Lanzar error para manejarlo en el componente
    }
};
