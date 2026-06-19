import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '@/hooks/useAuth';

function RotaProtegida() {
  const { autenticado } = useAuth();

  if (!autenticado) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

export default RotaProtegida;
