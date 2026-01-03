import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { lazy, useEffect, useState, useRef } from "react";
import Lenis from "lenis";
import ScrollToTop from "./components/ScrollToTop"
import PageLayout from "./components/PageLayout";
import HomePageLayout from "./components/HomePageLayout";
import LazyRoute from "./components/LazyRoute";
import LoadingScreen from "./components/LoadingScreen";
import { LoadingProvider, useLoading } from "./context/LoadingContext";
import { useImagePreloader } from "./hooks/useImagePreloader";

const Home = lazy(() => import("./pages/Home"));
const Projects = lazy(() => import("./pages/Projects"));
const ReadingList = lazy(() => import("./pages/ReadingList"));
const Writing = lazy(() => import("./pages/Writing"));
const Archive = lazy(() => import("./pages/Archive"));
const Illustrations = lazy(() => import("./pages/Illustrations"));
const NotFound = lazy(() => import("./pages/NotFound"));

// All critical images to preload across the site
const siteImages = [
  // Marquee images
  "https://res.cloudinary.com/barthkosi/image/upload/v1756281622/bookworms_f3dtzz.png",
  "https://res.cloudinary.com/barthkosi/image/upload/v1756360174/bookworm_-_cover_kc0pcr.png",
  "https://res.cloudinary.com/barthkosi/image/upload/v1756360901/atoms_-_3_memhte.png",
  "https://res.cloudinary.com/barthkosi/image/upload/v1756360900/atoms_-_2_nu2b6z.png",
  "https://res.cloudinary.com/barthkosi/image/upload/v1756360408/Screens_rhp8oe.png",
  "https://res.cloudinary.com/barthkosi/image/upload/v1756360410/Screens-1_vf2tnw.png",
  "https://res.cloudinary.com/barthkosi/image/upload/v1756281200/polarcam_bmcbvy.png",
  "https://res.cloudinary.com/barthkosi/image/upload/v1756359979/file_cover_-_1_l75xvi.png",
  "https://res.cloudinary.com/barthkosi/image/upload/v1756359953/cover_lnaewc.png",
  // Project showcase images
  "https://res.cloudinary.com/barthkosi/image/upload/explrar-logo.webp",
  "https://res.cloudinary.com/barthkosi/image/upload/explrar-showcase-2.webp",
  "https://res.cloudinary.com/barthkosi/image/upload/explrar-showcase-1.webp",
  "https://res.cloudinary.com/barthkosi/image/upload/bw-showcase-1.webp",
  "https://res.cloudinary.com/barthkosi/image/upload/bw-logo.webp",
  "https://res.cloudinary.com/barthkosi/image/upload/bw-showcase-3.webp",
  "https://res.cloudinary.com/barthkosi/image/upload/suixaxelar-showcase-1.webp",
  "https://res.cloudinary.com/barthkosi/image/upload/suixaxelar-showcase-2.webp",
  // Nav profile image
  "https://res.cloudinary.com/barthkosi/image/upload/pfp.webp",
];

function AppContent() {
  const location = useLocation();
  const { isContentReady, completeLoading, startLoading } = useLoading();
  const { progress, isComplete, reset: resetImagePreloader } = useImagePreloader(siteImages);
  const [showLoader, setShowLoader] = useState(true);
  const previousPathRef = useRef(location.pathname);
  const isFirstLoad = useRef(true);

  // Lenis smooth scrolling
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  // Dark mode detection
  useEffect(() => {
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const updateDarkMode = (e: MediaQueryListEvent | MediaQueryList) => {
      if (e.matches) document.documentElement.classList.add('dark');
      else document.documentElement.classList.remove('dark');
    };
    updateDarkMode(darkModeMediaQuery);
    darkModeMediaQuery.addEventListener('change', updateDarkMode);
    return () => darkModeMediaQuery.removeEventListener('change', updateDarkMode);
  }, []);

  // Handle route changes - show loader on navigation
  useEffect(() => {
    if (isFirstLoad.current) {
      isFirstLoad.current = false;
      return;
    }

    if (location.pathname !== previousPathRef.current) {
      previousPathRef.current = location.pathname;
      // Show loader on route change
      setShowLoader(true);
      startLoading();
      resetImagePreloader();
    }
  }, [location.pathname, startLoading, resetImagePreloader]);



  const handleLoadingComplete = () => {
    setShowLoader(false);
    completeLoading();
  };

  return (
    <>
      {showLoader && (
        <LoadingScreen
          progress={progress}
          onComplete={handleLoadingComplete}
        />
      )}
      <div style={{ visibility: isContentReady ? 'visible' : 'hidden' }}>
        <ScrollToTop />
        <Routes>
          <Route element={<HomePageLayout />}>
            <Route path="/" element={<LazyRoute><Home /></LazyRoute>} />
          </Route>

          <Route element={<PageLayout />}>
            <Route path="/projects" element={<LazyRoute><Projects /></LazyRoute>} />
            <Route path="/reading-list" element={<LazyRoute><ReadingList /></LazyRoute>} />
            <Route path="/writing" element={<LazyRoute><Writing /></LazyRoute>} />
            <Route path="/archive" element={<LazyRoute><Archive /></LazyRoute>} />
            <Route path="/illustrations" element={<LazyRoute><Illustrations /></LazyRoute>} />
            <Route path="*" element={<LazyRoute><NotFound /></LazyRoute>} />
          </Route>
        </Routes>
      </div>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <LoadingProvider>
        <AppContent />
      </LoadingProvider>
    </BrowserRouter>
  );
}
