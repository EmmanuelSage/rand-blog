import React, { ReactNode } from 'react';
import Link from 'next/link';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white shadow-sm">
        <div className="container py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-blue-600 no-underline">
            My Blog
          </Link>
          <nav>
            <ul className="flex space-x-6">
              <li>
                <Link href="/" className="text-gray-700 hover:text-blue-600 no-underline">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-700 hover:text-blue-600 no-underline">
                  About
                </Link>
              </li>
            </ul>
          </nav>
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
                  <Link href="/" className="text-gray-300 hover:text-white no-underline">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-gray-300 hover:text-white no-underline">
                    About
                  </Link>
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