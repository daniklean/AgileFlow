# Agiflow: Gestión de Proyectos API REST :gear:


> Este repositorio contiene el código fuente de **Agiflow** diseñado para facilitar la lógica de gestión de proyectos.
>
> Desarrollado con amor por [Daniklean](https://github.com/daniklean).

Las principales tecnologías que usamos son:

- [NestJS](https://nestjs.com/): Framework para construir aplicaciones server-side eficientes y escalables en Node.js.
- [Postgres](https://www.postgresql.org/): Sistema de gestión de bases de datos relacional.
- [Docker](https://www.docker.com/): Plataforma de contenedorización de aplicaciones.
- [Docker Compose](https://docs.docker.com/compose/): Herramienta para definir y correr multi-contenedor Docker aplicaciones.

## :point_up: ¿Quieres probar el desarrollo de esta API? - Prerrequisitos - *instalar antes de comenzar.*

Necesitarás un IDE o al menos un editor de texto que coloree la sintaxis. Recomendamos usar [Visual Studio Code](https://code.visualstudio.com/) con los siguientes plugins:

- [ESlint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

Para ejecutar el código necesitarás tener NodeJS. Recomendamos usar [`nvm`](https://github.com/nvm-sh/nvm) para la instalación.

## :ballot_box_with_check: Configuración inicial del proyecto

Suponiendo que ya has configurado todos los prerrequisitos, estos son los comandos que debes ejecutar la primera vez que trabajas en tu proyecto:

```shell
# Copia las variables de entorno en tu archivo .env.
cp .env.example .env

## Recuerda, debes ingresar tus credenciales.

# Instala las dependencias del proyecto.
npm install
```

## :woman_technologist: :man_technologist: Comandos útiles para el uso diario

```shell
# Construir el proyecto
npm run build

# Iniciar el servidor en modo desarrollo
npm run start:dev

# Iniciar el servidor en modo producción
npm run start:prod

# Correr ESLint y Prettier, corrigiendo posibles errores y formateando el código.
npm run lint

# Ejecutar las pruebas unitarias
npm run test

# Ejecutar las pruebas y esperar cambios
npm run test:watch

# Generar migraciones de la base de datos
npm run m:gen

# Ejecutar migraciones de la base de datos
npm run m:run
