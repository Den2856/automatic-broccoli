import { Navigate, Route, Routes } from "react-router-dom";
import AboutPage from "./pages/AboutPage";
import BlogArticlePage from "./pages/BlogArticlePage";
import BlogPage from "./pages/BlogPage";
import ContactPage from "./pages/ContactPage";
import FinancingOptionsPage from "./pages/FinancingOptionsPage";
import Home from "./pages/Home";
import NotFoundPage from "./pages/NotFoundPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import TradeInOptionsPage from "./pages/TradeInOptionsPage";
import VehicleSlugPage from "./pages/VehicleSlugPage";
import VehiclesPage from "./pages/VehiclesPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/blog" element={<BlogPage />} />
      <Route path="/blog/:slug" element={<BlogArticlePage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/сontact" element={<Navigate to="/contact" replace />} />
      <Route
        path="/legal/privacy-policy"
        element={<PrivacyPolicyPage />}
      />
      <Route
        path="/privacy-policy"
        element={<Navigate to="/legal/privacy-policy" replace />}
      />
      
      <Route path="/services/financing-options" element={<FinancingOptionsPage />} />
      <Route path="/services/trade-in-options" element={<TradeInOptionsPage />} />

      <Route path="/vehicles" element={<VehiclesPage />} />
      <Route path="/vehicles/:slug" element={<VehicleSlugPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
