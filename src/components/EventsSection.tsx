import React from 'react';
import { BoardGameEvent } from '../types';
import { BOARD_GAME_EVENTS as DEFAULT_EVENTS } from '../data';
import { MessageCircle, Star, Calendar, Clock, DollarSign, ArrowRight, Sparkles, Plus, Image as ImageIcon } from 'lucide-react';

interface EventsSectionProps {
  events?: BoardGameEvent[];
  onOpenStudio?: () => void;
}

export default function EventsSection({ 
  events = DEFAULT_EVENTS,
  onOpenStudio
}: EventsSectionProps) {
  
  const handleRegisterEvent = (eventTitle: string) => {
    const msg = `您好池記！我想報名參加這個活動：\n\n🎯 活動：${eventTitle}\n\n請幫我預留名額，並告知入數/付款安排，謝謝！🦊`;
    const url = `https://wa.me/85293737819?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
  };

  return (
    <section id="events" className="py-0 px-0 bg-[#ffa01b] text-slate-800 relative">
      <div className="absolute top-1/4 right-5 w-20 h-20 bg-orange-200/10 rounded-full blur-2xl pointer-events-none" />
      
      <div className="w-full flex flex-col gap-2">
        
        {/* Header Title & Studio Action Button */}
        <div className="text-center max-w-2xl mx-auto flex flex-col items-center gap-2 mt-3 px-4">
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

        {/* Events Cards Grid */}
        <div className="flex flex-col gap-4 mt-2 max-w-3xl mx-auto w-full px-0 sm:px-4">
          {events.map((event) => (
            <div 
              key={event.id}
              className="bg-[#faf5ea] rounded-none sm:rounded-[2rem] border-y-[3px] sm:border-[3px] border-slate-900 hover:border-amber-400 hover:shadow-xs transition-all flex flex-col justify-between overflow-hidden"
            >
              <div className="flex flex-col h-full">
                
                {/* Visual Representation Header / Badge */}
                <div className="relative w-full bg-slate-100">
                  <img 
                    src={event.imageUrl} 
                    alt={event.title} 
                    referrerPolicy="no-referrer"
                    className="w-full h-auto object-cover transition-transform duration-500 hover:scale-[1.03]" 
                  />
                  {/* Badge */}
                  {event.badge && (
                    <span className={`absolute top-4 left-4 text-xs font-black px-3 py-1.5 rounded-md tracking-wider shadow-sm ${event.badgeBg || 'bg-amber-400 text-slate-950'}`}>
                      {event.badge}
                    </span>
                  )}
                </div>

                <div className="p-5 md:p-6 flex flex-col flex-1 space-y-4">
                  {/* Slogan */}
                  {event.theme && (
                    <div className="py-1.5 px-4 bg-white border border-slate-200/60 rounded-xl text-xs font-black text-amber-700 w-fit shadow-xs">
                      📢 {event.theme}
                    </div>
                  )}

                  {/* Title & Info */}
                  <div className="space-y-2">
                    <h3 className="text-lg md:text-xl lg:text-2xl font-black text-slate-900 leading-tight">
                      {event.title}
                    </h3>
                    
                    {/* Rating Stars if applicable */}
                    {event.rating && (
                      <div className="flex gap-0.5 text-amber-400 pb-1">
                        {Array.from({ length: event.rating }).map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-amber-400" />
                        ))}
                        <span className="text-xs text-slate-500 font-bold ml-1.5">極力推薦中重策</span>
                      </div>
                    )}

                    {/* Calendar/Clock info lines */}
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-3 text-xs md:text-sm text-slate-600 font-bold bg-white p-3 md:p-4 rounded-xl border border-slate-200 shadow-xs">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 md:w-5 md:h-5 text-amber-500 flex-shrink-0" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4 md:w-5 md:h-5 text-emerald-500 flex-shrink-0" />
                        <span className="text-emerald-700 font-black">{event.price}</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-sm md:text-base text-slate-700 font-medium leading-relaxed pt-1 flex-1">
                    {event.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {event.tags.map((tag, idx) => (
                      <span 
                        key={idx}
                        className="text-xs font-bold bg-white border border-slate-200 text-slate-600 px-2.5 py-1 rounded-md shadow-xs"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Booking CTA */}
              <div className="p-5 md:p-6 pt-0 mt-auto flex flex-col gap-3">
                <span className="text-xs text-slate-500 font-black text-center">
                  *包含紙包飲品任飲 ‧ 專業教學
                </span>
                <button
                  onClick={() => handleRegisterEvent(event.title)}
                  className="w-full justify-center px-6 py-4 bg-slate-900 hover:bg-slate-800 text-white font-black text-base md:text-lg rounded-2xl flex items-center gap-2 hover:gap-3 transition-all cursor-pointer shadow-md hover:shadow-lg"
                >
                  <MessageCircle className="w-5 h-5 fill-white text-slate-900" />
                  <span>立即 WhatsApp 報名預留</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
