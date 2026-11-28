
import { createContext, useContext, useReducer, useEffect } from 'react';

// Creamos el contexto
const AppContext = createContext();

// Recuperamos los datos guardados
const estadoInicial = {
  usuario: localStorage.getItem('usuario') || null,
  compra: JSON.parse(localStorage.getItem('compra') || 'null')
};

// Esta función controla los cambios
function reducer(state, action) {
  switch (action.type) {
    case 'INICIAR_SESION':
      return {
        ...state,
        usuario: action.payload
      };

    case 'CERRAR_SESION':
      return {
        ...state,
        usuario: null
      };

    case 'GUARDAR_COMPRA':
      return {
        ...state,
        compra: action.payload
      };

    case 'LIMPIAR_COMPRA':
      return {
        ...state,
        compra: null
      };

    default:
      return state;
  }
}

// Compartimos los datos con la aplicación
export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, estadoInicial);

  useEffect(() => {
    if (state.usuario) {
      localStorage.setItem('usuario', state.usuario);
    } else {
      localStorage.removeItem('usuario');
    }

    if (state.compra) {
      localStorage.setItem('compra', JSON.stringify(state.compra));
    } else {
      localStorage.removeItem('compra');
    }
  }, [state.usuario, state.compra]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

// Permite acceder al contexto desde otros componentes
export function useAppContext() {
  return useContext(AppContext);
}
