<template>
    <div>
        <!-- Header -->
        <header class="styled-header">
            <div class="logo">
                <img src="../assets/logopetmatch.png" alt="PetMatch Logo" />
            </div>
            <div class="header-title">Panel de Adoptante</div>
            <nav>
                <router-link to="/HomeA">INICIO</router-link>
                <router-link to="/PetsA">PETS</router-link>
                <router-link to="/ReviewsA">RESEÑAS</router-link>
            </nav>
            <div class="header-icons">
                <router-link to="/CalendarA"><img src="../assets/icon-calendar.png" alt="Calendario" /></router-link>
                <router-link to="/profileA"><img id="header-profile-icon" src="../assets/icon-profile.png" alt="Perfil" /></router-link>
            </div>
            <div class="contact-info">
                <a href="#" class="contact-button" id="logoutBtn" @click="toggleLogoutModal">Cerrar Sesión</a>
            </div>
        </header>

        <!-- Search Container -->
        <div id="search-container">
            <input type="text" id="search-input" placeholder="Buscar por tipo de mascota, raza, etc."
                v-model="searchQuery" />
            <button id="search-btn" @click="searchPets">Buscar</button>
        </div>

        <!-- Results Container -->
        <div id="results-container">
            <div v-if="loading">Cargando mascotas...</div>
            <div v-else-if="filteredPets.length === 0">
                <p>No se encontraron mascotas que coincidan con la búsqueda.</p>
            </div>
            <div v-else>
                <div class="pet-card" v-for="pet in filteredPets" :key="pet.id">
                    <img :src="getPetImage(pet)" :alt="pet.nombre_mas" />
                    <div class="pet-info">
                        <div>
                            <h3>{{ pet.nombre_mas }}</h3>
                            <p><strong>Tipo:</strong> {{ Array.isArray(pet.tipo) ? pet.tipo.join(", ") : pet.tipo }}</p>
                            <p><strong>Raza:</strong> {{ pet.raza }}</p>
                            <p>{{ pet.descripcion }}</p>
                        </div>
                        <button class="contact-btn" @click="marcarInteres(pet)">Marcar Interés</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Logout Modal -->
        <div class="modal" v-if="showLogoutModal" id="logoutModal">
            <div class="modal-content">
                <h2>Confirmar Cierre de Sesión</h2>
                <p>¿Estás seguro de que deseas cerrar sesión?</p>
                <button class="btn" id="confirmLogoutBtn" @click="logout">Sí, cerrar sesión</button>
                <button class="btn cancel" id="cancelLogoutBtn" @click="toggleLogoutModal">Cancelar</button>
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
import { ref, onMounted } from 'vue';
import { db } from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

export default {
    name: "PetsAdoptante",
    setup() {
        const searchQuery = ref('');
        const pets = ref([]);
        const filteredPets = ref([]);
        const loading = ref(true);
        const showLogoutModal = ref(false);

        const getPetImage = (pet) => {
            if (pet.foto_url) {
                return pet.foto_url;
            }
            return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAACklEQVR4nGMAAQAABQABDQottAAAAABJRU5ErkJggg==';
        };

        const loadPets = async () => {
            try {
                const mascotasQuery = collection(db, "mascotas");
                const mascotasSnapshot = await getDocs(mascotasQuery);
                pets.value = mascotasSnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                
                filteredPets.value = pets.value;
                loading.value = false;
            } catch (error) {
                console.error("Error al cargar mascotas:", error.message);
                loading.value = false;
            }
        };

        const searchPets = () => {
            const query = searchQuery.value.toLowerCase();
            if (!query) {
                filteredPets.value = pets.value;
                return;
            }

            filteredPets.value = pets.value.filter((pet) => {
                const tiposString = Array.isArray(pet.tipo) 
                    ? pet.tipo.join(" ").toLowerCase() 
                    : (pet.tipo || '').toLowerCase();
                
                const razaMatches = (pet.raza || '').toLowerCase().includes(query);
                const tipoMatches = tiposString.includes(query);
                const nombreMatches = (pet.nombre_mas || '').toLowerCase().includes(query);

                return tipoMatches || razaMatches || nombreMatches;
            });
        };

        const marcarInteres = (pet) => {
            console.log("Marcando interés en la mascota:", pet.nombre_mas);
        };

        const toggleLogoutModal = () => {
            showLogoutModal.value = !showLogoutModal.value;
        };

        const logout = () => {
            console.log("Cerrando sesión...");
            toggleLogoutModal();
        };

        onMounted(loadPets);

        return {
            searchQuery,
            filteredPets,
            loading,
            showLogoutModal,
            getPetImage,
            searchPets,
            marcarInteres,
            toggleLogoutModal,
            logout
        };
    }
};
</script>

<style scoped>
 #search-container {
            display: flex;
            justify-content: center;
            margin-bottom: 40px;
            width: 100%;
        }
        #search-input {
            width: 50%;
            padding: 10px;
            font-size: 16px;
            border-radius: 5px;
            border: 1px solid #ddd;
            margin-right: 10px;
        }
        #search-btn {
            padding: 10px 20px;
            font-size: 16px;
            background-color: #007bff;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
        }
        #search-btn:hover {
            background-color: #0056b3;
        }
        
#results-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); /* Crear columnas automáticas con un tamaño mínimo de 300px */
    gap: 20px; /* Espacio entre las tarjetas */
    padding: 20px;
    width: 100%; /* Asegura que ocupe todo el ancho disponible */
    justify-items: center; /* Alinea las tarjetas en el centro de cada columna */
}

.pet-card {
    width: 100%; /* La tarjeta ocupa el 100% del ancho de la celda de la cuadrícula */
    height: auto; /* Ajuste automático de la altura */
    border: 1px solid #ddd;
    border-radius: 5px;
    background-color: #f9f9f9;
    display: flex;
    flex-direction: row; /* Coloca la imagen y el contenido en una fila */
    padding: 15px;
    align-items: center; /* Centra verticalmente la imagen y el texto */
    justify-content: space-between; /* Espacio entre la imagen y el texto */
    box-sizing: border-box; /* Asegura que el padding no afecte el ancho de la tarjeta */
}

.pet-card img {
    width: 100px; /* Tamaño fijo para la imagen */
    height: 100px;
    border-radius: 5px;
    object-fit: cover;
}

.pet-info {
    display: flex;
    flex-direction: column; /* Organiza el contenido de la tarjeta en una columna */
    justify-content: space-between;
    max-width: 180px; /* Controla el tamaño del contenido */
}

.contact-btn {
    margin-top: 10px;
    background-color: #f9c74f;
    color: white;
    border: none;
    padding: 10px;
    border-radius: 5px;
    cursor: pointer;
    text-align: center;
    font-weight: bold;
    display: inline-block;
}

/* Media query para pantallas más pequeñas */
@media (max-width: 768px) {
    .pet-card {
        width: calc(50% - 20px); /* Dos tarjetas por fila en pantallas medianas */
    }
}

/* Media query para pantallas móviles */
@media (max-width: 480px) {
    .pet-card {
        width: 100%; /* Las tarjetas ocuparán todo el ancho en pantallas móviles */
    }
}


</style>
