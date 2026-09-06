import React, { useState } from 'react';
import { BoardGameEvent } from '../types';
import { BOARD_GAME_EVENTS as DEFAULT_EVENTS } from '../data';
import { MessageCircle, Star, Calendar, Clock, DollarSign, ArrowRight, Sparkles, Plus, Image as ImageIcon, ZoomIn, X } from 'lucide-react';

interface EventsSectionProps {
  events?: BoardGameEvent[];
  onOpenStudio?: () => void;
}

export default function EventsSection({ 
  events = DEFAULT_EVENTS,
  onOpenStudio
}: EventsSectionProps) {
  const [selectedPoster, setSelectedPoster] = useState<BoardGameEvent | null>(null);
  
  const handleRegisterEvent = (eventTitle: string) => {
    const msg = `您好池記！我想報名參加這個活動：\n\n🎯 活動：${eventTitle}\n\n請幫我預留名額，並告知入數/付款安排，謝謝！🦊`;
    const url = `https://wa.me/85293737819?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
  };

  return (
    <section id="events" className="py-6 sm:py-8 bg-[#ffa01b] text-slate-800 relative">
      <div className="absolute top-1/4 right-5 w-20 h-20 bg-orange-200/10 rounded-full blur-2xl pointer-events-none" />
      
      <div className="w-full flex flex-col gap-3">
        
        {/* Header Title & Studio Action Button */}
        <div className="text-center max-w-2xl mx-auto flex flex-col items-center gap-2 px-4">
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900 m-0">
            池記最新桌遊活動
          </h2>

          {/* Quick Trigger Button for Poster Studio */}
          {onOpenStudio && (
            <button
              onClick={onOpenStudio}
              className="mt-1 px-4 py-2 bg-[#f4f8d3] hover:bg-white text-slate-950 text-xs sm:text-sm font-black rounded-xl border-[2.5px] border-slate-900 shadow-sm hover:shadow-md transition-all flex items-center gap-2 cursor-pointer hover:-translate-y-0.5"
              style={{ borderStyle: 'dashed' }}
            >
              <Sparkles className="w-4 h-4 text-amber-600 animate-pulse" />
              <span>📸 上傳海報自動發佈新活動 (Poster Studio)</span>
              <Plus className="w-4 h-4 text-slate-900 ml-0.5" />
            </button>
          )}
        </div>

        {/* Events Cards Grid: 每列兩活動並排 display (2 cards side-by-side per row) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mt-3 max-w-6xl mx-auto w-full px-3 sm:px-6 items-stretch">
          {events.map((event) => (
            <div 
              key={event.id}
              className="bg-[#faf5ea] rounded-2xl sm:rounded-3xl border-[3px] border-slate-900 hover:border-amber-400 hover:shadow-lg transition-all flex flex-col justify-between overflow-hidden h-full"
            >
              <div className="flex flex-col flex-1">
                
                {/* Visual Representation Header / Poster Image (Click to zoom full flyer) */}
                <div 
                  onClick={() => setSelectedPoster(event)}
                  className="relative w-full h-56 sm:h-64 md:h-72 lg:h-80 bg-slate-900/5 cursor-pointer group/img overflow-hidden"
                  title="點擊查看完整海報大圖"
                >
                  <img 
                    src={event.imageUrl} 
                    alt={event.title} 
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover/img:scale-[1.04]" 
                  />

                  {/* Hover hint */}
                  <div className="absolute inset-0 bg-slate-950/25 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                    <span className="bg-slate-900/85 text-white text-xs font-black px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-md backdrop-blur-xs">
                      <ZoomIn className="w-3.5 h-3.5" /> 查看完整海報
                    </span>
                  </div>

                  {/* Badge */}
                  {event.badge && (
                    <span className={`absolute top-3 left-3 text-xs font-black px-2.5 py-1 rounded-md tracking-wider shadow-sm ${event.badgeBg || 'bg-amber-400 text-slate-950'}`}>
                      {event.badge}
                    </span>
                  )}
                </div>

                <div className="p-4 sm:p-5 md:p-6 flex flex-col flex-1 space-y-3 sm:space-y-4">
                  {/* Slogan */}
                  {event.theme && (
                    <div className="py-1 px-3 bg-white border border-slate-200/80 rounded-xl text-xs font-black text-amber-700 w-fit shadow-xs line-clamp-1">
                      📢 {event.theme}
                    </div>
                  )}

                  {/* Title & Info */}
                  <div className="space-y-2">
                    <h3 className="text-base sm:text-lg md:text-xl font-black text-slate-900 leading-snug">
                      {event.title}
                    </h3>
                    
                    {/* Rating Stars if applicable */}
                    {event.rating && (
                      <div className="flex gap-0.5 text-amber-400 pb-0.5">
                        {Array.from({ length: event.rating }).map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-amber-400" />
                        ))}
                        <span className="text-xs text-slate-500 font-bold ml-1.5">極力推薦中重策</span>
                      </div>
                    )}

                    {/* Calendar/Clock info lines */}
                    <div className="flex flex-col gap-1.5 text-xs sm:text-sm text-slate-700 font-bold bg-white p-3 rounded-xl border border-slate-200 shadow-xs">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-amber-500 flex-shrink-0" />
                        <span className="leading-snug">{event.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                        <span className="text-emerald-700 font-black leading-snug">{event.price}</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed flex-1 line-clamp-4">
                    {event.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {event.tags.map((tag, idx) => (
                      <span 
                        key={idx}
                        className="text-[11px] sm:text-xs font-bold bg-white border border-slate-200 text-slate-600 px-2 py-0.5 rounded-md shadow-xs"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Booking CTA */}
              <div className="p-4 sm:p-5 md:p-6 pt-0 mt-auto flex flex-col gap-2.5">
                <span className="text-[11px] sm:text-xs text-slate-600 font-bold text-center">
                  *包含紙包飲品任飲 ‧ 專業教學
                </span>
                <button
                  onClick={() => handleRegisterEvent(event.title)}
                  className="w-full justify-center px-4 py-3 sm:py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-black text-sm sm:text-base rounded-xl sm:rounded-2xl flex items-center gap-2 hover:gap-3 transition-all cursor-pointer shadow-md hover:shadow-lg active:scale-[0.98]"
                >
                  <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 fill-white text-slate-900 flex-shrink-0" />
                  <span>立即 WhatsApp 報名預留</span>
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Full Poster Lightbox Modal */}
      {selectedPoster && (
        <div 
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6"
          onClick={() => setSelectedPoster(null)}
        >
          <div 
            className="relative max-w-2xl w-full max-h-[92vh] bg-[#faf5ea] rounded-2xl sm:rounded-3xl border-[3px] border-slate-900 overflow-hidden flex flex-col shadow-2xl animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header bar */}
            <div className="p-3 sm:p-4 bg-white border-b-2 border-slate-200 flex items-center justify-between">
              <h4 className="font-black text-sm sm:text-base text-slate-900 truncate pr-2">
                {selectedPoster.title}
              </h4>
              <button
                onClick={() => setSelectedPoster(null)}
                className="p-1.5 hover:bg-slate-100 rounded-full text-slate-700 cursor-pointer transition-colors"
                title="關閉"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Full Image */}
            <div className="p-2 sm:p-4 overflow-y-auto flex-1 flex items-center justify-center bg-slate-950/5 min-h-[300px]">
              <img 
                src={selectedPoster.imageUrl} 
                alt={selectedPoster.title} 
                className="max-h-[65vh] w-auto max-w-full object-contain rounded-xl shadow-md"
              />
            </div>

            {/* Footer bar */}
            <div className="p-3 sm:p-4 bg-white border-t-2 border-slate-200 flex items-center justify-between gap-3 flex-wrap sm:flex-nowrap">
              <div className="text-xs sm:text-sm font-bold text-slate-700">
                <span className="text-emerald-700 font-black">{selectedPoster.price}</span> ‧ <span>{selectedPoster.time}</span>
              </div>
              <button
                onClick={() => {
                  handleRegisterEvent(selectedPoster.title);
                  setSelectedPoster(null);
                }}
                className="w-full sm:w-auto px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-black text-xs sm:text-sm rounded-xl flex items-center justify-center gap-1.5 cursor-pointer shadow-sm transition-all"
              >
                <MessageCircle className="w-4 h-4 fill-white text-slate-900" />
                <span>立即 WhatsApp 報名</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
