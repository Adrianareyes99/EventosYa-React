
# Arquitectura del proyecto EventosYa

## 1. Descripción

EventosYa es una aplicación desarrollada con React que simula la venta de boletos para eventos en El Salvador.

La aplicación permite consultar eventos, seleccionar boletos, realizar pagos simulados y obtener un boleto digital.

## 2. Organización del proyecto

El proyecto está organizado en carpetas:

- src/components: componentes reutilizables.
- src/pages: pantallas de la aplicación.
- src/data: datos simulados de los eventos.
- src/utils: carpeta para funciones auxiliares.
- public/capturas: imágenes de las pantallas.
- App.jsx: controla las pantallas y los datos principales.
- App.css: contiene los estilos.

## 3. Componentes

Utilizamos los siguientes componentes:

- EventCard: muestra la información de cada evento.
- SeleccionBoletos: permite seleccionar zona y cantidad.
- Pago: contiene el formulario de pago simulado.
- BoletoDigital: muestra la información del boleto y el QR.
- Login: formulario de inicio de sesión.
- Registro: formulario para registrar usuarios.

## 4. Manejo del estado

Utilizamos useState para guardar y actualizar datos dentro de React.

Por ejemplo:

- usuario: guarda el correo del usuario.
- pantalla: indica qué pantalla se muestra.
- compra: guarda la información de los boletos seleccionados.
- listaEventos: guarda los eventos y su disponibilidad.

## 5. Flujo de la aplicación

El proceso principal funciona así:

1. El usuario consulta los eventos.
2. Selecciona un evento.
3. Escoge la zona y cantidad de boletos.
4. Revisa el carrito.
5. Completa el pago simulado.
6. Recibe la confirmación.
7. Consulta su boleto digital.

## 6. Persistencia

Utilizamos localStorage para conservar:

- La sesión del usuario.
- La información del carrito.
- La disponibilidad de los eventos.

También utilizamos useEffect para actualizar la información almacenada cuando cambian los datos.

## 7. Diseño responsive

Utilizamos CSS y media queries para adaptar la aplicación a tres tamaños:

- Celular: 375 px.
- Tableta: 768 px.
- Computadora: 1440 px.

## 8. Limitaciones

La aplicación es una simulación académica.

No utiliza una base de datos ni procesa pagos reales. El registro y el inicio de sesión también son simulados.

El código QR es demostrativo y no permite validar entradas reales.
