const express = require('express');
const { connectDB, getConnectionStatus } = require('./db');
const swaggerUi = require('swagger-ui-express');
const swaggerSpecs = require('./swagger');
const swaggerUiOptions = require('./swagger-ui-config');
const personaRoutes = require('./routes/personaRoutes');
const app = express();
const port = process.env.PORT || 3000;

// Middleware para parsear JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configurar Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs, swaggerUiOptions));

// Rutas de la API
app.use('/api/personas', personaRoutes);

/**
 * @swagger
 * /:
 *   get:
 *     summary: Endpoint principal de la aplicación
 *     description: Retorna un mensaje de "Hola Mundo" simple
 *     tags: [General]
 *     responses:
 *       200:
 *         description: Mensaje de bienvenida
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: ¡Hola Mundo!
 */
app.get('/', (req, res) => {
  res.send('¡Hola Mundo!');
});

/**
 * @swagger
 * /health:
 *   get:
 *     summary: Verificar el estado de salud de la aplicación
 *     description: Retorna el estado general de la aplicación y la conexión a MongoDB
 *     tags: [Monitoreo]
 *     responses:
 *       200:
 *         description: Estado de salud de la aplicación
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HealthResponse'
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
app.get('/health', (req, res) => {
  try {
    const dbStatus = getConnectionStatus();
    const response = {
      status: 'OK',
      message: 'La aplicación está funcionando correctamente',
      database: dbStatus,
      timestamp: new Date().toISOString()
    };
    res.json(response);
  } catch (error) {
    res.status(500).json({
      error: 'Error interno del servidor',
      message: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

app.listen(port, async () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
  console.log('¡Hola Mundo desde Node.js!');
  
  // Conectar a la base de datos
  try {
    await connectDB();
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error);
  }
});
