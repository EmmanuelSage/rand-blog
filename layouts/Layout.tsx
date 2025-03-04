import React, { ReactNode, useState, useEffect } from 'react';
import { useRouter } from 'next/router';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  // Close search when navigating to a new page
  useEffect(() => {
    const handleRouteChange = () => {
      setIsSearchOpen(false);
      setSearchQuery('');
    };

    router.events.on('routeChangeComplete', handleRouteChange);
    
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Don't use shallow routing for search navigation
      router.push(`/?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  // Handle Escape key to close search
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };
    
    window.addEventListener('keydown', handleEsc);
    
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [isSearchOpen]);

  // Handle navigation to ensure proper routing
  const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    router.push(path);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white shadow-sm">
        <div className="container py-4 flex justify-between items-center">
          <a 
            href="/" 
            onClick={(e) => handleNavigation(e, '/')}
            className="text-2xl font-bold text-blue-600 no-underline"
          >
            My Blog
          </a>
          <div className="flex items-center">
            {isSearchOpen ? (
              <form onSubmit={handleSearch} className="relative mr-4">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search posts..."
                  className="w-64 px-4 py-2 text-sm text-gray-700 bg-gray-100 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  autoFocus
                  aria-label="Search posts"
                />
                <button
                  type="button"
                  onClick={() => setIsSearchOpen(false)}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  aria-label="Close search"
                >
                  <svg 
                    className="w-5 h-5" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24" 
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth="2" 
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </form>
            ) : (
              <button
                onClick={() => setIsSearchOpen(true)}
                className="mr-4 text-gray-600 hover:text-blue-600"
                aria-label="Open search"
              >
                <svg 
                  className="w-5 h-5" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24" 
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="2" 
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            )}
            <nav>
              <ul className="flex space-x-6">
                <li>
                  <a 
                    href="/" 
                    onClick={(e) => handleNavigation(e, '/')}
                    className="text-gray-700 hover:text-blue-600 no-underline"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a 
                    href="/about" 
                    onClick={(e) => handleNavigation(e, '/about')}
                    className="text-gray-700 hover:text-blue-600 no-underline"
                  >
                    About
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>
      
      <main className="flex-grow">
        {children}
      </main>
      
      <footer className="bg-gray-800 text-white py-8">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-4 md:mb-0">
              <h3 className="text-xl font-bold mb-2">My Blog</h3>
              <p className="text-gray-300">
                A personal blog built with Next.js and MDX.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-2">Links</h4>
              <ul className="space-y-1">
                <li>
                  <a 
                    href="/" 
                    onClick={(e) => handleNavigation(e, '/')}
                    className="text-gray-300 hover:text-white no-underline"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a 
                    href="/about" 
                    onClick={(e) => handleNavigation(e, '/about')}
                    className="text-gray-300 hover:text-white no-underline"
                  >
                    About
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-gray-700 text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} My Blog. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout; 