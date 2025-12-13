import { useEffect } from "react";
import "./index.css";
import "./App.css";
import InfoBlock from "@/components/InfoBlock"
import InfoBlockCentered from "@/components/InfoBlockCentered"


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
      <InfoBlock
        title="Reading List"
        number={3}
        description="This describes the section in more detail."
      />
    </div>
    
    <div>
      <InfoBlockCentered
        title="Cottage Layers"
        number={2}
        description="This describes the section in more detail."
      />
    </div>

      <main className="min-h-screen bg-background text-foreground p-8 md:p-20 max-w-6xl mx-auto space-y-24">

        {/* Header */}
        <header className="flex flex-col items-center border-b border-border pb-8">
          <h1 className="mb-4">Typography System</h1>
          <p className="body-l text-[var(--content-secondary)] max-w-2xl">
            Complete typography system with primitives and semantic tokens.
            Uses Instrument Sans for headings/labels and Inter for body text.
          </p>
        </header>

        {/* 1. HEADINGS & DISPLAY */}
        <section className="space-y-12">
          <div className="flex items-center gap-2 border-b border-border pb-2">
            <span className="label-xs bg-[var(--background-inverse)] text-[var(--content-primary-inverse)] px-2 py-1 rounded">
              INSTRUMENT SANS
            </span>
            <span className="label-xs text-[var(--content-secondary)]">HEADINGS</span>
          </div>

          <div className="gap-2 pb-2">
            <h1>Section Title</h1>
            <p className="body-l">Lorem ipsum dolor sit amet consectetur. Libero platea elit ultrices odio. Consectetur pellentesque molestie erat etiam massa.</p>
          </div>

          <div className="space-y-10">

            {/* Display */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-baseline">
              <div className="md:col-span-1 text-xs font-mono text-[var(--content-tertiary)]">
                .display
              </div>
              <div className="md:col-span-3">
                <span className="display">Display Title</span>
              </div>
            </div>

            {/* H1 - H6 */}
            {[1, 2, 3, 4, 5, 6].map((num) => (
              <div
                key={num}
                className="grid grid-cols-1 md:grid-cols-4 gap-4 items-baseline"
              >
                <div className="md:col-span-1 text-xs font-mono text-[var(--content-tertiary)]">
                  {`<h${num}>`} or {`.h${num}`}
                </div>
                <div className="md:col-span-3">
                  {num === 1 && <h1>Heading Level 1</h1>}
                  {num === 2 && <h2>Heading Level 2</h2>}
                  {num === 3 && <h3>Heading Level 3</h3>}
                  {num === 4 && <h4>Heading Level 4</h4>}
                  {num === 5 && <h5>Heading Level 5</h5>}
                  {num === 6 && <h6>Heading Level 6</h6>}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 2. BODY TEXT */}
        <section className="space-y-12">
          <div className="flex items-center gap-2 border-b border-border pb-2">
            <span className="label-xs bg-[var(--background-secondary)] text-[var(--content-primary)] px-2 py-1 rounded">
              INTER
            </span>
            <span className="label-xs text-[var(--content-secondary)]">BODY</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

            {/* Large */}
            <div className="space-y-6">
              <div>
                <code className="text-xs text-[var(--content-info)] block mb-2">.body-l</code>
                <p className="body-l text-[var(--content-secondary)]">
                  Large body text is used for introductions. The quick brown fox jumps
                  over the lazy dog.
                </p>
              </div>

              <div>
                <code className="text-xs text-[var(--content-info)] block mb-2">.body-l-medium</code>
                <p className="body-l-medium text-[var(--content-secondary)]">
                  Large body text with medium weight for emphasis.
                </p>
              </div>
            </div>

            {/* Base */}
            <div className="space-y-6">
              <div>
                <code className="text-xs text-[var(--content-info)] block mb-2">.body-m</code>
                <p className="body-m text-[var(--content-secondary)]">
                  Base body text for most content.
                </p>
              </div>

              <div>
                <code className="text-xs text-[var(--content-info)] block mb-2">.body-m-medium</code>
                <p className="body-m-medium text-[var(--content-secondary)]">
                  Base body text with medium weight.
                </p>
              </div>
            </div>

            {/* Small */}
            <div className="space-y-6">
              <div>
                <code className="text-xs text-[var(--content-info)] block mb-2">.body-s</code>
                <p className="body-s text-[var(--content-secondary)]">
                  Small body text for captions and legal copy.
                </p>
              </div>

              <div>
                <code className="text-xs text-[var(--content-info)] block mb-2">.body-s-medium</code>
                <p className="body-s-medium text-[var(--content-secondary)]">
                  Small body text with medium weight.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 3. LABELS */}
        <section className="space-y-12">
          <div className="flex items-center gap-2 border-b border-border pb-2">
            <span className="label-xs bg-[var(--background-inverse)] text-[var(--content-primary-inverse)] px-2 py-1 rounded">
              INSTRUMENT SANS
            </span>
            <span className="label-xs text-[var(--content-secondary)]">LABELS</span>
          </div>

          <div className="flex flex-wrap gap-8 items-end">

            {[
              { cls: "label-l", padding: "px-4 py-2", text: "Label Large" },
              { cls: "label-m", padding: "px-3 py-1.5", text: "Label Medium" },
              { cls: "label-s", padding: "px-3 py-1", text: "Label Small" },
              { cls: "label-xs", padding: "px-2 py-1", text: "Label XS" },
            ].map((item) => (
              <div key={item.cls} className="space-y-2">
                <code className="text-xs text-[var(--content-secondary)] block">
                  .{item.cls}
                </code>
                <span
                  className={`${item.cls} bg-[var(--background-secondary)] text-[var(--content-primary)] rounded inline-block ${item.padding}`}
                >
                  {item.text}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* 4. COLOR TOKENS */}
        <section className="space-y-12">
          <div className="flex items-center gap-2 border-b border-border pb-2">
            <span className="label-xs bg-primary text-primary-foreground px-2 py-1 rounded">
              COLORS
            </span>
            <span className="label-xs text-[var(--content-secondary)]">
              SEMANTIC TOKENS
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-8">
            <ColorBox label="Background" color="--background-primary" />
            <ColorBox label="Foreground" color="--content-primary" />
            <ColorBox label="Secondary" color="--background-secondary" />
            <ColorBox label="Tertiary" color="--background-tertiary" />
            <ColorBox label="Brand" color="--background-brand" />
            <ColorBox label="Positive" color="--background-positive" />
            <ColorBox label="Negative" color="--background-negative" />
            <ColorBox label="Warning" color="--background-notice" />
            <ColorBox label="Info" color="--background-info" />
          </div>
        </section>

        {/* 5. USAGE EXAMPLE */}
        <section className="space-y-8">
          <div className="flex items-center gap-2 border-b border-border pb-2">
            <span className="label-xs bg-primary text-primary-foreground px-2 py-1 rounded">
              EXAMPLE
            </span>
            <span className="label-xs text-[var(--content-secondary)]">
              REAL WORLD USAGE
            </span>
          </div>

          <article className="bg-[var(--background-secondary)] p-8 rounded-lg space-y-6">
            <h2 className="text-[var(--content-primary)]">
              Building Better Products
            </h2>

            <p className="body-l text-[var(--content-secondary)]">
              This is an introduction paragraph using large body text.
            </p>

            <h3 className="text-[var(--content-primary)]">Key Features</h3>

            <p className="body-m text-[var(--content-secondary)]">
              The base body text is perfect for main content.
            </p>

            <div className="items-center gap-3">
              <button className="label-m bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-[var(--background-brand-hover)] transition-colors">
                Get Started
              </button>
              <button className="label-m border border-border text-[var(--content-primary)] px-6 py-3 rounded-lg hover:bg-[var(--background-hover)] transition-colors">
                Learn More
              </button>
            </div>

            <p className="body-s text-[var(--content-tertiary)] mt-4">
              * Terms and conditions apply.
            </p>
          </article>
        </section>

        {/* Footer */}
        <footer className="border-t border-border pt-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <p className="body-m-medium text-[var(--content-primary)]">
                Typography System
              </p>
              <p className="body-s text-[var(--content-secondary)]">
                Built with Tailwind CSS and custom primitives
              </p>
            </div>
            <span className="label-xs text-[var(--content-tertiary)]">
              v1.0.0
            </span>
          </div>
        </footer>

      </main>
    </>
  );
}

export default App;
