
import { useState } from 'react';

function Pago({ compra, onVolver, onConfirmar }) {
  const [nombre, setNombre] = useState('');
  const [numeroTarjeta, setNumeroTarjeta] = useState('');
  const [vencimiento, setVencimiento] = useState('');
  const [cvv, setCvv] = useState('');
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);

  function procesarPago(e) {
    e.preventDefault();
    setError('');

    const numero = numeroTarjeta.replace(/\s/g, '');

    if (
      nombre.trim().length < 3 ||
      !/^\d{16}$/.test(numero) ||
      !/^(0[1-9]|1[0-2])\/\d{2}$/.test(vencimiento) ||
      !/^\d{3,4}$/.test(cvv)
    ) {
      setError('Verifica los datos del formulario.');
      return;
    }

    const [mes, anio] = vencimiento.split('/').map(Number);
    const hoy = new Date();
    const anioCompleto = 2000 + anio;

    if (
      anioCompleto < hoy.getFullYear() ||
      (anioCompleto === hoy.getFullYear() &&
        mes < hoy.getMonth() + 1)
    ) {
      setError('La fecha de vencimiento no es válida.');
      return;
    }

    setCargando(true);

    setTimeout(() => {
      setCargando(false);
      onConfirmar();
    }, 1200);
  }

  return (
    <main className="pago-container">
      <button onClick={onVolver} disabled={cargando}>
        ← Volver al carrito
      </button>

      <h2>Pasarela de Pago</h2>
      <p>Este es un pago simulado. No se realizará ningún cobro.</p>

      <div className="pago-grid">
        <form onSubmit={procesarPago} className="pago-formulario">
          <h3>Pago con tarjeta de crédito</h3>

          <label htmlFor="nombre-tarjeta">Nombre en la tarjeta</label>
          <input
            id="nombre-tarjeta"
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Nombre completo"
            required
          />

          <label htmlFor="numero-tarjeta">Número de tarjeta</label>
          <input
            id="numero-tarjeta"
            type="text"
            value={numeroTarjeta}
            onChange={(e) => setNumeroTarjeta(e.target.value)}
            placeholder="Número ficticio de 16 dígitos"
            maxLength={19}
            required
          />

          <label htmlFor="vencimiento">Vencimiento (MM/AA)</label>
          <input
            id="vencimiento"
            type="text"
            value={vencimiento}
            onChange={(e) => setVencimiento(e.target.value)}
            placeholder="12/28"
            maxLength={5}
            required
          />

          <label htmlFor="cvv">CVV</label>
          <input
            id="cvv"
            type="text"
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
            placeholder="123"
            maxLength={4}
            required
          />

          {error && <p role="alert" className="mensaje-error">{error}</p>}

          <button type="submit" disabled={cargando}>
            {cargando
              ? 'Procesando pago...'
              : `Pagar $${compra.total.toFixed(2)} USD`}
          </button>
        </form>

        <section className="resumen-pago">
          <h3>Resumen de compra</h3>

          <p><strong>Evento:</strong> {compra.evento.nombre}</p>
          <p><strong>Zona:</strong> {compra.zona}</p>
          <p><strong>Cantidad:</strong> {compra.cantidad}</p>
          <p>
            <strong>Precio unitario:</strong>
            {' '}${compra.precioUnitario.toFixed(2)}
          </p>

          <h2>Total: ${compra.total.toFixed(2)} USD</h2>
        </section>
      </div>
    </main>
  );
}

export default Pago;
