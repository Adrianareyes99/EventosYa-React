#EventosYa - Plataforma de Venta de Boletos

#Descripción
Nuestra aplicacion de eventos ya es una aplicacon web que desarrolle con React que simula la venta de boletos para eventos en El Salvador.
Nos permite consultar eventos, seleccionar nuestros boletos, realizar compras simuladas y visualizar un boleto digital.

##Tecnologías utilizadas

-React

-Vite

-JavaScript y JSX

-HTML y CSS

-localStorage

##dInstalación y ejecución

Para ejecutar el proyecto es necesario tener Node.js instalado.

Abrir una terminal dentro de la carpeta del proyecto y ejecutar:

npm install
npm run dev

Después abrir la dirección local que muestra la terminal.

##Funcionalidades

Registro e inicio de sesión simulados.

Catálogo de eventos.

Selección de zonas y cantidad de boletos.

Carrito de compras.

Pago simulado.

Boleto digital con código QR.

Actualización de boletos disponibles.

##Organización del proyecto

components: componentes reutilizables.

pages: pantallas de la aplicación.

data: información simulada de los eventos.

App.jsx: navegación y estado principal.

App.css: estilos de la aplicación.

##Estado y persistencia

Se utiliza useState para manejar información como el usuario, las compras y los eventos.

Se utiliza useEffect junto con localStorage para conservar la sesión, las compras y la disponibilidad de boletos.

##Datos simulados

La aplicación utiliza ocho eventos de ejemplo con información de fechas, lugares, categorías, precios y disponibilidad.

No utiliza base de datos ni pasarela de pago real.

##Diseño responsive

La aplicación se adapta a tres tamaños de pantalla que nos pidieron:

Celular: 375 px.

Tableta: 768 px.

Computadora: 1440 px.

##Limitaciones

El inicio de sesión y los pagos son simulados. Los datos se almacenan localmente en el navegador y el código QR no verifica entradas reales. Es importante que lo dejemos comprendido que todo es simulado.
