import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.tsx";
import Index from "./pages/Index.tsx";
import CreateBot from "./pages/CreateBot.tsx";
import NotFound from "./pages/NotFound.tsx";
import { Toaster } from "@/components/ui/toaster";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Index />} />
        <Route path="create-bot" element={<CreateBot />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
    <Toaster />
  </BrowserRouter>
);