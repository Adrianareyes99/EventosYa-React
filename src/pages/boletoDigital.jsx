
function BoletoDigital({ compra, onVolver }) {
  const codigo = `EventosYa - Entrada Digital
Evento: ${compra.evento.nombre}
Fecha: ${compra.evento.fecha}
Lugar: ${compra.evento.lugar}
Zona: ${compra.zona}
Cantidad: ${compra.cantidad}
Total: $${compra.total.toFixed(2)} USD`;

  return (
    <main className="boleto-container">
      <h2>¡Tus boletos están disponibles!</h2>
      <p>Compra realizada existosamente.</p>

      <div className="boleto-digital">
        <img
          src={compra.evento.imagen}
          alt={compra.evento.nombre}
          className="evento-imagen"
        />

        <h2>{compra.evento.nombre}</h2>

        <p><strong>Fecha:</strong> {compra.evento.fecha}</p>
        <p><strong>Lugar:</strong> {compra.evento.lugar}</p>
        <p><strong>Zona:</strong> {compra.zona}</p>
        <p><strong>Boletos:</strong> {compra.cantidad}</p>
        <p><strong>Total:</strong> ${compra.total.toFixed(2)}</p>

     
<div className="codigo-boleto">
  <h3>Código QR del boleto</h3>

  <img
    src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(codigo)}`}
    alt={`Código QR del boleto ${codigo}`}
    width="180"
    height="180"
  />

  <p><strong>Código:</strong> {codigo}</p>
  <small>Presenta este boleto al ingresar al evento.</small>
</div>


        <button onClick={onVolver}>
          Volver a eventos
        </button>
      </div>
    </main>
  );
}

export default BoletoDigital;
