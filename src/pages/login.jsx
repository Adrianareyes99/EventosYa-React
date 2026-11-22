
import { useState } from 'react';

function Login({ onIngresar }) {
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [error, setError] = useState('');

  function iniciarSesion(e) {
    e.preventDefault();

    if (correo.trim() === '' || contrasena.trim() === '') {
      setError('Debes completar todos los campos');
      return;
    }

    setError('');
    onIngresar(correo);
  }

  return (
    <main className="login-container">
      <h2>Iniciar sesión</h2>

      <form onSubmit={iniciarSesion}>
        <label htmlFor="correo">Correo electrónico</label>
        <input
          id="correo"
          type="email"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          placeholder="correo@ejemplo.com"
          required
        />

        <label htmlFor="contrasena">Contraseña</label>
        <input
          id="contrasena"
          type="password"
          value={contrasena}
          onChange={(e) => setContrasena(e.target.value)}
          placeholder="Ingresa tu contraseña"
          required
        />

        {error && <p className="mensaje-error">{error}</p>}

        <button type="submit">Iniciar sesión</button>
      </form>

      <p>Inicio de sesión simulado para EventosYa.</p>
    </main>
  );
}

export default Login;
