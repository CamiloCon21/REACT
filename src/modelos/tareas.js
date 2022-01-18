const mongoose= require('mongoose')
const { Schema } = mongoose

const tareaschema = new Schema({

    Titulo: { 
        type: String, required: true },
    Descripcion: {
        type: String, required: true
    }
})

module.exports = mongoose.model('tarea', tareaschema)