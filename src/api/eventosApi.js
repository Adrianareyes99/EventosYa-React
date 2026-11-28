
import { eventos } from '../data/events';

const CLAVE = 'eventos';

// Simulamos un pequeño tiempo de espera
function esperar() {
  return new Promise(resolve => setTimeout(resolve, 300));
}

// Consultar los eventos
export async function obtenerEventos() {
  await esperar();

  const guardados = localStorage.getItem(CLAVE);

  if (guardados) {
    return JSON.parse(guardados);
  }

  return eventos;
}

// Guardar la lista de eventos
async function guardarEventos(lista) {
  await esperar();
  localStorage.setItem(CLAVE, JSON.stringify(lista));
  return lista;
}

// Crear un evento
export async function crearEvento(nuevoEvento) {
  const lista = await obtenerEventos();

  const evento = {
    ...nuevoEvento,
    id: Date.now()
  };

  await guardarEventos([...lista, evento]);
  return evento;
}

// Actualizar un evento
export async function actualizarEvento(id, datos) {
  const lista = await obtenerEventos();

  const actualizados = lista.map(evento =>
    evento.id === id
      ? { ...evento, ...datos, id: evento.id }
      : evento
  );

  await guardarEventos(actualizados);
  return actualizados;
}

// Eliminar un evento
export async function eliminarEvento(id) {
  const lista = await obtenerEventos();

  const actualizados = lista.filter(
    evento => evento.id !== id
  );

  await guardarEventos(actualizados);
  return actualizados;
}
