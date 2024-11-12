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

        <!-- Modal for logout confirmation -->
        <div v-if="showModal" class="modal" id="logoutModal">
            <div class="modal-content">
                <h2>Confirmar Cierre de Sesión</h2>
                <p>¿Estás seguro de que deseas cerrar sesión?</p>
                <button class="btn" @click="logout">Sí, cerrar sesión</button>
                <button class="btn cancel" @click="closeLogoutModal">Cancelar</button>
            </div>
        </div>

        <!-- Profile Display -->
        <div id="profile-container" v-if="!isEditing">
            <h2 class="text-center" style="color: #f9c74f;">Perfil de Administrador</h2>
            <img :src="profilePic" alt="Foto de perfil" id="profile-pic">
            <div class="profile-info">
                <p><strong>Nombre:</strong> <span>{{ profile.nombre }}</span></p>
                <p><strong>Email:</strong> <span>{{ profile.email }}</span></p>
                <p><strong>Teléfono:</strong> <span>{{ profile.telefono }}</span></p>
                <p><strong>Dirección:</strong> <span>{{ profile.direccion }}</span></p>
            </div>
            <button id="edit-profile-button" @click="startEditing">Editar Perfil</button>
        </div>

        <!-- Edit Profile Form -->
        <div id="edit-profile-container" v-if="isEditing">
            <h2 class="text-center" style="color: #f9c74f;">Editar Perfil</h2>
            <form @submit.prevent="saveProfile">
                <label for="profile-pic-input">Foto de Perfil:</label>
                <input type="file" id="profile-pic-input" accept="image/*" @change="handleFileChange">
                <br>
                <label for="name">Nombre:</label>
                <input type="text" v-model="profile.nombre">
                <br>
                <label for="email">Email:</label>
                <input type="email" v-model="profile.email">
                <br>
                <label for="phone">Teléfono:</label>
                <input type="text" v-model="profile.telefono">
                <br>
                <label for="address">Dirección:</label>
                <input type="text" v-model="profile.direccion">
                <br>
                <button type="submit">Guardar Cambios</button>
            </form>
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
                <p>Con amor y dedicación | <router-link to="#">Política de Privacidad</router-link> | <router-link
                        to="#">Términos y Condiciones</router-link></p>
            </div>
        </footer>
    </div>
</template>

<script>
import { auth, db } from '../firebaseConfig'; // Asegúrate de que db esté correctamente exportado
import { doc, getDoc, updateDoc } from 'firebase/firestore';

export default {
    name: "ProfileAdmin",
    data() {
        return {
            profile: {
                nombre: '',
                email: '',
                telefono: '',
                direccion: '',
                FotoPerfil: ''
            },
            isEditing: false,
            showModal: false
        };
    },
    methods: {
        async fetchProfile() {
            const user = auth.currentUser;
            if (user) {
                try {
                    const docRef = doc(db, 'users', user.uid);
                    const docSnap = await getDoc(docRef);
                    if (docSnap.exists()) {
                        this.profile = docSnap.data();
                        this.profile.FotoPerfil = docSnap.data().FotoPerfil || 'default-profile.png'; // Fallback si no tiene foto
                    }
                } catch (error) {
                    console.error("Error al obtener el perfil: ", error);
                }
            }
        },
        startEditing() {
            this.isEditing = true;
        },
        async saveProfile() {
            const user = auth.currentUser;
            if (user) {
                try {
                    // Usar la API modular para actualizar el documento
                    const docRef = doc(db, 'users', user.uid);
                    await updateDoc(docRef, {
                        nombre: this.profile.nombre,
                        email: this.profile.email,
                        telefono: this.profile.telefono,
                        direccion: this.profile.direccion,
                        FotoPerfil: this.profile.FotoPerfil
                    });
                    this.isEditing = false;
                } catch (error) {
                    console.error("Error al guardar el perfil: ", error);
                }
            }
        },
        handleFileChange(event) {
            const file = event.target.files[0];
            if (file) {
                // Subir archivo y actualizar la foto de perfil
                const reader = new FileReader();
                reader.onload = () => {
                    this.profile.FotoPerfil = reader.result;
                };
                reader.readAsDataURL(file);
            }
        },
        showLogoutModal() {
            this.showModal = true;
        },
        closeLogoutModal() {
            this.showModal = false;
        },
        logout() {
            auth.signOut().then(() => {
                this.$router.push('/login'); // Redirigir a login después de cerrar sesión
            });
        }
    },
    mounted() {
        this.fetchProfile();
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

/* Estilos generales para la caja del perfil */
#profile-container,
#edit-profile-container {
    border: 2px solid #f9c74f;
    padding: 30px;
    border-radius: 10px;
    max-width: 600px;
    margin: 50px auto;
    background-color: #ffffff;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

/* Estilos para la imagen de perfil */
#profile-container img {
    display: block;
    margin: 0 auto 30px auto;
    border-radius: 50%;
    width: 150px;
    height: 150px;
    object-fit: cover;
    border: 4px solid #f9c74f;
}

/* Estilos para los botones */
button {
    background-color: #f9c74f;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    width: 100%;
    font-size: 16px;
    font-weight: bold;
}

button:hover {
    background-color: #f08c00;
}

/* Estilos para la información del perfil */
.profile-info {
    text-align: left;
    margin-bottom: 20px;
    font-family: 'Arial', sans-serif;
    color: #333;
}

.profile-info p {
    margin: 15px 0;
    font-size: 16px;
}

/* Estilos para el formulario de edición */
#edit-profile-form label {
    font-size: 14px;
    color: #555;
}

#edit-profile-form input,
#edit-profile-form textarea {
    margin-bottom: 15px;
    width: calc(100% - 22px);
    padding: 8px 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

/* Estilos para el modal de edicion */
#edit-profile-container {
    display: none;
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
    width: 70px;
    /* Aumentar el tamaño de los íconos */
    height: 70px;
    /* Aumentar el tamaño de los íconos */
    cursor: pointer;
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
    width: 70px;
    /* Aumentar el tamaño de los íconos */
    height: 70px;
    /* Aumentar el tamaño de los íconos */
    cursor: pointer;
}
</style>