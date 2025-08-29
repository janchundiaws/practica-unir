# Aplicación nodejs y mongo con Docker

Esta es una aplicación simple construida con Node.js y Express, containerizada con Docker.

## Características

- Servidor web simple con Express
- Conexión a base de datos MongoDB con Mongoose
- Endpoint principal: `/` - Muestra "¡Hola Mundo!"
- Endpoint de salud: `/health` - Verifica el estado de la aplicación y la base de datos
- **Documentación interactiva con Swagger UI** en `/api-docs`
- **API REST completa** en `/api/personas`
- Configurado para ejecutarse en el puerto 3000

## Ejecución Local

1. Instalar dependencias:
   ```bash
   npm install
   ```

2. Configurar MongoDB:
   - Instalar MongoDB localmente o usar Docker
   - Crear un archivo `.env` con la variable `MONGODB_URI`

3. Ejecutar la aplicación:
   ```bash
   npm start
   ```

4. Abrir en el navegador: http://localhost:3000
5. **Documentación de la API**: http://localhost:3000/api-docs
6. **API de Personas**: http://localhost:3000/api/personas

## Construir y Ejecutar con Docker

### Construir la imagen:
```bash
docker build -t practica-unir-app .
```

### Ejecutar el contenedor:
```bash
docker run -p 3000:3000 practica-unir-app
```

### Ejecutar en segundo plano:
```bash
docker run -d -p 3000:3000 --name practica-unir-container practica-unir-app
```

### Usar Docker Compose (recomendado para desarrollo):
```bash
# Construir y ejecutar con MongoDB
docker-compose up --build

# Ejecutar en segundo plano
docker-compose up -d

# Ver logs
docker-compose logs -f

# Detener servicios
docker-compose down
```

### Ver logs:
```bash
docker logs practica-unir-container
```

### Detener el contenedor:
```bash
docker stop practica-unir-container
```

## Estructura del Proyecto

- `app.js` - Archivo principal de la aplicación
- `db.js` - Configuración y conexión a MongoDB
- `models/Persona.js` - Modelo de datos para Persona
- `controllers/personaController.js` - Controlador con operaciones CRUD
- `routes/personaRoutes.js` - Rutas de la API de Personas
- `swagger.js` - Configuración de la documentación Swagger
- `swagger-ui-config.js` - Configuración personalizada de Swagger UI
- `data/ejemplo-personas.json` - Datos de ejemplo para pruebas
- `scripts/poblarDB.js` - Script para poblar la base de datos
- `package.json` - Dependencias y scripts de Node.js
- `Dockerfile` - Configuración para construir la imagen Docker
- `docker-compose.yml` - Configuración para ejecutar la app con MongoDB
- `.dockerignore` - Archivos excluidos del contexto de Docker

## Puertos

- La aplicación se ejecuta en el puerto 3000 por defecto
- Se puede cambiar usando la variable de entorno `PORT`
- MongoDB se ejecuta en el puerto 27017

## Variables de Entorno

- `MONGODB_URI` - URL de conexión a MongoDB (por defecto: mongodb://localhost:27017/practica-unir-db)
- `PORT` - Puerto de la aplicación (por defecto: 3000)
- `NODE_ENV` - Entorno de ejecución (development/production)
