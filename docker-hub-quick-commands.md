# 🚀 Comandos Rápidos para Docker Hub

## ⚡ Comandos Básicos (Reemplazar `tu-usuario` con tu username real)

### **1. Login y Verificación**
```bash
# Login en Docker Hub
docker login

# Verificar sesión
docker info | grep Username

# Logout (si es necesario)
docker logout
```

### **2. Build y Push Rápido**
```bash
# Construir y subir en un comando
docker build -t tu-usuario/practica-unir-app:latest . && docker push tu-usuario/practica-unir-app:latest
```

### **3. Comandos con Versiones**
```bash
# Build múltiples versiones
docker build -t tu-usuario/practica-unir-app:v1.0.0 .
docker build -t tu-usuario/practica-unir-app:latest .

# Push todas las versiones
docker push tu-usuario/practica-unir-app:v1.0.0
docker push tu-usuario/practica-unir-app:latest
```

## 🔧 Comandos de Verificación

### **Verificar Imagen Local**
```bash
# Listar imágenes
docker images | grep practica-unir-app

# Ver detalles
docker inspect tu-usuario/practica-unir-app:latest

# Ver historial
docker history tu-usuario/practica-unir-app:latest
```

### **Probar Imagen Local**
```bash
# Ejecutar contenedor
docker run -d -p 3000:3000 --name test-app tu-usuario/practica-unir-app:latest

# Ver logs
docker logs test-app

# Probar endpoints
curl http://localhost:3000/
curl http://localhost:3000/health

# Limpiar
docker stop test-app && docker rm test-app
```

## 📊 Comandos de Monitoreo

### **Ver Tamaño y Uso**
```bash
# Tamaño de imagen
docker images --format "table {{.Repository}}\t{{.Tag}}\t{{.Size}}" | grep practica-unir-app

# Uso de disco
docker system df

# Limpiar espacio
docker system prune -a
```

### **Verificar en Docker Hub**
```bash
# Buscar imagen
docker search tu-usuario/practica-unir-app

# Descargar desde Hub
docker pull tu-usuario/practica-unir-app:latest

# Comparar versiones
docker images tu-usuario/practica-unir-app
```

## 🏷️ Estrategias de Tagging

### **Semantic Versioning**
```bash
# Versión completa
docker build -t tu-usuario/practica-unir-app:1.0.0 .

# Versión menor
docker build -t tu-usuario/practica-unir-app:1.0 .

# Versión mayor
docker build -t tu-usuario/practica-unir-app:1 .

# Latest
docker build -t tu-usuario/practica-unir-app:latest .
```

### **Tagging por Fecha**
```bash
# Fecha actual
docker build -t tu-usuario/practica-unir-app:$(date +%Y-%m-%d) .

# Timestamp
docker build -t tu-usuario/practica-unir-app:$(date +%Y%m%d-%H%M%S) .
```

## 🧹 Limpieza y Mantenimiento

### **Limpiar Imágenes Locales**
```bash
# Eliminar imágenes específicas
docker rmi tu-usuario/practica-unir-app:old-version

# Eliminar todas las versiones
docker rmi $(docker images tu-usuario/practica-unir-app -q)

# Limpieza completa
docker system prune -a --volumes
```

### **Limpiar Contenedores**
```bash
# Detener todos los contenedores
docker stop $(docker ps -aq)

# Eliminar contenedores detenidos
docker container prune

# Eliminar todos los contenedores
docker rm $(docker ps -aq)
```

## 🚨 Solución de Problemas

### **Error de Login**
```bash
# Rehacer login
docker logout
docker login

# Verificar credenciales
docker info | grep Username
```

### **Error de Permisos**
```bash
# Verificar que el username sea correcto
echo $DOCKER_USERNAME

# Construir con username correcto
docker build -t tu-usuario-real/practica-unir-app:latest .
```

### **Error de Push**
```bash
# Verificar que la imagen existe
docker images | grep practica-unir-app

# Reconstruir si es necesario
docker build -t tu-usuario/practica-unir-app:latest .

# Intentar push nuevamente
docker push tu-usuario/practica-unir-app:latest
```

## 📱 Uso de la Imagen Subida

### **Para Otros Desarrolladores**
```bash
# Descargar imagen
docker pull tu-usuario/practica-unir-app:latest

# Ejecutar aplicación
docker run -d -p 3000:3000 --name mi-app tu-usuario/practica-unir-app:latest
```

### **En docker-compose.yml**
```yaml
version: '3.8'
services:
  app:
    image: tu-usuario/practica-unir-app:latest
    ports:
      - "3000:3000"
    environment:
      - MONGODB_URI=mongodb://mongo:27017/practica-unir-db
    depends_on:
      - mongo

  mongo:
    image: mongo:latest
    ports:
      - "27017:27017"
    volumes:
      - mongodb_data:/data/db

volumes:
  mongodb_data:
```

## 🎯 Checklist Rápido

```bash
# ✅ Verificar Docker
docker --version

# ✅ Login en Docker Hub
docker login

# ✅ Construir imagen
docker build -t tu-usuario/practica-unir-app:latest .

# ✅ Probar imagen
docker run -d -p 3000:3000 --name test tu-usuario/practica-unir-app:latest

# ✅ Subir imagen
docker push tu-usuario/practica-unir-app:latest

# ✅ Verificar en Hub
docker search tu-usuario/practica-unir-app
```

## 🌐 URLs Útiles

- **Docker Hub**: https://hub.docker.com
- **Tu Repositorio**: https://hub.docker.com/r/tu-usuario/practica-unir-app
- **Documentación**: https://docs.docker.com/docker-hub/
- **CLI Tools**: https://github.com/docker/hub-tool

## 💡 Tips Rápidos

1. **Siempre usar tags semánticos** para versiones importantes
2. **Mantener `latest` actualizado** para facilitar el uso
3. **Probar localmente** antes de hacer push
4. **Usar scripts automatizados** para procesos repetitivos
5. **Documentar cambios** en cada versión
6. **Limpiar imágenes antiguas** para ahorrar espacio
