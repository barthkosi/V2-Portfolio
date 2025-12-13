export default function Footer() {
    return (
      <footer className="bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 py-6 mt-auto">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm">&copy; {new Date().getFullYear()} Your Name. All rights reserved.</p>
  
          <div className="flex gap-4">
            <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" className="hover:underline">
              Twitter
            </a>
            <a href="https://github.com/" target="_blank" rel="noopener noreferrer" className="hover:underline">
              GitHub
            </a>
            <a href="mailto:you@example.com" className="hover:underline">
              Email
            </a>
          </div>
        </div>
      </footer>
    );
  }
  