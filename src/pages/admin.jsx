
import { useState, useEffect } from 'react';
import {
  obtenerEventos,
  crearEvento,
  actualizarEvento,
  eliminarEvento
} from '../api/eventosApi';

function Admin() {
  const [eventos, setEventos] = useState([]);
  const [nombre, setNombre] = useState('');
  const [lugar, setLugar] = useState('');
  const [fecha, setFecha] = useState('');
  const [precio, setPrecio] = useState('');
  const [disponibles, setDisponibles] = useState('');
  const [editando, setEditando] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  // Consultar los eventos
  async function cargarEventos() {
    try {
      setCargando(true);
      setError('');
      const datos = await obtenerEventos();
      setEventos(datos);
    } catch {
      setError('No se pudieron cargar los eventos');
    } finally {
      setCargando(false);
    }
  }

  useEffect(() => {
    cargarEventos();
  }, []);

  // Limpiar el formulario
  function limpiar() {
    setNombre('');
    setLugar('');
    setFecha('');
    setPrecio('');
    setDisponibles('');
    setEditando(null);
  }

  // Crear o actualizar un evento
  async function guardar(e) {
    e.preventDefault();

    const datos = {
      nombre,
      lugar,
      fecha,
      precio: Number(precio),
      disponibles: Number(disponibles)
    };

    if (
      !nombre.trim() ||
      !lugar.trim() ||
      !fecha ||
      !precio ||
      disponibles === '' ||
      Number(precio) <= 0 ||
      Number(disponibles) < 0
    ) {
      setError('Revisa los datos del formulario');
      return;
    }

    try {
      setError('');

      if (editando !== null) {
        await actualizarEvento(editando, datos);
      } else {
        await crearEvento({
          ...datos,
          categoria: 'General',
          imagen: ''
        });
      }

      limpiar();
      await cargarEventos();
    } catch {
      setError('No se pudo guardar el evento');
    }
  }

  // Cargar los datos para editar
  function editar(evento) {
    setNombre(evento.nombre);
    setLugar(evento.lugar);
    setFecha(evento.fecha);
    setPrecio(evento.precio);
    setDisponibles(evento.disponibles);
    setEditando(evento.id);
  }

  // Eliminar un evento
  async function eliminar(id) {
    if (!window.confirm('¿Eliminar este evento?')) return;

    try {
      setError('');
      await eliminarEvento(id);
      await cargarEventos();
    } catch {
      setError('No se pudo eliminar el evento');
    }
  }

  return (
    <main>
      <h2>Panel Administrativo</h2>
      <p>Administración de eventos de EventosYa</p>

      <h3>{editando !== null ? 'Editar evento' : 'Agregar evento'}</h3>

      <form onSubmit={guardar} className="admin-form">
        <input
          type="text"
          placeholder="Nombre del evento"
          aria-label="Nombre del evento"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />

        <input
          type="text"
          placeholder="Lugar"
          aria-label="Lugar"
          value={lugar}
          onChange={(e) => setLugar(e.target.value)}
        />

        <input
          type="date"
          aria-label="Fecha"
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
        />

        <input
          type="number"
          placeholder="Precio"
          aria-label="Precio"
          min="0.01"
          step="0.01"
          value={precio}
          onChange={(e) => setPrecio(e.target.value)}
        />

        <input
          type="number"
          placeholder="Boletos disponibles"
          aria-label="Boletos disponibles"
          min="0"
          value={disponibles}
          onChange={(e) => setDisponibles(e.target.value)}
        />

        <button type="submit">
          {editando !== null ? 'Guardar cambios' : 'Agregar evento'}
        </button>

        {editando !== null && (
          <button type="button" onClick={limpiar}>
            Cancelar
          </button>
        )}
      </form>

      {error && <p role="alert" style={{ color: 'red' }}>{error}</p>}

      <h3>Lista de eventos</h3>

      {cargando ? (
        <p>Cargando eventos...</p>
      ) : eventos.length === 0 ? (
        <p>No hay eventos registrados.</p>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table className="admin-tabla">
            <thead>
              <tr>
                <th>Evento</th>
                <th>Precio</th>
                <th>Disponibles</th>
                <th>Acciones</th>
              </tr>
            </thead>

            <tbody>
              {eventos.map((evento) => (
                <tr key={evento.id}>
                  <td>{evento.nombre}</td>
                  <td>${evento.precio}</td>
                  <td>{evento.disponibles}</td>
                  <td>
                    <button onClick={() => editar(evento)}>
                      Editar
                    </button>
                    <button onClick={() => eliminar(evento.id)}>
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}

export default Admin;
