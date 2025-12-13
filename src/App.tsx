import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, useEffect } from "react";
import PageLayout from "./components/PageLayout";
import LazyRoute from "./components/LazyRoute";

// Lazy load all pages
const Home = lazy(() => import("./pages/Home"));
const Projects = lazy(() => import("./pages/Projects"));
const ReadingList = lazy(() => import("./pages/ReadingList"));
const Writing = lazy(() => import("./pages/Writing"));
const Archive = lazy(() => import("./pages/Archive"));

export default function App() {
  // Dark/light system preference
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
      <Routes>
        
        <Route element={<PageLayout />}>
          <Route path="/" element={<LazyRoute><Home /></LazyRoute>} />
          <Route path="/projects" element={<LazyRoute><Projects /></LazyRoute>} />
          <Route path="/reading-list" element={<LazyRoute><ReadingList /></LazyRoute>} />
          <Route path="/writing" element={<LazyRoute><Writing /></LazyRoute>} />
          <Route path="/archive" element={<LazyRoute><Archive /></LazyRoute>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
