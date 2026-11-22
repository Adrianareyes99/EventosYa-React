
import { useState } from 'react';

function Registro({ onRegistrar, onVolver }) {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [confirmar, setConfirmar] = useState('');
  const [error, setError] = useState('');

  function registrarUsuario(e) {
    e.preventDefault();

    if (!nombre.trim() || !correo.trim() || !contrasena) {
      setError('Completa todos los campos');
      return;
    }

    if (contrasena.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    if (contrasena !== confirmar) {
      setError('Las contraseñas no coinciden');
      return;
    }

    setError('');
    onRegistrar({ nombre, correo });
  }

  return (
    <main className="login-container">
      <h2>Registro de usuario</h2>
      <p>Crea tu cuenta en EventosYa</p>

      <form onSubmit={registrarUsuario}>
        <label htmlFor="nombre">Nombre completo</label>
        <input
          id="nombre"
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />

        <label htmlFor="correo-registro">Correo electrónico</label>
        <input
          id="correo-registro"
          type="email"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          required
        />

        <label htmlFor="contrasena-registro">Contraseña</label>
        <input
          id="contrasena-registro"
          type="password"
          value={contrasena}
          onChange={(e) => setContrasena(e.target.value)}
          required
        />

        <label htmlFor="confirmar">Confirmar contraseña</label>
        <input
          id="confirmar"
          type="password"
          value={confirmar}
          onChange={(e) => setConfirmar(e.target.value)}
          required
        />

        {error && <p className="mensaje-error">{error}</p>}

        <button type="submit">Registrarse</button>
      </form>

      <p>
        ¿Tu ya tienes cuenta?{' '}
        <button type="button" onClick={onVolver}>
          Iniciar sesión
        </button>
      </p>
    </main>
  );
}

export default Registro;
