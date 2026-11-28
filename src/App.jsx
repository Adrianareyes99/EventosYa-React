
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { useAppContext } from './context/AppContext';
import Admin from './pages/admin';
import { eventos } from './data/events';
import EventCard from './components/eventCard';
import SeleccionBoletos from './pages/SeleccionBoletos';
import Pago from './pages/pago';
import BoletoDigital from './pages/boletoDigital';
import Login from './pages/login';
import Registro from './pages/registro';

import './App.css';

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  // Estado global compartido
  const { state, dispatch } = useAppContext();
  const { usuario, compra } = state;

  // Inventario de eventos
  const [listaEventos, setListaEventos] = useState(() => {
    const guardados = localStorage.getItem('eventos');
    return guardados ? JSON.parse(guardados) : eventos;
  });

  const [eventoSeleccionado, setEventoSeleccionado] = useState(null);
  const [pantalla, setPantalla] = useState('eventos');

  // Guardar inventario
  useEffect(() => {
    localStorage.setItem('eventos', JSON.stringify(listaEventos));
  }, [listaEventos]);

  // Controlar las pantallas con las rutas
  useEffect(() => {
    const ruta = location.pathname;

    if (ruta === '/' || ruta === '/eventos') {
      setPantalla('eventos');
    
} else if (ruta === '/boletos') {
  setPantalla('boleto');
} else if (ruta === '/admin') {
  setPantalla('admin');
} else if (ruta.startsWith('/eventos/')) {
} else if (ruta.startsWith('/eventos/')) {
      const id = Number(ruta.split('/')[2]);
      const encontrado = listaEventos.find(e => e.id === id);
      setEventoSeleccionado(encontrado || null);
      setPantalla('seleccion');
    }
  }, [location.pathname]);

  // Navegación
  function volverEventos() {
    setEventoSeleccionado(null);
    dispatch({ type: 'LIMPIAR_COMPRA' });
    setPantalla('eventos');
    navigate('/eventos');
  }

  function seleccionarEvento(evento) {
    setEventoSeleccionado(evento);
    dispatch({ type: 'LIMPIAR_COMPRA' });
    setPantalla('seleccion');
    navigate('/eventos/' + evento.id);
  }

  // Guardar la compra en Context
  function continuarCarrito(datosCompra) {
    dispatch({
      type: 'GUARDAR_COMPRA',
      payload: datosCompra
    });

    setPantalla('carrito');
    navigate('/carrito');
  }

  function continuarPago() {
    setPantalla('pago');
    navigate('/checkout');
  }

  // Pago simulado e inventario
  function confirmarPago() {
    if (!compra || pantalla !== 'pago') return;

    setPantalla('confirmacion');

    setListaEventos(anteriores =>
      anteriores.map(evento => {
        if (evento.id === compra.evento.id) {
          return {
            ...evento,
            disponibles: Math.max(
              0,
              evento.disponibles - compra.cantidad
            )
          };
        }
        return evento;
      })
    );
  }

  // Sesión con useReducer
  function iniciarSesion(correo) {
    dispatch({
      type: 'INICIAR_SESION',
      payload: correo
    });
    setPantalla('eventos');
    navigate('/eventos');
  }

  function registrarUsuario(datos) {
    dispatch({
      type: 'INICIAR_SESION',
      payload: datos.correo
    });
    setPantalla('eventos');
    navigate('/eventos');
  }

  function cerrarSesion() {
    dispatch({ type: 'CERRAR_SESION' });
    volverEventos();
  }

  return (
    <div>
      <header className="encabezado">
        <h1 onClick={volverEventos} style={{ cursor: 'pointer' }}>
          EventosYa
        </h1>

        <div>
          {usuario ? (
            <>
              <span>{usuario} </span>
              <button onClick={cerrarSesion}>Cerrar sesión</button>
            </>
          ) : (
            <button onClick={() => setPantalla('login')}>
              Iniciar sesión
            </button>
          )}
        </div>
      </header>

      {/* Inicio de sesión */}
      {pantalla === 'login' && (
        <>
          <Login onIngresar={iniciarSesion} />
          <div className="enlace-registro">
            <p>¿No tienes cuenta?</p>
            <button onClick={() => setPantalla('registro')}>
              Crear cuenta
            </button>
          </div>
        </>
      )}

      {/* Registro */}
      {pantalla === 'registro' && (
        <Registro
          onRegistrar={registrarUsuario}
          onVolver={() => setPantalla('login')}
        />
      )}

      {/* Catálogo */}
      {pantalla === 'eventos' && (
        <main>
          <h2>Explorar más eventos</h2>
          <p>Descubre los mejores eventos de El Salvador.</p>

          <section className="eventos-grid">
            {listaEventos.map(evento => (
              <EventCard
                key={evento.id}
                evento={evento}
                onSeleccionar={seleccionarEvento}
              />
            ))}
          </section>
        </main>
      )}

      {/* Seleccionar boletos */}
      {pantalla === 'seleccion' && (
        eventoSeleccionado ? (
          <SeleccionBoletos
            evento={eventoSeleccionado}
            onVolver={volverEventos}
            onContinuar={continuarCarrito}
          />
        ) : (
          <main>
            <p>Evento no encontrado.</p>
            <button onClick={volverEventos}>Volver</button>
          </main>
        )
      )}

      {/* Carrito */}
      {pantalla === 'carrito' && (
        <main>
          <h2>Carrito de compra</h2>
          {compra ? (
            <>
              <h3>{compra.evento.nombre}</h3>
              <p>Zona: {compra.zona}</p>
              <p>Cantidad: {compra.cantidad}</p>
              <p>Precio unitario: ${compra.precioUnitario.toFixed(2)}</p>
              <h2>Total: ${compra.total.toFixed(2)} USD</h2>

              <button onClick={() => {
                setEventoSeleccionado(compra.evento);
                setPantalla('seleccion');
                navigate('/eventos/' + compra.evento.id);
              }}>
                Volver a selección
              </button>

              <button onClick={continuarPago}>
                Continuar al pago
              </button>
            </>
          ) : (
            <>
              <p>Tu carrito está vacío.</p>
              <button onClick={volverEventos}>Explorar eventos</button>
            </>
          )}
        </main>
      )}

      {/* Pago */}
      {pantalla === 'pago' && (
        compra ? (
          <Pago
            compra={compra}
            onVolver={() => {
              setPantalla('carrito');
              navigate('/carrito');
            }}
            onConfirmar={confirmarPago}
          />
        ) : (
          <main>
            <p>No tienes ninguna compra pendiente.</p>
            <button onClick={volverEventos}>Ver eventos</button>
          </main>
        )
      )}

      {/* Confirmación */}
      {pantalla === 'confirmacion' && compra && (
        <main>
          <h2>¡Compra realizada con éxito!</h2>
          <p>Tu pago simulado fue aprobado.</p>
          <h3>{compra.evento.nombre}</h3>
          <p>Zona: {compra.zona}</p>
          <p>Cantidad: {compra.cantidad}</p>
          <p>Total: ${compra.total.toFixed(2)} USD</p>

          <button onClick={() => {
            setPantalla('boleto');
            navigate('/boletos');
          }}>
            Ver mi boleto digital
          </button>
        </main>
      )}

      {/* Boleto digital */}
      {pantalla === 'boleto' && (
        compra ? (
          <BoletoDigital
            compra={compra}
            onVolver={volverEventos}
          />
        ) : (
          <main>
            <h2>Mis boletos</h2>
            <p>No hay boletos para mostrar.</p>
            <button onClick={volverEventos}>Explorar eventos</button>
          </main>
        )
      )}

{/* Panel administrativo */}
{pantalla === 'admin' && (
  usuario === 'admin@eventosya.com' ? (
    <Admin />
  ) : (
    <main>
      <h2>Acceso restringido</h2>
      <p>Solo el administrador puede entrar.</p>
      <button onClick={volverEventos}>
        Volver a eventos
      </button>
    </main>
  )
)}

    </div>
  );
}

export default App;
