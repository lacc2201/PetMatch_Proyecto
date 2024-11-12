<template>
    <div>
        <!-- Header -->
        <header>
            <div class="logo">
                <img src="../assets/logopetmatch.png" alt="PetMatch Logo">
            </div>
            <h5 class="title">!Bienvenido Refugio!</h5>
            <nav>
                <router-link to="/HomeR">INICIO</router-link>
                <router-link to="/PetsR">MIS MASCOTAS</router-link>
                <router-link to="/ReviewsR">RESEÑAS</router-link>
            </nav>
            
            <div class="header-icons">
                <router-link to="/CalendarR"><img src="../assets/icon-calendar.png" alt="Calendario"></router-link>
                <router-link to="/profileR"><img id="header-profile-icon" src="../assets/icon-profile.png"
                        alt="Perfil"></router-link>
            </div>
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

        <br><br>
        <section class="reviews-section">
            <div class="title">Gestión de Mascotas</div>

            <div style="position: fixed; bottom: 20px; right: 20px;">
                <button @click="openModal"
                        style="background-color: #f5c20b; color: white; padding: 15px; border-radius: 50%; border: none; cursor: pointer; font-size: 20px;">+</button>
            </div>

            <!-- Modal overlay -->
            <div v-if="modalVisible" id="modal-overlay"
                 style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.5); z-index: 999;">
            </div>

            <!-- Modal content -->
            <div v-if="modalVisible" id="modal"
                 style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 90%; max-width: 500px; background-color: white; padding: 20px; box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.5); z-index: 1000; border-radius: 8px;">
                <button @click="closeModal"
                        class="close-btn" style="position: absolute; top: 10px; right: 15px; background-color: transparent; border: none; font-size: 24px; cursor: pointer;">&times;</button>

                <h2 style="text-align: left; font-family: Arial, sans-serif;">Agregar Nueva Mascota</h2>
                <br>
                <form @submit.prevent="agregarMascota">
                    <label for="nombre">Nombre de la Mascota:</label>
                    <input type="text" v-model="nuevaMascota.nombre" required
                           style="width: 100%; padding: 8px; margin-bottom: 15px; border-radius: 5px; border: 1px solid #ddd;">
                    <label for="tipo">Tipo:</label>
                    <input type="text" v-model="nuevaMascota.tipo" required
                           style="width: 100%; padding: 8px; margin-bottom: 15px; border-radius: 5px; border: 1px solid #ddd;">
                    <label for="raza">Raza:</label>
                    <input type="text" v-model="nuevaMascota.raza" required
                           style="width: 100%; padding: 8px; margin-bottom: 15px; border-radius: 5px; border: 1px solid #ddd;">
                    <label for="descripcion">Descripción:</label>
                    <textarea v-model="nuevaMascota.descripcion" required
                              style="width: 100%; padding: 8px; margin-bottom: 15px; border-radius: 5px; border: 1px solid #ddd;"></textarea>
                    <label for="foto">Foto de la Mascota:</label>
                    <input type="file" @change="mostrarVistaPrevia" accept="image/*" required
                           style="text-align: left; margin-bottom: 20px;">
                    <img v-if="fotoPreview" :src="fotoPreview" alt="Vista previa" style="width: 100%; margin-bottom: 15px;">
                    <button type="submit"
                            style="width: 100%; background-color: #f5c20b; color: white; padding: 12px; border: none; border-radius: 8px; cursor: pointer; font-size: 16px;">Agregar Mascota</button>
                </form>
            </div>
        </section>

        <div class="container">
            <div class="filter-buttons">
                <button @click="showSection('all-mascotas')">Todas</button>
                <button @click="showSection('available-mascotas')">Disponibles</button>
                <button @click="showSection('sold-mascotas')">Vendidas</button>
            </div>

            <div id="all-mascotas" class="section" v-if="activeSection === 'all-mascotas'">
                <h2>Todas las Mascotas</h2>
                <div class="mascotas-lista" id="lista-todas">
                    <div v-for="mascota in todasLasMascotas" :key="mascota.id">
                        <div class="mascota">
                            <img :src="mascota.foto_url" :alt="mascota.nombre">
                            <h3>{{ mascota.nombre }}</h3>
                            <p><strong>Tipo:</strong> {{ mascota.tipo }}</p>
                            <p><strong>Raza:</strong> {{ mascota.raza }}</p>
                            <p><strong>Descripción:</strong> {{ mascota.descripcion }}</p>
                            <p><strong>Estado:</strong> {{ mascota.estado }}</p>
                            <p><strong>Fecha de Ingreso:</strong> {{ mascota.fecha_ingreso }}</p>
                            <button v-if="mascota.estado !== 'vendida'" @click="marcarComoVendida(mascota)">Marcar como Vendida</button>
                            <button v-else>Vendida</button>
                        </div>
                    </div>
                </div>
            </div>

            <div id="available-mascotas" class="section" v-if="activeSection === 'available-mascotas'">
                <h2>Mascotas Disponibles</h2>
                <div class="mascotas-lista" id="lista-disponibles">
                    <div v-for="mascota in mascotasDisponibles" :key="mascota.id">
                        <div class="mascota">
                            <img :src="mascota.foto_url" :alt="mascota.nombre">
                            <h3>{{ mascota.nombre }}</h3>
                            <p><strong>Tipo:</strong> {{ mascota.tipo }}</p>
                            <p><strong>Raza:</strong> {{ mascota.raza }}</p>
                            <p><strong>Descripción:</strong> {{ mascota.descripcion }}</p>
                            <p><strong>Estado:</strong> {{ mascota.estado }}</p>
                            <p><strong>Fecha de Ingreso:</strong> {{ mascota.fecha_ingreso }}</p>
                            <button @click="marcarComoVendida(mascota)">Marcar como Vendida</button>
                        </div>
                    </div>
                </div>
            </div>

            <div id="sold-mascotas" class="section" v-if="activeSection === 'sold-mascotas'">
                <h2>Mascotas Vendidas</h2>
                <div class="mascotas-lista" id="lista-vendidas">
                    <div v-for="mascota in mascotasVendidas" :key="mascota.id">
                        <div class="mascota">
                            <img :src="mascota.foto_url" :alt="mascota.nombre">
                            <h3>{{ mascota.nombre }}</h3>
                            <p><strong>Tipo:</strong> {{ mascota.tipo }}</p>
                            <p><strong>Raza:</strong> {{ mascota.raza }}</p>
                            <p><strong>Descripción:</strong> {{ mascota.descripcion }}</p>
                            <p><strong>Estado:</strong> {{ mascota.estado }}</p>
                            <p><strong>Fecha de Ingreso:</strong> {{ mascota.fecha_ingreso }}</p>
                            <button v-if="mascota.estado !== 'vendida'" @click="marcarComoVendida(mascota)">Marcar como Vendida</button>
                            <button v-else>Vendida</button>
                        </div>
                    </div>
                </div>
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
import { agregarMascota, cargarMascotas, marcarMascotaAdoptada } from '../firebase';

export default {
    name: 'PetsRefugio',
    data() {
        return {
            showLogoutModal: false,
            modalVisible: false,
            nuevaMascota: {
                nombre: '',
                tipo: '',
                raza: '',
                descripcion: '',
                foto_url: ''
            },
            fotoPreview: null,
            todasLasMascotas: [],
            activeSection: 'all-mascotas'
        };
    },
    computed: {
        mascotasDisponibles() {
            return this.todasLasMascotas.filter(mascota => mascota.estado === 'disponible');
        },
        mascotasVendidas() {
            return this.todasLasMascotas.filter(mascota => mascota.estado === 'vendida');
        }
    },
    methods: {
        openModal() {
            this.modalVisible = true;
        },
        closeModal() {
            this.modalVisible = false;
            this.resetNuevaMascota();
            this.fotoPreview = null;
        },
        mostrarVistaPrevia(event) {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    this.fotoPreview = e.target.result;
                };
                reader.readAsDataURL(file);
            }
        },
        async agregarMascota() {
            try {
                const mascotaConFoto = { ...this.nuevaMascota, foto_url: this.fotoPreview }; // Asegúrate de manejar la subida de imágenes a Firebase
                await agregarMascota(mascotaConFoto);
                this.todasLasMascotas.push(mascotaConFoto);
                this.closeModal();
            } catch (error) {
                console.error('Error al agregar mascota:', error);
            }
        },
        async marcarComoAdoptada(mascota) {
            await marcarMascotaAdoptada(mascota.id);
            mascota.estado = 'Adoptada'; // Actualiza el estado localmente
        },
        showSection(section) {
            this.activeSection = section;
        },
        logout() {
            // Implementa la lógica de cierre de sesión
        },
        resetNuevaMascota() {
            this.nuevaMascota = {
                nombre: '',
                tipo: '',
                raza: '',
                descripcion: '',
                foto_url: ''
            };
        }
    },
    async created() {
        this.todasLasMascotas = await cargarMascotas();
    }
};
</script>
<style>
/* Ajustes generales para centrar y estilizar contenido */
.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
}

/* Ocultar secciones por defecto */
.section {
    display: none;
}

/* Mostrar sección activa */
.section.active {
    display: block;
}

/* Botones de filtro de secciones */
.filter-buttons {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
}

.filter-buttons button {
    background-color: #f5c20b;
    color: white;
    border: none;
    padding: 10px 20px;
    margin: 0 10px;
    font-size: 1rem;
    cursor: pointer;
    border-radius: 5px;
    transition: background-color 0.3s ease;
}

.filter-buttons button:hover {
    background-color: #e5a70a;
}

/* Lista de mascotas con grid adaptable */
.mascotas-lista {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
}

/* Tarjeta de mascota */
.mascota {
    display: flex;
    align-items: center;
    background-color: #fff;
    padding: 15px;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.mascota img {
    width: 200px;
    height: 200px;
    object-fit: cover;
    border-radius: 5px;
    margin-right: 20px;
}

.mascota h3,
.mascota p {
    text-align: left;
}

/* Botón flotante para agregar mascota */
.agregar-mascota-btn {
    position: fixed;
    bottom: 30px;
    /* Ajustado para ser consistente */
    right: 30px;
    /* Ajustado para ser consistente */
    background-color: #f5c20b;
    color: white;
    width: 60px;
    /* Ajustado para ser consistente */
    height: 60px;
    /* Ajustado para ser consistente */
    border-radius: 50%;
    font-size: 2rem;
    /* Ajustado para ser consistente */
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    z-index: 100;
}

.agregar-mascota-btn:hover {
    background-color: #e5a70a;
}

/* Estilo del modal */
.modal-agregar-mascota {
    display: none;
    background-color: white;
    padding: 30px;
    border-radius: 15px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    width: 400px;
    margin: auto;
    position: relative;
    top: 50%;
    transform: translateY(-50%);
    z-index: 100;
}

/* Estilo del formulario */
.modal-agregar-mascota h3 {
    font-size: 1.6rem;
    font-weight: bold;
    margin-bottom: 20px;
    text-align: center;
}

.modal-agregar-mascota label {
    font-size: 1rem;
    display: block;
    margin-bottom: 10px;
}

.modal-agregar-mascota input,
.modal-agregar-mascota select,
.modal-agregar-mascota textarea {
    width: 100%;
    padding: 12px;
    margin-bottom: 15px;
    border-radius: 10px;
    border: 1px solid #ccc;
    font-size: 1rem;
}

/* Botón de enviar en el modal */
.modal-agregar-mascota .submit-btn {
    background-color: #4a90e2;
    color: white;
    padding: 12px;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    width: 100%;
    font-size: 1rem;
    transition: background-color 0.3s ease;
}

.modal-agregar-mascota .submit-btn:hover {
    background-color: #2e66b2;
}

/* Botón cerrar en el modal */
.modal-agregar-mascota .close-btn {
    position: absolute;
    top: 10px;
    right: 10px;
    background-color: #f5c20b;
    border: none;
    border-radius: 50%;
    color: white;
    width: 30px;
    height: 30px;
    cursor: pointer;
    font-size: 1.2rem;
}

/* Botón de vendida */
.vendida-btn {
    background-color: #f5c20b;
    border: none;
    padding: 10px 15px;
    color: white;
    font-size: 1rem;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.vendida-btn:hover {
    background-color: #e5a70a;
}

/* Título estilizado */
.title {
    font-family: 'Arial', sans-serif;
    font-size: 1.9rem;
    font-weight: bold;
    color: #ffffff;
    background: #4a90e2;
    border-radius: 10px;
    padding: 10px 20px;
    text-align: center;
    margin: 0 auto;
    margin-bottom: 20px;
    max-width: 600px;
    position: relative;
    overflow: hidden;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    display: inline-block;
    animation: shadowPulse 2s infinite;
}

/* Íconos del header */
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
    height: 70px;
    cursor: pointer;
}

/* Animación de sombra parpadeante */
@keyframes shadowPulse {

    0%,
    100% {
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }

    50% {
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.4);
    }
}
</style>