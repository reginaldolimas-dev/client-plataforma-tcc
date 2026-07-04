import { Navigate, Route, Routes } from "react-router-dom";
import RotaProtegida from "@/routes/RotaProtegida";
import MainLayout from "@/components/MainLayout";
import LoginPage from "@/pages/LoginPage";
import DashboardPage from "@/pages/DashboardPage";
import CustomerPage from "@/pages/customer/CustomerPage.jsx";
import { ProductPage } from "@/pages/product/ProductPage.jsx";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route element={<RotaProtegida />}>
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/clientes" element={<CustomerPage />} />
          <Route path="/produtos" element={<ProductPage />} />
        </Route>
      </Route>
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}

export default AppRoutes;
