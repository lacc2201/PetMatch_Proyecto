const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const db = require('../db/index.js'); // Configuración de tu base de datos

// Ruta de registro
router.post('/register', async (req, res) => {
    const { email, password, nombre, direccion, telefono } = req.body;

    // Verifica si todos los campos necesarios fueron proporcionados
    if (!email || !password || !nombre || !direccion || !telefono) {
        return res.status(400).json({ error: 'Todos los campos son requeridos' });
    }

    try {
        // Hash de la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Inserción en la tabla de usuarios
        const query = 'INSERT INTO usuarios (email, password_hash, nombre, direccion, telefono, tipo) VALUES (?, ?, ?, ?, ?, "Cliente")';
        console.log('Ejecutando consulta:', query, [email, hashedPassword, nombre, direccion, telefono]);
        db.query(query, [email, hashedPassword, nombre, direccion, telefono], (err, results) => {
            if (err) {
                console.error('Error al registrar usuario:', err);
                return res.status(500).json({ error: 'Error al registrar usuario' });
            }

            const usuarioId = results.insertId;

            // Registrar al usuario como cliente en la tabla 'clientes'
            const clienteQuery = 'INSERT INTO clientes (usuario_id) VALUES (?)';
            db.query(clienteQuery, [usuarioId], (err) => {
                if (err) {
                    console.error('Error al registrar cliente:', err);
                    return res.status(500).json({ error: 'Error al registrar cliente' });
                }

                res.json({ success: true, message: 'Usuario registrado con éxito' });
            });
        });
    } catch (err) {
        console.error('Error al procesar la solicitud:', err);
        res.status(500).json({ error: 'Error al procesar la solicitud' });
    }
});


// Ruta de login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    // Verifica si los campos requeridos fueron proporcionados
    if (!email || !password) {
        return res.status(400).json({ error: 'Email y contraseña son requeridos' });
    }

    const query = 'SELECT * FROM usuarios WHERE email = ?';
    db.query(query, [email], async (err, results) => {
        if (err) {
            console.error('Error al verificar el usuario:', err);
            return res.status(500).json({ error: 'Error al verificar el usuario' });
        }

        if (results.length === 0) {
            return res.status(401).json({ success: false, message: 'Usuario no encontrado' });
        }

        const user = results[0];

        try {
            // Compara la contraseña con el hash almacenado
            const match = await bcrypt.compare(password, user.password_hash);
            if (match) {
                // Iniciar sesión exitosamente, devuelve el tipo de usuario para redireccionamiento
                return res.status(200).json({
                    message: 'Inicio de sesión exitoso',
                    tipo: user.tipo // Devuelve el tipo de usuario (Cliente, Vendedor, Administrador)
                });
            } else {
                return res.status(400).json({ message: 'Correo o contraseña incorrecta' });
            }
        } catch (error) {
            console.error('Error al verificar el usuario:', error);
            return res.status(500).json({ error: 'Error al verificar el usuario' });
        }
    });
});

module.exports = router;
