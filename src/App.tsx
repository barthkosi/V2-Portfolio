import { useEffect } from "react";
import "./index.css";
import "./App.css";

function App() {
  useEffect(() => {
    // Check system preference
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Apply dark mode based on system preference
    const updateDarkMode = (e: MediaQueryListEvent | MediaQueryList) => {
      if (e.matches) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    };
    
    // Set initial state
    updateDarkMode(darkModeMediaQuery);
    
    // Listen for changes
    darkModeMediaQuery.addEventListener('change', updateDarkMode);
    
    // Cleanup
    return () => darkModeMediaQuery.removeEventListener('change', updateDarkMode);
  }, []);

  return (
    <>
    
      <main className="min-h-screen bg-background text-foreground p-8 md:p-20 max-w-6xl mx-auto space-y-24">
        <div>
          <h1>Barthkosi</h1>
        </div>
      </main>
    </>
  );
}

export default App;
