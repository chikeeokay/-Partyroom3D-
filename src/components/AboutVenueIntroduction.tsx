import React from 'react';
import { 
  MessageCircle, 
  Sparkles, 
  Users, 
  Gamepad2, 
  PartyPopper, 
  Dices, 
  Building2, 
  Printer, 
  Tv, 
  Target,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';

interface AboutVenueIntroductionProps {
  onOpenWhatsApp?: () => void;
}

export default function AboutVenueIntroduction({ onOpenWhatsApp }: AboutVenueIntroductionProps) {
  const handleWhatsApp = () => {
    if (onOpenWhatsApp) {
      onOpenWhatsApp();
    } else {
      window.open(
        'https://wa.me/85293737819?text=您好！我想向池記桌遊查詢Partyroom包場、活動聚會場地租用或麻雀房，謝謝！',
        '_blank',
        'noopener,noreferrer'
      );
    }
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const header = document.querySelector('header');
      const offset = header ? header.offsetHeight + 10 : 120;
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
    <section 
      id="about-venue" 
      aria-label="池記桌遊多元化休閒聚會空間與場地介紹"
      className="w-full bg-[#ffa01b] pt-2 pb-6 px-2 sm:px-4 md:px-6"
    >
      <div className="w-full max-w-7xl mx-auto">
        
        {/* Main Card Container with Canva style hand-drawn retro border */}
        <div className="bg-[#fffbf0] rounded-3xl sm:rounded-[32px] border-[3.5px] sm:border-[4px] border-slate-950 shadow-[6px_6px_0px_#0f172a] sm:shadow-[8px_8px_0px_#0f172a] p-4 sm:p-6 md:p-8 space-y-6">
          
          {/* ========================================================= */}
          {/* 1. TOP IDENTITY BADGES BAR (User's specific core roles)   */}
          {/* ========================================================= */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5">
            {[
              { label: '🎉 PARTYROOM 派對房間', bg: 'bg-[#ffde59] text-slate-950 border-slate-950' },
              { label: '🏢 活動場地租用', bg: 'bg-[#a3e635] text-slate-950 border-slate-950' },
              { label: '🀄 麻雀房租用（台式細牌）', bg: 'bg-[#fda4af] text-slate-950 border-slate-950' },
              { label: '👥 聚會場地 / Team Building', bg: 'bg-[#7dd3fc] text-slate-950 border-slate-950' },
              { label: '🎲 BOARDGAME 專業桌遊', bg: 'bg-[#fcd34d] text-slate-950 border-slate-950' },
              { label: '🐾 寵物友善空間', bg: 'bg-[#fed7aa] text-slate-950 border-slate-950' },
            ].map((badge, idx) => (
              <span
                key={idx}
                className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-2xl text-xs sm:text-sm font-black border-[2px] shadow-[2px_2px_0px_#0f172a] tracking-wide select-none ${badge.bg}`}
              >
                {badge.label}
              </span>
            ))}
          </div>

          {/* ========================================================= */}
          {/* 2. WELCOME HERO INTRO STATEMENT                           */}
          {/* ========================================================= */}
          <div className="text-center max-w-4xl mx-auto space-y-3 pt-1">
            <div className="inline-flex items-center gap-2 bg-[#f2f8dc] px-4 py-1.5 rounded-full border-[2px] border-slate-950 shadow-[2px_2px_0px_#0f172a]" style={{ borderStyle: 'dashed' }}>
              <span className="text-lg">🦊</span>
              <span className="text-xs sm:text-sm font-black text-slate-950 tracking-wider">
                荔枝角地鐵站 C 出口步行 3 分鐘 ‧ 700 實呎多元休閒聚會空間
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black text-slate-950 tracking-tight leading-snug">
              歡迎來到池記桌遊！
            </h2>
            
            <p className="text-sm sm:text-base md:text-lg text-slate-800 font-bold leading-relaxed px-2">
              我們是一間位於<span className="text-amber-800 underline decoration-amber-400 decoration-2 underline-offset-4">香港荔枝角的高質專業桌上遊戲店及多元化休閒聚會空間</span>。無論你是想尋找一個舒適的 <span className="bg-amber-100 px-1.5 py-0.5 rounded border border-amber-300 text-slate-950 font-black">Partyroom 派對房間</span>，還是熱愛 <span className="bg-amber-100 px-1.5 py-0.5 rounded border border-amber-300 text-slate-950 font-black">Board game</span> 的硬核玩家，這裡都能滿足你。
            </p>
          </div>

          {/* ========================================================= */}
          {/* 3. THREE CORE EXPLANATION CARDS (From user image text)    */}
          {/* ========================================================= */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 pt-2">
            
            {/* Card 1: 海量桌遊與劇本(LARP)體驗 */}
            <div className="bg-[#fff6e6] rounded-2xl sm:rounded-3xl border-[2.5px] sm:border-[3px] border-slate-950 shadow-[4px_4px_0px_#0f172a] p-5 flex flex-col justify-between space-y-4 hover:-translate-y-1 transition-transform">
              <div className="space-y-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-2xl bg-[#ffb703] border-[2px] border-slate-950 flex items-center justify-center text-xl shadow-[2px_2px_0px_#0f172a] shrink-0">
                    🎲
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase text-amber-900 tracking-widest block">Over 600+ Games</span>
                    <h3 className="text-base sm:text-lg font-black text-slate-950 tracking-tight leading-tight">
                      海量桌遊與劇本 (LARP) 體驗
                    </h3>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-800 font-medium leading-relaxed">
                  店內提供超過 <strong className="text-slate-950 font-black bg-amber-200/80 px-1 rounded">600 款正版桌遊</strong>任你選擇，從輕鬆歡樂的派對遊戲，到深度策略的陣營遊戲應有盡有。我們更是絕佳的<strong className="text-slate-950 font-black">劇本 (LARP)、狼人及血染鐘樓</strong>租場首選，為你提供沉浸式的推理體驗。
                </p>
              </div>

              <div className="pt-2 border-t border-amber-200/80 flex flex-wrap gap-1.5">
                <span className="px-2 py-0.5 bg-white text-slate-800 rounded-lg text-[11px] font-bold border border-slate-300">
                  600+ 款桌遊
                </span>
                <span className="px-2 py-0.5 bg-white text-slate-800 rounded-lg text-[11px] font-bold border border-slate-300">
                  血染鐘樓專用燈具
                </span>
                <span className="px-2 py-0.5 bg-white text-slate-800 rounded-lg text-[11px] font-bold border border-slate-300">
                  劇本殺 LARP
                </span>
                <span className="px-2 py-0.5 bg-white text-slate-800 rounded-lg text-[11px] font-bold border border-slate-300">
                  專人新手教學
                </span>
              </div>
            </div>

            {/* Card 2: 多元娛樂與專屬設施 */}
            <div className="bg-[#f0f9ff] rounded-2xl sm:rounded-3xl border-[2.5px] sm:border-[3px] border-slate-950 shadow-[4px_4px_0px_#0f172a] p-5 flex flex-col justify-between space-y-4 hover:-translate-y-1 transition-transform">
              <div className="space-y-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-2xl bg-[#38bdf8] border-[2px] border-slate-950 flex items-center justify-center text-xl shadow-[2px_2px_0px_#0f172a] shrink-0">
                    🀄
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase text-sky-900 tracking-widest block">Entertainment & Facilities</span>
                    <h3 className="text-base sm:text-lg font-black text-slate-950 tracking-tight leading-tight">
                      多元娛樂與專屬設施
                    </h3>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-800 font-medium leading-relaxed">
                  除了桌遊，我們擁有高達 <strong className="text-slate-950 font-black bg-sky-200/80 px-1 rounded">700 實呎</strong>的寬敞舒適空間，並配備豐富的娛樂設施：
                </p>

                <ul className="space-y-1.5 text-xs sm:text-sm text-slate-800 font-semibold pl-1">
                  <li className="flex items-start gap-1.5">
                    <span className="text-sky-600 font-black text-sm">✔</span>
                    <span><strong>3 張電動麻雀枱</strong>（專打台式細牌麻雀，麻雀房包場首選）</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-sky-600 font-black text-sm">✔</span>
                    <span><strong>任天堂 Switch</strong>、<strong>電子飛鏢機</strong>、<strong>專業 Poker set</strong></span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-sky-600 font-black text-sm">✔</span>
                    <span>提供<strong>專業 3D 打印服務</strong>，滿足客製化配件需求</span>
                  </li>
                </ul>
              </div>

              <div className="pt-2 border-t border-sky-200 flex flex-wrap gap-1.5">
                <span className="px-2 py-0.5 bg-white text-slate-800 rounded-lg text-[11px] font-bold border border-slate-300">
                  3部自動麻雀
                </span>
                <span className="px-2 py-0.5 bg-white text-slate-800 rounded-lg text-[11px] font-bold border border-slate-300">
                  台式細牌
                </span>
                <span className="px-2 py-0.5 bg-white text-slate-800 rounded-lg text-[11px] font-bold border border-slate-300">
                  Switch 打機
                </span>
                <span className="px-2 py-0.5 bg-white text-slate-800 rounded-lg text-[11px] font-bold border border-slate-300">
                  電子飛鏢機
                </span>
                <span className="px-2 py-0.5 bg-white text-slate-800 rounded-lg text-[11px] font-bold border border-slate-300">
                  3D打印維修
                </span>
              </div>
            </div>

            {/* Card 3: 適合各類聚會租場 */}
            <div className="bg-[#f0fdf4] rounded-2xl sm:rounded-3xl border-[2.5px] sm:border-[3px] border-slate-950 shadow-[4px_4px_0px_#0f172a] p-5 flex flex-col justify-between space-y-4 hover:-translate-y-1 transition-transform">
              <div className="space-y-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-2xl bg-[#4ade80] border-[2px] border-slate-950 flex items-center justify-center text-xl shadow-[2px_2px_0px_#0f172a] shrink-0">
                    🏢
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase text-emerald-900 tracking-widest block">Flexible Venue Hire</span>
                    <h3 className="text-base sm:text-lg font-black text-slate-950 tracking-tight leading-tight">
                      適合各類聚會租場
                    </h3>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-800 font-medium leading-relaxed">
                  我們的活動場地非常適合<strong className="text-slate-950 font-black">朋友聚會、生日派對，甚至企業 Team Building 活動</strong>。提供彈性的包場及租場方案，讓你和朋友盡情享受私人時光。
                </p>

                <div className="bg-white/80 rounded-xl p-2.5 border border-emerald-300 space-y-1 text-xs text-slate-800">
                  <p className="font-black text-emerald-950 flex items-center gap-1">
                    <span>✨</span> 包場優勢：
                  </p>
                  <p>• <strong>包場不限人數</strong>，愈多人愈抵！</p>
                  <p>• <strong>暢玩不計時任飲</strong>（多款紙包/罐裝飲品免費暢飲）</p>
                  <p>• 支援自攜外賣及生日蛋糕（無切餅費）</p>
                </div>
              </div>

              <div className="pt-2 border-t border-emerald-200 flex flex-wrap gap-1.5">
                <span className="px-2 py-0.5 bg-white text-slate-800 rounded-lg text-[11px] font-bold border border-slate-300">
                  生日派對
                </span>
                <span className="px-2 py-0.5 bg-white text-slate-800 rounded-lg text-[11px] font-bold border border-slate-300">
                  企業 Team Building
                </span>
                <span className="px-2 py-0.5 bg-white text-slate-800 rounded-lg text-[11px] font-bold border border-slate-300">
                  私人包場
                </span>
                <span className="px-2 py-0.5 bg-white text-slate-800 rounded-lg text-[11px] font-bold border border-slate-300">
                  不限人數任飲
                </span>
              </div>
            </div>

          </div>

          {/* ========================================================= */}
          {/* 4. ACTION BAR (WhatsApp CTA + Fast Nav)                   */}
          {/* ========================================================= */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#fceed2] p-3.5 sm:p-4 rounded-2xl border-[2px] border-slate-950">
            <div className="text-center sm:text-left">
              <p className="text-xs sm:text-sm font-black text-slate-950">
                想查詢 Partyroom 包場時段、麻雀房開局或聚會收費？
              </p>
              <p className="text-[11px] sm:text-xs text-slate-700 font-bold">
                平日大場人頭僅 $80（暢玩不計時任飲），歡迎隨時 WhatsApp 聯絡預約！
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => scrollToSection('pricing-board')}
                className="px-3.5 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-950 text-xs sm:text-sm font-black border-[2px] border-slate-950 shadow-[2px_2px_0px_#0f172a] transition-all cursor-pointer"
              >
                查看收費表
              </button>
              <button
                onClick={handleWhatsApp}
                className="px-4 py-2 rounded-xl bg-[#25d366] hover:bg-[#20bd5a] text-white text-xs sm:text-sm font-black border-[2px] border-slate-950 shadow-[2px_2px_0px_#0f172a] flex items-center gap-1.5 transition-all hover:-translate-y-0.5 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 fill-white text-[#25d366]" />
                <span>WhatsApp 93737819</span>
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
