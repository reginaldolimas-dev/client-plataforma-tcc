import { Routes, Route, Navigate } from 'react-router-dom';
import RotaProtegida from '@/routes/RotaProtegida';
import MainLayout from '@/components/MainLayout';
import LoginPage from '@/pages/LoginPage';
import DashboardPage from '@/pages/DashboardPage';
import CustomerPage from "@/pages/CustomerPage.jsx";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route element={<RotaProtegida />}>
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/clientes" element={<CustomerPage />} />
        </Route>
      </Route>
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}

export default AppRoutes;
