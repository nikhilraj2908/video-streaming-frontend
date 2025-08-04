import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { Layout } from "@/components/layout/Layout";
import { Home } from "@/pages/Home";
import { VideoDetail } from "@/pages/VideoDetail";
import { Auth } from "@/pages/Auth";
import { Upload } from "@/pages/Upload";
import { Search } from "@/pages/Search";
import { Library } from "@/pages/Library";
import NotFound from "./pages/NotFound";
import { AuthProvider } from "./contexts/AuthContext";
import { Channel } from "./pages/channel";
import { AdminDashboard } from "./pages/AdminDashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/auth" element={<Auth />} />
            <Route path="/" element={
              <Layout>
                <Home />
              </Layout>
            } />
            <Route path="/watch/:id" element={
              <Layout>
                <VideoDetail />
              </Layout>
            } />
            <Route path="/upload" element={
              <Layout>
                <Upload />
              </Layout>
            } />
            <Route path="/search" element={
              <Layout>
                <Search />
              </Layout>
            } />
            <Route path="/library" element={
              <Layout>
                <Library />
              </Layout>
            } />
            <Route path="/subscriptions" element={
              <Layout>
                <Home />
              </Layout>
            } />
             <Route path="/channel/:id" element={
              <Layout>
                <Channel />
              </Layout>
            } />
            <Route path="/trending" element={
              <Layout>
                <Home />
              </Layout>
              
            } />
            <Route path="/admindashboard" element={
              <Layout>
                <AdminDashboard />
              </Layout>
            } />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
    </AuthProvider>
  </QueryClientProvider>
  
);

export default App;
