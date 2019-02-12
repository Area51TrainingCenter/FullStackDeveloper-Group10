import mongoose = require("mongoose")

const esquema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    }
})

const Rol = mongoose.model("Rol", esquema)

export default Rol