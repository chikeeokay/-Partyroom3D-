import React from 'react';
import { MAHJONG_RULES } from '../data';
import { HelpCircle, ChevronRight, MessageCircle, RefreshCw, Smile, ShieldAlert, Award } from 'lucide-react';
import { trackWhatsAppClick } from '../utils/analytics';

export default function MahjongSection() {
  const handleJoinClass = () => {
    trackWhatsAppClick('mahjong_class', '報名台牌教學體驗日');
    const msg = `您好池記！我想報名參加「池記台牌教學體驗日」！\n\n人數：1位 (HK$90)\n特色：即場學港式台牌番數，齊四人開班！\n\n請拉我入預約班，謝謝！🀄🦊`;
    window.open(`https://wa.me/85293737819?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const handleJoinValley = () => {
    trackWhatsAppClick('mahjong_group', '加入台牌口水谷');
    const msg = `您好池記！我聽說了「池記輕鬆打台牌谷」！我想申請入谷！\n我支持「口水輕鬆玩、不發脾氣、包容新手」的群規！請拉我入群，謝謝！🀄🎲`;
    window.open(`https://wa.me/85293737819?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <section id="mahjong" className="py-16 px-4 md:px-8 bg-[#faf5ea] text-slate-800 relative">
      <div className="absolute top-10 left-5 w-24 h-24 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />
      
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Header Section */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">
            池記台牌研究工作室
          </h2>
          <p className="text-slate-600 text-sm md:text-base leading-relaxed">
            我們致力於推廣正宗、輕鬆的港式台灣牌（16張）玩樂體驗！
            <br />
            不論您是零基礎的新手，還是老手，我們都提供最舒適無壓力的學習與開局氛圍。
          </p>
        </div>

        {/* Two Columns: Info Day vs Group recruitment */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          
          {/* Card 1: Experience Day */}
          <div className="bg-white p-6 md:p-8 rounded-[2rem] border-2 border-slate-900/10 shadow-xs flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <span className="text-[10px] font-black text-emerald-700 bg-emerald-50 border border-emerald-100 px-3 py-1 rounded-md uppercase tracking-wider">
                  新手開班 ‧ 唔打錢
                </span>
                <span className="text-lg font-extrabold text-amber-500">HK$90 / 位</span>
              </div>
              <h3 className="text-xl md:text-2xl font-black text-slate-900">
                池記台牌教學體驗日
              </h3>
              <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
                想學 16 張台灣牌但怕身邊朋友沒有耐心教？或者對番數計算感到一頭霧水？
                池記精心策劃了「台牌教學體驗日」，純趣味交流、不涉及真錢，由專業導師現場拆解技巧與港式台灣牌番數對照表，齊 4 人即開班！
              </p>
              
              <ul className="space-y-2.5 pt-2 text-xs font-bold text-slate-700">
                <li className="flex items-center gap-2">
                  <span className="text-emerald-500">✔</span>
                  <span>即場教授數港式台牌番數，新手無障礙</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-emerald-500">✔</span>
                  <span>純交流學習，唔打錢，零壓力的歡樂環境</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-emerald-500">✔</span>
                  <span>上課地點為池記荔枝角場，舒適乾淨</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-emerald-500">✔</span>
                  <span>小編齊人就約實日子，時間自由商議</span>
                </li>
              </ul>
            </div>

            <div className="pt-6 border-t border-slate-100">
              <button
                onClick={handleJoinClass}
                className="w-full py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-black text-xs md:text-sm rounded-xl transition-all shadow-md hover:scale-101 cursor-pointer flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-5 h-5 fill-white" />
                <span>立即報名教學體驗日</span>
              </button>
            </div>
          </div>

          {/* Card 2: Valley Recruitment */}
          <div className="bg-slate-900 text-slate-200 p-6 md:p-8 rounded-[2rem] border-2 border-slate-950 shadow-md flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <span className="text-[10px] font-black text-amber-400 bg-amber-500/10 px-3 py-1 rounded-md uppercase tracking-wider">
                  輕鬆口水谷 ‧ 招募中
                </span>
                <span className="text-xs font-extrabold text-slate-400">最大 $1 番</span>
              </div>
              <h3 className="text-xl md:text-2xl font-black text-white">
                池記 144 隻台式輕鬆打谷招人
              </h3>
              
              {/* Funny Cantonese Slogan block */}
              <div className="p-3.5 bg-slate-800 rounded-xl border border-slate-700/60 text-xs text-amber-300 font-bold italic leading-relaxed">
                💬 「對家老人痴呆數錯番，上家小兒麻痺開牌慢，下家選擇困難症打牌慢... 呢個谷包容你！我地輕鬆打，絕對唔會發你老脾！」
              </div>

              <div className="space-y-2 text-xs">
                <p className="font-bold text-white border-b border-slate-800 pb-1.5">🀄 輕鬆打谷 ‧ 三大鋼鐵谷規：</p>
                <div className="space-y-2 pt-1 text-[11px] text-slate-300">
                  <p className="flex items-start gap-1.5">
                    <span className="text-amber-500">❶</span>
                    <span><strong>包容大於一切</strong>：摸錯撞不用怕（最多企棚），打得慢不計較，上六打九我們溫柔叫您收返埋，詐糊也只需賠每位 $30 / 對手叫棚番數。</span>
                  </p>
                  <p className="flex items-start gap-1.5">
                    <span className="text-amber-500">❷</span>
                    <span><strong>吹水不 Deadair</strong>：我地純粹口水交友，不是死板板地嚴肅做牌，打牌最緊要開心、放鬆！</span>
                  </p>
                  <p className="flex items-start gap-1.5">
                    <span className="text-amber-500">❸</span>
                    <span><strong>禁止任何脾氣</strong>：習慣性發老脾、黑面、冷嘲熱諷者，經舉報即踢！放工後就是要溫馨開局。</span>
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-800">
              <button
                onClick={handleJoinValley}
                className="w-full py-3 bg-amber-500 hover:bg-amber-600 text-slate-900 font-black text-xs md:text-sm rounded-xl transition-all shadow-md hover:scale-101 cursor-pointer flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-5 h-5 fill-slate-900 text-amber-500" />
                <span>立即私信入「台牌輕鬆打谷」</span>
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
