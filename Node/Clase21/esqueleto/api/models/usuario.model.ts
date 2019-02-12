const mongoose = require("mongoose")

const esquema = new mongoose.Schema({
  nombre: String,

  apellido: String,

  correo: {
    type: String,
    email: true,
    unique: true,
    required: true,
    trim: true,
    lowercase: true
  },

  contrasena: {
    type: String,
    required: true,
    trim: true,
    minlength: 8
  },

  rol: {
    type: mongoose.Schema.ObjectId,
    required: true
  }
})

const Usuario = mongoose.model("Usuario", esquema)

export default Usuario