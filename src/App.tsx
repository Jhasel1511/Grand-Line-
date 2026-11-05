import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { HomePage } from './pages/HomePage';
import { ExplorePage } from './pages/ExplorePage';
import { CharacterDetailPage } from './pages/CharacterDetailPage';
import { CrewsPage } from './pages/CrewsPage';
import { FruitsPage } from './pages/FruitsPage';
import { ShipsPage } from './pages/ShipsPage';
import { FavoritesPage } from './pages/FavoritesPage';
import { ContactPage } from './pages/ContactPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { ThemeProvider } from './context/ThemeContext';
import { ToastProvider } from './context/ToastContext';
import { FavoritesProvider } from './context/FavoritesContext';

// Scroll to top helper on route navigation
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
};

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <ToastProvider>
        <FavoritesProvider>
          <div className="min-h-screen flex flex-col bg-ocean-pattern transition-colors duration-300">
            <ScrollToTop />
            <Header />
            <main className="flex-1 w-full" id="main-content">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/explorar" element={<ExplorePage />} />
                <Route path="/personaje/:id" element={<CharacterDetailPage />} />
                <Route path="/tripulaciones" element={<CrewsPage />} />
                <Route path="/frutas" element={<FruitsPage />} />
                <Route path="/barcos" element={<ShipsPage />} />
                <Route path="/favoritos" element={<FavoritesPage />} />
                <Route path="/contacto" element={<ContactPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </FavoritesProvider>
      </ToastProvider>
    </ThemeProvider>
  );
};

export default App;
