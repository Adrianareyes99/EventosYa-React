
import { useState } from 'react';

function SeleccionBoletos({ evento, onVolver, onContinuar }) {
  const [zona, setZona] = useState('Platea');
  const [cantidad, setCantidad] = useState(1);

  const zonas = [
    { nombre: 'Platea', precio: evento.precio },
    { nombre: 'Tribuna', precio: evento.precio * 0.75 },
    { nombre: 'General', precio: evento.precio * 0.5 }
  ];

  const zonaSeleccionada = zonas.find(
    (item) => item.nombre === zona
  );

  const total = zonaSeleccionada.precio * cantidad;


function continuarCompra() {
  if (cantidad > evento.disponibles) {
    alert('No hay suficientes boletos disponibles');
    return;
  }

  if (evento.disponibles === 0) {
    alert('Los boletos están agotados');
    return;
  }

  onContinuar({
    evento,
    zona,
    cantidad,
    precioUnitario: zonaSeleccionada.precio,
    total
  });
}


  return (
    <main className="seleccion-boletos">
      <button onClick={onVolver}>
        ← Volver a eventos
      </button>

      <h2>Selección de Boletos</h2>

      <img
        src={evento.imagen}
        alt={evento.nombre}
        className="evento-imagen"
      />

      <h3>{evento.nombre}</h3>
      <p>📍 {evento.lugar}</p>
      <p>📅 {evento.fecha}</p>

      <h3>1. Selecciona tu zona</h3>

      <div className="zonas-lista">
        {zonas.map((item) => (
          <label key={item.nombre} className="zona-opcion">
            <input
              type="radio"
              name="zona"
              value={item.nombre}
              checked={zona === item.nombre}
              onChange={() => setZona(item.nombre)}
            />

            <span>{item.nombre}</span>

            <strong>
              ${item.precio.toFixed(2)} USD
            </strong>
          </label>
        ))}
      </div>

      <h3>2. Cantidad de boletos</h3>

      <div className="cantidad-control">
        <button
          onClick={() => setCantidad(
            Math.max(1, cantidad - 1)
          )}
          disabled={cantidad === 1}
        >
          -
        </button>

        <span>{cantidad}</span>

        <button
          onClick={() => setCantidad(
            Math.min(6, evento.disponibles, cantidad + 1)
          )}
          disabled={cantidad >= Math.min(6, evento.disponibles)}
        >
          +
        </button>
      </div>

      <div className="resumen-compra">
        <h3>Resumen del pedido</h3>

        <p>Evento: {evento.nombre}</p>
        <p>Zona: {zona}</p>
        <p>Cantidad: {cantidad}</p>

        <h2>Total: ${total.toFixed(2)} USD</h2>

        <button onClick={continuarCompra}>
          Continuar al carrito →
        </button>
      </div>
    </main>
  );
}

export default SeleccionBoletos;
