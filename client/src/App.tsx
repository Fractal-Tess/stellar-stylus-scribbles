import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import Index from './pages/Index';
import ApodPage from './pages/ApodPage';
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './contexts/AuthContext';
import Gallery from './pages/Gallery';
import ArticleDetail from './pages/ArticleDetail';
import Header from './components/Header';
import Footer from './components/Footer';
import SpaceflightNews from './pages/SpaceflightNews';
import Profile from './pages/Profile';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <AuthProvider>
          <HashRouter>
            <Header />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/apod" element={<ApodPage />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/article/:id" element={<ArticleDetail />} />
              <Route path="/spaceflight-news" element={<SpaceflightNews />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Footer />
          </HashRouter>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
