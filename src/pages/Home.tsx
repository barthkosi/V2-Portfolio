import Button from "../components/Button";

export default function Home() {
    return (
        <>
          <main>
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="flex flex-col justify-center gap-4 lg:pl-10">
                <div className="flex flex-col gap-2 text-left">
                  <h1>Barth creates visual systems and digital experiences</h1>
                  <p className="body-l-medium text-[var(--content-secondary)]">
                    Explore my portfolio of web interactions, engineered solutions, 
                    and dynamic motion design that aims to inject joy into the digital world.
                  </p>
                </div>
                
                <div className="flex flex-row items-center gap-3 flex-wrap">
                  {/* Navigate to projects page */}
                  <Button to="/projects">
                    View Projects
                  </Button>

                  {/* External link */}
                  <Button 
                    variant="secondary" 
                    href="https://github.com" 
                    openInNewTab
                  >
                    GitHub
                  </Button>

                  {/* Button with onClick */}
                  <Button 
                    size="sm" 
                    onClick={() => alert('Hello!')}
                  >
                    Say Hi
                  </Button>

                  {/* Navigate to reading list */}
                  <Button variant="secondary" size="lg" to="/reading-list">
                    Reading List
                  </Button>
                </div>
              </div>
              
              <div className="w-full aspect-square">
                <div className="w-full aspect-square bg-[var(--background-secondary)] transform [transform:perspective(500px)_skewX(-24deg)]"></div>
              </div>
            </div>
          </main>
        </>
    );
}