
# EventosYa - Plataforma de Venta de Boletos

## Descripción

EventosYa es una aplicación web desarrollada con React que simula la venta de boletos para eventos en El Salvador.

Permite explorar eventos, seleccionar boletos, realizar compras simuladas y visualizar un boleto digital.

En esta tercera entrega agregamos nuevas funcionalidades como React Router, Context, useReducer, una API falsa, un panel administrativo y configuración PWA.

## Tecnologías utilizadas

- React
- Vite
- JavaScript y JSX
- HTML y CSS
- React Router
- Context API
- useReducer
- localStorage
- vite-plugin-pwa
- GitHub Actions y GitHub Pages

## Instalación y ejecución

Es necesario tener Node.js instalado.

Abrir una terminal dentro de la carpeta del proyecto y ejecutar:

npm install

npm run dev

Después abrir la dirección local que muestra la terminal.

## Funcionalidades

- Registro e inicio de sesión simulados.
- Catálogo de eventos.
- Selección de zonas y cantidad de boletos.
- Carrito de compras.
- Pago simulado.
- Confirmación de compra.
- Boleto digital.
- Navegación mediante React Router.
- Estado compartido utilizando Context y useReducer.
- Almacenamiento local de información.
- API falsa con operaciones asíncronas.
- Panel administrativo para crear, consultar, editar y eliminar eventos.
- Configuración PWA con service worker.
- Publicación mediante GitHub Pages.

## Panel administrativo

Para acceder al panel administrativo se utiliza una cuenta de demostración.

Correo: admin@eventosya.com

El panel permite consultar, agregar, modificar y eliminar eventos.

La autenticación es simulada y no debe utilizarse como mecanismo de seguridad real.

## PWA

EventosYa cuenta con una configuración PWA mediante vite-plugin-pwa.

Se genera un manifest y un service worker para almacenar recursos de la aplicación.

Se realizaron pruebas de instalación en una computadora.

## Limitaciones

Este proyecto es una simulación académica.

No utiliza una base de datos real ni procesa pagos reales.

La API falsa utiliza localStorage para guardar los eventos y los cambios son locales a cada navegador.

El acceso administrativo es demostrativo.

El funcionamiento sin conexión puede depender de los recursos previamente almacenados en caché.

## Publicación

Aplicación web:
https://adrianareyes99.github.io/EventosYa-React/

Repositorio:
https://github.com/Adrianareyes99/EventosYa-React
