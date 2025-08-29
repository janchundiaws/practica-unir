// Configuración personalizada para Swagger UI
const swaggerUiOptions = {
  explorer: true,
  customCss: `
    .swagger-ui .topbar { display: none }
    .swagger-ui .info .title { color: #2c3e50; }
    .swagger-ui .info .description { color: #7f8c8d; }
    .swagger-ui .scheme-container { background: #ecf0f1; }
    .swagger-ui .opblock.opblock-get .opblock-summary-method { background: #27ae60; }
    .swagger-ui .opblock.opblock-post .opblock-summary-method { background: #3498db; }
    .swagger-ui .opblock.opblock-put .opblock-summary-method { background: #f39c12; }
    .swagger-ui .opblock.opblock-delete .opblock-summary-method { background: #e74c3c; }
  `,
  customSiteTitle: '🚀 API Hola Mundo - Documentación Interactiva',
  customfavIcon: '/favicon.ico',
  swaggerOptions: {
    docExpansion: 'list',
    filter: true,
    showRequestHeaders: true,
    showCommonExtensions: true,
    tryItOutEnabled: true
  }
};

module.exports = swaggerUiOptions;
