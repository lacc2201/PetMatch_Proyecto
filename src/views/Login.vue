<template>
    <div>
        <!-- Header -->
        <header>
            <div class="logo">
                <img src="../assets/logopetmatch.png" alt="PetMatch Logo" />
            </div>
            <nav>
                <router-link to="/">INICIO</router-link>
                <router-link to="/Pets">PETS</router-link>
                <router-link to="/Reviews">RESEÑAS</router-link>
            </nav>
            <div class="contact-info">
                <router-link to="/login" class="contact-button">Registrarse/Iniciar Sesión</router-link>
            </div>
        </header>

        <main>
            <div class="contenedor__todo">
                <div class="caja__trasera">
                    <div class="caja__trasera-login">
                        <h3>¿Ya eres parte de nuestra familia?</h3>
                        <p>Inicia sesión y encuentra el compañero ideal para tu hogar</p>
                        <button id="btn__iniciar-sesion" @click="mostrarLogin">Iniciar Sesión</button>
                    </div>
                    <div class="caja__trasera-register">
                        <h3>¿Aún no eres miembro?</h3>
                        <p>Únete a nosotros y encuentra a tu compañero ideal</p>
                        <button id="btn__registrarse" @click="mostrarRegistro">Regístrate</button>
                    </div>
                </div>

                <!-- Formulario de Login y registro -->
                <div class="contenedor__login-register">
                    <!-- Login -->
                    <form id="login-form" class="formulario__login" v-show="mostrarLoginForm"
                        @submit.prevent="validarFormularioLogin">
                        <h2>🐾 Iniciar Sesión 🐾</h2>
                        <input type="email" id="login-email" placeholder="Correo Electrónico" v-model="loginEmail"
                            required />
                        <div class="password-container">
                            <input type="password" id="login-password" placeholder="Contraseña" v-model="loginPassword"
                                required />
                            <button type="button" class="toggle-password"
                                @click="togglePassword('login-password')">👁️</button>
                        </div>
                        <button type="submit">Entrar</button>
                    </form>

                    <!-- Register -->
                    <form class="formulario__register" v-show="mostrarRegisterForm"
                        @submit.prevent="validarFormularioRegistro">
                        <h2>🐶 Regístrate 🐱</h2>
                        <input type="text" id="register-nombre" placeholder="Nombre Completo" v-model="registerNombre"
                            required />
                        <input type="email" id="register-email" placeholder="Correo Electrónico" v-model="registerEmail"
                            required />
                        <input type="text" id="register-direccion" placeholder="Dirección" v-model="registerDireccion"
                            required />
                        <input type="tel" id="register-telefono" placeholder="Teléfono Celular"
                            v-model="registerTelefono" required />
                        <div class="password-container">
                            <input type="password" id="register-password" placeholder="Contraseña"
                                v-model="registerPassword" required />
                            <button type="button" class="toggle-password"
                                @click="togglePassword('register-password')">👁️</button>
                        </div>
                        <button type="submit">Regístrate</button>
                    </form>
                </div>
            </div>
        </main>

        <br /><br /><br /><br />
        <footer>
            <div class="footer-container">
                <div class="footer-section">
                    <h3>🐾 ¡Estamos aquí para ayudarte! 🐾</h3>
                    <p>
                        📅 <strong>Lunes a Viernes:</strong> 9:00 AM - 7:00 PM<br />
                        🕒 <strong>Sábados:</strong> 10:00 AM - 2:00 PM<br />
                        🚪 <strong>Domingos y festivos:</strong> Cerrado, ¡nos vemos el lunes!
                    </p>
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
                    <a href="#" class="btn-contact">¡Conoce nuestras mascotas disponibles!</a>
                </div>
            </div>
            <div class="footer-bottom">
                <p>🐾 "La felicidad se mide en colitas que se mueven". © 2024 PetMatch 🐾</p>
                <p>
                    Con amor y dedicación | <a href="#">Política de Privacidad</a> | <a href="#">Términos y
                        Condiciones</a>
                </p>
            </div>
        </footer>
    </div>
</template>

<script>
import { auth, db } from "@/firebaseConfig"; // Asegúrate de importar tu configuración de Firebase
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore"; // Agrega getDoc aquí

export default {
    name: 'UserLogin',
    data() {
        return {
            mostrarLoginForm: true,
            mostrarRegisterForm: false,
            // Datos para el login
            loginEmail: "",
            loginPassword: "",
            loginRol: "", // Para el campo de rol en login (aunque este se puede definir automáticamente)
            // Datos para el registro
            registerNombre: "",
            registerEmail: "",
            registerDireccion: "",
            registerTelefono: "",
            registerPassword: "",
        };
    },
    methods: {
        // Muestra el formulario de login
        mostrarLogin() {
            this.mostrarLoginForm = true;
            this.mostrarRegisterForm = false;
        },

        // Muestra el formulario de registro
        mostrarRegistro() {
            this.mostrarLoginForm = false;
            this.mostrarRegisterForm = true;
        },

        async validarFormularioLogin() {
            if (!this.loginEmail || !this.loginPassword) {
                alert("Todos los campos son obligatorios.");
                return false;
            }

            try {
                // Inicia sesión con Firebase Authentication
                const userCredential = await signInWithEmailAndPassword(auth, this.loginEmail, this.loginPassword);
                const user = userCredential.user;

                // Recupera la información del usuario desde Firestore usando el UID
                const userDoc = await getDoc(doc(db, "usuarios", user.uid));

                if (userDoc.exists()) {
                    const userData = userDoc.data();

                    // Verifica el rol del usuario y redirige según corresponda
                    if (userData.rol === "Adoptante") {
                        window.location.href = '/HomeA';  // Página del adoptante
                    } else if (userData.rol === "Refugio") {
                        window.location.href = '/HomeR';  // Página del refugio
                    } else if (userData.rol === "Administrador") {
                        window.location.href = '/AdminH';  // Página del administrador
                    } else {
                        alert("Rol no reconocido.");
                    }
                } else {
                    alert("Error: No se encontró el usuario en la base de datos.");
                }

            } catch (error) {
                alert("Error en el inicio de sesión: " + error.message);
            }
        },

        // Validación del formulario de registro y almacenamiento en la tabla usuarios
        async validarFormularioRegistro() {
            if (!this.registerNombre || !this.registerEmail || !this.registerDireccion || !this.registerTelefono || !this.registerPassword) {
                alert("Todos los campos son obligatorios.");
                return false;
            }

            try {
                // Registrar el usuario en Firebase Authentication
                const userCredential = await createUserWithEmailAndPassword(auth, this.registerEmail, this.registerPassword);
                const user = userCredential.user;

                // Guardar la información del usuario en Firestore (tabla usuarios)
                await setDoc(doc(db, "usuarios", user.uid), {
                    nombre: this.registerNombre,
                    email: this.registerEmail,
                    direccion: this.registerDireccion,
                    telefono: this.registerTelefono,
                    rol: 'Adoptante', // Rol por defecto para los nuevos usuarios
                    fecha_registro: new Date(), // Fecha de registro del usuario
                });

                // Aquí se muestra el mensaje de éxito al completar el registro
                alert("Registro exitoso. Ahora inicia sesión.");
                this.mostrarLogin(); // Cambiar a la vista de login

            } catch (error) {
                // Si ocurre un error, mostrar el mensaje correspondiente
                alert("Error en el registro: " + error.message);
            }
        },

        // Función para mostrar/ocultar contraseña
        togglePassword(inputId) {
            const input = document.getElementById(inputId);
            if (input.type === "password") {
                input.type = "text";
            } else {
                input.type = "password";
            }
        },
    },
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
    gap: 30px;
    z-index: 2;
}

nav a {
    text-decoration: none;
    color: #ffffff;
    font-size: 18px;
    font-weight: bold;
    padding: 10px 20px;
    background-color: #66a3ff;
    border: none;
    border-radius: 30px;
    transition: all 0.3s ease;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
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
    padding: 12px 24px;
    font-size: 18px;
    font-weight: bold;
    border-radius: 30px;
    transition: all 0.3s ease;
    display: inline-block;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    text-align: center;
}

.contact-info a:hover {
    background-color: #1d6fd8;
    /* Color más oscuro para el hover */
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.3);
    transform: translateY(-3px);
}


/* Submenú */
.sub-menu {
    background-color: #f9f9f9;
    /* Color de fondo más claro para una tienda de mascotas */
    padding: 15px 0;
    display: flex;
    justify-content: space-around;
    border: 2px solid #d1d1d1;
    /* Color de borde más suave */
    border-radius: 10px;
    /* Bordes redondeados para un estilo más amigable */
    margin-bottom: 20px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    /* Sombra más pronunciada */
}

.sub-menu a {
    text-decoration: none;
    color: #1b7ff1;
    /* Azul intermedio para coincidir con el header */
    font-size: 18px;
    display: flex;
    align-items: center;
    gap: 10px;
    /* Mayor espacio entre icono y texto */
    padding: 8px 16px;
    /* Espaciado interior del enlace */
    border-radius: 20px;
    /* Bordes redondeados para el enlace */
    transition: background-color 0.3s ease, color 0.3s ease;
    /* Transición suave para cambios */
}

.sub-menu a:hover {
    background-color: #f8ff92;
    /* Color de fondo al pasar el mouse */
    color: #f5943a;
    /* Color de texto al pasar el mouse */
}

.sub-menu a img {
    width: 24px;
    /* Tamaño ajustado del icono */
    height: 24px;
    /* Tamaño ajustado del icono */
}

/* Estilos generales */
.carousel {
    width: 95%;
    /* Ajusta el ancho a un 90% de la pantalla */
    max-width: 1200px;
    /* Limita el ancho máximo */
    margin: 20px auto;
    overflow: hidden;
    border: 2px solid #1d9ee9;
    position: relative;
    background-color: #e0e0e0;
    border-radius: 10px;
    /* Bordes redondeados para un mejor estilo */
}

.carousel-images {
    display: flex;
    transition: transform 0.7s ease-in-out;
}

.carousel-images img {
    width: 100%;
    height: 400px;
    /* Altura fija para mantener el carrusel balanceado */
    object-fit: cover;
    min-width: 100%;
    flex: 0 0 100%;
    border-radius: 10px;
    /* Bordes redondeados en las imágenes */
}

/* Ocultar las flechas del carrusel */
.carousel-control-prev,
.carousel-control-next {
    display: none !important;
}

.read-more:hover {
    background-color: #007bff7c;
}

/* Sección de contenido con imágenes y texto */
.content-section {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 40px;
    background: linear-gradient(135deg, #f9f9f9, #ffffff);
    /* Gradiente de fondo para más dinamismo */
    border-radius: 20px;
    /* Bordes redondeados más suaves */
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
    /* Sombra más pronunciada para profundidad */
    overflow: hidden;
    /* Asegura que todo el contenido quede dentro del contenedor */
}

.content-section .text {
    width: 50%;
    /* Ancho ajustado para más equilibrio */
    text-align: justify;
    font-size: 20px;
    /* Tamaño de fuente grande para mejor legibilidad */
    color: #333;
    /* Color del texto oscuro para buen contraste */
    line-height: 1.6;
    /* Espaciado entre líneas para mejorar la legibilidad */
}

.content-section .image-box {
    width: 45%;
    height: 300px;
    /* Altura de la imagen */
    background-color: #ffffff;
    /* Fondo blanco para que la imagen resalte */
    border: 5px solid #4a90e2;
    /* Borde azul intermedio para destacarse */
    border-radius: 15px;
    /* Bordes redondeados para un diseño más suave */
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    /* Asegura que la imagen no sobresalga del contenedor */
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    /* Sombra sutil para la caja de imágenes */
}

.content-section .image-box img {
    max-width: 100%;
    /* Ajusta la imagen al ancho del contenedor */
    max-height: 100%;
    /* Ajusta la imagen a la altura del contenedor */
    object-fit: cover;
    /* Mantiene la imagen bien ajustada */
    border-radius: 15px;
    /* Bordes redondeados para la imagen */
    transition: transform 0.3s ease;
    /* Transición suave para el efecto hover */
}


/*Titulo brillante */
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
    margin: 0 auto;
    /* Centrar horizontalmente */
    margin-bottom: 20px;
    max-width: 600px;
    /* Limitar el ancho máximo */
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

/*P texto debajo del titulo*/

p1 {
    font-family: 'Arial', sans-serif;
    font-size: 1.2rem;
    color: #000000;
    /* Color del texto */
    line-height: 1.6;
    position: relative;
    /* Necesario para el pseudo-elemento */
    display: inline-block;
    /* Necesario para ajustar el ancho del pseudo-elemento */
    padding-bottom: 5px;
    /* Espacio para el subrayado */
    transition: color 0.3s ease;
    /* Transición suave para el color */
}

p1::after {
    content: "";
    position: absolute;
    right: 0;
    /* Alinea el subrayado al final del texto */
    bottom: 0;
    width: 0;
    height: 2px;
    background-color: #ecff40;
    /* Color del subrayado */
    transition: width 0.3s ease;
    /* Transición suave para el subrayado */
}

p1:hover {
    color: #40b3ff;
    /* Color del texto cuando se pasa el mouse */
}

p1:hover::after {
    width: 100%;
    /* Expande el subrayado cuando se pasa el mouse */
}

/* Sección con íconos circulares */
.icon-section {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    /* Ajusta el número de columnas automáticamente */
    gap: 20px;
    padding: 40px;
    background-color: #fffbe9;
    /* Fondo amarillo pálido para un efecto tierno */
    border-radius: 20px;
    /* Bordes redondeados para la sección */
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
    /* Sombra pronunciada para profundidad */
    text-align: center;
    /* Centra el texto */
}

.icon-box {
    background-color: #ffffff;
    /* Fondo blanco para cada caja de íconos */
    padding: 20px;
    border-radius: 15px;
    /* Bordes redondeados para cada caja */
    border: 2px solid #ffcc00;
    /* Borde amarillo brillante */
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    /* Sombra suave para cada caja */
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    /* Transición suave para efectos */
}

.icon-box:hover {
    transform: scale(1.05);
    /* Efecto de zoom al pasar el mouse */
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
    /* Sombra más pronunciada al pasar el mouse */
}

.icon {
    width: 80px;
    height: 80px;
    background-color: #4a90e2;
    /* Color azul vibrante */
    border-radius: 50%;
    /* Hace el icono circular */
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 40px;
    color: #ffffff;
    /* Color del ícono blanco */
    margin-bottom: 10px;
    transition: transform 0.3s ease;
    /* Transición suave para el efecto hover */
}

.icon:hover {
    transform: rotate(15deg);
    /* Efecto de rotación al pasar el mouse */
}

.icon-description {
    font-size: 20px;
    font-weight: bold;
    color: #4a90e2;
    /* Color de texto azul que combina con el ícono */
    margin-bottom: 10px;
}

.icon-box p {
    font-size: 16px;
    color: #333;
    /* Color de texto oscuro para descripciones */
    line-height: 1.5;
    /* Espaciado entre líneas para mejor legibilidad */
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

/*Login*/
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    text-decoration: none;
    font-family: 'Roboto', sans-serif;
}

body {
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    background-attachment: fixed;
    font-family: 'Roboto', sans-serif;
}

main {
    width: 100%;
    padding: 20px;
    margin: auto;
    margin-top: 100px;
}

.contenedor__todo {
    width: 100%;
    max-width: 800px;
    margin: auto;
    position: relative;
}

.caja__trasera {
    width: 100%;
    /* Aumenta el ancho de la caja */
    padding: 20px 30px;
    /* Aumenta el espacio interior */
    display: flex;
    justify-content: center;
    -webkit-backdrop-filter: blur(10px);
    backdrop-filter: blur(80px);
    background: rgba(0, 47, 108, 0.95);
    /* Azul oscuro con opacidad alta */
    background-image: url('../assets/fondo-caja.png');
    background-size: cover;
    background-position: center;
    border-radius: 15px;
    /* Bordes redondeados */
    margin: auto;
    /* Centrar la caja */
}

.caja__trasera div {
    margin: 100px 50px;
    color: #fff;
    /* Azul oscuro para el texto */
    transition: all 500ms;
}

.caja__trasera div p,
.caja__trasera button {
    margin-top: 30px;
}

.password-container {
    position: relative;
    display: flex;
    align-items: center;
}

.password-container input[type="password"],
.password-container input[type="text"] {
    width: 100%;
    padding-right: 40px;
    /* Espacio para el botón del ojo */
}

.toggle-password {
    position: absolute;
    right: 10px;
    background: none;
    border: none;
    cursor: pointer;
    font-size: 1.2rem;
    color: #333;
}

.toggle-password:focus {
    outline: none;
}

.caja__trasera div h3 {
    font-weight: 600;
    /* Negrita */
    font-size: 28px;
}

.caja__trasera div p {
    font-size: 18px;
    font-weight: 400;
}

.caja__trasera button {
    padding: 10px 50px;
    border: 2px solid #4a90e2;
    /* Azul oscuro */
    font-size: 16px;
    background: transparent;
    /* Amarillo dorado */
    color: #fff;
    /* Azul oscuro */
    font-weight: 600;
    cursor: pointer;
    outline: none;
    border-radius: 5px;
    /* Bordes redondeados */
    transition: background 300ms, color 300ms;
}

.caja__trasera button:hover {
    background: #f9c74f;
    /* Amarillo dorado */
    color: #4a90e2;
    /* Azul oscuro */
}

/* Formularios */
.contenedor__login-register {
    display: flex;
    align-items: center;
    width: 100%;
    max-width: 380px;
    position: relative;
    top: -220px;
    left: 10px;
    transition: left 500ms cubic-bezier(0.175, 0.885, 0.320, 1.275);
}

.contenedor__login-register form {
    width: 100%;
    padding: 40px 20px;
    background: #ffffff;
    position: absolute;
    border-radius: 15px;
    /* Bordes redondeados */
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
    /* Sombra suave */
}

.contenedor__login-register form h2 {
    font-size: 28px;
    text-align: center;
    margin-bottom: 20px;
    color: #4a90e2;
    /* Azul oscuro */
}

.contenedor__login-register form input {
    width: 100%;
    margin-top: 20px;
    padding: 12px;
    border: 1px solid #d0d0d0;
    background: #f9f9f9;
    font-size: 16px;
    outline: none;
    border-radius: 5px;
    /* Bordes redondeados */
}

/* Estilos para el campo de selección de rol */
form select {
    width: 100%;
    margin-top: 20px;
    padding: 12px;
    border: 1px solid #d0d0d0;
    background: #f9f9f9;
    font-size: 16px;
    color: #555;
    border-radius: 5px;
    /* Bordes redondeados */
    outline: none;
    appearance: none;
    font-family: 'Roboto', sans-serif;
}

form select:focus {
    border: 2px solid #4a90e2;
    /* Resalta el borde al enfocar */
    background: #ffffff;
}

form select option {
    font-family: 'Roboto', sans-serif;
    font-size: 16px;
    color: #4a90e2;
}

.contenedor__login-register form button {
    padding: 13px;
    margin-top: 20px;
    border: none;
    font-size: 16px;
    background: #4a90e2;
    /* Azul oscuro */
    color: #ffffff;
    font-weight: 600;
    cursor: pointer;
    outline: none;
    border-radius: 5px;
    /* Bordes redondeados */
    transition: background 300ms;
}

.contenedor__login-register form button:hover {
    background: #4a90e2;
    /* Azul más oscuro */
}

/* Media Queries */
@media screen and (max-width: 850px) {
    main {
        margin-top: 50px;
    }

    /* Ajustes adicionales para dispositivos móviles */
    @media screen and (max-width: 850px) {
        form select {
            padding: 10px;
            font-size: 14px;
        }
    }

    .caja__trasera {
        max-width: 350px;
        height: auto;
        flex-direction: column;
        margin: auto;
    }

    .caja__trasera div {
        margin: 0;
        position: absolute;
    }

    /* Formularios */
    .contenedor__login-register {
        top: -10px;
        left: -5px;
        margin: auto;
    }

    .contenedor__login-register form {
        position: relative;
    }
}

/*Logout*/

.modal {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

/* Ajustes para que el modal sea desplazable */
.modal-content {
    background-color: #fff;
    border-radius: 10px;
    padding: 20px;
    max-width: 500px;
    margin: 100px auto;
    text-align: left;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    max-height: 80vh;
    /* Limita la altura máxima del modal */
    overflow-y: auto;
    /* Añade desplazamiento vertical si es necesario */
}

.modal-content h2 {
    margin: 0;
    color: #333;
}

.modal-content .btn {
    background: #007bff;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    transition: background 0.3s;
    margin: 10px;
}

.modal-content .btn:hover {
    background: #0056b3;
}

.modal-content .btn.cancel {
    background: #ccc;
}

.modal-content .btn.cancel:hover {
    background: #aaa;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: scale(0.9);
    }

    to {
        opacity: 1;
        transform: scale(1);
    }
}

/* Estilos para las reseñas */
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

.reviews-section p1 {
    font-size: 1.2rem;
    color: #666;
    margin-bottom: 40px;
    display: block;
}

.reviews-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}

.review-card {
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 20px;
    text-align: left;
    width: 30%;
    margin-bottom: 20px;
}

.review-header {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
}

/* Estilo para la foto del cliente en las reseñas */
.client-photo {
    width: 80px;
    /* Ajusta el tamaño según el diseño */
    height: 80px;
    /* Mantén el aspecto cuadrado */
    border-radius: 50%;
    /* Asegura que la imagen sea circular */
    margin-right: 15px;
    object-fit: cover;
    /* Mantiene la proporción de la imagen */
}


.client-info h3 {
    margin: 0;
    font-size: 1.5rem;
    color: #333;
}

.review-date {
    font-size: 0.9rem;
    color: #aaa;
}

.rating {
    margin-left: auto;
    display: flex;
}

.rating .fas {
    color: #f4c150;
    margin-left: 5px;
}

/* Estilo para el contenido de la reseña */
.review-content {
    display: flex;
    align-items: center;
    gap: 20px;
    /* Espacio entre la imagen y la información */
}

/* Estilo para la foto de la mascota en las reseñas */
.pet-photo img {
    width: 150px;
    /* Ajusta el tamaño según el diseño */
    height: auto;
    /* Mantiene la proporción de la imagen */
    border-radius: 10px;
    /* Añade bordes redondeados si es necesario */
    object-fit: cover;
    /* Mantiene la proporción de la imagen */
}

/* Estilo para la información de la mascota */
.pet-info {
    flex: 1;
    /* Permite que la información ocupe el espacio restante */
    display: flex;
    flex-direction: column;
    gap: 10px;
    /* Espacio entre los elementos dentro de la información */
}

/* Ajusta el tamaño del texto en la información de la mascota */
.pet-info h4 {
    font-size: 1.4rem;
    margin-bottom: 10px;
    color: #333;
}

.pet-info p {
    font-size: 1rem;
    color: #555;
}

.add-review-button {
    margin-top: 40px;
}

.add-review-button button {
    background-color: #f9c74f;
    color: #fff;
    padding: 12px 20px;
    border: none;
    border-radius: 5px;
    font-size: 1rem;
    cursor: pointer;
}

.add-review-button button:hover {
    background-color: #f9c74f;
}

.modal-content {
    background-color: #fff;
    border-radius: 10px;
    padding: 20px;
    max-width: 500px;
    margin: 100px auto;
    text-align: left;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

/* Botón para cerrar el modal */
.close-button {
    float: right;
    font-size: 1.5rem;
    cursor: pointer;
    color: #aaa;
}

/* Estilos para las etiquetas del formulario */
.review-form label {
    display: block;
    margin-bottom: 10px;
    font-size: 1rem;
    color: #333;
}

/* Estilos para los campos de entrada y área de texto */
.review-form input,
.review-form textarea {
    width: 100%;
    padding: 10px;
    margin-bottom: 20px;
    border-radius: 5px;
    border: 1px solid #ddd;
}

/* Estilo específico para los campos de tipo archivo */
.review-form input[type="file"] {
    padding: 3px;
}

/* Estilo para la calificación por estrellas */
.star-rating {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
}

.star-rating input {
    display: none;
}

.star-rating label {
    font-size: 1.5rem;
    color: #ddd;
    cursor: pointer;
}

.star-rating input:checked~label,
.star-rating label:hover,
.star-rating label:hover~label {
    color: #f9c74f;
}

/* Estilo para el botón de enviar reseña */
.review-form button {
    background-color: #f9c74f;
    color: #fff;
    padding: 12px 20px;
    border: none;
    border-radius: 5px;
    font-size: 1rem;
    cursor: pointer;
    width: 100%;
}

.review-form button:hover {
    background-color: #f9c74f;
}

.paw-rating label {
    font-size: 24px;
    color: #ccc;
    cursor: pointer;
}

.paw-rating input[type="radio"]:checked~label {
    color: #f39c12;
}

.review-row {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 20px;
}

input[type="radio"] {
    display: none;
}

input[type="radio"]:checked+.paw-icon {
    color: orange;
}

.paw-icon:hover {
    color: darkorange;
}

.paw-icon.active {
    color: orange;
}
</style>
