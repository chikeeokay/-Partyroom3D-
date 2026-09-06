import React from 'react';
import { MessageCircle } from 'lucide-react';

interface VenueShowcaseBoardProps {
  onOpenWhatsApp?: () => void;
}

export default function VenueShowcaseBoard({
  onOpenWhatsApp
}: VenueShowcaseBoardProps) {
  const handleWhatsApp = () => {
    if (onOpenWhatsApp) {
      onOpenWhatsApp();
    } else {
      window.open(
        'https://wa.me/85293737819?text=您好！我想向池記桌遊預約參觀場地/查詢大場細房包場，謝謝！',
        '_blank',
        'noopener,noreferrer'
      );
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 pt-2 pb-6">
      
      {/* 
        ========================================================================
        TOP HEADER BAR: Converted to SEO-Friendly Text with Exact Design 
        (Matching Images 1 & 5: Sprout Pill, Yellow Capsule, 3D Box, WhatsApp Button)
        ========================================================================
      */}
      <div className="flex flex-wrap items-center justify-between gap-3 sm:gap-4 mb-3 sm:mb-4">
        
        {/* 1. Left Sprout Pill: 「🌱 場相及桌遊」 */}
        <div 
          className="inline-flex items-center gap-2 bg-[#eaf4ca] px-4 sm:px-5 py-2 rounded-full border-[2.5px] border-slate-950 shadow-[2.5px_2.5px_0px_#0f172a] transition-transform hover:scale-[1.02]"
          style={{ borderStyle: 'dashed' }}
        >
          <span className="text-xl sm:text-2xl select-none" role="img" aria-label="sprout">🌱</span>
          <h2 className="text-sm sm:text-base md:text-lg font-black text-slate-950 tracking-wider m-0">
            場相及桌遊
          </h2>
        </div>

        {/* 2. Middle-Left Yellow Capsule (Image 5): 「可預約參觀場地 / 搞手Host或機構長期合作價錢可議」 */}
        <div className="relative group">
          {/* Hand-drawn dashed arc line over the top */}
          <div 
            className="absolute -top-2 left-6 right-6 h-2.5 border-t-[2.5px] border-dashed border-slate-950 pointer-events-none hidden sm:block" 
          />
          <div className="bg-[#ffd000] px-4 sm:px-6 py-1.5 sm:py-2 rounded-full sm:rounded-2xl border-[2.5px] border-slate-950 shadow-[2.5px_2.5px_0px_#0f172a] text-center transition-transform hover:scale-[1.02]">
            <div className="text-xs sm:text-sm md:text-base font-black text-slate-950 leading-tight tracking-wide">
              可預約參觀場地
            </div>
            <div className="text-[11px] sm:text-xs md:text-sm font-black text-slate-900 leading-tight">
              搞手Host或機構長期合作價錢可議
            </div>
          </div>
        </div>

        {/* 3. Middle-Right 3D Box (Image 5): 「寵物友善空間 / 包場不限人數」 */}
        <div className="relative group">
          <div className="bg-[#fefce8] px-4 sm:px-5 py-1.5 sm:py-2 rounded-xl border-[2.5px] border-slate-950 shadow-[4px_4px_0px_#78350f] text-center transition-transform hover:scale-[1.02] relative">
            <div className="text-xs sm:text-sm md:text-base font-black text-slate-950 leading-tight tracking-wide">
              寵物友善空間
            </div>
            <div className="text-[11px] sm:text-xs md:text-sm font-black text-slate-800 leading-tight">
              包場不限人數
            </div>
            {/* Small speech bubble tail on the bottom left */}
            <div 
              className="absolute -bottom-2.5 left-4 w-3 h-3 bg-[#fefce8] border-r-[2.5px] border-b-[2.5px] border-slate-950 rotate-45 hidden sm:block"
            />
          </div>
        </div>

        {/* 4. Right WhatsApp CTA Button: 「按下 即時聯絡池記」 */}
        <button
          onClick={handleWhatsApp}
          className="inline-flex items-center gap-2 bg-[#25d366] hover:bg-[#20bd5a] text-white px-4 sm:px-5 py-2 rounded-full border-[2.5px] border-slate-950 shadow-[2.5px_2.5px_0px_#0f172a] font-black text-xs sm:text-sm md:text-base transition-all hover:-translate-y-0.5 active:translate-y-0 cursor-pointer group"
          title="WhatsApp 93737819 即時預約及查詢"
        >
          <div className="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center">
            <svg viewBox="0 0 24 24" className="w-full h-full fill-white" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.487-1.761-1.66-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
            </svg>
          </div>
          <span className="whitespace-nowrap">按下 即時聯絡池記</span>
        </button>

      </div>

      {/* 
        ========================================================================
        CLEAN VENUE COLLAGE: Original layout without extra outer border (不要額外框)
        and without duplicate button tags (完全不要圖一和圖二button)
        ========================================================================
      */}
      <div className="w-full flex justify-center items-center">
        <a 
          href="https://wa.me/85293737819?text=您好！我想向池記桌遊預約參觀場地/查詢大場細房包場，謝謝！" 
          target="_blank" 
          rel="noopener noreferrer"
          className="relative w-full block cursor-pointer group"
          title="點擊即時聯絡 WhatsApp: 93737819"
        >
          <img 
            src="/venue-collage.jpg" 
            alt="池記桌遊 荔枝角大場及細房場相空間 (大場700實呎聚會空間、豪華實木長桌、500+桌遊藏書牆、細房獨立自動電動麻將機包廂、店貓陪伴)" 
            className="w-full h-auto object-contain drop-shadow-xl transition-transform duration-300 group-hover:scale-[1.005]"
            loading="eager"
          />
        </a>
      </div>

      {/* Accessible semantic SEO keywords for search engine indexing */}
      <div className="sr-only">
        <h3>池記桌遊 荔枝角大場及細房場相及空間介紹</h3>
        <p>
          池記桌遊位於荔枝角永康街29-33號兆威工業大廈，鄰近荔枝角港鐵站C出口。
          大場佔地700實呎，設有500多款桌上遊戲藏書牆、實木超大長桌、大電視Switch打機專區、專業電子連線飛鏢機，寵物友善並設有獨立洗手間與水吧。
          細房為獨立隔音包廂，配備自動電動麻將機（支援跑馬仔、廣東牌、台灣牌、日本麻雀）、專屬沙發與狼人殺血染鐘樓面具套裝。
          可預約參觀睇場，包場不限人數，搞手Host或機構長期合作價錢可議。WhatsApp查詢：93737819。
        </p>
      </div>

    </div>
  );
}
