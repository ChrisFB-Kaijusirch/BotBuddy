import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.tsx";
import Index from "./pages/Index.tsx";
import FeaturesPage from "./pages/Features.tsx";
import HowItWorksPage from "./pages/HowItWorks.tsx";
import Help from "./pages/Help.tsx";
import CreateBot from "./pages/CreateBot.tsx";
import NotFound from "./pages/NotFound.tsx";
import { Toaster } from "@/components/ui/toaster";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter basename={import.meta.env.BASE_URL}>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Index />} />
        <Route path="features" element={<FeaturesPage />} />
        <Route path="how-it-works" element={<HowItWorksPage />} />
        <Route path="help" element={<Help />} />
        <Route path="create-bot" element={<CreateBot />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
    <Toaster />
  </BrowserRouter>
);