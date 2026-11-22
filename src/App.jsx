
import { useState, useEffect } from 'react';
import { eventos } from './data/events';
import EventCard from './components/eventCard';
import SeleccionBoletos from './pages/SeleccionBoletos';
import Pago from './pages/Pago';
import BoletoDigital from './pages/BoletoDigital';
import Login from './pages/Login';
import Registro from './pages/Registro';
import './App.css';

function App() {
  const [eventoSeleccionado, setEventoSeleccionado] = useState(null);
  const [compra, setCompra] = useState(() => {
  const compraGuardada = localStorage.getItem('compra');
  return compraGuardada ? JSON.parse(compraGuardada) : null;
});
  const [pantalla, setPantalla] = useState(() => {
  const compraGuardada = localStorage.getItem('compra');
  return compraGuardada ? 'carrito' : 'eventos';
});
  const [usuario, setUsuario] = useState(() => {
  return localStorage.getItem('usuario');
});

const [listaEventos, setListaEventos] = useState(() => {
  const guardados = localStorage.getItem('eventos');
  return guardados ? JSON.parse(guardados) : eventos;
});

useEffect(() => {
  if (usuario) {
    localStorage.setItem('usuario', usuario);
  } else {
    localStorage.removeItem('usuario');
  }
}, [usuario]);

useEffect(() => {
  if (compra) {
    localStorage.setItem('compra', JSON.stringify(compra));
  } else {
    localStorage.removeItem('compra');
  }
}, [compra]);

useEffect(() => {
  localStorage.setItem('eventos', JSON.stringify(listaEventos));
}, [listaEventos]);

  function seleccionarEvento(evento) {
    setEventoSeleccionado(evento);
    setCompra(null);
    setPantalla('seleccion');
  }

  function volverEventos() {
    setEventoSeleccionado(null);
    setCompra(null);
    setPantalla('eventos');
  }

  function continuarCarrito(datosCompra) {
    setCompra(datosCompra);
    setPantalla('carrito');
  }

function confirmarPago() {
  setListaEventos(listaEventos.map(evento => {
    if (evento.id === compra.evento.id) {
      return {
        ...evento,
        disponibles: evento.disponibles - compra.cantidad
      };
    }

    return evento;
  }));

  setPantalla('confirmacion');
}


  function iniciarSesion(correo) {
    setUsuario(correo);
    setPantalla('eventos');
  }

  function registrarUsuario(datos) {
    setUsuario(datos.correo);
    setPantalla('eventos');
  }

  function cerrarSesion() {
    setUsuario(null);
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

      {pantalla === 'registro' && (
        <Registro
          onRegistrar={registrarUsuario}
          onVolver={() => setPantalla('login')}
        />
      )}

      {pantalla === 'eventos' && (
        <main>
          <h2>Explorar más eventos</h2>
          <p>Descubre los mejores eventos de El Salvador.</p>

          <section className="eventos-grid">
            {listaEventos.map((evento) => (
              <EventCard
                key={evento.id}
                evento={evento}
                onSeleccionar={seleccionarEvento}
              />
            ))}
          </section>
        </main>
      )}

      {pantalla === 'seleccion' && (
        <SeleccionBoletos
          evento={eventoSeleccionado}
          onVolver={volverEventos}
          onContinuar={continuarCarrito}
        />
      )}

      {pantalla === 'carrito' && compra && (
        <main>
          <button onClick={() => setPantalla('seleccion')}>
            ← Volver a selección
          </button>

          <h2>Carrito de compra</h2>
          <h3>{compra.evento.nombre}</h3>
          <p>Zona: {compra.zona}</p>
          <p>Cantidad: {compra.cantidad}</p>
          <p>Precio unitario: ${compra.precioUnitario.toFixed(2)}</p>
          <h2>Total: ${compra.total.toFixed(2)} USD</h2>

          <button onClick={() => setPantalla('pago')}>
            Continuar al pago
          </button>
        </main>
      )}

      {pantalla === 'pago' && compra && (
        <Pago
          compra={compra}
          onVolver={() => setPantalla('carrito')}
          onConfirmar={confirmarPago}
        />
      )}

      {pantalla === 'confirmacion' && compra && (
        <main>
          <h2>¡Compra realizada con éxito!</h2>
          <p>Tu pago simulado fue aprobado.</p>
          <h3>{compra.evento.nombre}</h3>
          <p>Zona: {compra.zona}</p>
          <p>Cantidad: {compra.cantidad}</p>
          <p>Total: ${compra.total.toFixed(2)} USD</p>

          <button onClick={() => setPantalla('boleto')}>
            Ver mi boleto digital
          </button>
        </main>
      )}

      {pantalla === 'boleto' && compra && (
        <BoletoDigital
          compra={compra}
          onVolver={volverEventos}
        />
      )}
    </div>
  );
}

export default App;
