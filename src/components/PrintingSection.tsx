import React, { useState } from 'react';
import { Cpu, Printer, Wrench, ShieldCheck, MessageCircle, ArrowRight, Layers, PenTool, ExternalLink } from 'lucide-react';
import { trackWhatsAppClick } from '../utils/analytics';

export default function PrintingSection() {
  // Service inquiry state
  const [serviceType, setServiceType] = useState<string>('organizer');
  const [details, setDetails] = useState<string>('');
  const [printerModel, setPrinterModel] = useState<string>('');

  const handleInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    trackWhatsAppClick('printing_form', `3D打印維修表單諮詢: ${serviceType}`);
    
    let label = '';
    let extra = '';
    
    if (serviceType === 'organizer') {
      label = '🎲 桌遊收納打印訂製 (Board Game Insert)';
      extra = `想要收納的桌遊名稱：${details || '未填寫（請人工詢問）'}`;
    } else if (serviceType === 'stl') {
      label = '📐 STL/OBJ 模型代打印 (STL Printing)';
      extra = `模型細節/用途/尺寸：${details || '未填寫（請人工詢問）'}`;
    } else if (serviceType === 'repair') {
      label = '🔧 3D 打印機上門/到店維修 (Printer Repair)';
      extra = `打印機型號：${printerModel || '未填寫'}\n故障描述：${details || '未填寫'}`;
    }

    const message = `您好池記！我想諮詢 3D 打印/維修服務：\n\n` +
      `🛠️ 服務項目：${label}\n` +
      `${extra}\n\n` +
      `請問大約收費和製作時效如何？謝謝！🦊`;

    window.open(`https://wa.me/85293737819?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <section id="printing" className="py-16 px-4 md:px-8 bg-white text-slate-800 relative">
      <div className="absolute bottom-5 left-10 w-24 h-24 bg-amber-500/5 rounded-full blur-2xl pointer-events-none" />
      
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Header Title */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-amber-100 border border-amber-200 text-amber-700 text-xs font-black uppercase tracking-wider">
            <span>⚙ 3D Workshop</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">
            3D 打印 ‧ 3D 打印機維修工作室
          </h2>
          <p className="text-slate-600 text-sm md:text-base leading-relaxed">
            我們擁有專業的高精密度 FDM 打印及 Resin 光固化打印設備。
            <br />
            專門提供<span className="font-bold text-amber-600">桌遊收納盒設計打印、各類 STL 代客打印、以及 3D 打印機上門/到店檢修服務</span>。
          </p>
        </div>

        {/* Feature Cards: Printing & Repair specialties */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="bg-[#faf5ea] p-6 rounded-2xl border-2 border-slate-900/10 hover:border-amber-400 transition-all space-y-4">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center border border-amber-500/20">
              <Printer className="w-6 h-6 text-amber-600" />
            </div>
            <h3 className="text-base font-black text-slate-900">桌遊收納訂製打印</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              桌遊配件太多、開局收局花費大半天？我們為熱門桌遊（如 Scout, Moon Adventure, Startups）設計並打印完美契合的 3D 收納盒。卡牌槽相容加厚保護套，各個指示物各得其所！
            </p>
          </div>

          <div className="bg-[#faf5ea] p-6 rounded-2xl border-2 border-slate-900/10 hover:border-amber-400 transition-all space-y-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
              <Layers className="w-6 h-6 text-emerald-600" />
            </div>
            <h3 className="text-base font-black text-slate-900">STL / OBJ 檔案代打印</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              只要您有 STL、OBJ 等模型檔案，不論是 TRPG 戰棋、微縮地形、畢業設計模型、日常實用小配件，我們均可以最實惠的報價、最精細的層高為您完美打印實體！
            </p>
          </div>

          <div className="bg-[#faf5ea] p-6 rounded-2xl border-2 border-slate-900/10 hover:border-amber-400 transition-all space-y-4">
            <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center border border-orange-500/20">
              <Wrench className="w-6 h-6 text-orange-600" />
            </div>
            <h3 className="text-base font-black text-slate-900">3D 打印機專業維修</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              機台堵頭、斷絲、熱端漏料、調平失效、電路燒毀或無法讀卡？池記提供 Anycubic、Creality 等各大品牌 FDM 及光固化機台的「上門/到店檢修服務」，經驗豐富、對症下藥！
            </p>
          </div>

        </div>

        {/* Dynamic Service Inquiry Form */}
        <div className="bg-[#faf5ea] p-6 md:p-8 rounded-[2rem] border-2 border-slate-900/10 shadow-xs">
          <div className="border-b border-slate-200 pb-4">
            <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
              <span>✉</span>
              <span>3D 打印 / 維修快速估價諮詢</span>
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              簡單填寫您的需求，我們將即時在 WhatsApp 為您提供初步的材料選擇、工期與費用報價！
            </p>
          </div>

          <form onSubmit={handleInquiry} className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-6">
            
            <div className="md:col-span-4 space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-600 block">1. 選擇諮詢項目</label>
                <div className="space-y-2">
                  {[
                    { id: 'organizer', label: '🎲 桌遊收納打印訂製' },
                    { id: 'stl', label: '📐 STL/OBJ 檔案代打印' },
                    { id: 'repair', label: '🔧 3D 打印機檢測維修' }
                  ].map(option => (
                    <label 
                      key={option.id}
                      className={`flex items-center gap-2 p-3 bg-white border rounded-xl cursor-pointer text-xs font-bold transition-all ${
                        serviceType === option.id 
                          ? 'border-amber-500 bg-amber-500/5 text-amber-800' 
                          : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <input 
                        type="radio" 
                        name="serviceType" 
                        value={option.id} 
                        checked={serviceType === option.id}
                        onChange={(e) => setServiceType(e.target.value)}
                        className="accent-amber-500"
                      />
                      <span>{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="md:col-span-8 space-y-4 flex flex-col justify-between">
              
              <div className="space-y-4">
                {serviceType === 'repair' && (
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-600 block">2. 您的打印機型號 (Printer Model)</label>
                    <input 
                      type="text" 
                      placeholder="例如：Anycubic Kobra 2 / Creality Ender 3 S1"
                      value={printerModel}
                      onChange={(e) => setPrinterModel(e.target.value)}
                      className="w-full p-3 bg-white border border-slate-200 rounded-xl text-xs font-semibold outline-hidden focus:border-amber-500"
                    />
                  </div>
                )}

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-600 block">
                    {serviceType === 'organizer' 
                      ? '2. 想要收納的桌遊名稱與版本' 
                      : serviceType === 'stl' 
                      ? '2. 想要打印的模型描述 (如：比例大小、FDM/Resin材料要求)' 
                      : '3. 故障詳細描述 (如：無法調平、擠出機堵頭、電路燒毀)'}
                  </label>
                  <textarea 
                    rows={3}
                    placeholder={
                      serviceType === 'organizer' 
                        ? "例如：Scout (中文版) 加上 Moon Adventure，希望能設計一個二合一內盒，支援厚套卡牌"
                        : serviceType === 'stl'
                        ? "例如：在 Thingiverse 下載了城堡的 STL，大小約 10x10x12cm，希望用灰色樹脂打印"
                        : "例如：在打印途中噴頭漏料，且目前無法加熱，開機顯示熱敏電阻異常"
                    }
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                    className="w-full p-3 bg-white border border-slate-200 rounded-xl text-xs font-semibold outline-hidden focus:border-amber-500 resize-none"
                    required
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row justify-between items-center gap-3 pt-4 border-t border-slate-200">
                <span className="text-[10px] text-slate-400 font-bold text-center sm:text-left">
                  * 點擊右側按鈕將打開 WhatsApp 並自動預填上述諮詢內容
                </span>
                <button
                  type="submit"
                  className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white font-black text-xs rounded-xl flex items-center gap-1.5 cursor-pointer shadow-md"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>傳送 WhatsApp 諮詢池記</span>
                </button>
              </div>

            </div>

          </form>
        </div>

      </div>
    </section>
  );
}
