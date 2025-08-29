@echo off
setlocal enabledelayedexpansion

REM 🐳 Script para Construir y Subir Imagen a Docker Hub (Windows)
REM Autor: Tu Nombre
REM Fecha: %date%

REM Configuración - CAMBIAR ESTOS VALORES
set DOCKER_USERNAME=tu-usuario
set IMAGE_NAME=practica-unir-app
set VERSION=v1.0.0

REM Colores para output (Windows 10+)
set "BLUE=[94m"
set "GREEN=[92m"
set "YELLOW=[93m"
set "RED=[91m"
set "NC=[0m"

echo 🚀 Iniciando proceso de build y push para %IMAGE_NAME%
echo 📍 Usuario Docker Hub: %DOCKER_USERNAME%
echo 🏷️ Versión: %VERSION%
echo ----------------------------------------

REM Verificar si Docker está ejecutándose
echo %BLUE%[INFO]%NC% Verificando Docker...
docker info >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo %RED%[ERROR]%NC% Docker no está ejecutándose. Inicia Docker y vuelve a intentar.
    pause
    exit /b 1
)
echo %GREEN%[SUCCESS]%NC% Docker está ejecutándose correctamente

REM Verificar login en Docker Hub
echo %BLUE%[INFO]%NC% Verificando sesión en Docker Hub...
docker info | findstr "Username" >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo %YELLOW%[WARNING]%NC% No has iniciado sesión en Docker Hub
    echo %BLUE%[INFO]%NC% Ejecutando docker login...
    docker login
    if %ERRORLEVEL% NEQ 0 (
        echo %RED%[ERROR]%NC% Error al iniciar sesión en Docker Hub
        pause
        exit /b 1
    )
)
echo %GREEN%[SUCCESS]%NC% Sesión iniciada en Docker Hub

REM Construir imagen
echo %BLUE%[INFO]%NC% Construyendo imagen Docker...
echo %BLUE%[INFO]%NC% Construyendo versión %VERSION%...
docker build -t %DOCKER_USERNAME%/%IMAGE_NAME%:%VERSION% .
if %ERRORLEVEL% NEQ 0 (
    echo %RED%[ERROR]%NC% Error al construir imagen con versión %VERSION%
    pause
    exit /b 1
)

echo %BLUE%[INFO]%NC% Construyendo tag latest...
docker build -t %DOCKER_USERNAME%/%IMAGE_NAME%:latest .
if %ERRORLEVEL% NEQ 0 (
    echo %RED%[ERROR]%NC% Error al construir imagen latest
    pause
    exit /b 1
)

echo %GREEN%[SUCCESS]%NC% Imagen construida exitosamente

REM Mostrar imágenes construidas
echo %BLUE%[INFO]%NC% Imágenes construidas:
docker images | findstr %IMAGE_NAME%

REM Probar imagen localmente
echo %BLUE%[INFO]%NC% Probando imagen localmente...
docker run -d -p 3000:3000 --name test-%IMAGE_NAME% %DOCKER_USERNAME%/%IMAGE_NAME%:latest
if %ERRORLEVEL% NEQ 0 (
    echo %RED%[ERROR]%NC% Error al ejecutar contenedor de prueba
    pause
    exit /b 1
)

echo %BLUE%[INFO]%NC% Esperando a que la aplicación se inicie...
timeout /t 10 /nobreak >nul

REM Probar endpoints (si curl está disponible)
where curl >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    echo %BLUE%[INFO]%NC% Probando endpoints...
    curl -s http://localhost:3000/ >nul 2>&1
    if %ERRORLEVEL% EQU 0 (
        echo %GREEN%[SUCCESS]%NC% Endpoint principal funcionando
    ) else (
        echo %YELLOW%[WARNING]%NC% Endpoint principal no responde
    )
    
    curl -s http://localhost:3000/health >nul 2>&1
    if %ERRORLEVEL% EQU 0 (
        echo %GREEN%[SUCCESS]%NC% Endpoint de salud funcionando
    ) else (
        echo %YELLOW%[WARNING]%NC% Endpoint de salud no responde
    )
) else (
    echo %YELLOW%[WARNING]%NC% curl no está disponible, saltando pruebas de endpoints
)

REM Detener y limpiar contenedor de prueba
docker stop test-%IMAGE_NAME%
docker rm test-%IMAGE_NAME%

echo %GREEN%[SUCCESS]%NC% Pruebas locales completadas

REM Subir imagen a Docker Hub
echo %BLUE%[INFO]%NC% Subiendo imagen a Docker Hub...
echo %BLUE%[INFO]%NC% Subiendo versión %VERSION%...
docker push %DOCKER_USERNAME%/%IMAGE_NAME%:%VERSION%
if %ERRORLEVEL% NEQ 0 (
    echo %RED%[ERROR]%NC% Error al subir versión %VERSION%
    pause
    exit /b 1
)

echo %BLUE%[INFO]%NC% Subiendo tag latest...
docker push %DOCKER_USERNAME%/%IMAGE_NAME%:latest
if %ERRORLEVEL% NEQ 0 (
    echo %RED%[ERROR]%NC% Error al subir tag latest
    pause
    exit /b 1
)

echo %GREEN%[SUCCESS]%NC% Imagen subida exitosamente a Docker Hub

REM Limpieza opcional
set /p CLEANUP="¿Deseas limpiar las imágenes locales? (y/N): "
if /i "!CLEANUP!"=="y" (
    echo %BLUE%[INFO]%NC% Limpiando imágenes locales...
    docker rmi %DOCKER_USERNAME%/%IMAGE_NAME%:%VERSION%
    docker rmi %DOCKER_USERNAME%/%IMAGE_NAME%:latest
    echo %GREEN%[SUCCESS]%NC% Limpieza completada
)

echo ----------------------------------------
echo %GREEN%[SUCCESS]%NC% ¡Proceso completado exitosamente!
echo 🌐 Tu imagen está disponible en: https://hub.docker.com/r/%DOCKER_USERNAME%/%IMAGE_NAME%
echo 📥 Otros desarrolladores pueden descargarla con: docker pull %DOCKER_USERNAME%/%IMAGE_NAME%:latest

pause
