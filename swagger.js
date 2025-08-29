const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API - DevOps',
      version: '1.0.0',
      description: 'API simple con conexión a MongoDB',
      contact: {
        name: 'JUNIOR WILLIAM ANCHUNDIA SOZA',
        email: 'junior_soza@hotmail.es'
      },
      license: {
        name: 'MIT',
        url: 'https://opensource.org/licenses/MIT'
      }
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Servidor de desarrollo'
      }
    ],
    components: {
      schemas: {
        HealthResponse: {
          type: 'object',
          properties: {
            status: {
              type: 'string',
              example: 'OK',
              description: 'Estado general de la aplicación'
            },
            message: {
              type: 'string',
              example: 'La aplicación está funcionando correctamente',
              description: 'Mensaje descriptivo del estado'
            },
            database: {
              type: 'object',
              properties: {
                connected: {
                  type: 'boolean',
                  example: true,
                  description: 'Estado de conexión a MongoDB'
                },
                state: {
                  type: 'number',
                  example: 1,
                  description: 'Código de estado de la conexión MongoDB'
                },
                host: {
                  type: 'string',
                  example: 'mongo:27017',
                  description: 'Host de la base de datos'
                },
                name: {
                  type: 'string',
                  example: 'practica-unir-db',
                  description: 'Nombre de la base de datos'
                }
              },
              description: 'Información del estado de la base de datos'
            },
            timestamp: {
              type: 'string',
              format: 'date-time',
              example: '2025-08-29T05:45:00.000Z',
              description: 'Timestamp de la verificación'
            }
          },
          required: ['status', 'message', 'database']
        },
        ErrorResponse: {
          type: 'object',
          properties: {
            error: {
              type: 'string',
              example: 'Error interno del servidor',
              description: 'Descripción del error'
            },
            message: {
              type: 'string',
              example: 'Ha ocurrido un error inesperado',
              description: 'Mensaje detallado del error'
            },
            timestamp: {
              type: 'string',
              format: 'date-time',
              example: '2025-08-29T05:45:00.000Z',
              description: 'Timestamp del error'
            }
          },
          required: ['error', 'message']
        }
      },
      responses: {
        Success: {
          description: 'Operación exitosa',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/HealthResponse'
              }
            }
          }
        },
        ServerError: {
          description: 'Error interno del servidor',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ErrorResponse'
              }
            }
          }
        }
      }
    }
  },
  apis: ['./app.js', './routes/*.js'], // Archivos donde están definidas las rutas
};

const specs = swaggerJsdoc(options);

module.exports = specs;
