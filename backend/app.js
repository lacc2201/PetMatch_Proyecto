const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth'); // Asegúrate de tener la ruta correcta
const app = express();
const port = 3000;


// Middleware para manejar JSON
app.use(express.json());
app.use(cors({ origin: '*' })); // Permitir CORS para todas las rutas

// Ruta para manejar solicitudes POST a /register
app.post('/register', (req, res) => {
    const { nombre, email, direccion, telefono, password } = req.body;

    // Verifica que todos los campos estén presentes
    if (!nombre || !email || !direccion || !telefono || !password) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    // Consulta SQL para insertar un nuevo usuario
    const query = 'INSERT INTO usuarios (nombre, email, direccion, telefono, password_hash, tipo) VALUES (?, ?, ?, ?, ?, "Cliente")';

    // Aquí deberías usar bcrypt para hashear la contraseña antes de guardarla
    const bcrypt = require('bcrypt');
    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
            return res.status(500).json({ message: 'Error al encriptar la contraseña' });
        }

        // Ejecutar la consulta para insertar el usuario
        db.query(query, [nombre, email, direccion, telefono, hashedPassword], (error, results) => {
            if (error) {
                console.error('Error al registrar usuario:', error);
                return res.status(500).json({ message: 'Error al registrar el usuario' });
            }

            // Si la inserción es exitosa, enviar un mensaje de éxito
            res.status(201).json({ message: 'Usuario registrado con éxito', tipo: 'cliente' });
        });
    });
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});