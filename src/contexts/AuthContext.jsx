import { createContext, useState, useCallback } from 'react';
import authService from '@/services/authService';

export const AuthContext = createContext(null);

function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(
    () => JSON.parse(localStorage.getItem('usuario')) || null
  );
  const [token, setToken] = useState(
    () => localStorage.getItem('token') || null
  );

  const login = useCallback(async (credenciais) => {
    const data = await authService.login(credenciais);
    localStorage.setItem('token', data.token);
    localStorage.setItem('usuario', JSON.stringify(data.usuario));
    setToken(data.token);
    setUsuario(data.usuario);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    setToken(null);
    setUsuario(null);
  }, []);

  return (
    <AuthContext.Provider value={{ usuario, token, autenticado: !!token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
