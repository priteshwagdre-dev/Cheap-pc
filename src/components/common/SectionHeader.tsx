import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { Badge } from '../ui/Badge';

export interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  badge?: string;
  badgeVariant?: 'brand' | 'discount' | 'cyan' | 'purple' | 'success';
  viewAllLink?: string;
  viewAllText?: string;
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  badge,
  badgeVariant = 'brand',
  viewAllLink,
  viewAllText = 'View All',
  className = ''
}) => {
  return (
    <div className={`flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 ${className}`}>
      <div className="space-y-1">
        <div className="flex items-center gap-2.5">
          <div className="w-1.5 h-6 bg-gradient-to-b from-brand-500 to-cyan-400 rounded-full" />
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">{title}</h2>
          {badge && <Badge variant={badgeVariant}>{badge}</Badge>}
        </div>
        {subtitle && <p className="text-sm text-slate-400 pl-4">{subtitle}</p>}
      </div>

      {viewAllLink && (
        <Link
          to={viewAllLink}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-brand-400 hover:text-brand-300 transition-colors group self-start sm:self-end"
        >
          <span>{viewAllText}</span>
          <ChevronRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
        </Link>
      )}
    </div>
  );
};
