# Aplicativo

Este proyecto es una prueba técnica que implementa un servicio GraphQL utilizando NestJS en el backend y un servicio frontend utilizando Next.js. A continuación, se detallan los pasos necesarios para iniciar ambos servicios en modo local.

Requisitos
Node.js
npm (o yarn)

## Estructura del Proyecto

1. Backend (NestJS): Implementa el servicio GraphQL.
2. Frontend (Next.js): Implementa el cliente para interactuar con el servicio GraphQL.

### Configuración del Backend

1. Navega a la carpeta del backend: graphql-server
2. Instalar las dependencias: `npm install`
3. Inicia el servidor en modo desarrollo: `npm run start:dev`
   El servidor de NestJS estará disponible en http://localhost:8080/graphql.
4. URL en vercel: https://graphql-prueba-tecnica-prevalentware.vercel.app/ pero esta no esta disponible dado a que vercel no me permite ejecutar el squema.gql como se tiene establecido en modo desarrollo 😔.

### Configuración del Frontend

1. Navega a la carpeta del backend: application
2. Instalar las dependencias: `npm install`
3. Inicia el servidor en modo desarrollo: `npm run dev`
   El servidor de NestJS estará disponible en http://localhost:3000
4. Por defecto el programa tiene usuarios precargados, para usar uno em modo administrador usar el correo usuariodeprueba@prueba.com con contraseña 1234
5. Por defecto cada usuario que se cree tendra la contraseña 1234
6. URL en vercel: https://graphql-prueba-tecnica-prevalentware-app.vercel.app/
