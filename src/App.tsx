import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { lazy, useEffect, useState, useRef } from "react";
import Lenis from "lenis";
import ScrollToTop from "./components/ScrollToTop"
import PageLayout from "./components/PageLayout";
import PageLayoutAlt from "./components/PageLayoutAlt";
import PageLayoutFull from "./components/PageLayoutFull";
import LazyRoute from "./components/LazyRoute";
import LoadingScreen from "./components/LoadingScreen";
import { LoadingProvider, useLoading } from "./context/LoadingContext";
import { useImagePreloader } from "./hooks/useImagePreloader";

const Home = lazy(() => import("./pages/Home"));
const Work = lazy(() => import("./pages/Work"));
const Explorations = lazy(() => import("./pages/Explorations"));
const ReadingList = lazy(() => import("./pages/ReadingList"));
const Writing = lazy(() => import("./pages/Writing"));
const Archive = lazy(() => import("./pages/Archive"));
const Illustrations = lazy(() => import("./pages/Illustrations"));
const Post = lazy(() => import("./pages/Post"));
const NotFound = lazy(() => import("./pages/NotFound"));

// All critical images to preload across the site
const siteImages = [
  // Nav profile image
  "https://res.cloudinary.com/barthkosi/image/upload/pfp.webp",
];

function AppContent() {
  const location = useLocation();
  const { isContentReady, completeLoading, startLoading } = useLoading();
  const { progress, reset: resetImagePreloader } = useImagePreloader(siteImages);

  const checkSkipLoader = (path: string) =>
    (path.startsWith('/work/') && path !== '/work') ||
    (path.startsWith('/explorations/') && path !== '/explorations') ||
    (path.startsWith('/writing/') && path !== '/writing');

  const [showLoader, setShowLoader] = useState(!checkSkipLoader(location.pathname));
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

  // Handle initial load skip
  useEffect(() => {
    if (checkSkipLoader(location.pathname)) {
      completeLoading();
    }
  }, []);

  // Handle route changes - show loader on navigation
  useEffect(() => {
    if (isFirstLoad.current) {
      isFirstLoad.current = false;
      return;
    }

    if (location.pathname !== previousPathRef.current) {
      previousPathRef.current = location.pathname;

      if (!checkSkipLoader(location.pathname)) {
        setShowLoader(true);
        startLoading();
        resetImagePreloader();
      } else {
        // Ensure content is ready if we skip loader
        completeLoading();
      }
    }
  }, [location.pathname, startLoading, resetImagePreloader, completeLoading]);



  const handleLoadingComplete = () => {
    setShowLoader(false);
    completeLoading();
  };

  const isVisible = isContentReady || (!showLoader && checkSkipLoader(location.pathname));

  return (
    <>
      {showLoader && (
        <LoadingScreen
          key={location.pathname}
          progress={progress}
          onComplete={handleLoadingComplete}
        />
      )}
      <div style={{ visibility: isVisible ? 'visible' : 'hidden' }}>
        <ScrollToTop />
        <Routes>
          <Route element={<PageLayoutAlt />}>
            <Route path="/" element={<LazyRoute><Home /></LazyRoute>} />
            <Route path="/work/:slug" element={<LazyRoute><Post type="work" /></LazyRoute>} />
            <Route path="/explorations/:slug" element={<LazyRoute><Post type="explorations" /></LazyRoute>} />
            <Route path="/writing/:slug" element={<LazyRoute><Post type="writing" /></LazyRoute>} />
          </Route>

          <Route element={<PageLayoutFull />}>
            <Route path="/archive" element={<LazyRoute><Archive /></LazyRoute>} />
          </Route>

          <Route element={<PageLayout />}>
            <Route path="/work" element={<LazyRoute><Work /></LazyRoute>} />
            <Route path="/explorations" element={<LazyRoute><Explorations /></LazyRoute>} />
            <Route path="/reading-list" element={<LazyRoute><ReadingList /></LazyRoute>} />
            <Route path="/writing" element={<LazyRoute><Writing /></LazyRoute>} />
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
