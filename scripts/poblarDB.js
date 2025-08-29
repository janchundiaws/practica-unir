const mongoose = require('mongoose');
const Persona = require('../models/Persona');
const personasEjemplo = require('../data/ejemplo-personas.json');

// Configuración de conexión
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://mongo:27017/practica-unir-db';

const poblarBaseDatos = async () => {
  try {
    // Conectar a MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Conectado a MongoDB');

    // Limpiar colección existente
    await Persona.deleteMany({});
    console.log('🗑️ Colección de personas limpiada');

    // Insertar personas de ejemplo
    const personasInsertadas = await Persona.insertMany(personasEjemplo);
    console.log(`✅ ${personasInsertadas.length} personas insertadas exitosamente`);

    // Mostrar estadísticas
    const totalPersonas = await Persona.countDocuments();
    console.log(`📊 Total de personas en la base de datos: ${totalPersonas}`);

    // Mostrar algunas personas insertadas
    console.log('\n👥 Personas insertadas:');
    personasInsertadas.forEach((persona, index) => {
      console.log(`${index + 1}. ${persona.nombres} ${persona.apellidos} - Cédula: ${persona.cedula}`);
    });

    console.log('\n🎉 Base de datos poblada exitosamente!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error al poblar la base de datos:', error);
    process.exit(1);
  }
};

// Ejecutar si se llama directamente
if (require.main === module) {
  poblarBaseDatos();
}

module.exports = poblarBaseDatos;
