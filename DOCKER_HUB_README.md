# 🐳 Guía para Subir Imagen a Docker Hub

## 📋 Prerrequisitos

### 1. **Cuenta de Docker Hub**
- Crear cuenta en [hub.docker.com](https://hub.docker.com)
- Verificar email de la cuenta
- Tener permisos para crear repositorios

### 2. **Docker instalado localmente**
```bash
# Verificar versión de Docker
docker --version

# Verificar que Docker esté ejecutándose
docker info
```

### 3. **Iniciar sesión en Docker Hub**
```bash
# Login en Docker Hub
docker login

# Ingresar username y password cuando se solicite
Username: tu-usuario
Password: ********
```

## 🚀 Pasos para Subir la Imagen

### **Paso 1: Construir la Imagen**

```bash
# Construir la imagen con un tag específico
docker build -t tu-usuario/practica-unir-app:latest .

# O con un tag de versión específica
docker build -t tu-usuario/practica-unir-app:v1.0.0 .
```

**Explicación de tags:**
- `tu-usuario`: Tu nombre de usuario en Docker Hub
- `practica-unir-app`: Nombre del repositorio
- `:latest`: Tag para la versión más reciente
- `:v1.0.0`: Tag para una versión específica

### **Paso 2: Verificar la Imagen Construida**

```bash
# Listar imágenes locales
docker images

# Ver detalles de la imagen
docker inspect tu-usuario/practica-unir-app:latest
```

### **Paso 3: Subir la Imagen a Docker Hub**

```bash
# Subir la imagen
docker push tu-usuario/practica-unir-app:latest

# O subir una versión específica
docker push tu-usuario/practica-unir-app:v1.0.0
```

## 🔧 Scripts Automatizados

### **Script para Construir y Subir (build-and-push.sh)**

```bash
#!/bin/bash

# Configuración
DOCKER_USERNAME="tu-usuario"
IMAGE_NAME="practica-unir-app"
VERSION="v1.0.0"

echo "🚀 Iniciando proceso de build y push..."

# Construir imagen
echo "📦 Construyendo imagen Docker..."
docker build -t $DOCKER_USERNAME/$IMAGE_NAME:$VERSION .
docker build -t $DOCKER_USERNAME/$IMAGE_NAME:latest .

# Verificar que la imagen se construyó correctamente
if [ $? -eq 0 ]; then
    echo "✅ Imagen construida exitosamente"
else
    echo "❌ Error al construir la imagen"
    exit 1
fi

# Subir imagen
echo "📤 Subiendo imagen a Docker Hub..."
docker push $DOCKER_USERNAME/$IMAGE_NAME:$VERSION
docker push $DOCKER_USERNAME/$IMAGE_NAME:latest

if [ $? -eq 0 ]; then
    echo "🎉 Imagen subida exitosamente a Docker Hub!"
    echo "📍 URL: https://hub.docker.com/r/$DOCKER_USERNAME/$IMAGE_NAME"
else
    echo "❌ Error al subir la imagen"
    exit 1
fi
```

### **Script para Windows (build-and-push.bat)**

```batch
@echo off
setlocal

REM Configuración
set DOCKER_USERNAME=tu-usuario
set IMAGE_NAME=practica-unir-app
set VERSION=v1.0.0

echo 🚀 Iniciando proceso de build y push...

REM Construir imagen
echo 📦 Construyendo imagen Docker...
docker build -t %DOCKER_USERNAME%/%IMAGE_NAME%:%VERSION% .
docker build -t %DOCKER_USERNAME%/%IMAGE_NAME%:latest .

REM Verificar que la imagen se construyó correctamente
if %ERRORLEVEL% EQU 0 (
    echo ✅ Imagen construida exitosamente
) else (
    echo ❌ Error al construir la imagen
    exit /b 1
)

REM Subir imagen
echo 📤 Subiendo imagen a Docker Hub...
docker push %DOCKER_USERNAME%/%IMAGE_NAME%:%VERSION%
docker push %DOCKER_USERNAME%/%IMAGE_NAME%:latest

if %ERRORLEVEL% EQU 0 (
    echo 🎉 Imagen subida exitosamente a Docker Hub!
    echo 📍 URL: https://hub.docker.com/r/%DOCKER_USERNAME%/%IMAGE_NAME%
) else (
    echo ❌ Error al subir la imagen
    exit /b 1
)

pause
```

## 📝 Comandos Completos por Pasos

### **Opción 1: Comandos Manuales**

```bash
# 1. Login en Docker Hub
docker login

# 2. Construir imagen
docker build -t tu-usuario/practica-unir-app:latest .

# 3. Verificar imagen
docker images | grep practica-unir-app

# 4. Subir imagen
docker push tu-usuario/practica-unir-app:latest

# 5. Verificar en Docker Hub
# Ir a https://hub.docker.com/r/tu-usuario/practica-unir-app
```

### **Opción 2: Comandos con Versiones**

```bash
# 1. Login en Docker Hub
docker login

# 2. Construir múltiples versiones
docker build -t tu-usuario/practica-unir-app:v1.0.0 .
docker build -t tu-usuario/practica-unir-app:latest .

# 3. Subir ambas versiones
docker push tu-usuario/practica-unir-app:v1.0.0
docker push tu-usuario/practica-unir-app:latest
```

## 🏷️ Estrategias de Tagging

### **Semantic Versioning (Recomendado)**
```bash
# Versión mayor.minor.patch
docker build -t tu-usuario/practica-unir-app:1.0.0 .
docker build -t tu-usuario/practica-unir-app:1.0 .
docker build -t tu-usuario/practica-unir-app:1 .
docker build -t tu-usuario/practica-unir-app:latest .

# Subir todas las versiones
docker push tu-usuario/practica-unir-app:1.0.0
docker push tu-usuario/practica-unir-app:1.0
docker push tu-usuario/practica-unir-app:1
docker push tu-usuario/practica-unir-app:latest
```

### **Tagging por Fecha**
```bash
# Tag con fecha
docker build -t tu-usuario/practica-unir-app:2025-08-29 .

# Tag con timestamp
docker build -t tu-usuario/practica-unir-app:$(date +%Y%m%d-%H%M%S) .
```

## 🔍 Verificación y Testing

### **Verificar Imagen Local**
```bash
# Ejecutar imagen localmente
docker run -d -p 3000:3000 --name test-app tu-usuario/practica-unir-app:latest

# Verificar logs
docker logs test-app

# Probar endpoints
curl http://localhost:3000/
curl http://localhost:3000/health

# Detener y limpiar
docker stop test-app
docker rm test-app
```

### **Verificar en Docker Hub**
```bash
# Buscar imagen en Docker Hub
docker search tu-usuario/practica-unir-app

# Descargar imagen desde Docker Hub
docker pull tu-usuario/practica-unir-app:latest

# Verificar que sea la misma
docker images | grep practica-unir-app
```

## 📊 Monitoreo y Mantenimiento

### **Verificar Tamaño de Imagen**
```bash
# Ver tamaño de imagen local
docker images tu-usuario/practica-unir-app

# Ver capas de la imagen
docker history tu-usuario/practica-unir-app:latest
```

### **Limpiar Imágenes Locales**
```bash
# Eliminar imágenes no utilizadas
docker image prune

# Eliminar todas las imágenes no utilizadas
docker image prune -a

# Eliminar imágenes específicas
docker rmi tu-usuario/practica-unir-app:old-version
```

## 🚨 Solución de Problemas

### **Error: "denied: requested access to the resource is denied"**
```bash
# Solución: Verificar login
docker login

# Verificar que el username sea correcto
docker info | grep Username
```

### **Error: "manifest for tu-usuario/practica-unir-app:latest not found"**
```bash
# Solución: Verificar que la imagen existe localmente
docker images | grep practica-unir-app

# Reconstruir si es necesario
docker build -t tu-usuario/practica-unir-app:latest .
```

### **Error: "unauthorized: authentication required"**
```bash
# Solución: Rehacer login
docker logout
docker login
```

## 🌐 Uso de la Imagen Subida

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

## 📚 Recursos Adicionales

### **Documentación Oficial**
- [Docker Hub Documentation](https://docs.docker.com/docker-hub/)
- [Docker Build Reference](https://docs.docker.com/engine/reference/commandline/build/)
- [Docker Push Reference](https://docs.docker.com/engine/reference/commandline/push/)

### **Mejores Prácticas**
- Usar tags semánticos para versiones
- Mantener `latest` siempre actualizado
- Documentar cambios en cada versión
- Usar multi-stage builds para reducir tamaño
- Implementar CI/CD para automatizar el proceso

### **Herramientas Útiles**
- [Docker Hub CLI](https://github.com/docker/hub-tool)
- [Docker Compose](https://docs.docker.com/compose/)
- [Docker Desktop](https://www.docker.com/products/docker-desktop)

## 🎯 Checklist de Verificación

- [ ] Cuenta de Docker Hub creada y verificada
- [ ] Login en Docker Hub exitoso
- [ ] Imagen construida localmente
- [ ] Imagen probada localmente
- [ ] Imagen subida a Docker Hub
- [ ] Imagen verificada en Docker Hub
- [ ] Documentación actualizada
- [ ] Scripts de automatización creados

## 🏆 ¡Listo!

Una vez completados todos los pasos, tu imagen estará disponible en:
```
https://hub.docker.com/r/tu-usuario/practica-unir-app
```

Y podrá ser utilizada por cualquier desarrollador con:
```bash
docker pull tu-usuario/practica-unir-app:latest
```
