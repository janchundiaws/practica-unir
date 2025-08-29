const mongoose = require('mongoose');

const personaSchema = new mongoose.Schema({
  nombres: {
    type: String,
    required: [true, 'Los nombres son obligatorios'],
    trim: true,
    minlength: [2, 'Los nombres deben tener al menos 2 caracteres'],
    maxlength: [50, 'Los nombres no pueden exceder 50 caracteres']
  },
  apellidos: {
    type: String,
    required: [true, 'Los apellidos son obligatorios'],
    trim: true,
    minlength: [2, 'Los apellidos deben tener al menos 2 caracteres'],
    maxlength: [50, 'Los apellidos no pueden exceder 50 caracteres']
  },
  cedula: {
    type: String,
    required: [true, 'La cédula es obligatoria'],
    unique: true,
    trim: true,
    match: [/^\d{10}$/, 'La cédula debe tener exactamente 10 dígitos numéricos'],
    index: true
  }
}, {
  timestamps: true, // Agrega createdAt y updatedAt automáticamente
  versionKey: false // No incluye __v
});

// Índice compuesto para búsquedas eficientes
personaSchema.index({ nombres: 1, apellidos: 1 });

// Método para obtener el nombre completo
personaSchema.methods.getNombreCompleto = function() {
  return `${this.nombres} ${this.apellidos}`;
};

// Método estático para buscar por cédula
personaSchema.statics.findByCedula = function(cedula) {
  return this.findOne({ cedula: cedula });
};

// Método estático para buscar por nombre o apellido
personaSchema.statics.searchByName = function(searchTerm) {
  const regex = new RegExp(searchTerm, 'i');
  return this.find({
    $or: [
      { nombres: regex },
      { apellidos: regex }
    ]
  });
};

// Validación personalizada para cédula única
personaSchema.pre('save', async function(next) {
  if (this.isModified('cedula')) {
    const existingPersona = await this.constructor.findOne({ 
      cedula: this.cedula,
      _id: { $ne: this._id }
    });
    
    if (existingPersona) {
      const error = new Error('Ya existe una persona con esta cédula');
      error.name = 'ValidationError';
      return next(error);
    }
  }
  next();
});

module.exports = mongoose.model('Persona', personaSchema);
