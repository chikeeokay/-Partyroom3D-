import React from 'react';

interface CatMilkCardProps {
  className?: string;
  onClick?: () => void;
}

/**
 * CatMilkCard component rendering the official mascot illustration:
 * 阿池喝牛奶 (Orange cat drinking milk with white vest, 3x3 locker, retro scale, window & vintage milk bottle).
 * Exactly matches User Image 2 with crisp resolution and authentic cartoon styling.
 */
export default function CatMilkCard({ className = '', onClick }: CatMilkCardProps) {
  return (
    <div 
      onClick={onClick}
      className={`relative select-none cursor-pointer group shrink-0 ${className}`}
      title="池記吉祥物 - 阿池喝牛奶 (點擊回到頂部)"
    >
      <div className="relative overflow-hidden rounded-[16px] sm:rounded-[22px] border-[2.5px] sm:border-[3px] border-[#0f172a] shadow-[3px_3px_0px_#0f172a] sm:shadow-[4px_4px_0px_#0f172a] transition-all duration-200 group-hover:-translate-y-0.5 group-hover:shadow-[5px_5px_0px_#0f172a] bg-[#0c1a70]">
        <img 
          src="/cat-milk.png" 
          alt="池記吉祥物 - 阿池喝牛奶" 
          className="h-[54px] sm:h-[66px] xl:h-[74px] w-auto aspect-[600/440] object-cover block select-none pointer-events-none"
          loading="eager"
        />
      </div>
    </div>
  );
}
