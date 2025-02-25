# Challenge API REST :gear:


> Este repositorio contiene el código fuente de **API AGILIA CENTER - CHALLENGE** diseñado para la prueba tecnica.
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

## Recuerda, debes ingresar credenciales que se infieren en el env example.

# Instala las dependencias del proyecto.
pnpm i
```

## :woman_technologist: :man_technologist: Comandos útiles para inicializar el proyecto

```shell
# Construir el proyecto
pnpm run build

# Ejecutar Docker Compose - Ubicate en la raiz del proyecto
docker compose up 

# Iniciar el servidor en modo desarrollo
pnpm run start:dev

# Iniciar el servidor en modo producción
pnpm run start:prod - Debes agregar el NODE_ENV .production.env con tus variables de production

# Correr ESLint y Prettier, corrigiendo posibles errores y formateando el código.
pnpm run lint

## QA SECTION - Es necesario crear un endpoint logout?.

Para este challenge, el objetivo fue implementar una estrategia para la Autenticacion y Autorizacion, JWT cumple con ese objetivo. 
Al configurar el entorno de JWT, nos permite determinar el ciclo de vida de los tokens una vez firmados.
Es por ello que, el servidor maneja una duracion de 1H para la finalizacion de su ciclo de vida. 
Todas las rutas estan protegidas bajo un header especifico para el valor del Token.
El cliente, deberia tomar determinar donde se establecera dicho token, puede ser en Cookies o en su LocalStorage por ejemplo.
La persistencia del token en el lado del cliente les permitira tener el acceso con su token vigente.
Por lo tanto, no es necesario crear un endpoint para este caso, la vigencia del token para los atacantes es corta, y si obtienen el mismo el tiempo reducido de la vigencia no seria utilizable.
El logout, estaria vinculandose a la eliminacion del token del lado del cliente, lo que obligaria a iniciar sesion nuevamente. 

