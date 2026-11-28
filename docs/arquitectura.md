
# Arquitectura del proyecto EventosYa

## 1. Descripción general

EventosYa es una aplicación web desarrollada con React y Vite que simula la venta de boletos para eventos en El Salvador.

La aplicación permite consultar eventos, seleccionar boletos, realizar pagos simulados y visualizar un boleto digital.

## 2. Organización del proyecto

- src/components: componentes reutilizables.
- src/pages: pantallas de la aplicación.
- src/data: información inicial de los eventos.
- src/routes: configuración de React Router.
- src/context: estado global con Context y useReducer.
- src/api: funciones de la API falsa.
- public: archivos públicos.
- docs: documentación del proyecto.

## 3. Componentes y pantallas

App.jsx es el componente principal y coordina las diferentes pantallas.

EventCard muestra la información de cada evento.

SeleccionBoletos permite elegir zona y cantidad.

Pago contiene el formulario de pago simulado.

BoletoDigital muestra la información de la compra.

Login y Registro permiten simular el acceso de usuarios.

Admin permite administrar los eventos mediante operaciones CRUD.

## 4. Navegación con React Router

Utilizamos React Router para organizar las direcciones de la aplicación.

Las rutas principales implementadas son:

- /eventos
- /eventos/:id
- /carrito
- /checkout
- /boletos
- /admin

Las rutas utilizan App.jsx, que controla la pantalla mostrada según la dirección actual.

## 5. Context y useReducer

Creamos AppContext.jsx para compartir la información del usuario y la compra.

Utilizamos useReducer para controlar las siguientes acciones:

- INICIAR_SESION
- CERRAR_SESION
- GUARDAR_COMPRA
- LIMPIAR_COMPRA

También utilizamos localStorage para conservar datos entre recargas del navegador.

## 6. API falsa

Creamos eventosApi.js para simular consultas a un servidor.

Utilizamos funciones asíncronas con async y await para consultar, agregar, actualizar y eliminar eventos.

Los cambios se almacenan en localStorage.

## 7. Panel administrativo

El componente admin.jsx permite consultar, crear, modificar y eliminar eventos.

Incluye un formulario para ingresar los datos del evento y una tabla con las operaciones disponibles.

El acceso se restringe de forma demostrativa mediante un correo administrativo.

## 8. PWA

Configuramos vite-plugin-pwa en vite.config.js.

La compilación genera un manifest y un service worker.

Esto permite almacenar recursos de la aplicación y facilita su instalación como aplicación de escritorio.

## 9. Publicación

Utilizamos GitHub Actions para automatizar la compilación y publicación mediante GitHub Pages.

Enlace:
https://adrianareyes99.github.io/EventosYa-React/

## 10. Limitaciones

La aplicación es una simulación académica.

No utiliza una base de datos real ni procesa pagos reales.

La autenticación administrativa es demostrativa.

Los cambios almacenados en localStorage no se comparten entre dispositivos.

El soporte offline depende de los recursos disponibles en caché.
