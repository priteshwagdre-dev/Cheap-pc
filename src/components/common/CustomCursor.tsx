import React, { useEffect, useState, useRef } from 'react';

export const CustomCursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isPointerFine, setIsPointerFine] = useState(false);

  useEffect(() => {
    // Check if device supports hover/fine pointer
    if (typeof window === 'undefined') return;
    const mediaQuery = window.matchMedia('(pointer: fine)');
    setIsPointerFine(mediaQuery.matches);

    if (!mediaQuery.matches) return;

    document.documentElement.classList.add('custom-cursor-active');

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }

      // Check if hovering over clickable elements
      const target = e.target as HTMLElement | null;
      if (target) {
        const clickable = target.closest('a, button, input, select, textarea, [role="button"], .cursor-pointer, .bento-portal-card');
        setIsHovering(!!clickable);
      }
    };

    let animationFrameId: number;
    const render = () => {
      // Smooth interpolation for outer trailing ring
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    animationFrameId = requestAnimationFrame(render);

    return () => {
      document.documentElement.classList.remove('custom-cursor-active');
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  if (!isPointerFine) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden" aria-hidden="true">
      {/* Crisp inner dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 -ml-1.5 -mt-1.5 w-3 h-3 rounded-full bg-cyber-cyan shadow-[0_0_10px_#00F0FF] transition-opacity duration-200"
      />

      {/* Trailing dual-ring with spring lag */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 -ml-5 -mt-5 w-10 h-10 rounded-full border border-cyber-cyan/50 transition-all duration-150 ease-out flex items-center justify-center ${
          isHovering
            ? 'scale-150 border-cyber-amber bg-cyber-cyan/15 shadow-[0_0_25px_rgba(0,240,255,0.6)] backdrop-blur-[1px]'
            : 'scale-100 border-cyber-cyan/40 bg-transparent'
        }`}
      >
        {isHovering && (
          <div className="w-1.5 h-1.5 rounded-full bg-cyber-amber animate-ping" />
        )}
      </div>
    </div>
  );
};
