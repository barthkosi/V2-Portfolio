export default function Footer() {
    return (
      <footer className="p-6 mt-auto">
        <div className="max-w-[1440px] mx-auto flex flex-col items-start gap-4">
          <p className="label-s text-[var(--content-primary)]">&copy; {new Date().getFullYear()} Your Name. All rights reserved.</p>
  
          <div className='items-start text-left'>
            <div className="flex flex-col gap-2 label-s text-[var(--content-primary)]">
              <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" className="hover:underline">
              X (Twitter)
              </a>
              <a href="https://github.com/" target="_blank" rel="noopener noreferrer" className="hover:underline">
              GitHub
              </a>
              <a href="mailto:you@example.com" className="hover:underline">
              Email
              </a>
            </div>
          </div>
        </div>
      </footer>
    );
  }
  