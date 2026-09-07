import React, { useState, useEffect } from 'react';
import { 
  MessageCircle, 
  MapPin, 
  Clock, 
  Phone, 
  ExternalLink, 
  Menu, 
  X, 
  ArrowRight, 
  HelpCircle,
  Dices,
  Instagram,
  Sparkles,
  ChevronUp,
  ChevronDown,
  Info
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Import our new modular components
import VenueSection from './components/VenueSection';
import EventsSection from './components/EventsSection';
import MahjongSection from './components/MahjongSection';
import PrintingSection from './components/PrintingSection';
import PosterUploaderStudio from './components/PosterUploaderStudio';
import VenuePhotoStudio from './components/VenuePhotoStudio';
import AdminLoginModal from './components/AdminLoginModal';
import PricingInfoBoard, { CHI_KEE_GOOGLE_MAPS_URL } from './components/PricingInfoBoard';
import AboutVenueIntroduction from './components/AboutVenueIntroduction';
import CatMilkCard from './components/CatMilkCard';
import { BoardGameEvent, VenuePhoto } from './types';
import { BOARD_GAME_EVENTS as DEFAULT_EVENTS, VENUE_PHOTOS as DEFAULT_VENUE_PHOTOS } from './data';
import { Lock, LogOut, ShieldCheck } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQS: FAQItem[] = [
  {
    question: '請問預約池記場地需要提前多久聯絡？',
    answer: '我們非常歡迎大家預約！大場包場、細房包廂以及自動麻雀開局，通常建議提前 1 至 3 天透過 WhatsApp 預約，以便我們為您鎖定時段。如果想當天臨時前來，也請務必先 WhatsApp 聯絡老闆確認現場是否有空檔，避免撲空喔！'
  },
  {
    question: '你們的具體地址和地鐵出口是指引？',
    answer: '我們的實體交收及活動地址為：香港九龍荔枝角永康街 29-33 號兆威工業大廈。乘搭港鐵至荔枝角站，從 C 出口步行僅需 3 分鐘即達（兩個街口左右），交通極為便利！'
  },
  {
    question: '3D 打印收納是免費送的嗎？需要帶遊戲嗎？',
    answer: '我們的 3D 打印收納盒「免費贈送」是針對池記社群谷友和店內客人的限時限額福利（不定期舉辦），需要到店自取，且不包含桌遊本體。如果您有其他特定桌遊的定製收納需求，可以填寫我們的 3D 打印表單，我們會為您提供非常實惠的客製化打印報價。'
  },
  {
    question: '台灣牌（台牌）教學體驗日需要自備牌搭子嗎？',
    answer: '完全不用！我們的台牌教學日是「齊 4 人即開班」，您可以一個人報名，小編會為大家湊齊人數。教學過程純粹趣味學習番數與規則，不打錢、無壓力，非常適合新手或打牌慢的同好前來交流。'
  },
  {
    question: '3D 打印機維修是如何收費的？可以上門嗎？',
    answer: '我們的 3D 打印機維修包含「到店維修」和「上門維修」。收費會根據具體故障（如堵頭、熱敏電阻損壞、電路燒毀、調平失效等）以及機型定價。您可以先在工作室網頁填寫維修諮詢單，我們會第一時間在 WhatsApp 給您提供估算报价。'
  }
];

export default function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState<string>('venue');
  const [isStudioOpen, setIsStudioOpen] = useState(false);
  const [isPhotoStudioOpen, setIsPhotoStudioOpen] = useState(false);
  
  // Owner Admin Authentication State
  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    try {
      if (typeof window !== 'undefined') {
        const params = new URLSearchParams(window.location.search);
        if (params.get('admin') === 'true' || params.get('owner') === 'true') {
          localStorage.setItem('chikee_is_admin', 'true');
          return true;
        }
        return localStorage.getItem('chikee_is_admin') === 'true';
      }
    } catch (e) {
      console.warn('Failed to parse admin state', e);
    }
    return false;
  });
  const [isAdminLoginModalOpen, setIsAdminLoginModalOpen] = useState(false);

  const handleAdminLogout = () => {
    try {
      localStorage.removeItem('chikee_is_admin');
    } catch (e) {
      console.warn('Logout storage failed', e);
    }
    setIsAdmin(false);
    setIsStudioOpen(false);
    setIsPhotoStudioOpen(false);
  };

  // Dynamic Events State with LocalStorage Persistence
  const [events, setEvents] = useState<BoardGameEvent[]>(() => {
    try {
      const saved = localStorage.getItem('chikee_boardgame_events');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Failed to load events from storage', e);
    }
    return DEFAULT_EVENTS;
  });

  const handleUpdateEvents = (newEvents: BoardGameEvent[]) => {
    setEvents(newEvents);
    try {
      localStorage.setItem('chikee_boardgame_events', JSON.stringify(newEvents));
    } catch (e) {
      console.warn('Failed to save events to storage', e);
    }
  };

  // Dynamic Venue Photos State with LocalStorage Persistence
  // Venue Photos State (Initializes directly from src/data.ts DEFAULT_VENUE_PHOTOS, with cache sanitization)
  const [venuePhotos, setVenuePhotos] = useState<VenuePhoto[]>(() => {
    try {
      const cached = localStorage.getItem('chikee_venue_photos_v6');
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Could not read cached photos', e);
    }
    return DEFAULT_VENUE_PHOTOS;
  });

  // Sync photos from API if running with server
  useEffect(() => {
    fetch('/api/photos')
      .then(res => {
        if (!res.ok) throw new Error('API not available');
        return res.json();
      })
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setVenuePhotos(data);
          try {
            localStorage.setItem('chikee_venue_photos_v6', JSON.stringify(data));
          } catch {}
        }
      })
      .catch(() => {
        // In static production (Netlify), DEFAULT_VENUE_PHOTOS from src/data.ts is already loaded
      });
  }, []);

  const handleUpdateVenuePhotos = (newPhotos: VenuePhoto[]) => {
    setVenuePhotos(newPhotos);
    try {
      localStorage.setItem('chikee_venue_photos_v6', JSON.stringify(newPhotos));
    } catch (e) {
      console.warn('Failed to save venue photos to storage', e);
    }
  };

  // Scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      
      // Determine active section on scroll
      const sections = ['venue', 'events', 'mahjong', 'printing'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 160 && rect.bottom >= 160) {
            setActiveTab(section);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleGeneralWhatsApp = () => {
    window.open('https://wa.me/85293737819?text=您好！我想向池記桌遊查詢場地、台牌教學及3D打印，謝謝！', '_blank');
  };

  const handleJoinGroup = () => {
    const msg = `您好池記！我想加入「池記桌遊交友活動 WhatsApp 群」！請拉我入群，我想和大家一起開團玩桌遊！🎲🦊`;
    window.open(`https://wa.me/85293737819?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    setActiveTab(id);
    const el = document.getElementById(id);
    if (el) {
      const header = document.querySelector('header');
      const offset = header ? header.offsetHeight + 10 : 200;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#faf5ea] text-slate-800 selection:bg-amber-100 selection:text-amber-900 scroll-smooth font-sans">
      
      {/* OWNER ADMIN STATUS BAR (Visible only when logged in as Owner) */}
      {isAdmin && (
        <div className="bg-slate-950 text-amber-300 px-4 py-2 text-xs font-black flex flex-wrap items-center justify-between gap-2 border-b-2 border-amber-400 z-50 sticky top-0">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-amber-400 animate-pulse" />
            <span>👑 池記店長管理模式中 (Admin Mode Active)</span>
            <span className="hidden sm:inline text-slate-400 font-normal">| 一般訪客不會看到上傳按鈕</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsPhotoStudioOpen(true)}
              className="px-2.5 py-1 bg-amber-400 hover:bg-amber-300 text-slate-950 rounded-lg text-xs font-black flex items-center gap-1 cursor-pointer transition-colors"
            >
              <span>📸 場相排版後台</span>
            </button>
            <button
              onClick={() => setIsStudioOpen(true)}
              className="px-2.5 py-1 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-lg text-xs font-black flex items-center gap-1 cursor-pointer transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-slate-950" />
              <span>📅 活動發佈後台</span>
            </button>
            <button
              onClick={handleAdminLogout}
              className="px-2 py-1 bg-slate-800 hover:bg-rose-900 text-rose-300 hover:text-white rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors border border-slate-700"
              title="退出店長模式"
            >
              <LogOut className="w-3 h-3" />
              <span>登出</span>
            </button>
          </div>
        </div>
      )}

      {/* HEADER / NAVIGATION - Styled to match Canva orange/cream aesthetics with dashed tabs */}
      <header 
        className={`sticky ${isAdmin ? 'top-8' : 'top-0'} left-0 right-0 z-40 transition-all duration-300 bg-[#ffa01b] border-b-[3px] border-[#0f172a] ${
          scrolled ? 'shadow-sm' : ''
        }`}
      >
        <div className="w-full mx-auto px-2 lg:px-4 flex justify-center relative">
          <div className="flex flex-row flex-wrap xl:flex-nowrap items-center justify-center gap-3 lg:gap-6 xl:gap-8 py-1 max-w-fit">
            {/* Logo Section - Card 1 (Cat Milk Mascot) on left of Card 2 (池記桌遊 3D打印維修工作室) */}
            <div className="flex items-center gap-2 sm:gap-3 xl:gap-3.5 shrink-0">
              {/* Card 1: Cat Milk Mascot Card */}
              <CatMilkCard 
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="shrink-0"
              />

              {/* Card 2: Pure HTML Semantic Text for Optimal SEO (池記桌遊 3D打印維修工作室) */}
              <a 
                href="#" 
                onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} 
                className="flex items-center group shrink-0 text-decoration-none"
                title="池記桌遊 桌上遊戲 3D打印維修工作室 - 回到頂部"
              >
                <div className="bg-[#fff7eb] hover:bg-[#fffcf3] px-3 sm:px-4 xl:px-5 py-1.5 sm:py-2 rounded-2xl sm:rounded-3xl border-[2.5px] sm:border-[3px] border-[#0f172a] shadow-[3px_3px_0px_#0f172a] sm:shadow-[4px_4px_0px_#0f172a] transition-all duration-200 group-hover:-translate-y-0.5 group-hover:shadow-[5px_5px_0px_#0f172a] flex flex-col items-center justify-center select-none cursor-pointer">
                  <h1 className="text-[18px] sm:text-[24px] lg:text-[28px] xl:text-[32px] font-black text-[#0f172a] tracking-tight leading-none text-center">
                    池記桌遊
                  </h1>
                  <p className="text-[9.5px] sm:text-[11.5px] lg:text-[12.5px] xl:text-[14px] font-black text-[#0f172a] tracking-wider leading-tight text-center mt-0.5 sm:mt-1">
                    3D打印維修工作室
                  </p>
                </div>
              </a>
            </div>

            {/* Desktop Nav - Divided into two rows (分為兩列) with enlarged text close to dashed border matching Image 3 & 4 */}
            <div className="hidden lg:flex flex-row flex-wrap xl:flex-nowrap items-center justify-center gap-3 xl:gap-6">
              <nav className="grid grid-cols-2 gap-x-2.5 xl:gap-x-3.5 gap-y-1.5 xl:gap-y-2 shrink-0">
                {[
                  { id: 'venue', label: '場相及桌遊相片' },
                  { id: 'events', label: '活動資訊' },
                  { id: 'mahjong', label: '池記台牌研究工作室' },
                  { id: 'printing', label: '3D打印/維修工作室' }
                ].map((tab) => {
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => scrollToSection(tab.id)}
                      className={`relative px-3 py-1 sm:px-3.5 sm:py-1.5 xl:px-4 xl:py-1.5 rounded-2xl text-[14.5px] sm:text-[15.5px] xl:text-[17px] font-black transition-all cursor-pointer border-[2.5px] shadow-sm flex items-center justify-center ${
                        isActive 
                          ? 'bg-[#f2f8dc] border-[#0f172a] text-[#0f172a] -translate-y-0.5 shadow-md' 
                          : 'bg-[#fcfee9] border-[#0f172a] text-[#0f172a] hover:bg-[#f2f8dc]'
                      }`}
                      style={{ borderStyle: 'dashed' }}
                    >
                      {/* Leaf SVG Decoration - Exactly matching Image 3 & 4 */}
                      <svg 
                        className="absolute -left-3 -top-2.5 w-7 h-7 sm:w-8 sm:h-8 drop-shadow-sm pointer-events-none" 
                        viewBox="0 0 100 100" 
                        fill="none"
                      >
                        <path d="M55 75 Q68 48 88 42 Q92 58 72 68 Q62 78 55 75 Z" fill="#8bc34a" stroke="#fff" strokeWidth="4" strokeLinejoin="round"/>
                        <path d="M55 75 Q42 48 22 42 Q18 58 38 68 Q48 78 55 75 Z" fill="#8bc34a" stroke="#fff" strokeWidth="4" strokeLinejoin="round"/>
                        <path d="M55 75 Q55 86 50 96" stroke="#8d6e63" strokeWidth="5" strokeLinecap="round"/>
                      </svg>
                      {/* Enlarged Text closer to dashed border */}
                      <span className="relative z-10 tracking-tight block text-center whitespace-nowrap leading-tight">
                        {tab.label}
                      </span>
                    </button>
                  );
                })}
              </nav>

              {/* Social Connect CTA Buttons - Stacked Vertically to match 2-row nav height */}
              <div className="flex flex-col items-stretch justify-center gap-1.5 shrink-0">
                <button
                  onClick={handleGeneralWhatsApp}
                  className="flex flex-row items-center justify-center bg-[#eaf4ca] hover:bg-[#ddebaf] rounded-full overflow-hidden shadow-sm transition-transform hover:-translate-y-0.5 cursor-pointer border-[3px] border-[#0f172a]"
                >
                  <div className="bg-[#4cda64] px-2.5 xl:px-3.5 py-1.5 xl:py-2 flex items-center justify-center h-full">
                    <svg viewBox="0 0 24 24" className="w-4 h-4 xl:w-5 xl:h-5 fill-white" xmlns="http://www.w3.org/2000/svg">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.487-1.761-1.66-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
                    </svg>
                  </div>
                  <span className="px-3 xl:px-4 py-1.5 text-[17px] xl:text-[21px] font-black text-[#0f172a] tracking-widest leading-none">9373 7819</span>
                </button>
                
                <a
                  href="https://www.instagram.com/boardgameschi/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-row items-center justify-center bg-[#fef5e7] hover:bg-[#fdeed2] rounded-full overflow-hidden shadow-sm transition-transform hover:-translate-y-0.5 cursor-pointer border-[3px] border-[#0f172a]"
                >
                  <div className="bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] px-2.5 xl:px-3.5 py-1.5 xl:py-2 flex items-center justify-center h-full">
                    <Instagram className="w-4 h-4 xl:w-5 xl:h-5 text-white" strokeWidth={2} />
                  </div>
                  <span className="px-3 xl:px-4 py-1.5 text-[15px] xl:text-[18px] font-black text-[#0f172a] tracking-widest leading-none">@boardgameschi</span>
                </a>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-slate-900 bg-white/80 border border-slate-900 hover:bg-white rounded-xl transition-colors cursor-pointer shadow-sm"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* QUICK INFORMATION TICKER BAR */}
        <div className="bg-slate-900 text-white py-3 border-t-[3px] border-[#0f172a] overflow-hidden">
          <div className="w-full px-2 md:px-4 flex flex-wrap justify-center items-center gap-y-2 gap-x-6 md:gap-x-12 text-center text-[12px] sm:text-[14px] md:text-[16px] lg:text-[18px] font-black tracking-wider text-amber-400">
            <span className="flex items-center gap-1.5 md:gap-2">⏰ 營業時間：12:00 PM - 12:00 AM</span>
            <span className="hidden md:inline text-slate-500">|</span>
            <a 
              href={CHI_KEE_GOOGLE_MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 md:gap-2 hover:text-amber-300 hover:underline transition-colors cursor-pointer text-decoration-none"
              title="點擊開啟 Google 地圖導航至池記桌遊 桌上遊戲"
            >
              📍 地址：荔枝角永康街29-33號兆威工業大廈
              <ExternalLink className="w-3.5 h-3.5 opacity-80" />
            </a>
            <span className="hidden md:inline text-slate-500">|</span>
            <a 
              href={CHI_KEE_GOOGLE_MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 md:gap-2 hover:text-amber-300 hover:underline transition-colors cursor-pointer text-decoration-none"
              title="點擊開啟 Google 地圖導航至池記桌遊 桌上遊戲"
            >
              🚇 港鐵：荔枝角站 C 出口步行 3 分鐘即達
            </a>
          </div>
        </div>

        {/* Mobile menu drawer */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-white border-b-2 border-slate-900/10 shadow-md"
            >
              <div className="px-4 pt-2 pb-6 space-y-3 font-black text-xs text-slate-700">
                <button 
                  onClick={() => scrollToSection('about-venue')}
                  className="w-full text-left px-3 py-2.5 rounded-xl bg-amber-100/70 hover:bg-amber-100 text-slate-950 font-black transition-all flex items-center gap-2 border border-amber-300"
                >
                  <span>🎉</span> 場地簡介 (Partyroom / 麻雀房)
                </button>
                <button 
                  onClick={() => scrollToSection('venue')}
                  className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-amber-50 hover:text-amber-600 transition-all flex items-center gap-2"
                >
                  <span>📷</span> 場相及桌遊空間
                </button>
                <button 
                  onClick={() => scrollToSection('events')}
                  className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-amber-50 hover:text-amber-600 transition-all flex items-center gap-2"
                >
                  <span>🎉</span> 最新活動資訊
                </button>
                <button 
                  onClick={() => scrollToSection('mahjong')}
                  className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-amber-50 hover:text-amber-600 transition-all flex items-center gap-2"
                >
                  <span>🀄</span> 池記台牌工作室
                </button>
                <button 
                  onClick={() => scrollToSection('printing')}
                  className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-amber-50 hover:text-amber-600 transition-all flex items-center gap-2"
                >
                  <span>⚙</span> 3D打印維修工作室
                </button>
                
                {/* Studio Triggers in Mobile Menu - Only for Admin */}
                {isAdmin && (
                  <div className="flex flex-col gap-1.5 pt-1">
                    <button
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        setIsPhotoStudioOpen(true);
                      }}
                      className="w-full text-left px-3 py-2.5 rounded-xl bg-orange-100/80 text-orange-950 font-black transition-all flex items-center justify-between border border-orange-300"
                    >
                      <span className="flex items-center gap-2">
                        <span className="text-base">📸</span>
                        <span>場相上傳 / 自由排版後台</span>
                      </span>
                      <span className="text-[10px] bg-orange-500 text-white px-1.5 py-0.5 rounded font-black">Admin</span>
                    </button>

                    <button
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        setIsStudioOpen(true);
                      }}
                      className="w-full text-left px-3 py-2.5 rounded-xl bg-amber-100/70 text-amber-950 font-black transition-all flex items-center justify-between border border-amber-300"
                    >
                      <span className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-amber-600" />
                        <span>海報上傳 / 活動發佈後台</span>
                      </span>
                      <span className="text-[10px] bg-amber-500 text-white px-1.5 py-0.5 rounded font-black">Admin</span>
                    </button>
                  </div>
                )}
                
                <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
                  <a
                    href="https://www.instagram.com/boardgameschi/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 text-center text-xs font-black text-white bg-gradient-to-r from-pink-500 to-yellow-500 rounded-xl flex items-center justify-center gap-1.5"
                  >
                    <Instagram className="w-4 h-4" />
                    <span>Instagram: @boardgameschi</span>
                  </a>
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      handleGeneralWhatsApp();
                    }}
                    className="w-full py-2.5 text-center text-xs font-black text-white bg-emerald-500 rounded-xl flex items-center justify-center gap-1.5"
                  >
                    <MessageCircle className="w-4 h-4 fill-white text-emerald-500" />
                    <span>WhatsApp 快速聯絡</span>
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* HERO SECTION - SEO-friendly Pricing & Venue Facility Board (Converted from Image to HTML/CSS with exact yellow & brown frame design) */}
      <section id="hero" className="relative pt-0 pb-0 overflow-hidden bg-[#ffa01b]">
        {/* Playful background graphics */}
        <div className="absolute top-1/4 right-0 w-80 h-80 bg-orange-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-5 left-5 w-60 h-60 bg-emerald-400/10 rounded-full blur-2xl pointer-events-none" />
        
        <PricingInfoBoard onOpenWhatsApp={handleGeneralWhatsApp} />
      </section>

      {/* SECTION: ABOUT VENUE INTRODUCTION (Partyroom / 活動場地租用 / 麻雀房租用 / 聚會場地 / Boardgame) */}
      <AboutVenueIntroduction onOpenWhatsApp={handleGeneralWhatsApp} />

      {/* SECTION 1: VENUE & BOARD GAME PHOTOS (Upload studio only available for logged-in Admin) */}
      <VenueSection 
        photos={venuePhotos}
        onOpenPhotoStudio={isAdmin ? () => setIsPhotoStudioOpen(true) : undefined}
      />

      {/* SECTION 2: EVENTS INFORMATION (Event studio only available for logged-in Admin) */}
      <EventsSection 
        events={events} 
        onOpenStudio={isAdmin ? () => setIsStudioOpen(true) : undefined} 
      />

      {/* SECTION 3: TAIWANESE MAHJONG RESEARCH STUDIO */}
      <MahjongSection />

      {/* SECTION 4: 3D PRINTING WORKSHOP */}
      <PrintingSection />

      {/* POSTER UPLOADER & EVENT MANAGEMENT STUDIO MODAL */}
      <PosterUploaderStudio 
        isOpen={isStudioOpen}
        onClose={() => setIsStudioOpen(false)}
        events={events}
        onUpdateEvents={handleUpdateEvents}
      />

      {/* VENUE PHOTO & AUTO-LAYOUT STUDIO MODAL */}
      <VenuePhotoStudio 
        isOpen={isPhotoStudioOpen}
        onClose={() => setIsPhotoStudioOpen(false)}
        photos={venuePhotos}
        onUpdatePhotos={handleUpdateVenuePhotos}
      />

      {/* ADMIN LOGIN MODAL */}
      <AdminLoginModal 
        isOpen={isAdminLoginModalOpen}
        onClose={() => setIsAdminLoginModalOpen(false)}
        onLoginSuccess={() => setIsAdmin(true)}
      />

      {/* FOOTER - Professional & localized */}
      <footer className="bg-slate-900 text-slate-300 py-12 border-t-2 border-slate-950 w-full">
        <div className="w-full px-2 sm:px-4 md:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            
            {/* Left Brand */}
            <div className="text-center lg:text-left space-y-2 whitespace-nowrap">
              <div className="flex items-center gap-2 justify-center lg:justify-start">
                <span className="text-2xl sm:text-3xl">🦊</span>
                <span className="text-[clamp(1rem,3vw,1.875rem)] font-black text-white tracking-tight">池記桌遊 ‧ 3D 打印維修工作室</span>
              </div>
              <a 
                href={CHI_KEE_GOOGLE_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[clamp(0.75rem,2vw,1.125rem)] text-slate-400 hover:text-amber-300 font-bold block transition-colors cursor-pointer text-decoration-none"
                title="點擊開啟 Google 地圖導航至池記桌遊 桌上遊戲"
              >
                香港荔枝角永康街 29-33 號兆威工業大廈 (開啟 Google 地圖導航 ↗)
              </a>
            </div>

            {/* Middle Nav Links */}
            <div className="flex flex-wrap justify-center gap-3 sm:gap-6 text-slate-300 font-black text-[clamp(0.75rem,2vw,1.125rem)] whitespace-nowrap">
              <button onClick={() => scrollToSection('venue')} className="hover:text-white transition-colors cursor-pointer">場地空間</button>
              <button onClick={() => scrollToSection('events')} className="hover:text-white transition-colors cursor-pointer">最新活動</button>
              <button onClick={() => scrollToSection('mahjong')} className="hover:text-white transition-colors cursor-pointer">台牌工作室</button>
              <button onClick={() => scrollToSection('printing')} className="hover:text-white transition-colors cursor-pointer">3D打印維修</button>
            </div>

            {/* Right Contact details */}
            <div className="text-center lg:text-right space-y-1.5 font-bold whitespace-nowrap">
              <p className="text-white text-[clamp(0.875rem,2.5vw,1.25rem)]">📞 WhatsApp: 9373 7819</p>
              <p className="text-slate-400 text-[clamp(0.7rem,1.8vw,1rem)]">支持轉數快 / PayMe / AlipayHK / 微信支付</p>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm font-bold text-slate-500">
            <p>© {new Date().getFullYear()} 池記桌遊 Chikeechi. All rights reserved.</p>
            
            {/* Discreet Admin Login / Status Trigger in Footer */}
            <div className="flex items-center gap-3 text-xs">
              {isAdmin ? (
                <div className="flex items-center gap-2">
                  <span className="text-amber-400 font-black flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>店長已登入</span>
                  </span>
                  <button
                    onClick={handleAdminLogout}
                    className="text-rose-400 hover:text-rose-300 underline font-bold cursor-pointer"
                  >
                    登出管理
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsAdminLoginModalOpen(true)}
                  className="text-slate-600 hover:text-amber-400 transition-colors flex items-center gap-1 cursor-pointer font-bold"
                  title="僅供店主上傳管理"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>店長登入</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </footer>

      {/* FLOATING QUICK CONNECT BUTTONS (Studio buttons only appear for logged-in Admin) */}
      <div className="fixed bottom-6 right-6 z-30 flex flex-col items-end gap-2.5">
        
        {/* Venue Photo Studio Quick Trigger (Admin Only) */}
        {isAdmin && (
          <button
            onClick={() => setIsPhotoStudioOpen(true)}
            className="bg-slate-900 text-white hover:bg-slate-800 text-xs font-black px-3.5 py-2 rounded-full border-2 border-orange-400 shadow-xl flex items-center gap-1.5 cursor-pointer transition-all hover:scale-105 active:scale-95 group animate-fadeIn"
            title="開啟場相及桌遊相片排版後台"
          >
            <span className="text-sm group-hover:scale-110 transition-transform">📸</span>
            <span className="hidden sm:inline">上傳場相 / 自由排版</span>
            <span className="sm:hidden">上傳場相</span>
          </button>
        )}

        {/* Poster Studio Quick Trigger (Admin Only) */}
        {isAdmin && (
          <button
            onClick={() => setIsStudioOpen(true)}
            className="bg-slate-900 text-white hover:bg-slate-800 text-xs font-black px-3.5 py-2 rounded-full border-2 border-amber-400 shadow-xl flex items-center gap-1.5 cursor-pointer transition-all hover:scale-105 active:scale-95 group animate-fadeIn"
            title="開啟活動海報發佈後台"
          >
            <Sparkles className="w-4 h-4 text-amber-400 group-hover:rotate-12 transition-transform" />
            <span className="hidden sm:inline">發佈活動 / 海報生成</span>
            <span className="sm:hidden">發佈活動</span>
          </button>
        )}

        {/* Instagram Float Bubble */}
        <a
          href="https://www.instagram.com/boardgameschi/"
          target="_blank"
          rel="noopener noreferrer"
          className="w-11 h-11 bg-gradient-to-tr from-yellow-500 via-red-500 to-purple-600 hover:scale-105 active:scale-95 text-white rounded-full flex items-center justify-center shadow-lg transition-all"
          title="追蹤我們的 Instagram"
        >
          <Instagram className="w-5 h-5 text-white" />
        </a>

        {/* WhatsApp Float */}
        <button
          onClick={handleGeneralWhatsApp}
          className="w-13 h-13 bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-white rounded-full flex items-center justify-center shadow-lg shadow-emerald-950/20 cursor-pointer transition-all group"
          title="WhatsApp 聯絡我們"
        >
          <MessageCircle className="w-6 h-6 fill-white text-emerald-500 group-hover:rotate-12 transition-transform duration-300" />
        </button>
      </div>

    </div>
  );
}
