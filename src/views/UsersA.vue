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
                <router-link to="/profileAdmin"><img id="header-profile-icon" src="../assets/icon-profile.png" alt="Perfil"></router-link>
            </div>
            <div class="contact-info">
                <router-link to="/login" class="contact-button">Cerrar Sesión</router-link>
            </div>
        </header>

        <section class="reviews-section">
            <div class="title">Panel de Usuarios</div>
        </section>
    
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Email</th>
                    <th>Rol</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="user in users" :key="user.id">
                    <td>{{ user.id }}</td>
                    <td>{{ user.nombre }}</td>
                    <td>{{ user.email }}</td>
                    <td>{{ user.rol }}</td>
                    <td><span class="status">{{ user.estado ? "Activo" : "Inactivo" }}</span></td>
                    <td class="action-buttons">
                        <button class="edit-btn" @click="openEditModal(user)">Editar</button>
                        <button class="status-btn" @click="toggleStatus(user)">{{ user.estado ? "Desactivar" : "Activar" }}</button>
                    </td>
                </tr>
            </tbody>
        </table>

        <!-- Modal para editar usuario -->
        <div v-if="isEditModalOpen" class="modal">
            <div class="modal-content">
                <span class="close" @click="closeEditModal">&times;</span>
                <h2>Editar Usuario</h2>
                <input type="text" v-model="currentUser.nombre" placeholder="Nombre">
                <input type="email" v-model="currentUser.email" placeholder="Email">
                <input type="text" v-model="currentUser.rol" placeholder="Rol">
                <button @click="saveChanges">Guardar Cambios</button>
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
import { db } from "@/firebaseConfig";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";

export default {
    name: "UsersAdmin",
    data() {
        return {
            users: [],
            isEditModalOpen: false,
            currentUser: null
        };
    },
    async mounted() {
        await this.fetchUsers();
    },
    methods: {
        async fetchUsers() {
            const usersCollection = collection(db, "usuarios");
            const snapshot = await getDocs(usersCollection);
            this.users = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        },
        toggleStatus(user) {
            user.estado = !user.estado;
            this.updateUser(user);
        },
        openEditModal(user) {
            this.currentUser = { ...user }; // Crear una copia para evitar modificar directamente
            this.isEditModalOpen = true;
        },
        closeEditModal() {
            this.isEditModalOpen = false;
            this.currentUser = null;
        },
        async saveChanges() {
            if (this.currentUser) {
                await this.updateUser(this.currentUser);
                this.isEditModalOpen = false;
            }
        },
        async updateUser(user) {
            try {
                const userRef = doc(db, "usuarios", user.id);
                await updateDoc(userRef, {
                    nombre: user.nombre,
                    email: user.email,
                    rol: user.rol,
                    estado: user.estado
                });
                await this.fetchUsers(); // Actualizar la lista de usuarios
            } catch (error) {
                console.error("Error actualizando usuario:", error);
            }
        }
    }
};
</script>
<style scoped>
/* Estilo del contenedor principal */
h1 {
            text-align: center;
            color: #4a90e2;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
            font-size: 18px;
        }

        table th, table td {
            padding: 12px 15px;
            text-align: left;
            border: 1px solid #ddd;
        }

        table th {
            background-color: #4a90e2;
            color: white;
        }

        table tr:nth-child(even) {
            background-color: #f9f9f9;
        }

        .action-buttons {
            text-align: center;
        }

        /* Estilos para los botones */
        button {
            padding: 8px 12px;
            font-size: 16px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
        }

        button.edit-btn {
            background-color: #4a90e2;
            color: white;
        }

        button.status-btn {
            background-color: #ffcc66;
            color: black;
        }

        button:hover {
            opacity: 0.8;
        }

        button.save-btn {
            background-color: #ffcc66; /* Color de fondo del botón */
            color: white; /* Color del texto */
        }

        /* Responsive */
        @media (max-width: 768px) {
            table {
                font-size: 16px;
            }

            button {
                font-size: 14px;
            }
        }

        /* Estilos para el modal de edición */
        .modal {
            display: none;
            position: fixed;
            z-index: 1000;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            overflow: auto;
            background-color: rgb(0,0,0);
            background-color: rgba(0,0,0,0.4);
            padding-top: 60px;
        }

        .modal-content {
            background-color: #fefefe;
            margin: 5% auto;
            padding: 20px;
            border: 1px solid #888;
            width: 80%;
            max-width: 500px;
        }

        .close {
            color: #aaa;
            float: right;
            font-size: 28px;
            font-weight: bold;
        }

        .close:hover,
        .close:focus {
            color: black;
            text-decoration: none;
            cursor: pointer;
        }

        .modal input {
            width: 100%;
            padding: 10px;
            margin: 10px 0;
            border: 1px solid #ccc;
            border-radius: 5px;
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