import { Routes, Route, Navigate } from "react-router-dom";
import { Layout } from "../components/layout/layout";

// Public Pages
import { Home } from "../pages/public/home/Home";
import { Diseases } from "../pages/public/Diseases/Diseases";
import { DiseaseDetail } from "../pages/public/DiseaseDetail/DiseaseDetail";
import { Doctors } from "../pages/public/Doctors/Doctors";
import { Services } from "../pages/public/Services/Services";
import { Projects } from "../pages/public/Projects/Projects";
import { About } from "../pages/public/About/About";
import { FAQ } from "../pages/public/FAQ/FAQ";

// Admin Pages
import { AdminLayout } from "../components/layout/AdminLayout";
import { Login } from "../pages/admin/Login/Login";
import { Dashboard } from "../pages/admin/Dashboard/Dashboard";
import { DiseasesManagement } from "../pages/admin/DiseasesManagement/DiseasesManagement";
import { PrivateRoute } from "./PrivateRoute";

// Route Guards

export function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/doencas" element={<Diseases />} />
        <Route path="/doencas/:id" element={<DiseaseDetail />} />
        <Route path="/medicos" element={<Doctors />} />
        <Route path="/servicos" element={<Services />} />
        <Route path="/projetos" element={<Projects />} />
        <Route path="/sobre" element={<About />} />
        <Route path="/faq" element={<FAQ />} />
      </Route>

      {/* Admin Routes */}
      <Route path="/admin/login" element={<Login />} />

      <Route
        path="/admin"
        element={
          <PrivateRoute>
            <AdminLayout />
          </PrivateRoute>
        }
      >
        <Route index element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="doencas" element={<DiseasesManagement />} />
        {/* <Route path="mensagens" element={<MessagesManagement />} /> */}
      </Route>

      {/* 404 */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

