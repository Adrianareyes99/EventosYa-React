
import { createHashRouter } from 'react-router';
import App from '../App';

const router = createHashRouter([
  { path: '/', element: <App /> }, //direccion de mi aplicacion path
  { path: '/eventos', element: <App /> }, //element componente en react
  { path: '/eventos/:id', element: <App /> }, //id evento especifico
  { path: '/carrito', element: <App /> }, 
  { path: '/checkout', element: <App /> },
  { path: '/boletos', element: <App /> },
  { path: '/perfil', element: <App /> },
  { path: '/admin', element: <App /> },
  { path: '/admin/eventos', element: <App /> },
  { path: '/admin/inventario', element: <App /> },
  { path: '/admin/reportes', element: <App /> },
  { path: '*', element: <App /> } //* direccion que no existe mensaje de error
  ]);

export default router;
