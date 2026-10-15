import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { QuickViewModal } from '../game/QuickViewModal';

export interface LayoutProps {
  children?: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <div className="min-h-screen flex flex-col bg-[#050508] text-slate-100 relative">
      <Header />
      <main className={`flex-1 w-full flex flex-col ${isHome ? '' : 'pt-24 sm:pt-28'}`}>
        {children || <Outlet />}
      </main>
      <Footer />
      <QuickViewModal />
    </div>
  );
};
