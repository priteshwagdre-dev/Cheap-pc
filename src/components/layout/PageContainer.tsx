import React from 'react';

export interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
  size?: 'default' | 'narrow' | 'wide' | 'full';
}

export const PageContainer: React.FC<PageContainerProps> = ({
  children,
  className = '',
  size = 'default'
}) => {
  const sizeClasses = {
    narrow: 'max-w-4xl',
    default: 'max-w-7xl',
    wide: 'max-w-[1400px]',
    full: 'w-full'
  };

  return (
    <div className={`mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 ${sizeClasses[size]} ${className}`}>
      {children}
    </div>
  );
};
