import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";

import { AuthProvider } from "@/hooks/useAuth";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

import Index from "./pages/Index";
import AboutPage from "./pages/AboutPage";
import TeamPage from "./pages/TeamPage";
import FixturesPage from "./pages/FixturesPage";
import AcademyPage from "./pages/AcademyPage";
import GalleryPage from "./pages/GalleryPage";
import NewsPage from "./pages/NewsPage";
import DonatePage from "./pages/DonatePage";
import ContactPage from "./pages/ContactPage";
import AdminPage from "./pages/AdminPage";
import NotFound from "./pages/NotFound";
import { AuthPage } from "./pages/AuthPage";

const queryClient = new QueryClient();

const Layout = ({ children }: { children: React.ReactNode }) => (
  <>
    <Header />
    {children}
    <Footer />
  </>
);

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <HashRouter>
            <Routes>
              <Route path="/" element={<Layout><Index /></Layout>} />
              <Route path="/about" element={<Layout><AboutPage /></Layout>} />
              <Route path="/team" element={<Layout><TeamPage /></Layout>} />
              <Route path="/fixtures" element={<Layout><FixturesPage /></Layout>} />
              <Route path="/academy" element={<Layout><AcademyPage /></Layout>} />
              <Route path="/gallery" element={<Layout><GalleryPage /></Layout>} />
              <Route path="/news" element={<Layout><NewsPage /></Layout>} />
              <Route path="/donate" element={<Layout><DonatePage /></Layout>} />
              <Route path="/contact" element={<Layout><ContactPage /></Layout>} />
              <Route path="/auth" element={<Layout><AuthPage /></Layout>} />
              <Route path="/admin" element={<AdminPage />} />
              <Route path="*" element={<Layout><NotFound /></Layout>} />
            </Routes>
          </HashRouter>

          <Toaster />
          <Sonner />
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}