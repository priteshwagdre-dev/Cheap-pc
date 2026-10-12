import React from 'react';
import { Link } from 'react-router-dom';
import { Gamepad2, Home, Compass } from 'lucide-react';
import { PageContainer } from '../components/layout/PageContainer';
import { Button } from '../components/ui/Button';

export const NotFoundPage: React.FC = () => {
  return (
    <PageContainer size="narrow" className="py-20 text-center">
      <div className="max-w-md mx-auto space-y-6">
        {/* Visual Badge / Icon */}
        <div className="relative inline-block">
          <div className="w-24 h-24 rounded-3xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400 mx-auto shadow-2xl shadow-rose-950/50">
            <Gamepad2 className="w-12 h-12 rotate-[-12deg]" />
          </div>
          <span className="absolute -bottom-2 -right-2 px-2.5 py-0.5 rounded-full text-xs font-black bg-rose-600 text-white shadow-lg">
            404
          </span>
        </div>

        <div className="space-y-2">
          <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
            SECTOR NOT FOUND
          </h1>
          <p className="text-sm text-slate-400 leading-relaxed max-w-sm mx-auto">
            The gaming coordinates you requested do not exist in this sector or have been decommissioned.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
          <Link to="/">
            <Button variant="primary" size="md" leftIcon={<Home className="w-4 h-4" />}>
              Return to Base
            </Button>
          </Link>
          <Link to="/games">
            <Button variant="outline" size="md" leftIcon={<Compass className="w-4 h-4" />}>
              Browse Games Vault
            </Button>
          </Link>
        </div>
      </div>
    </PageContainer>
  );
};
