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

        <!-- Sección principal -->
        <section class="dashboard-overview">
            <div class="text">
                <h2 class="title">Panel de Administración</h2>
                <div class="overview-cards">
                    <div class="card">
                        <h2>👥 Usuarios Registrados</h2>
                        <p>{{ usuariosActivos }} Usuarios activos</p>
                    </div>
                    <div class="card">
                        <h2>🐾 Mascotas Publicadas</h2>
                        <p>{{ mascotasEnAdopcion }} Mascotas en adopción</p>
                    </div>
                    <div class="card">
                        <h2>⭐ Reseñas Pendientes</h2>
                        <p>{{ reseñasPendientes }} Reseñas por revisar</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Sección de acciones -->
        <div class="admin-actions">
            <h1>Acciones Administrativas de Mascotas</h1>
            <div class="actions-grid">
                <router-link to="/usersA" class="action-card">
                    <i class="fas fa-user-friends"></i>
                    Gestionar Usuarios
                </router-link>
                <router-link to="/calendar" class="action-card">
                    <i class="fas fa-calendar-alt"></i>
                    Gestionar Citas
                </router-link>
                <router-link to="/ReviewsAdmin" class="action-card">
                    <i class="fas fa-comments"></i>
                    Revisar Reseñas de Adoptantes
                </router-link>
                <router-link to="/reports" class="action-card">
                    <i class="fas fa-chart-line"></i>
                    Ver Reportes
                </router-link>
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
                <p>Con amor y dedicación | <router-link to="#">Política de Privacidad</router-link> | <router-link to="#">Términos y
                    Condiciones</router-link></p>
            </div>
        </footer>
    </div>
</template>

<script>
import { cargarMascotas, cargarUsuarios, cargarReseñas } from '../firebase.js';

export default {
    name: "AdminHome",
    data() {
        return {
            usuariosActivos: 0,
            mascotasEnAdopcion: 0,
            reseñasPendientes: 0,
        };
    },
    async mounted() {
        try {
            // Cargar y contar usuarios
            const usuarios = await cargarUsuarios();
            console.log("Usuarios cargados:", usuarios); // Verifica los datos obtenidos
            this.usuariosActivos = usuarios.length;

            // Cargar y contar mascotas en adopción
            const mascotas = await cargarMascotas();
            console.log("Mascotas cargadas:", mascotas); // Verifica los datos obtenidos
            this.mascotasEnAdopcion = mascotas.filter(m => m.estado === 'En adopción').length;

            // Cargar y contar reseñas pendientes
            const reseñas = await cargarReseñas();
            console.log("Reseñas cargadas:", reseñas); // Verifica los datos obtenidos
            this.reseñasPendientes = reseñas.filter(r => r.estado === 'Pendiente').length;
        } catch (error) {
            console.error("Error cargando los datos:", error);
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


/* Sección principal */
.dashboard-overview {
    padding: 50px 100px;
    background-color: #fff;
    border-radius: 20px;
    margin: 40px 100px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}



/* Titulo brillante */
.title {
    font-family: 'Arial', sans-serif;
    font-size: 1.9rem;
    font-weight: bold;
    color: #ffffff;
    /* Color del texto blanco */
    background: #4a90e2;
    /* Fondo azul claro */
    border-radius: 10px;
    /* Bordes más redondeados */
    padding: 10px 20px;
    /* Espaciado interno reducido */
    text-align: center;
    margin-bottom: 20px;
    position: relative;
    overflow: hidden;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    display: inline-block;
    animation: shadowPulse 2s infinite;
    /* Animación de sombra parpadeante */
}

.title::before {
    content: "";
    position: absolute;
    top: -15px;
    /* Ajustado para el nuevo tamaño */
    left: -15px;
    /* Ajustado para el nuevo tamaño */
    width: 65px;
    /* Tamaño del decorado reducido */
    height: 65px;
    background: radial-gradient(circle, #f3fd9b 0%, rgba(255, 255, 255, 0) 50%);
    border-radius: 50%;
    z-index: 1;
}

.title::after {
    content: "";
    position: absolute;
    bottom: -15px;
    /* Ajustado para el nuevo tamaño */
    right: -15px;
    /* Ajustado para el nuevo tamaño */
    width: 65px;
    /* Tamaño del decorado reducido */
    height: 65px;
    background: radial-gradient(circle, #f3fd9b 0%, rgba(255, 255, 255, 0) 50%);
    border-radius: 50%;
    z-index: 1;
}

@keyframes shadowPulse {

    0%,
    100% {
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }

    50% {
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.5);
    }
}

.content-section .image-box img:hover {
    transform: scale(1.05);
    /* Efecto de zoom al pasar el mouse */
}


.overview-cards {
    display: flex;
    justify-content: space-around;
    gap: 20px;
    margin-top: 30px;
}

.card {
    background-color: #f9f9f9;
    padding: 30px;
    /* Reducido de 40px a 30px */
    border-radius: 15px;
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
    text-align: center;
    transition: all 0.3s ease;
    flex: 1;
}

.card h2 {
    font-size: 1.5em;
    /* Reducido de 1.8em a 1.5em */
    margin-bottom: 10px;
    color: #4a90e2;
}

.card p {
    font-size: 1.1em;
    /* Reducido de 1.2em a 1.1em */
    font-weight: bold;
    color: #666;
}

.card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
}

/* Estilo de las acciones del administrador */
.admin-actions {
    padding: 40px 80px;
    /* Menos espacio lateral */
}

.admin-actions h1 {
    color: #333;
    /* Color del texto */
    font-size: 2.5em;
    /* Tamaño del título */
    text-align: center;
    /* Centrar el título */
    margin-bottom: 20px;
    /* Espacio debajo del título */
}

.actions-grid {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    /* Permite que las tarjetas se muevan a la siguiente fila si es necesario */
    gap: 20px;
    /* Espacio entre las tarjetas */
}

.action-card {
    background-color: #f9c74f;
    /* Color de fondo */
    color: white;
    /* Color de texto */
    padding: 30px;
    /* Espacio interno ajustado */
    border-radius: 10px;
    /* Bordes ligeramente más redondeados */
    text-align: center;
    /* Centrar texto */
    width: 200px;
    /* Ancho de las tarjetas */
    transition: all 0.3s ease;
    /* Transiciones suaves */
    text-decoration: none;
    /* Sin subrayado */
    font-weight: bold;
    /* Texto en negrita */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    /* Sombra más suave */
}

.action-card:hover {
    background-color: #f3bc4e;
    /* Color más oscuro al pasar el cursor */
    transform: translateY(-5px);
    /* Efecto de elevación */
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
    /* Sombra más intensa al pasar el cursor */
}

.action-card i {
    font-size: 2.5em;
    /* Aumentar el tamaño del ícono */
    margin-bottom: 10px;
    /* Espacio debajo del ícono */
    display: block;
    /* Asegura que el ícono sea un bloque para centrar correctamente */
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
</style>