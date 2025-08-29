const mongoose = require('mongoose');

// Configuración de la conexión
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://mongo:27017/practica-unir-db';

// Opciones de conexión
const options = {
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000
};

// Función para conectar a MongoDB
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(MONGODB_URI, options);
    
    console.log(`✅ MongoDB conectado exitosamente: ${conn.connection.host}`);
    
    // Configurar eventos de conexión
    mongoose.connection.on('connected', () => {
      console.log('🟢 Mongoose conectado a MongoDB');
    });

    mongoose.connection.on('error', (err) => {
      console.error('🔴 Error de conexión a MongoDB:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('🟡 Mongoose desconectado de MongoDB');
    });

    // Manejar cierre de la aplicación
    process.on('SIGINT', async () => {
      try {
        await mongoose.connection.close();
        console.log('🔄 Conexión a MongoDB cerrada por cierre de la aplicación');
        process.exit(0);
      } catch (err) {
        console.error('❌ Error al cerrar la conexión:', err);
        process.exit(1);
      }
    });

    return conn;
  } catch (error) {
    console.error('❌ Error al conectar a MongoDB:', error.message);
    process.exit(1);
  }
};

// Función para verificar el estado de la conexión
const getConnectionStatus = () => {
  return {
    connected: mongoose.connection.readyState === 1,
    state: mongoose.connection.readyState,
    host: mongoose.connection.host,
    name: mongoose.connection.name
  };
};

// Función para cerrar la conexión
const closeConnection = async () => {
  try {
    await mongoose.connection.close();
    console.log('🔄 Conexión a MongoDB cerrada');
  } catch (error) {
    console.error('❌ Error al cerrar la conexión:', error);
    throw error;
  }
};

module.exports = {
  connectDB,
  getConnectionStatus,
  closeConnection,
  mongoose
};
