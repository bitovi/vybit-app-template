import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200 px-6 py-4">
        <nav className="flex items-center gap-6">
          <Link to="/" className="text-lg font-semibold text-slate-800">
            My App
          </Link>
          {/* Add nav links here */}
        </nav>
      </header>
      <main>{children}</main>
    </div>
  );
}
