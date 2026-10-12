import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';

export interface LayoutProps {
  children?: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-dark-base text-slate-100">
      <Header />
      <main className="flex-1 w-full flex flex-col">
        {children || <Outlet />}
      </main>
      <Footer />
    </div>
  );
};
