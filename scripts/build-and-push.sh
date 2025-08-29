#!/bin/bash

# 🐳 Script para Construir y Subir Imagen a Docker Hub
# Autor: Tu Nombre
# Fecha: $(date)

# Configuración - CAMBIAR ESTOS VALORES
DOCKER_USERNAME="tu-usuario"
IMAGE_NAME="practica-unir-app"
VERSION="v1.0.0"

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Función para imprimir mensajes con colores
print_message() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Función para verificar si Docker está ejecutándose
check_docker() {
    if ! docker info > /dev/null 2>&1; then
        print_error "Docker no está ejecutándose. Inicia Docker y vuelve a intentar."
        exit 1
    fi
    print_success "Docker está ejecutándose correctamente"
}

# Función para verificar login en Docker Hub
check_dockerhub_login() {
    if ! docker info | grep -q "Username"; then
        print_warning "No has iniciado sesión en Docker Hub"
        print_message "Ejecutando docker login..."
        docker login
        if [ $? -ne 0 ]; then
            print_error "Error al iniciar sesión en Docker Hub"
            exit 1
        fi
    fi
    print_success "Sesión iniciada en Docker Hub"
}

# Función para construir la imagen
build_image() {
    print_message "Construyendo imagen Docker..."
    
    # Construir versión específica
    docker build -t $DOCKER_USERNAME/$IMAGE_NAME:$VERSION .
    if [ $? -ne 0 ]; then
        print_error "Error al construir imagen con versión $VERSION"
        exit 1
    fi
    
    # Construir tag latest
    docker build -t $DOCKER_USERNAME/$IMAGE_NAME:latest .
    if [ $? -ne 0 ]; then
        print_error "Error al construir imagen latest"
        exit 1
    fi
    
    print_success "Imagen construida exitosamente"
    
    # Mostrar imágenes construidas
    print_message "Imágenes construidas:"
    docker images | grep $IMAGE_NAME
}

# Función para probar la imagen localmente
test_image() {
    print_message "Probando imagen localmente..."
    
    # Ejecutar contenedor en segundo plano
    docker run -d -p 3000:3000 --name test-$IMAGE_NAME $DOCKER_USERNAME/$IMAGE_NAME:latest
    
    if [ $? -ne 0 ]; then
        print_error "Error al ejecutar contenedor de prueba"
        exit 1
    fi
    
    # Esperar a que la aplicación se inicie
    print_message "Esperando a que la aplicación se inicie..."
    sleep 10
    
    # Probar endpoints
    if curl -s http://localhost:3000/ > /dev/null; then
        print_success "Endpoint principal funcionando"
    else
        print_warning "Endpoint principal no responde"
    fi
    
    if curl -s http://localhost:3000/health > /dev/null; then
        print_success "Endpoint de salud funcionando"
    else
        print_warning "Endpoint de salud no responde"
    fi
    
    # Detener y limpiar contenedor de prueba
    docker stop test-$IMAGE_NAME
    docker rm test-$IMAGE_NAME
    
    print_success "Pruebas locales completadas"
}

# Función para subir imagen a Docker Hub
push_image() {
    print_message "Subiendo imagen a Docker Hub..."
    
    # Subir versión específica
    print_message "Subiendo versión $VERSION..."
    docker push $DOCKER_USERNAME/$IMAGE_NAME:$VERSION
    if [ $? -ne 0 ]; then
        print_error "Error al subir versión $VERSION"
        exit 1
    fi
    
    # Subir tag latest
    print_message "Subiendo tag latest..."
    docker push $DOCKER_USERNAME/$IMAGE_NAME:latest
    if [ $? -ne 0 ]; then
        print_error "Error al subir tag latest"
        exit 1
    fi
    
    print_success "Imagen subida exitosamente a Docker Hub"
}

# Función para limpiar imágenes locales
cleanup() {
    print_message "Limpiando imágenes locales..."
    
    # Eliminar imágenes construidas
    docker rmi $DOCKER_USERNAME/$IMAGE_NAME:$VERSION
    docker rmi $DOCKER_USERNAME/$IMAGE_NAME:latest
    
    print_success "Limpieza completada"
}

# Función principal
main() {
    echo "🚀 Iniciando proceso de build y push para $IMAGE_NAME"
    echo "📍 Usuario Docker Hub: $DOCKER_USERNAME"
    echo "🏷️ Versión: $VERSION"
    echo "----------------------------------------"
    
    # Verificaciones
    check_docker
    check_dockerhub_login
    
    # Proceso principal
    build_image
    test_image
    push_image
    
    # Limpieza opcional
    read -p "¿Deseas limpiar las imágenes locales? (y/N): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        cleanup
    fi
    
    echo "----------------------------------------"
    print_success "¡Proceso completado exitosamente!"
    echo "🌐 Tu imagen está disponible en: https://hub.docker.com/r/$DOCKER_USERNAME/$IMAGE_NAME"
    echo "📥 Otros desarrolladores pueden descargarla con: docker pull $DOCKER_USERNAME/$IMAGE_NAME:latest"
}

# Ejecutar función principal
main "$@"
