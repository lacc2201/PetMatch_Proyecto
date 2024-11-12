<template>
    <div>
        <!-- Header -->
        <header>
            <div class="logo">
                <img src="../assets/logopetmatch.png" alt="PetMatch Logo">
            </div>
            <h5 class="title">!Bienvenido Adoptante!</h5>
            <nav>
                <router-link to="/HomeA">INICIO</router-link>
                <router-link to="/PetsA">PETS</router-link>
                <router-link to="/ReviewsA">RESEÑAS</router-link>
            </nav>
            <div class="contact-info">
                <!-- Botón para abrir el modal -->
                <a @click="showLogoutModal = true">Cerrar Sesión</a>
                <!-- Modal de Cerrar Sesión -->
                <div v-if="showLogoutModal" id="logoutModal" class="modal">
                    <div class="modal-content">
                        <h2>¿Estás seguro de que deseas cerrar sesión?</h2>
                        <button @click="logout">Confirmar</button>
                        <button @click="showLogoutModal = false">Cancelar</button>
                    </div>
                </div>
            </div>
        </header>

        <!-- Contenedor Principal de Reseñas -->
        <section class="reviews-section">
            <div class="title">
                Reseñas de Nuestros Clientes
            </div>
            <p1>Conoce las experiencias de quienes han encontrado un nuevo miembro para su familia.</p1>

            <div class="reviews-container">
                <div v-for="(review, index) in reviews" :key="index" class="review-card">
                    <div class="review-header">
                        <img :src="review.clientPhoto" alt="Foto del Cliente" class="client-photo">
                        <div class="client-info">
                            <h3>{{ review.clientName }}</h3>
                            <p class="review-date">{{ review.reviewDate }}</p>
                        </div>
                        <div class="rating" v-html="generatePawRating(review.rating)"></div>
                    </div>
                    <div class="review-content">
                        <div class="pet-photo">
                            <img :src="review.petPhoto" alt="Foto de la Mascota">
                        </div>
                        <div class="pet-info">
                            <h4>{{ review.petName }}</h4>
                            <p><strong>Estado de la Mascota:</strong> {{ review.petStatus }}</p>
                            <p>{{ review.reviewText }}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="add-review-button">
                <button @click="openReviewModal">Agregar Reseña</button>
            </div>

            <!-- Modal para agregar nueva reseña -->
            <div v-if="isModalOpen" class="modal">
                <div class="modal-content">
                    <span class="close-button" @click="closeReviewModal">&times;</span>
                    <h2>Agregar Nueva Reseña</h2>
                    <form @submit.prevent="submitReview">
                        <label for="client-name">Nombre:</label>
                        <input v-model="newReview.clientName" type="text" required>

                        <label for="pet-name">Nombre de la Mascota:</label>
                        <input v-model="newReview.petName" type="text" required>

                        <label for="pet-status">Estado de la Mascota:</label>
                        <input v-model="newReview.petStatus" type="text" required>

                        <label for="review-text">Reseña:</label>
                        <textarea v-model="newReview.reviewText" rows="5" required></textarea>

                        <div class="calificacion">
                            <label>Calificación:</label>
                            <div v-for="i in 5" :key="i">
                                <input type="radio" :value="i" v-model="newReview.rating">
                                <i class="fa fa-paw" :class="{ 'active': i <= newReview.rating }"></i>
                            </div>
                        </div>

                        <label for="client-photo">Foto del Cliente:</label>
                        <input type="file" @change="handleClientPhoto" accept="image/*">

                        <label for="pet-photo">Foto de la Mascota:</label>
                        <input type="file" @change="handlePetPhoto" accept="image/*">

                        <button type="submit">Enviar Reseña</button>
                    </form>
                </div>
            </div>
        </section>



        <div class="modal" id="logoutModal">
            <div class="modal-content">
                <h2>Confirmar Cierre de Sesión</h2>
                <p>¿Estás seguro de que deseas cerrar sesión?</p>
                <button class="btn" id="confirmLogoutBtn">Sí, cerrar sesión</button>
                <button class="btn cancel" id="cancelLogoutBtn">Cancelar</button>
            </div>
        </div>
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
                    <a href="#" class="btn-contact">¡Conoce nuestras mascotas disponibles!</a>
                </div>
            </div>
            <div class="footer-bottom">
                <p>🐾 "La felicidad se mide en colitas que se mueven". © 2024 PetMatch 🐾</p>
                <p>Con amor y dedicación | <a href="#">Política de Privacidad</a> | <a href="#">Términos y
                        Condiciones</a></p>
            </div>
        </footer>
    </div>
</template>

<script>
export default {
    name: "ReviewsAdoptante", // Cambia el nombre aquí
    data() {
    return {
      isModalOpen: false,
      reviews: [
        // Aquí puedes inicializar reseñas preexistentes si deseas
      ],
      newReview: {
        clientName: '',
        petName: '',
        petStatus: '',
        reviewText: '',
        rating: 0,
        clientPhoto: '',
        petPhoto: '',
      }
    };
  },
  methods: {
    openReviewModal() {
      this.isModalOpen = true;
    },
    closeReviewModal() {
      this.isModalOpen = false;
      this.resetNewReview();
    },
    resetNewReview() {
      this.newReview = {
        clientName: '',
        petName: '',
        petStatus: '',
        reviewText: '',
        rating: 0,
        clientPhoto: '',
        petPhoto: '',
      };
    },
    submitReview() {
      const formattedReview = {
        ...this.newReview,
        reviewDate: this.formatDate(new Date())
      };
      this.reviews.push(formattedReview);
      this.closeReviewModal();
    },
    handleClientPhoto(event) {
      const file = event.target.files[0];
      if (file) {
        this.newReview.clientPhoto = URL.createObjectURL(file);
      }
    },
    handlePetPhoto(event) {
      const file = event.target.files[0];
      if (file) {
        this.newReview.petPhoto = URL.createObjectURL(file);
      }
    },
    generatePawRating(rating) {
      let paws = '';
      for (let i = 1; i <= 5; i++) {
        paws += `<i class="fas fa-paw ${i <= rating ? 'filled' : ''}"></i>`;
      }
      return paws;
    },
    formatDate(date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return date.toLocaleDateString('es-ES', options);
    }
  }
};

</script>

<style scoped>
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

/* Estilos para el modal */
.modal {
    display: none;
    /* Ocultar el modal por defecto */
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgb(0, 0, 0);
    background-color: rgba(0, 0, 0, 0.4);
    padding-top: 60px;
}

.modal-content {
    background-color: #fefefe;
    margin: 5% auto;
    padding: 20px;
    border: 1px solid #888;
    width: 80%;
}

.close-button {
    color: #aaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
}

.close-button:hover,
.close-button:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
}

.review-form {
    display: flex;
    flex-direction: column;
}

.review-form label {
    margin: 10px 0 5px;
}

.review-form input,
.review-form textarea {
    margin-bottom: 10px;
}

.star-rating {
    display: flex;
    align-items: center;
}

.star-rating input[type="radio"] {
    display: none;
}

.star-rating label {
    font-size: 24px;
    color: #ccc;
    cursor: pointer;
}

.star-rating input[type="radio"]:checked~label {
    color: #f39c12;
}

.calificacion {
    display: flex;
    gap: 10px;
}

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
}

/* Estilo de nube en la parte inferior del header */
header::after {
    content: '';
    position: absolute;
    bottom: -60px;
    left: 0;
    width: 90%;
    height: 80px;
    background: #4a90e2;
    border-radius: 100% 100% 0 0;
    z-index: 1;
}


.logo img {
    width: 185px;
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
    background: #a2c2e3;
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
    width: 205px;
    /* Aumentar el tamaño de la imagen del logo */
    margin-bottom: -5px;
    /* Reducir el margen inferior para acercar los íconos al logo */
}

.social-icons {
    display: flex;
    justify-content: center;
    margin-top: -25px;
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
    animation: paw-blink 1.5s infinite alternate;
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
    backdrop-filter: blur(10px);
    background-color: rgba(255, 223, 0, 0.6);
    /* Amarillo claro con opacidad */
    border-radius: 15px;
    /* Bordes redondeados */
    margin: auto;
    /* Centrar la caja */
}

.caja__trasera div {
    margin: 100px 50px;
    color: #002f6c;
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
    border: 2px solid #002f6c;
    /* Azul oscuro */
    font-size: 16px;
    background: #f9c74f;
    /* Amarillo dorado */
    color: #002f6c;
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
    color: #002f6c;
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
    color: #333;
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
}

.review-card {
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 20px;
    text-align: left;
}

.review-header {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
}

.client-photo {
    border-radius: 50%;
    margin-right: 15px;
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

.review-content {
    display: flex;
    flex-direction: column;
}

.pet-photo img {
    width: 100%;
    border-radius: 10px;
    margin-bottom: 20px;
}

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
</style>