import { Routes, Route, Navigate } from "react-router-dom";
import { Layout } from "../components/layout/layout";

// Public Pages
import { Home } from "../pages/public/home/Home";
import { Diseases } from "../pages/public/Diseases/Diseases";
import { DiseaseDetail } from "../pages/public/DiseaseDetail/DiseaseDetail";
import { About } from "../pages/public/About/About";

// Componentes da área Mãe e Bebê (ATUALIZADOS)
import { MotherAndBaby } from "../pages/public/MotherAndBaby/MotherAndBaby"; // Lista de Tópicos (Nível 1)
import { PregnancyPhases } from "../pages/public/MotherAndBaby/PregnancyPhases";
import { BabyDevelopment } from "../pages/public/MotherAndBaby/BabyDevelopment";
import { VaccinationCalendar } from "../pages/public/MotherAndBaby/VaccinationCalendar";
import { EssentialVaccines } from "../pages/public/MotherAndBaby/EssentialVaccines";
import { BreastfeedingGuide } from "../pages/public/MotherAndBaby/BreastfeedingGuide";

// Centros de Saúde
import { HealthCenters } from "../pages/public/HealthCenters/HealthCenters";

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
        <Route path="/centros-de-saude" element={<HealthCenters />} />
        {/* Rotas da área Mãe e Bebê */}
        \ <Route path="/mae-e-bebe" element={<MotherAndBaby />} />
        <Route path="/mae-bebe/fases-gravidez" element={<PregnancyPhases />} />
        <Route
          path="/mae-bebe/desenvolvimento-bebe"
          element={<BabyDevelopment />}
        />
        <Route
          path="/mae-bebe/calendario-vacinacao"
          element={<VaccinationCalendar />}
        />
        <Route
          path="/mae-bebe/vacinas-essenciais"
          element={<EssentialVaccines />}
        />
        <Route
          path="/mae-bebe/amamentacao-banco-leite"
          element={<BreastfeedingGuide />}
        />
        {/* Outras Rotas Públicas */}
        <Route path="/sobre" element={<About />} />
      </Route>
      {/* 404 */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

