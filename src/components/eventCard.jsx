function EventCard({ evento, onSeleccionar }) {
  return (
    <article className="evento-card">
        {evento.imagen && (
  <img
    src={evento.imagen}
    alt={evento.nombre}
    className="evento-imagen"
  />
)}
      <div className="evento-info">
        <span>{evento.categoria}</span>
        <h3>{evento.nombre}</h3>
        <p> {evento.lugar}</p>
        <p> {evento.fecha}</p>
        <p>Desde ${evento.precio.toFixed(2)} USD</p>
        <p>{evento.disponibles} boletos disponibles</p>

        <button onClick={() => onSeleccionar(evento)}>
          Ver boletos
        </button>
      </div>
    </article>
  );
}

export default EventCard;