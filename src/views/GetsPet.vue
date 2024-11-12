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
                <router-link to="/usersA" class="nav-link">GESTIÓN DE USUARIOS</router-link>
            </nav>
            <div class="header-icons">
                <router-link to="/profileAdmin"><img id="header-profile-icon" src="../assets/icon-profile.png"
                        alt="Perfil"></router-link>
            </div>
            <div class="contact-info">  
                <router-link to="/login" class="contact-button">Cerrar Sesión</router-link>
            </div>
        </header>

        <h2>Listado de Mascotas - Arrastra y Suelta</h2>

        <div class="container">
            <!-- Mascotas Disponibles -->
            <div class="category available" @dragover="allowDrop" @drop="drop($event, 'available')">
                <h3>Mascotas Disponibles</h3>
                <ul class="pet-list" id="available-list">
                    <li class="pet-item" 
                        v-for="pet in availablePets" 
                        :key="pet.id" 
                        :id="'pet' + pet.id"
                        draggable="true" 
                        @dragstart="drag($event)">
                        <img class="pet-img" :src="pet.foto_url" alt="Pet">
                        <div class="pet-details">
                            <span class="pet-name">{{ pet.nombre_mas }}</span>
                            <p class="pet-desc">{{ pet.descripcion }}</p>
                        </div>
                    </li>
                </ul>
            </div>

            <!-- Mascotas en Proceso -->
            <div class="category in-process" @dragover="allowDrop" @drop="drop($event, 'in-process')">
                <h3>Mascotas en Proceso</h3>
                <ul class="pet-list" id="in-process-list">
                    <!-- Similar a las disponibles, mostrar aquí las mascotas en proceso -->
                </ul>
            </div>

            <!-- Mascotas Adoptadas -->
            <div class="category adopted" @dragover="allowDrop" @drop="drop($event, 'adopted')">
                <h3>Mascotas Adoptadas</h3>
                <ul class="pet-list" id="adopted-list">
                    <!-- Similar a las disponibles, mostrar aquí las mascotas adoptadas -->
                </ul>
            </div>
        </div>

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
import { db } from '../firebase'; // Importa la configuración de Firebase

export default {
    name: "GetsPets",
    data() {
        return {
            availablePets: [], // Aquí almacenaremos las mascotas disponibles
        };
    },
    mounted() {
        this.fetchPets();
    },
    methods: {
        // Permite que el elemento sea soltado en la categoría
        allowDrop(event) {
            event.preventDefault();
        },

        // Maneja el inicio del arrastre
        drag(event) {
            event.dataTransfer.setData("text", event.target.id);
        },

        // Maneja el evento de soltar el elemento en la nueva categoría
        drop(event, category) {
            event.preventDefault();
            const data = event.dataTransfer.getData("text");
            const draggedElement = document.getElementById(data);
            const targetCategory = document.querySelector(`.${category} .pet-list`);
            targetCategory.appendChild(draggedElement);
        },

        // Obtiene las mascotas de Firestore
        async fetchPets() {
            try {
                const petsSnapshot = await db.collection('mascotas').get(); // Obtiene todos los documentos de la colección 'mascotas'
                this.availablePets = petsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })); // Mapea los documentos a un formato adecuado
            } catch (error) {
                console.error("Error obteniendo mascotas:", error);
            }
        }
    }
};
</script>

<style scoped>
/* Define la fuente principal del sitio */
body {
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    margin: 0;
    padding: 0;
    background-color: #f2f2f2;
}

/* Estilo para el header */
header {
    background-color: #4a90e2;
    /* Azul intermedio */
    padding: 0px 100px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    border-bottom-left-radius: 80px;
    border-bottom-right-radius: 80px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    height: 120px;
    /* Reduce el tamaño del área azul */
}

/* Estilo de nube en la parte inferior del header */
header::after {
    content: '';
    position: absolute;
    bottom: -50px;
    left: 0;
    width: 90%;
    height: 80px;
    background: #4a90e2;
    border-radius: 100% 100% 0 0;
    z-index: 1;
}

.logo img {
    width: 150px;
    height: auto;
    z-index: 2;
    transition: transform 0.3s ease;
    /* Transición suave para el zoom */
}

.logo img:hover {
    transform: scale(1.1);
    /* Aumenta el tamaño del logo al pasar el mouse */
}

nav {
    display: flex;
    gap: 10px;
    z-index: 2;
}

nav a {
    text-decoration: none;
    color: #ffffff;
    font-size: 15px;
    /* Reducido a 15px */
    font-weight: bold;
    padding: 8px 19px;
    /* Reducido a 8px 16px */
    background-color: #66a3ff;
    border: none;
    border-radius: 30px;
    transition: all 0.3s ease;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    text-align: center;
    /* Asegura que el texto esté centrado */
}

nav a:hover {
    background-color: #1d6fd8;
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.3);
    transform: translateY(-3px);
}

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
    background-color: #4a90e2;
    /* Azul intermedio del header */
    padding: 8px 19px;
    /* Reducido a 8px 16px */
    font-size: 15px;
    /* Reducido a 14px */
    font-weight: bold;
    border-radius: 30px;
    transition: all 0.3s ease;
    display: inline-block;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    text-align: center;
    /* Asegura que el texto esté centrado */
}

.contact-info a:hover {
    background-color: #1d6fd8;
    /* Color más oscuro para el hover */
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.3);
    transform: translateY(-3px);
}


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
    background-color: #4a90e2;
    /* Azul intermedio del header */
    padding: 8px 19px;
    /* Reducido a 8px 16px */
    font-size: 15px;
    /* Reducido a 14px */
    font-weight: bold;
    border-radius: 30px;
    transition: all 0.3s ease;
    display: inline-block;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    text-align: center;
    /* Asegura que el texto esté centrado */
}

.contact-info a:hover {
    background-color: #1d6fd8;
    /* Color más oscuro para el hover */
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.3);
    transform: translateY(-3px);
}



h2 {
    color: #4a90e2;
    margin-bottom: 20px;
    text-align: center;
}

.container {
    display: flex;
    justify-content: center;
    gap: 20px;
    padding: 20px;
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
}

.category {
    width: 30%;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    padding: 15px;
    min-height: 300px;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.category h3 {
    text-align: center;
    color: #fff;
    background-color: #4a90e2;
    padding: 10px;
    border-radius: 10px;
    margin-bottom: 10px;
    width: 100%;
}

.category.available h3 {
    background-color: #66cc66;
}

.category.in-process h3 {
    background-color: #ffcc00;
}

.category.adopted h3 {
    background-color: #ff6666;
}

.pet-list {
    list-style: none;
    padding: 0;
    width: 100%;
    min-height: 200px;
}

.pet-item {
    display: flex;
    margin-bottom: 15px;
    align-items: center;
    border-bottom: 1px solid #ddd;
    padding-bottom: 10px;
    background-color: #fff;
    border-radius: 10px;
    padding: 10px;
    cursor: grab;
}

.pet-item:last-child {
    border-bottom: none;
}

.pet-img {
    width: 80px;
    height: 80px;
    margin-right: 15px;
    border-radius: 10px;
    object-fit: cover;
}

.pet-details {
    display: flex;
    flex-direction: column;
}

.pet-name {
    font-weight: bold;
    margin-bottom: 5px;
    color: #333;
}

.pet-desc {
    font-size: 0.9em;
    color: #666;
}

.category {
    border: 2px dashed #ccc;
}

.category.drag-over {
    border: 2px dashed #4a90e2;
}


/* Footer */
footer {
    background-color: #5da5e1;
    padding: 5px 0;
    /* Reducir el padding para hacer el footer más compacto */
    color: #fff;
    font-family: 'Arial', sans-serif;
}

.footer-container {
    display: flex;
    justify-content: space-around;
    align-items: center;
    /* Centrar verticalmente las secciones */
    text-align: center;
    padding: 5px 20px;
    /* Ajustar el padding general */
}

.footer-section {
    flex: 1;
    margin: 5px;
}

.footer-section h3 {
    font-size: 1.1em;
    /* Reducir el tamaño del título */
    margin-bottom: 8px;
    color: #f0f0f0;
}

.footer-section p {
    font-size: 0.85em;
    /* Reducir un poco el tamaño de la letra */
    margin-bottom: 5px;
    line-height: 1.3;
}

.footer-section img {
    width: 165px;
    /* Aumentar el tamaño de la imagen del logo */
    margin-bottom: -10px;
    /* Reducir el margen inferior para acercar los íconos al logo */
}

.social-icons {
    display: flex;
    justify-content: center;
    margin-top: -40px;
    /* Reducir el margen superior para acercar los íconos al logo */
}

.social-icons a {
    margin: 0 10px;
    /* Mantener el espacio entre los íconos */
    transition: transform 0.5s ease, filter 0.3s;
}

.social-icons a:hover {
    transform: scale(1.2) rotate(10deg);
    /* Mantener la escala y el ángulo de rotación al hacer hover */
    filter: brightness(1.2);
}

.social-icons img {
    width: 24px;
    /* Mantener el tamaño de los íconos */
    margin-top: 0px;
    /* Eliminar margen superior para mantener los íconos más cerca del logo */
}

.pet-quote {
    font-style: italic;
    font-size: 0.95em;
    margin-top: 10px;
    color: #ffe4b5;
    /* Puedes cambiar este color según tu diseño */
}

.btn-contact {
    display: inline-block;
    background-color: #ffcc66;
    padding: 8px 15px;
    border-radius: 20px;
    color: #333;
    font-weight: bold;
    text-decoration: none;
    transition: background-color 0.3s ease-in-out, transform 0.3s;
}

.btn-contact:hover {
    background-color: #ff9933;
    transform: scale(1.1);
}

.footer-bottom {
    text-align: center;
    margin-top: 10px;
    border-top: 1px solid #fff;
    padding-top: 10px;
    font-size: 0.8em;
}

.footer-bottom p {
    margin: 3px 0;
}

/* Animaciones adicionales */
@keyframes float {
    0% {
        transform: translateY(0px);
    }

    50% {
        transform: translateY(-10px);
    }

    100% {
        transform: translateY(0px);
    }
}

/* Animación flotante en el logo */
.footer-section img {
    animation: float 3s ease-in-out infinite;
}

/* Animación de parpadeo en las patas */
.paw-icon {
    font-size: 30px;
    color: lightgray;
    cursor: pointer;
}

@keyframes paw-blink {
    0% {
        opacity: 0.6;
    }

    100% {
        opacity: 1;
    }
}

.contact-button {
    padding: 10px 20px;
    background-color: #f44336;
    /* Rojo */
    color: white;
    text-decoration: none;
    border-radius: 5px;
    font-size: 16px;
}

.contact-button:hover {
    background-color: #c62828;
    /* Rojo más oscuro */
}
</style>