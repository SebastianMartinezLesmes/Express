const mongoose = require('mongoose');

const usuarioSchema = mongoose.Schema({
    idUsuario: {
        type: Number,
        required: true
    },
    nombreUsuario: {
        type: String,
        required: true
    },
    apellidoUsuario: {
        type: String,
        required: true
    },
    contrasenaUsuario: {
        type: String,
        required: true
    },
    rol: {
        type: String,
        required: true
    }
});

const Usuario = mongoose.model('Usuario', usuarioSchema);

module.exports = Usuario;
