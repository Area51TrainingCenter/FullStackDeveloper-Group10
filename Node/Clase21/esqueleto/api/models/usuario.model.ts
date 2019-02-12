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
    ref: "Rol",
    required: true
  }
})

const autoPoblar = function(next) {
  this.populate("rol")
  next()
}

esquema.pre("find", autoPoblar)
esquema.pre("findOne", autoPoblar)

const Usuario = mongoose.model("Usuario", esquema)

export default Usuario