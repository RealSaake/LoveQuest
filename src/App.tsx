import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { AnimatePresence } from "motion/react";
import { ProloguePage } from "./components/ProloguePage";
import { CinematicTransition } from "./components/CinematicTransition";
import { Home } from "./pages/Home";
import { Timeline } from "./pages/Timeline";
import { Quests } from "./pages/Quests";
import { Memories } from "./pages/Memories";
import { Keepsakes } from "./pages/Keepsakes";
import Navigation from "./components/Navigation";
import NotFound from "./pages/NotFound";
import { useTransitionState } from "./hooks/useTransitionState";
import { usePerformanceMonitor } from "./hooks/usePerformanceMonitor";
import { performanceLogger } from "./utils/performanceLogger";
import { performanceOptimizer } from "./utils/performanceOptimizer";
import { AestheticStatus } from "./components/AestheticStatus";
import "./utils/aestheticTest"; // Auto-runs aesthetic tests

const queryClient = new QueryClient();

const AppContent = () => {
  const location = useLocation();
  const { 
    transitionState, 
    startTransition, 
    completeTransition, 
    isPrologue, 
    isMain, 
    isTransitioning 
  } = useTransitionState();
  
  const { metrics } = usePerformanceMonitor();

  const handleBeginJourney = () => {
    startTransition('forward');
  };

  const handleTransitionComplete = () => {
    completeTransition();
    // Navigate to home after transition
    setTimeout(() => {
      window.history.pushState({}, '', '/home');
      window.dispatchEvent(new PopStateEvent('popstate'));
    }, 100);
  };

  // Show navigation only when in main application (not on prologue)
  const showNavigation = isMain && !isTransitioning;

  return (
    <div className="min-h-screen w-full">
      {/* Always show prologue first */}
      {isPrologue && (
        <ProloguePage 
          onBeginJourney={handleBeginJourney} 
        />
      )}
      
      {/* Main application routes */}
      {isMain && (
        <div className="min-h-screen w-full">
          <Routes>
            <Route path="/" element={<Navigate to="/home" replace />} />
            <Route path="/home" element={<Home />} />
            <Route path="/timeline" element={<Timeline />} />
            <Route path="/quests" element={<Quests />} />
            <Route path="/memories" element={<Memories />} />
            <Route path="/keepsakes" element={<Keepsakes />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      )}

      {/* Cinematic Transition Overlay */}
      <CinematicTransition
        isActive={isTransitioning}
        onComplete={handleTransitionComplete}
        direction="prologue-to-main"
      />

      {/* Conditional Navigation */}
      {showNavigation && <Navigation />}

      {/* Aesthetic Revolution Status (development only) */}
      <AestheticStatus />
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true
        }}
      >
        <AppContent />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
