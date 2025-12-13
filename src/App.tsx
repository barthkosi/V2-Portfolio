import { useEffect } from "react";
import "./index.css";
import "./App.css";

const ColorBox = ({
  label,
  color,
}: {
  label: string;
  color: string;
}) => {
  return (
    <div className="flex flex-col items-start gap-1">
      <span className="label-xs text-[var(--content-secondary)]">{label}</span>
      <div
        className="w-20 h-10 rounded border border-border"
        style={{ background: `var(${color})` }}
      />
    </div>
  );
};

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
     <div>
      <H1>Barthkosi</H1>
     </div>
    </>
  );
}

export default App;
