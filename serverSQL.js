const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

// Crear una instancia de la aplicación Express
const app = express();

// Configurar middleware
app.use(cors());
app.use(express.json());

// Configurar la conexión a la base de datos MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // tu usuario de MySQL
    password: '', // tu contraseña de MySQL (generalmente en XAMPP es vacío)
    database: 'test' // nombre de tu base de datos
});

// Conectar a la base de datos
db.connect((err) => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err);
        return;
    }
    console.log('Conexión a la base de datos MySQL exitosa');
});

// Ruta para obtener usuarios con detalles de rol
app.get('/getUsers', (req, res) => {
    const query = 'SELECT usuarios.*, roles.nombreRol FROM usuarios INNER JOIN roles ON usuarios.id_rol = roles.idRol';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error al obtener usuarios con detalles de rol:', err);
            res.status(500).json({ message: 'Error al obtener usuarios con detalles de rol' });
            return;
        }
        res.status(200).json(results);
    });
});

// Ruta para agregar usuarios
app.post('/postUsers', (req, res) => {
    const { nombreUsuario, apellidoUsuario, contraseñaUsuario, id_rol } = req.body;
    const query = 'INSERT INTO usuarios (nombreUsuario, apellidoUsuario, contraseñaUsuario, id_rol) VALUES (?, ?, ?, ?)';
    db.query(query, [nombreUsuario, apellidoUsuario, contraseñaUsuario, id_rol], (err, result) => {
        if (err) {
            console.error('Error al agregar usuario:', err);
            res.status(500).json({ message: 'Error al agregar usuario' });
            return;
        }
        res.status(200).json({ id: result.insertId, ...req.body });
    });
});

// Ruta para actualizar usuario
app.put('/updateUser/:id', (req, res) => {
    const { id } = req.params;
    const { nombreUsuario, apellidoUsuario, contraseñaUsuario, id_rol } = req.body;
    const query = 'UPDATE usuarios SET nombreUsuario = ?, apellidoUsuario = ?, contraseñaUsuario = ?, id_rol = ? WHERE idUsuario = ?';
    db.query(query, [nombreUsuario, apellidoUsuario, contraseñaUsuario, id_rol, id], (err, result) => {
        if (err) {
            console.error('Error al actualizar usuario:', err);
            res.status(500).json({ message: 'Error al actualizar usuario' });
            return;
        }
        res.status(200).json({ message: 'Usuario actualizado exitosamente' });
    });
});

// Ruta para eliminar usuario
app.delete('/deleteUser/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM usuarios WHERE idUsuario = ?';
    db.query(query, [id], (err, result) => {
        if (err) {
            console.error('Error al eliminar usuario:', err);
            res.status(500).json({ message: 'Error al eliminar usuario' });
            return;
        }
        res.status(200).json({ message: 'Usuario eliminado exitosamente' });
    });
});

// Iniciar el servidor
app.listen(5500, () => {
    console.log('Backend ejecutándose en el puerto 5500');
});
