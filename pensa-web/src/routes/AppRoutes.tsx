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
import { Emergencies } from "../pages/public/Emergencies/Emergencies";
import { EmergencyDetail } from "../pages/public/EmergencyDetail/EmergencyDetail";

// Componentes da área Mãe e Bebê (ATUALIZADOS)
import { MotherAndBaby } from "../pages/public/MotherAndBaby/MotherAndBaby"; // Lista de Tópicos (Nível 1)
import { MonthlyGuideList } from "../pages/public/MotherAndBaby/MonthlyGuideList"; // Lista de Meses (Nível 2)
import { TopicMonthDetail } from "../pages/public/MotherAndBaby/TopicMonthDetail";
import { PregnancyPhases } from "../pages/public/MotherAndBaby/PregnancyPhases";
import { BabyDevelopment } from "../pages/public/MotherAndBaby/BabyDevelopment";
import { VaccinationCalendar } from "../pages/public/MotherAndBaby/VaccinationCalendar";
import { EssentialVaccines } from "../pages/public/MotherAndBaby/EssentialVaccines";

// Route Guards

export function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        {/* Rotas de Doenças e Urgências */}
        <Route path="/doencas" element={<Diseases />} />
        <Route path="/doencas/:id" element={<DiseaseDetail />} />
        <Route path="/urgencias" element={<Emergencies />} />
        <Route path="/urgencias/:id" element={<EmergencyDetail />} />
        {/* ROTAS MÃE E BEBÊ (ATUALIZADAS) */}
        <Route path="/mae-e-bebe" element={<MotherAndBaby />} />
        {/* 1. ROTA SIMPLES PARA GRAVIDEZ */}
        <Route path="/mae-bebe/fases-gravidez" element={<PregnancyPhases />} />
        {/* 2. Guia Completo: Para Desenvolvimento do Bebê (ID 2) */}
        <Route
          path="/mae-bebe/desenvolvimento-bebe"
          element={<BabyDevelopment />}
        />
        {/* 3. Detalhe de Tópico/Mês: Usado para Vacinação e Banco de Leite */}
        <Route
          path="/mae-bebe/:topicId/mes/:monthId"
          element={<TopicMonthDetail />}
        />
        <Route
          path="/mae-bebe/calendario-vacinacao"
          element={<VaccinationCalendar />}
        />
        <Route
          path="/mae-bebe/vacinas-essenciais"
          element={<EssentialVaccines />}
        />

        {/* Outras Rotas Públicas */}
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

