import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, useEffect } from "react";
import Lenis from "lenis";
import ScrollToTop from "./components/ScrollToTop"
import PageLayout from "./components/PageLayout";
import HomePageLayout from "./components/HomePageLayout";
import LazyRoute from "./components/LazyRoute";

const Home = lazy(() => import("./pages/Home"));
const Projects = lazy(() => import("./pages/Projects"));
const ReadingList = lazy(() => import("./pages/ReadingList"));
const Writing = lazy(() => import("./pages/Writing"));
const Archive = lazy(() => import("./pages/Archive"));
const Illustrations = lazy(() => import("./pages/Illustrations"));
const NotFound = lazy(() => import("./pages/NotFound"));

export default function App() {
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

  return (
    <BrowserRouter>
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
    </BrowserRouter>
  );
}
