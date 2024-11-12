<template>
    <div>
        <!-- Encabezado -->
        <header>
            <div class="logo">
                <img src="../assets/logopetmatch.png" alt="PetMatch Logo">
            </div>
            <h1 class="title">Panel Administrador</h1>
            <nav>
                <router-link to="/GestPets" class="nav-link">GESTIÓN DE MASCOTAS</router-link>
                <router-link to="/ReviewsAdmin" class="nav-link">GESTIÓN DE RESEÑAS</router-link>
                <router-link to="/usersAdmin" class="nav-link">GESTIÓN DE USUARIOS</router-link>
            </nav>
            <div class="header-icons">
                <router-link to="/profileAdmin"><img id="header-profile-icon" src="../assets/icon-profile.png" alt="Perfil"></router-link>
            </div>
            <div class="contact-info">
                <router-link to="/login" class="contact-button">Cerrar Sesión</router-link>
            </div>
        </header>

        <section class="reviews-section">
            <div class="title">Panel de Reseñas</div>
        </section>

        <section id="reviewsSection">
            <h2>Reseñas pendientes</h2>
            <p>Conteo de Reseñas Pendientes: {{ reviewCount }}</p>
            <div id="reviewsList">
                <div v-for="reseña in reseñas" :key="reseña.id" :class="['review', { subrayada: reseña.contieneGroserias }]">
                    <p class="content">{{ reseña.content }}</p>
                    <button @click="eliminarReseña(reseña.id)" class="deleteBtn">Eliminar</button>
                </div>
            </div>
        </section>

        <!-- Footer -->
        <footer>
            <div class="footer-container">
                <div class="footer-section">
                    <h3>🐾 ¡Estamos aquí para ayudarte! 🐾</h3>
                    <p>📅 <strong>Lunes a Viernes:</strong> 9:00 AM - 7:00 PM<br />
                        🕒 <strong>Sábados:</strong> 10:00 AM - 2:00 PM<br />
                        🚪 <strong>Domingos y festivos:</strong> Cerrado, ¡nos vemos el lunes!</p>
                    <p class="pet-quote">"Porque un hogar no está completo sin una pata que lo haga feliz."</p>
                </div>

                <div class="footer-section">
                    <h3><img src="../assets/logopetmatch.png" alt="Logo" /></h3>
                    <div class="social-icons">
                        <a href="#"><img src="../assets/faceb.png" alt="Facebook" /></a>
                        <a href="#"><img src="../assets/whats.png" alt="WhatsApp" /></a>
                        <a href="#"><img src="../assets/insta.png" alt="Instagram" /></a>
                    </div>
                </div>
                <div class="footer-section contact-us">
                    <h3>¿🐾 Buscas un nuevo amigo peludo 🐾?</h3>
                    <router-link to="/mascotas" class="btn-contact">¡Conoce nuestras mascotas disponibles!</router-link>
                </div>
            </div>
            <div class="footer-bottom">
                <p>🐾 "La felicidad se mide en colitas que se mueven". © 2024 PetMatch 🐾</p>
                <p>Con amor y dedicación | <router-link to="#">Política de Privacidad</router-link> | <router-link to="#">Términos y Condiciones</router-link></p>
            </div>
        </footer>
    </div>
</template>

<script>
import { db } from '../firebaseConfig';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';

export default {
    name: "ReviewsAdmin",
    data() {
        return {
            reseñas: [],
            reviewCount: 0
        };
    },
    async created() {
        await this.cargarReseñas();
    },
    methods: {
        async cargarReseñas() {
            try {
                const querySnapshot = await getDocs(collection(db, 'reviews'));
                this.reseñas = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                this.reviewCount = this.reseñas.length;
            } catch (error) {
                console.error("Error al cargar reseñas:", error);
            }
        },
        async eliminarReseña(id) {
            try {
                await deleteDoc(doc(db, 'reviews', id));
                this.actualizarUI();
            } catch (error) {
                console.error("Error al eliminar reseña:", error);
            }
        },
        async actualizarUI() {
            await this.cargarReseñas();
        }
    }
};
</script>
<style scoped>
/* Estilo para el botón en la sección de contacto */
.contact-info {
    display: flex;
    gap: 20px;
    align-items: center;
    z-index: 2;
}

.contact-info a {
    text-decoration: none;
    color: #ffffff;
    background-color: #4a90e2; /* Azul intermedio del header */
    padding: 8px 19px; /* Reducido a 8px 16px */
    font-size: 15px; /* Reducido a 14px */
    font-weight: bold;
    border-radius: 30px;
    transition: all 0.3s ease;
    display: inline-block;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    text-align: center; /* Asegura que el texto esté centrado */
}

.contact-info a:hover {
    background-color: #1d6fd8; /* Color más oscuro para el hover */
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.3);
    transform: translateY(-3px);
}

.reviews-section {
    background-color: #f9f9f9;
    padding: 40px 20px;
    text-align: center;
}

.reviews-section .title {
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 20px;
    color: #ffffff;
    margin: 0;
}

/* Sección principal */
.dashboard-overview {
    padding: 50px 100px;
    background-color: #fff;
    border-radius: 20px;
    margin: 40px 100px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    text-align: center;
}



/* Titulo brillante */
.title {
    font-family: 'Arial', sans-serif;
    font-size: 1.9rem;
    font-weight: bold;
    color: #ffffff; /* Color del texto blanco */
    background: #4a90e2; /* Fondo azul claro */
    border-radius: 10px; /* Bordes más redondeados */
    padding: 10px 20px; /* Espaciado interno reducido */
    text-align: center;
    margin-bottom: 20px;
    position: relative;
    overflow: hidden;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    display: inline-block;
    animation: shadowPulse 2s infinite; /* Animación de sombra parpadeante */
}

.title::before {
    content: "";
    position: absolute;
    top: -15px; /* Ajustado para el nuevo tamaño */
    left: -15px; /* Ajustado para el nuevo tamaño */
    width: 65px; /* Tamaño del decorado reducido */
    height: 65px;
    background: radial-gradient(circle, #f3fd9b 0%, rgba(255, 255, 255, 0) 50%);
    border-radius: 50%;
    z-index: 1;
}

.title::after {
    content: "";
    position: absolute;
    bottom: -15px; /* Ajustado para el nuevo tamaño */
    right: -15px; /* Ajustado para el nuevo tamaño */
    width: 65px; /* Tamaño del decorado reducido */
    height: 65px;
    background: radial-gradient(circle, #ffcc66 0%, rgba(255, 255, 255, 0) 50%);
    border-radius: 50%;
    z-index: 1;
}

#reviewsSection {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 20px auto;
    padding: 20px;
    max-width: 800px;
    background-color: #f9f9f9;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

#reviewsSection h2 {
    font-size: 2em; /* Tamaño de letra grande */
    font-weight: bold; /* Negrita */
    text-align: center;
    margin-bottom: 20px;
    color: #333;
}

#reviewsList {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.review {
    background-color: #fff;
    padding: 15px;
    border-radius: 8px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    font-size: 1.2em; /* Un poco más grande que el tamaño normal */
    font-weight: bold; /* Negrita para el contenido */
    color: #555;
}

.subrayada {
    text-decoration: underline;
    color: #e74c3c;
}

button.deleteBtn {
    background-color: #e74c3c;
    color: white;
    padding: 8px 12px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-weight: bold;
}

button.deleteBtn:hover {
    background-color: #c0392b;
}

/* Estilos para los iconos en el header */
.header-icons {
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-right: 20px;
}

.header-icons a {
    display: inline-block;
    margin-left: 15px;
}

.header-icons img {
    width: 70px; /* Aumentar el tamaño de los íconos */
    height: 70px; /* Aumentar el tamaño de los íconos */
    cursor: pointer;
}
</style>