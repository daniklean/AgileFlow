#!/bin/bash
set -e

echo "Inicio del script de despliegue."

echo "Verificando las variables de entorno"
echo "IP de la instancia EC2: $EC2_INSTANCE_IP"
echo "Directorio de destino en EC2: $APP_DIR"

# Configurar el agente SSH y agregar la llave
eval $(ssh-agent -s)
echo "$SSH_PRIVATE_KEY" | tr -d '\r' | ssh-add -
mkdir -p ~/.ssh
chmod 700 ~/.ssh
echo "StrictHostKeyChecking no" > ~/.ssh/config

BUILD_DIRECTORY="dist/"
echo "Directorio de construcción: $BUILD_DIRECTORY"

echo "Iniciando la sincronización del build con la instancia EC2"
rsync -avz -e "ssh" $BUILD_DIRECTORY ubuntu@$EC2_INSTANCE_IP:$APP_DIR
echo "Sincronización completada."

# Iniciando el proceso de despliegue en la instancia EC2
echo "Iniciando el despliegue en la instancia EC2"
ssh ubuntu@$EC2_INSTANCE_IP << EOF
  echo "Conectado a la instancia EC2."

  # Navegar al directorio de la aplicación
  echo "Navegando al directorio de la aplicación: $APP_DIR"
  cd $APP_DIR

  # Reiniciar la aplicación utilizando PM2
  echo "Reiniciando la aplicación con PM2"
  /home/ubuntu/.nvm/versions/node/v16.20.2/bin/pm2 restart 0
  echo "Aplicación reiniciada con PM2."

  echo "Despliegue completado en la instancia EC2."
EOF
echo "Despliegue finalizado en la máquina local."

echo "Script de despliegue finalizado exitosamente."
