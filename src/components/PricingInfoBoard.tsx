import React from 'react';
import { MessageCircle, MapPin, Navigation, Clock, Phone, ExternalLink } from 'lucide-react';

interface PricingInfoBoardProps {
  onOpenWhatsApp?: () => void;
}

export default function PricingInfoBoard({ onOpenWhatsApp }: PricingInfoBoardProps) {
  const handleWhatsApp = () => {
    if (onOpenWhatsApp) {
      onOpenWhatsApp();
    } else {
      window.open('https://wa.me/85293737819?text=您好！我想向池記桌遊查詢荔枝角場地包場、不計時收費及預約，謝謝！', '_blank');
    }
  };

  const handleOpenGoogleMaps = () => {
    window.open('https://www.google.com/maps/search/?api=1&query=九龍荔枝角永康街29-33號兆威工業大廈', '_blank');
  };

  return (
    <section 
      id="pricing-board"
      aria-label="池記桌遊收費、場地設置與荔枝角場位置"
      className="relative w-full py-2 sm:py-4 md:py-5 bg-[#ffa01b] flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Background soft ambient blurs */}
      <div className="absolute -top-10 left-1/4 w-72 h-72 bg-amber-300/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 right-1/4 w-72 h-72 bg-orange-600/15 rounded-full blur-3xl pointer-events-none" />

      {/* Main Board Container - Matches Canva hand-drawn poster aesthetic */}
      <div className="w-full max-w-7xl px-2 sm:px-4 md:px-6">
        
        {/* Outer White/Cream Board with clean black border */}
        <div className="bg-[#fceed2] rounded-3xl sm:rounded-[32px] border-[3px] sm:border-[4px] border-slate-950 shadow-[6px_6px_0px_#0f172a] sm:shadow-[8px_8px_0px_#0f172a] overflow-hidden transition-all">
          
          {/* ============================================================ */}
          {/* MAIN 3-COLUMN BOARD:                                         */}
          {/* Column 1: 暢玩不計時+任飲 / 收費價目表                        */}
          {/* Column 2: 場地設置 (圖四 設施清單)                           */}
          {/* Column 3: 荔枝角場位置連地圖 (圖二 + 圖三 路線圖)              */}
          {/* ============================================================ */}
          <div className="grid grid-cols-1 lg:grid-cols-3 divide-y-[3px] lg:divide-y-0 lg:divide-x-[3px] divide-slate-950 bg-[#fceed2]">
            
            {/* ---------------------------------------------------------- */}
            {/* COLUMN 1: 暢玩不計時+任飲 / 收費價目表 (左欄)               */}
            {/* ---------------------------------------------------------- */}
            <div className="pt-3 sm:pt-3.5 md:pt-4 px-3.5 sm:px-4.5 md:px-5 pb-3.5 sm:pb-4 flex flex-col justify-between space-y-3 sm:space-y-3.5 text-slate-950">
              
              {/* Top Banner Tag: 暢玩不計時+任飲 包場不限人數 */}
              <div className="relative flex justify-center pt-1 sm:pt-1.5">
                {/* Hand-drawn Outer Dashed Frame & Connected Dot */}
                <div className="absolute -top-0.5 sm:-top-1 w-[92%] sm:w-[86%] max-w-[340px] h-[64px] sm:h-[72px] border-[2px] border-dashed border-slate-950 rounded-[28px] sm:rounded-[32px] pointer-events-none" />
                <div className="absolute top-8 sm:top-9 -left-1 sm:left-1 w-2 h-2 rounded-full bg-slate-950 border border-slate-950" />
                <div className="absolute top-9 sm:top-10 -left-1 sm:left-1 w-4 sm:w-5 border-b-[2px] border-slate-950" />

                {/* Inner Yellow Capsule */}
                <div className="relative z-10 w-[88%] sm:w-[82%] max-w-[320px] py-1 sm:py-2 px-3 bg-[#ffd000] border-[2.5px] border-slate-950 rounded-[22px] sm:rounded-[26px] shadow-[2px_2px_0px_#0f172a] text-center">
                  <h2 className="text-sm sm:text-lg md:text-xl font-bold text-slate-950 tracking-tight leading-tight">
                    暢玩不計時+任飲
                  </h2>
                  <h3 className="text-sm sm:text-lg md:text-xl font-bold text-slate-950 tracking-tight leading-tight">
                    包場不限人數
                  </h3>
                </div>
              </div>

              {/* Sub-header: (開放時間1200-2400) */}
              <div className="text-center">
                <p className="text-xs sm:text-sm md:text-base font-bold text-slate-950 tracking-wider">
                  (開放時間1200-2400)
                </p>
              </div>

              {/* PRICING SECTION 1: 麻雀 / 桌遊 人頭收費 (半日價 / 全日價) */}
              <div className="space-y-1.5">
                {/* Header Row with Brown Pills (Topic Style) */}
                <div className="flex items-center justify-between gap-2">
                  <span className="px-3 py-1 bg-[#bf7e38] text-slate-950 font-bold text-xs sm:text-sm rounded-lg border-[1.5px] border-slate-950 shadow-[1px_1px_0px_#0f172a]">
                    麻雀 / 桌遊
                  </span>
                  
                  <div className="flex items-center gap-2 sm:gap-4">
                    <span className="w-14 sm:w-16 text-center py-1 bg-[#bf7e38] text-slate-950 font-bold text-xs sm:text-sm rounded-lg border-[1.5px] border-slate-950 shadow-[1px_1px_0px_#0f172a]">
                      平日
                    </span>
                    <span className="w-16 sm:w-20 text-center py-1 bg-[#bf7e38] text-slate-950 font-bold text-xs sm:text-sm rounded-lg border-[1.5px] border-slate-950 shadow-[1px_1px_0px_#0f172a]">
                      六日紅日
                    </span>
                  </div>
                </div>

                {/* Price Row 1: 人頭計大場枱 半日價 */}
                <div className="flex items-center justify-between text-slate-950 pt-0.5">
                  <span className="text-xs sm:text-sm md:text-base font-bold tracking-tight">
                    人頭計大場枱 半日價:
                  </span>
                  <div className="flex items-center gap-2 sm:gap-4 text-sm sm:text-lg md:text-xl font-bold">
                    <span className="w-14 sm:w-16 text-center">$80</span>
                    <span className="w-16 sm:w-20 text-center">$100</span>
                  </div>
                </div>

                {/* Price Row 2: (*用房價另議) 全日價 */}
                <div className="flex items-center justify-between text-slate-950">
                  <span className="text-xs sm:text-sm md:text-base font-bold tracking-tight">
                    (*用房價另議) 全日價:
                  </span>
                  <div className="flex items-center gap-2 sm:gap-4 text-sm sm:text-lg md:text-xl font-bold">
                    <span className="w-14 sm:w-16 text-center">$110</span>
                    <span className="w-16 sm:w-20 text-center">$140</span>
                  </div>
                </div>
              </div>

              {/* PRICING SECTION 2: Partyroom (桌遊+poker+麻雀+打機+飛鏢機) */}
              <div className="space-y-1.5 pt-0.5">
                {/* Full Brown Capsule for Partyroom Header (Topic Style) */}
                <div className="w-full py-1 px-2.5 bg-[#bf7e38] text-slate-950 font-bold text-[11px] sm:text-xs md:text-sm rounded-lg border-[1.5px] border-slate-950 shadow-[1px_1px_0px_#0f172a] text-center sm:text-left">
                  Partyroom (桌遊+poker+麻雀+打機+飛鏢機)
                </div>

                {/* Info Row: 同一樣價錢 */}
                <div className="text-slate-950 pt-0.5">
                  <p className="text-xs sm:text-sm md:text-base font-bold tracking-tight leading-snug">
                    人頭計大場同一樣價錢 <span className="text-slate-800 text-xs sm:text-sm font-bold">(玩齊咁多樣都係同價)</span>
                  </p>
                </div>
              </div>

              {/* PRICING SECTION 3: 包場 不限人數 -聚會 狼人殺 血染用場 */}
              <div className="space-y-1.5 pt-0.5">
                {/* Full Brown Capsule for Private Booking Header (Topic Style) */}
                <div className="w-full py-1 px-2.5 bg-[#bf7e38] text-slate-950 font-bold text-[11px] sm:text-xs md:text-sm rounded-lg border-[1.5px] border-slate-950 shadow-[1px_1px_0px_#0f172a] text-center sm:text-left">
                  包場 不限人數 -聚會 狼人殺 血染用場
                </div>

                {/* Price Row: 大場半日價 */}
                <div className="flex items-center justify-between text-slate-950 pt-0.5">
                  <span className="text-xs sm:text-sm md:text-base font-bold pl-1 sm:pl-3 tracking-tight">
                    <span className="underline underline-offset-2">大場</span>半日價:
                  </span>
                  <div className="flex items-center gap-2 sm:gap-4 text-sm sm:text-lg md:text-xl font-bold">
                    <span className="w-14 sm:w-16 text-center">$700</span>
                    <span className="w-16 sm:w-20 text-center">$900</span>
                  </div>
                </div>

                {/* Price Row: 大場全日價 */}
                <div className="flex items-center justify-between text-slate-950">
                  <span className="text-xs sm:text-sm md:text-base font-bold pl-5 sm:pl-9 tracking-tight">
                    全日價:
                  </span>
                  <div className="flex items-center gap-2 sm:gap-4 text-sm sm:text-lg md:text-xl font-bold">
                    <span className="w-14 sm:w-16 text-center">$1000</span>
                    <span className="w-16 sm:w-20 text-center">$1400</span>
                  </div>
                </div>

                {/* Price Row: 細房半日價 */}
                <div className="flex items-center justify-between text-slate-950 pt-1">
                  <span className="text-xs sm:text-sm md:text-base font-bold pl-1 sm:pl-3 tracking-tight">
                    <span className="underline underline-offset-2">細房</span>半日價:
                  </span>
                  <div className="flex items-center gap-2 sm:gap-4 text-sm sm:text-lg md:text-xl font-bold">
                    <span className="w-14 sm:w-16 text-center">$450</span>
                    <span className="w-16 sm:w-20 text-center">$550</span>
                  </div>
                </div>

                {/* Price Row: 細房全日價 */}
                <div className="flex items-center justify-between text-slate-950">
                  <span className="text-xs sm:text-sm md:text-base font-bold pl-5 sm:pl-9 tracking-tight">
                    全日價:
                  </span>
                  <div className="flex items-center gap-2 sm:gap-4 text-sm sm:text-lg md:text-xl font-bold">
                    <span className="w-14 sm:w-16 text-center">$600</span>
                    <span className="w-16 sm:w-20 text-center">$750</span>
                  </div>
                </div>
              </div>

              {/* Image 2 Special Promo Banner: 熟客或朋友介紹或🤣生意淡薄🤣可平!!!!!!!! */}
              <div className="relative w-full py-2 px-2.5 bg-[#d4f4c7] border-[2px] border-dashed border-slate-950 rounded-xl shadow-[2px_2px_0px_#0f172a] text-center mt-1">
                <p className="text-xs sm:text-sm md:text-[15px] font-bold text-slate-950 tracking-tight leading-tight">
                  熟客或朋友介紹或🤣生意淡薄🤣可平!!!!!!!!
                </p>
              </div>

            </div>

            {/* ---------------------------------------------------------- */}
            {/* COLUMN 2: 場地設置 (中欄 - 圖四 設施清單)                   */}
            {/* ---------------------------------------------------------- */}
            <div className="pt-3 sm:pt-3.5 md:pt-4 px-3.5 sm:px-4.5 md:px-5 pb-3.5 sm:pb-4 flex flex-col justify-start space-y-3 sm:space-y-3.5 text-slate-950 bg-[#fceed2]">
              
              {/* Top Banner Tag: 場地設置 (Matches Image 4) */}
              <div className="relative flex justify-center pt-1 sm:pt-1.5">
                {/* Hand-drawn Outer Dashed Frame & Small Connection Points */}
                <div className="absolute -top-0.5 sm:-top-1 w-[84%] sm:w-[78%] max-w-[280px] h-[48px] sm:h-[56px] border-[2px] border-dashed border-slate-950 rounded-[26px] sm:rounded-[30px] pointer-events-none" />
                <div className="absolute top-6 sm:top-7 -left-1 sm:left-1 w-2 h-2 rounded-full bg-slate-950 border border-slate-950" />
                <div className="absolute top-7 sm:top-8 -left-1 sm:left-1 w-3 sm:w-4 border-b-[2px] border-slate-950" />
                <div className="absolute top-6 sm:top-7 -right-1 sm:right-1 w-2 h-2 rounded-full bg-slate-950 border border-slate-950" />
                <div className="absolute top-7 sm:top-8 -right-1 sm:right-1 w-3 sm:w-4 border-b-[2px] border-slate-950" />

                {/* Inner Yellow Capsule: 場地設置 */}
                <div className="relative z-10 w-[78%] sm:w-[72%] max-w-[260px] py-1 sm:py-1.5 px-3 bg-[#ffd000] border-[2.5px] border-slate-950 rounded-[20px] sm:rounded-[24px] shadow-[2px_2px_0px_#0f172a] text-center">
                  <h2 className="text-base sm:text-xl md:text-2xl font-bold text-slate-950 tracking-wider">
                    場 地 設 置
                  </h2>
                </div>
              </div>

              {/* FACILITIES LIST: 13 Items exactly matching Image 4 */}
              <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm md:text-base font-bold text-slate-950 pl-2 sm:pl-4 leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="inline-block w-2 h-2 rounded-full bg-slate-950 mt-1.5 shrink-0" />
                  <span>活動聚會 700實呎任玩</span>
                </li>

                <li className="flex items-start gap-2">
                  <span className="inline-block w-2 h-2 rounded-full bg-slate-950 mt-1.5 shrink-0" />
                  <span>血染 狼人殺套裝及燈</span>
                </li>

                <li className="flex items-start gap-2">
                  <span className="inline-block w-2 h-2 rounded-full bg-slate-950 mt-1.5 shrink-0" />
                  <span>500副以上桌遊任玩</span>
                </li>

                <li className="flex items-start gap-2">
                  <span className="inline-block w-2 h-2 rounded-full bg-slate-950 mt-1.5 shrink-0" />
                  <span>獨廁 +Pantry</span>
                </li>

                <li className="flex items-start gap-2">
                  <span className="inline-block w-2 h-2 rounded-full bg-slate-950 mt-1.5 shrink-0" />
                  <span>兩部大電視</span>
                </li>

                <li className="flex items-start gap-2">
                  <span className="inline-block w-2 h-2 rounded-full bg-slate-950 mt-1.5 shrink-0" />
                  <span>Poker Set</span>
                </li>

                <li className="flex items-start gap-2">
                  <span className="inline-block w-2 h-2 rounded-full bg-slate-950 mt-1.5 shrink-0" />
                  <span>電子飛鏢機 (連APP玩)</span>
                </li>

                <li className="flex items-start gap-2">
                  <span className="inline-block w-2 h-2 rounded-full bg-slate-950 mt-1.5 shrink-0" />
                  <span>Switch</span>
                </li>

                <li className="flex items-start gap-2">
                  <span className="inline-block w-2 h-2 rounded-full bg-slate-950 mt-1.5 shrink-0" />
                  <span>電動36 號台式麻雀</span>
                </li>

                <li className="flex items-start gap-2">
                  <span className="inline-block w-2 h-2 rounded-full bg-slate-950 mt-1.5 shrink-0" />
                  <span>電動36 號越南百搭</span>
                </li>

                <li className="flex items-start gap-2">
                  <span className="inline-block w-2 h-2 rounded-full bg-slate-950 mt-1.5 shrink-0" />
                  <span>出160隻牌</span>
                </li>

                <li className="flex items-start gap-2">
                  <span className="inline-block w-2 h-2 rounded-full bg-slate-950 mt-1.5 shrink-0" />
                  <div>
                    <span>電動42號牌跑馬仔/</span>
                    <br className="hidden sm:inline" />
                    <span className="sm:pl-0">廣東牌/有花/無花</span>
                  </div>
                </li>

                <li className="flex items-start gap-2">
                  <span className="inline-block w-2 h-2 rounded-full bg-slate-950 mt-1.5 shrink-0" />
                  <span>電動日麻</span>
                </li>
              </ul>

              {/* Bottom Tip for Facilities */}
              <div className="pt-2 border-t border-slate-900/30 text-left text-[11px] sm:text-xs font-bold text-slate-700">
                <span>💡 查詢或預約時請註明所需遊戲/麻雀制式</span>
              </div>

            </div>

            {/* ---------------------------------------------------------- */}
            {/* COLUMN 3: 荔枝角場位置連地圖 (右欄 - 圖二 + 圖三)             */}
            {/* ---------------------------------------------------------- */}
            <div className="pt-3 sm:pt-3.5 md:pt-4 px-3.5 sm:px-4.5 md:px-5 pb-3.5 sm:pb-4 flex flex-col justify-start space-y-2 sm:space-y-2.5 text-slate-950 bg-[#fceed2]">
              
              {/* TOP HEADER: 荔枝角場位置 (圖二) + 按下 即時聯絡池記 (圖三頂部) */}
              <div className="space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  
                  {/* 圖二: 荔枝角場位置 Yellow Capsule with Hand-drawn Dotted Arc */}
                  <div className="relative">
                    {/* Dotted Arc Graphic */}
                    <div className="absolute -top-1.5 -left-1.5 w-[calc(100%+14px)] h-[calc(100%+10px)] border-[1.5px] border-dashed border-slate-950 rounded-full pointer-events-none" />
                    <div className="absolute top-2 -left-3.5 w-2 h-2 rounded-full bg-slate-950" />
                    <div className="absolute top-3 -left-3.5 w-3 border-b-[1.5px] border-slate-950" />

                    <div className="relative z-10 px-3 sm:px-3.5 py-1 sm:py-1.5 bg-[#ffd000] text-slate-950 font-bold text-xs sm:text-sm rounded-full border-2 border-slate-950 shadow-[2px_2px_0px_#0f172a] flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-950" />
                      <span>荔枝角場位置</span>
                    </div>
                  </div>

                  {/* 圖三頂部: 按下 即時聯絡池記 + WhatsApp Button */}
                  <button
                    type="button"
                    onClick={handleWhatsApp}
                    className="group px-3 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-xs sm:text-sm rounded-full border-2 border-slate-950 shadow-[2px_2px_0px_#0f172a] active:translate-y-0.5 transition-all flex items-center gap-1.5 cursor-pointer ml-auto"
                    title="點擊直接開啟 WhatsApp 聯絡池記店長"
                  >
                    <MessageCircle className="w-3.5 h-3.5 fill-white text-emerald-500 group-hover:scale-110 transition-transform" />
                    <span>按下 即時聯絡池記</span>
                  </button>

                </div>

                {/* THE MAP (圖三 地圖本體 - 荔枝角MTR C出口 -> 兆威工業大廈) */}
                <div className="relative group overflow-hidden rounded-2xl border-[2.5px] border-slate-950 shadow-[3px_3px_0px_#0f172a] bg-white">
                  <img
                    src="/map-route.png"
                    alt="荔枝角場位置地圖：荔枝角地鐵站 C 出口步行 3 分鐘至兆威工業大廈"
                    className="w-full h-auto object-contain cursor-pointer transition-transform duration-300 group-hover:scale-[1.02]"
                    onClick={handleOpenGoogleMaps}
                    title="點擊放大或開啟 Google 地圖導航"
                  />
                  
                  {/* Subtle hover overlay hint */}
                  <button
                    type="button"
                    onClick={handleOpenGoogleMaps}
                    className="absolute bottom-2 right-2 px-2.5 py-1 bg-slate-950/85 hover:bg-slate-950 text-white text-[11px] font-bold rounded-lg border border-slate-700 flex items-center gap-1 shadow-md transition-colors cursor-pointer"
                  >
                    <Navigation className="w-3 h-3 text-amber-400" />
                    <span>開啟地圖導航</span>
                    <ExternalLink className="w-2.5 h-2.5 opacity-80" />
                  </button>
                </div>
              </div>

              {/* SEARCHABLE SEO TEXT INFORMATION (Google 爬蟲可完整索引的地址與路線) - 減少地圖與地址 spacing，放大地址，縮小行距 */}
              <div className="space-y-1.5 text-left mt-1.5 sm:mt-2">
                <div className="space-y-0.5 leading-snug">
                  <div className="flex items-center gap-1.5 text-sm sm:text-base font-bold text-slate-950">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500 shrink-0" />
                    <span>地址：香港九龍荔枝角永康街 29-33 號兆威工業大廈</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-emerald-800 pl-4">
                    <span>🚇 港鐵荔枝角站 C 出口（兩個街口，步行約 3 分鐘即達）</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs sm:text-sm font-medium text-slate-800 pl-4">
                    <Clock className="w-3.5 h-3.5 text-slate-600 inline shrink-0" />
                    <span>開放時間：12:00 - 24:00 (平日及六日紅日均開放)</span>
                  </div>
                </div>

                {/* BOTTOM QUICK ACTIONS IN COLUMN 3 */}
                <div className="pt-1.5 border-t border-slate-900/25 flex flex-col sm:flex-row gap-2 mt-1">
                  <button
                    type="button"
                    onClick={handleWhatsApp}
                    className="flex-1 px-3 py-1.5 bg-slate-950 hover:bg-slate-800 text-amber-300 font-bold text-xs rounded-xl border border-slate-900 shadow-xs flex items-center justify-center gap-1.5 transition-transform active:scale-95 cursor-pointer"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                    <span>WhatsApp 93737819 預約</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleOpenGoogleMaps}
                    className="px-3 py-1.5 bg-[#ffd000] hover:bg-[#ffdc26] text-slate-950 font-bold text-xs rounded-xl border border-slate-900 shadow-xs flex items-center justify-center gap-1.5 transition-transform active:scale-95 cursor-pointer"
                  >
                    <Navigation className="w-3.5 h-3.5 text-slate-950" />
                    <span>Google 導航</span>
                  </button>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
