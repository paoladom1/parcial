const mongoose = require("mongoose"),
    Schema = mongoose.Schema;

var EnfermedadSchema = Schema({
    nombre: { type: String, required: true, unique: true },
    sintomas: { type: [String], required: true },
    esMortal: { type: Boolean, required: true },
    causas: { type: [String], required: true }
}, {
    timestamps: true,
});

module.exports = mongoose.model("Enfermedad", EnfermedadSchema);