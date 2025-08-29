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

## Puertos

- La aplicación se ejecuta en el puerto 3000 por defecto
- MongoDB se ejecuta en el puerto 27017

