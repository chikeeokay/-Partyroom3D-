import React, { useState, useRef, useEffect } from 'react';
import { 
  Upload, 
  Sparkles, 
  Plus, 
  Trash2, 
  Edit3, 
  Check, 
  Copy, 
  Download, 
  RotateCcw, 
  X, 
  Image as ImageIcon, 
  Calendar, 
  DollarSign, 
  Tag, 
  FileText, 
  Eye, 
  CheckCircle2, 
  Layers, 
  ArrowRight,
  MessageCircle,
  HelpCircle,
  AlertCircle
} from 'lucide-react';
import { BoardGameEvent } from '../types';
import { BOARD_GAME_EVENTS as DEFAULT_EVENTS } from '../data';

interface PosterUploaderStudioProps {
  isOpen: boolean;
  onClose: () => void;
  events: BoardGameEvent[];
  onUpdateEvents: (newEvents: BoardGameEvent[]) => void;
}

export default function PosterUploaderStudio({
  isOpen,
  onClose,
  events,
  onUpdateEvents
}: PosterUploaderStudioProps) {
  const [activeTab, setActiveTab] = useState<'create' | 'manage' | 'export'>('create');
  
  // Form State for the event being created/edited
  const [editingEventId, setEditingEventId] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [time, setTime] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [theme, setTheme] = useState('');
  const [badge, setBadge] = useState('');
  const [badgeBg, setBadgeBg] = useState('bg-amber-400 text-slate-950');
  const [tagInput, setTagInput] = useState('3D打印, 桌遊收納, 免費福利, 現貨自取');
  const [imageUrl, setImageUrl] = useState('/event-1.png.jpg');
  
  // Upload and OCR states
  const [isProcessingImage, setIsProcessingImage] = useState(false);
  const [ocrStatus, setOcrStatus] = useState<string>('');
  const [copiedCode, setCopiedCode] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Quick preset templates
  const PRESETS = [
    {
      label: '🎁 3D打印收納免費贈送',
      title: '池記桌遊 3D打印收納免費贈送活動',
      time: '不定期舉辦 (需店內自取，不連遊戲)',
      price: '免費贈送 (限自取)',
      description: '池記特別福利！我們自家 3D 打印工作室設計並打印的多款熱門桌遊精美收納盒（如 Scout、Moon Adventure、Startups 等），不定期在活動中免費贈送給桌遊同好！幫您的遊戲配件排得整整齊齊，省去繁瑣設置時間。',
      tags: '3D打印, 桌遊收納, 免費福利, 現貨自取',
      imageUrl: '/event-1.png.jpg',
      theme: '自家 3D 打印工作室設計 ‧ 熱門桌遊專用'
    },
    {
      label: '🎲 星期五桌遊盲盒之夜',
      title: '池記桌遊 桌遊盲盒之夜',
      time: '星期五 19:00 - 24:00 (1900-2400)',
      price: 'HK$80 / 位 (包教學及紙包飲品任飲)',
      description: '每逢星期五晚，池記桌遊為您準備了神祕的「桌遊盲盒之夜」！不知道玩什麼好？由店主親自為您挑選並教學多款有趣桌遊，充滿驚喜與歡樂，適合所有玩家參與。',
      tags: '盲盒桌遊, 紙包飲品任飲, 驚喜不斷, 荔枝角桌遊',
      imageUrl: '/event-2.png.jpg',
      theme: '神秘盲盒開箱 ‧ 店主親自教學'
    },
    {
      label: '🔥 紅日桌遊狂歡日 (11小時暢玩)',
      title: '公眾假期特別場：桌遊狂歡全日通',
      time: '公眾假期 / 紅日 13:00 - 24:00 (1300-2400)',
      price: 'HK$100 / 位 (長達 11 小時暢玩)',
      description: '假期就要從中午一直玩到深夜！長達 11 小時不限時暢玩，特設熱門經典與新派桌遊教學專場，主打中重度策略遊戲及各類歡樂派對遊戲。大場與細房同時開放，還有電動麻雀任你解鎖！',
      tags: '長時暢玩, 紙包飲品任飲, 電動麻雀, 節日狂歡',
      imageUrl: '/event-4.png.jpg',
      theme: '主打《五大部落》、《北灣漁村》、各類Party配套'
    },
    {
      label: '🀄 台灣牌16張新手教學班',
      title: '池記台牌研究室 ‧ 齊四人即開班',
      time: '平日/週末時段可預約 (2小時深度教學 + 實戰)',
      price: 'HK$90 / 位 (包教學、冷氣、紙包飲品任飲)',
      description: '想學刺激好玩的 16 張台灣牌？池記推出純粹趣味交流、番數計算教學班。絕不賭錢，容許新手打錯摸錯，店主耐心逐隻牌解釋戰術與番數，無壓力輕鬆上手！',
      tags: '台灣牌教學, 齊四人開班, 零賭博純娛樂, 新手包容',
      imageUrl: 'https://images.unsplash.com/photo-1595769816263-9b910be24d5f?q=80&w=800&auto=format&fit=crop',
      theme: '最大永遠一蚊番 ‧ 打錯唔緊要'
    }
  ];

  // Apply a preset
  const applyPreset = (preset: typeof PRESETS[0]) => {
    setTitle(preset.title);
    setTime(preset.time);
    setPrice(preset.price);
    setDescription(preset.description);
    setTagInput(preset.tags);
    setImageUrl(preset.imageUrl);
    setTheme(preset.theme || '');
    showToast('已套用範本內容！您可以繼續編輯或直接發佈。');
  };

  const showToast = (msg: string) => {
    setSuccessMessage(msg);
    setTimeout(() => setSuccessMessage(null), 3500);
  };

  // Handle image upload and OCR / Smart Auto-Detection
  const handleImageFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Convert file to object URL / Base64 for instant preview
    const reader = new FileReader();
    reader.onload = async (event) => {
      const base64 = event.target?.result as string;
      setImageUrl(base64);

      // Perform OCR Text Recognition
      setIsProcessingImage(true);
      setOcrStatus('正在分析海報圖片文字與內容...');

      try {
        // Dynamically use Tesseract if available
        const { createWorker } = await import('tesseract.js');
        const worker = await createWorker('chi_tra+eng');
        setOcrStatus('正在辨識繁體中文與活動資訊...');
        const ret = await worker.recognize(base64);
        const text = ret.data.text;
        await worker.terminate();

        setOcrStatus('辨識完成！正在自動填入活動欄位...');
        
        // Smart parse text into fields
        parsePosterText(text, file.name);
        showToast('海報辨識完成！已自動分析並填寫活動資訊');
      } catch (err) {
        console.warn('OCR fallback:', err);
        // Fallback: auto generate a clean title from file name
        const cleanName = file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ');
        if (!title) {
          setTitle(`池記桌遊 ${cleanName}`);
        }
        if (!time) {
          setTime('近期舉辦 (詳情請 WhatsApp 查詢)');
        }
        if (!price) {
          setPrice('HK$80 / 位 (包教學及紙包飲品任飲)');
        }
        showToast('圖片已成功上傳！已為您設定基礎範本。');
      } finally {
        setIsProcessingImage(false);
        setOcrStatus('');
      }
    };
    reader.readAsDataURL(file);
  };

  // Smart text parser for poster OCR results
  const parsePosterText = (rawText: string, fileName: string) => {
    const lines = rawText.split('\n').map(l => l.trim()).filter(l => l.length > 0);
    
    // Extract title (usually first notable line)
    const titleCandidates = lines.filter(l => l.length >= 4 && l.length <= 30 && !l.includes('$') && !l.includes('HKD'));
    const detectedTitle = titleCandidates[0] || `池記桌遊 ${fileName.replace(/\.[^/.]+$/, '')}`;
    setTitle(detectedTitle.startsWith('池記') ? detectedTitle : `池記桌遊 ${detectedTitle}`);

    // Look for price keywords ($ or HKD or 元 or 免費)
    const priceLine = lines.find(l => /[$￥]|HKD|HK\$|免費|位|收費/i.test(l));
    if (priceLine) {
      setPrice(priceLine.length > 40 ? priceLine.substring(0, 40) : priceLine);
    } else {
      setPrice('HK$80 / 位 (包教學及紙包飲品任飲)');
    }

    // Look for date/time keywords (星期, 月, 日, 號, 點, :, 年, 2025, 2026, 1900, 1400)
    const timeLine = lines.find(l => /星期|月|日|號|時|1900|2000|1400|1300|2400|舉辦/i.test(l));
    if (timeLine) {
      setTime(timeLine.length > 50 ? timeLine.substring(0, 50) : timeLine);
    } else {
      setTime('星期五 19:00 - 24:00 (1900-2400)');
    }

    // Build description from remaining text or good summary
    const descLines = lines.filter(l => l !== detectedTitle && l !== priceLine && l !== timeLine && l.length > 3);
    if (descLines.length > 0) {
      setDescription(descLines.slice(0, 5).join(' '));
    } else {
      setDescription(`歡迎參加池記桌遊專屬活動！現場提供專業教學、寬敞舒適場地，並有紙包飲品任飲，適合新手與老手一同同樂！`);
    }

    // Auto generate tags
    const generatedTags = ['池記桌遊', '荔枝角桌遊', '紙包飲品任飲'];
    if (rawText.includes('3D') || rawText.includes('打印') || rawText.includes('收納')) {
      generatedTags.unshift('3D打印', '桌遊收納');
    }
    if (rawText.includes('麻雀') || rawText.includes('台牌')) {
      generatedTags.unshift('台灣牌', '電動麻雀');
    }
    if (rawText.includes('盲盒')) {
      generatedTags.unshift('盲盒桌遊');
    }
    setTagInput(generatedTags.join(', '));
  };

  // Delete & Confirmation state
  const [eventToDelete, setEventToDelete] = useState<string | null>(null);
  const [showClearAllEventsConfirm, setShowClearAllEventsConfirm] = useState(false);
  const [showResetEventsConfirm, setShowResetEventsConfirm] = useState(false);

  // Submit & Save event
  const handleSaveEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      showToast('⚠️ 請填寫活動標題');
      return;
    }

    const tagsArray = tagInput
      .split(/[,，#]/)
      .map(t => t.trim())
      .filter(t => t.length > 0);

    const newEvent: BoardGameEvent = {
      id: editingEventId || `event-${Date.now()}`,
      title: title.trim(),
      time: time.trim() || '近期舉辦 (歡迎查詢)',
      price: price.trim() || '免費或以現場為準',
      description: description.trim() || '歡迎參加池記桌遊活動！',
      imageUrl: imageUrl.trim() || '/event-1.png.jpg',
      theme: theme.trim() || undefined,
      badge: badge.trim() || '',
      badgeBg: badgeBg,
      tags: tagsArray.length > 0 ? tagsArray : ['池記桌遊', '荔枝角']
    };

    let updatedList: BoardGameEvent[];
    if (editingEventId) {
      updatedList = events.map(ev => ev.id === editingEventId ? newEvent : ev);
      showToast('🎉 活動已成功更新！');
    } else {
      // Add new event at the very top of the list!
      updatedList = [newEvent, ...events];
      showToast('🎉 新活動已成功發佈在網站首頁！');
    }

    onUpdateEvents(updatedList);
    resetForm();
    setActiveTab('manage');
  };

  // Reset form
  const resetForm = () => {
    setEditingEventId(null);
    setTitle('');
    setTime('');
    setPrice('');
    setDescription('');
    setTheme('');
    setBadge('');
    setTagInput('3D打印, 桌遊收納, 免費福利, 現貨自取');
    setImageUrl('/event-1.png.jpg');
  };

  // Edit existing event
  const handleEditClick = (event: BoardGameEvent) => {
    setEditingEventId(event.id);
    setTitle(event.title);
    setTime(event.time);
    setPrice(event.price);
    setDescription(event.description);
    setTheme(event.theme || '');
    setBadge(event.badge || '');
    setBadgeBg(event.badgeBg || 'bg-amber-400 text-slate-950');
    setTagInput(event.tags.join(', '));
    setImageUrl(event.imageUrl);
    setActiveTab('create');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Safe Delete event without window.confirm
  const confirmDeleteEvent = (id: string) => {
    const updated = events.filter(e => e.id !== id);
    onUpdateEvents(updated);
    setEventToDelete(null);
    showToast('🗑️ 已成功刪除該活動');
  };

  // Safe Clear all events
  const handleClearAllEvents = () => {
    onUpdateEvents([]);
    setShowClearAllEventsConfirm(false);
    showToast('🗑️ 已清空所有活動');
  };

  // Reset to default
  const handleResetToDefault = () => {
    onUpdateEvents(DEFAULT_EVENTS);
    setShowResetEventsConfirm(false);
    showToast('已還原為預設活動清單！');
  };

  // Generated code string for copying
  const generatedCode = `export const BOARD_GAME_EVENTS: BoardGameEvent[] = ${JSON.stringify(events, null, 2)};`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 3000);
  };

  const downloadJson = () => {
    const blob = new Blob([generatedCode], { type: 'text/typescript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'data-events.ts';
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!isOpen) return null;

  // Parsed tags for live preview
  const previewTags = tagInput.split(/[,，#]/).map(t => t.trim()).filter(t => t.length > 0);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4">
      <div className="bg-[#faf5ea] w-full max-w-5xl rounded-3xl border-[3px] border-slate-900 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header bar */}
        <div className="bg-[#ffa01b] border-b-[3px] border-slate-900 p-4 sm:p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-slate-900 text-amber-400 rounded-2xl shadow-sm">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-950 flex items-center gap-2">
                池記桌遊 ‧ 活動海報自動發佈後台
              </h2>
              <p className="text-xs sm:text-sm font-bold text-slate-800">
                上傳活動海報圖片 ➔ AI 智能辨識 ➔ 即時產生精美活動卡片並發佈上線！
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-black/10 rounded-xl transition-colors cursor-pointer text-slate-900"
            title="關閉"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b-[2px] border-slate-300 bg-[#f4ebd9] px-4 pt-3 gap-2">
          <button
            onClick={() => setActiveTab('create')}
            className={`px-4 py-2.5 rounded-t-xl font-black text-sm transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'create'
                ? 'bg-[#faf5ea] text-slate-950 border-t-[3px] border-x-[3px] border-slate-900 -mb-[2px]'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/40'
            }`}
          >
            <Upload className="w-4 h-4 text-amber-600" />
            <span>{editingEventId ? '✏️ 編輯活動' : '➕ 上傳海報 / 新增活動'}</span>
          </button>

          <button
            onClick={() => setActiveTab('manage')}
            className={`px-4 py-2.5 rounded-t-xl font-black text-sm transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'manage'
                ? 'bg-[#faf5ea] text-slate-950 border-t-[3px] border-x-[3px] border-slate-900 -mb-[2px]'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/40'
            }`}
          >
            <Layers className="w-4 h-4 text-orange-600" />
            <span>📋 管理目前活動 ({events.length} 個)</span>
          </button>

          <button
            onClick={() => setActiveTab('export')}
            className={`px-4 py-2.5 rounded-t-xl font-black text-sm transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'export'
                ? 'bg-[#faf5ea] text-slate-950 border-t-[3px] border-x-[3px] border-slate-900 -mb-[2px]'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/40'
            }`}
          >
            <Download className="w-4 h-4 text-emerald-600" />
            <span>💾 匯出程式碼 / 備份</span>
          </button>
        </div>

        {/* Success Toast */}
        {successMessage && (
          <div className="bg-emerald-500 text-white text-sm font-black px-4 py-2 text-center flex items-center justify-center gap-2 animate-bounce">
            <CheckCircle2 className="w-4 h-4" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* Main Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          
          {/* TAB 1: CREATE / UPLOAD POSTER */}
          {activeTab === 'create' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Left Column: Upload & Form Inputs */}
              <div className="lg:col-span-7 space-y-5">
                
                {/* 1. Poster Image Upload Box */}
                <div className="bg-white p-4 sm:p-5 rounded-2xl border-[2.5px] border-slate-900 shadow-sm space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-black text-slate-900 flex items-center gap-2">
                      <ImageIcon className="w-4 h-4 text-amber-500" />
                      <span>第一步：上傳活動海報圖片（支援拖曳上傳）</span>
                    </label>
                    {isProcessingImage && (
                      <span className="text-xs font-bold text-amber-600 flex items-center gap-1 animate-pulse">
                        <Sparkles className="w-3.5 h-3.5" />
                        AI 智能辨識中...
                      </span>
                    )}
                  </div>

                  <div 
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-amber-400 hover:border-amber-600 bg-amber-50/50 hover:bg-amber-100/50 p-6 rounded-xl text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-2 group"
                  >
                    <input 
                      type="file" 
                      ref={fileInputRef}
                      onChange={handleImageFileChange} 
                      accept="image/*" 
                      className="hidden" 
                    />
                    <div className="w-12 h-12 bg-amber-100 group-hover:bg-amber-200 rounded-full flex items-center justify-center text-amber-700 transition-transform group-hover:scale-110">
                      <Upload className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-sm font-black text-slate-900">
                        點擊此處或將海報圖片拖曳進來
                      </p>
                      <p className="text-xs font-bold text-slate-500 mt-0.5">
                        支援 PNG, JPG, JPEG 等海報照片，系統會自動辨識文字！
                      </p>
                    </div>
                  </div>

                  {ocrStatus && (
                    <div className="text-xs font-bold text-amber-800 bg-amber-100 p-2.5 rounded-lg border border-amber-300">
                      ℹ️ {ocrStatus}
                    </div>
                  )}

                  {/* Quick Preset Buttons */}
                  <div className="pt-2">
                    <span className="text-xs font-black text-slate-700 block mb-1.5">
                      ⚡ 或一鍵套用熱門活動範本快速填寫：
                    </span>
                    <div className="grid grid-cols-2 gap-2">
                      {PRESETS.map((p, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => applyPreset(p)}
                          className="text-left px-2.5 py-1.5 bg-slate-100 hover:bg-amber-100 text-slate-800 rounded-lg text-xs font-bold transition-all border border-slate-300 hover:border-amber-400 truncate"
                        >
                          {p.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 2. Detailed Fields Form */}
                <form onSubmit={handleSaveEvent} className="bg-white p-4 sm:p-5 rounded-2xl border-[2.5px] border-slate-900 shadow-sm space-y-4">
                  <h3 className="text-sm font-black text-slate-900 flex items-center gap-2 border-b pb-2">
                    <FileText className="w-4 h-4 text-amber-500" />
                    <span>第二步：確認與調整活動文字資訊</span>
                  </h3>

                  {/* Title */}
                  <div>
                    <label className="text-xs font-black text-slate-800 block mb-1">
                      🎯 活動標題（如：池記桌遊 3D打印收納免費贈送活動）*
                    </label>
                    <input 
                      type="text" 
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="例：池記桌遊 3D打印收納免費贈送活動"
                      className="w-full px-3.5 py-2.5 rounded-xl border-2 border-slate-300 focus:border-amber-500 focus:outline-none text-sm font-bold text-slate-900"
                      required
                    />
                  </div>

                  {/* Time & Price */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-black text-slate-800 block mb-1 flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-amber-500" />
                        <span>活動時間 / 週期</span>
                      </label>
                      <input 
                        type="text" 
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        placeholder="例：不定期舉辦 (需店內自取，不連遊戲)"
                        className="w-full px-3.5 py-2 rounded-xl border-2 border-slate-300 focus:border-amber-500 focus:outline-none text-xs sm:text-sm font-bold text-slate-900"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-black text-slate-800 block mb-1 flex items-center gap-1">
                        <DollarSign className="w-3.5 h-3.5 text-emerald-500" />
                        <span>費用 / 贈送說明</span>
                      </label>
                      <input 
                        type="text" 
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder="例：免費贈送 (限自取)"
                        className="w-full px-3.5 py-2 rounded-xl border-2 border-slate-300 focus:border-amber-500 focus:outline-none text-xs sm:text-sm font-bold text-slate-900"
                      />
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="text-xs font-black text-slate-800 block mb-1">
                      📝 活動詳細介紹
                    </label>
                    <textarea 
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      rows={3}
                      placeholder="例：池記特別福利！我們自家 3D 打印工作室設計並打印的多款熱門桌遊精美收納盒..."
                      className="w-full px-3.5 py-2 rounded-xl border-2 border-slate-300 focus:border-amber-500 focus:outline-none text-xs sm:text-sm font-medium text-slate-900 leading-relaxed"
                    />
                  </div>

                  {/* Slogan / Highlight */}
                  <div>
                    <label className="text-xs font-black text-slate-800 block mb-1">
                      📢 亮點提示 / 主打特色 (選填)
                    </label>
                    <input 
                      type="text" 
                      value={theme}
                      onChange={(e) => setTheme(e.target.value)}
                      placeholder="例：自家 3D 打印工作室設計 ‧ 不定期福利"
                      className="w-full px-3.5 py-2 rounded-xl border-2 border-slate-300 focus:border-amber-500 focus:outline-none text-xs sm:text-sm font-bold text-slate-900"
                    />
                  </div>

                  {/* Tags */}
                  <div>
                    <label className="text-xs font-black text-slate-800 block mb-1 flex items-center gap-1">
                      <Tag className="w-3.5 h-3.5 text-blue-500" />
                      <span>活動標籤 Tags (用逗號隔開)</span>
                    </label>
                    <input 
                      type="text" 
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      placeholder="3D打印, 桌遊收納, 免費福利, 現貨自取"
                      className="w-full px-3.5 py-2 rounded-xl border-2 border-slate-300 focus:border-amber-500 focus:outline-none text-xs sm:text-sm font-bold text-slate-900"
                    />
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-2 flex items-center gap-3">
                    <button
                      type="submit"
                      className="flex-1 py-3.5 px-6 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-black text-sm sm:text-base flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer"
                    >
                      <Check className="w-5 h-5 text-amber-400" />
                      <span>{editingEventId ? '儲存並更新活動' : '✨ 立即發佈到網站活動專區'}</span>
                    </button>
                    {editingEventId && (
                      <button
                        type="button"
                        onClick={resetForm}
                        className="py-3.5 px-4 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-xl font-bold text-sm transition-all"
                      >
                        取消編輯
                      </button>
                    )}
                  </div>
                </form>

              </div>

              {/* Right Column: Exact Live Card Preview */}
              <div className="lg:col-span-5 flex flex-col space-y-3">
                <div className="flex items-center justify-between px-1">
                  <span className="text-xs font-black text-slate-800 flex items-center gap-1.5">
                    <Eye className="w-4 h-4 text-emerald-600" />
                    <span>即時預覽效果（與網站呈現完全一致）：</span>
                  </span>
                </div>

                {/* EXACT LIVE CARD PREVIEW CONTAINER */}
                <div className="bg-[#faf5ea] rounded-2xl border-[3px] border-slate-900 shadow-md overflow-hidden flex flex-col justify-between">
                  <div>
                    {/* Visual poster preview */}
                    <div className="relative w-full bg-slate-200 min-h-[160px] flex items-center justify-center overflow-hidden">
                      {imageUrl ? (
                        <img 
                          src={imageUrl} 
                          alt="Poster Preview" 
                          className="w-full h-auto object-cover max-h-[260px]"
                        />
                      ) : (
                        <div className="p-8 text-center text-slate-400 font-bold text-xs flex flex-col items-center gap-2">
                          <ImageIcon className="w-8 h-8" />
                          <span>請在左側上傳海報圖片</span>
                        </div>
                      )}
                      {badge && (
                        <span className={`absolute top-3 left-3 text-xs font-black px-2.5 py-1 rounded-md tracking-wider shadow-sm ${badgeBg}`}>
                          {badge}
                        </span>
                      )}
                    </div>

                    <div className="p-4 sm:p-5 flex flex-col space-y-3">
                      {/* Theme slogan */}
                      {theme && (
                        <div className="py-1 px-3 bg-white border border-slate-200 rounded-lg text-xs font-black text-amber-700 w-fit shadow-xs">
                          📢 {theme}
                        </div>
                      )}

                      {/* Title */}
                      <h3 className="text-base sm:text-lg font-black text-slate-900 leading-snug">
                        {title || '（活動標題將在此處顯示）'}
                      </h3>

                      {/* Calendar & Price Boxes */}
                      <div className="grid grid-cols-1 gap-2 text-xs text-slate-700 font-bold bg-white p-3 rounded-xl border border-slate-200 shadow-xs">
                        <div className="flex items-start gap-2">
                          <Calendar className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                          <span>{time || '不定期舉辦 (需店內自取，不連遊戲)'}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <DollarSign className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                          <span className="text-emerald-700 font-black">{price || '免費贈送 (限自取)'}</span>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
                        {description || '池記特別福利！我們自家 3D 打印工作室設計並打印的多款熱門桌遊精美收納盒，不定期在活動中免費贈送給桌遊同好！'}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {previewTags.map((tag, idx) => (
                          <span 
                            key={idx}
                            className="text-[11px] font-bold bg-white border border-slate-200 text-slate-600 px-2 py-0.5 rounded shadow-xs"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Booking CTA Button preview */}
                  <div className="p-4 pt-0 mt-auto flex flex-col gap-2">
                    <span className="text-[11px] text-slate-500 font-black text-center">
                      *包含紙包飲品任飲 ‧ 專業教學
                    </span>
                    <div className="w-full py-3 bg-slate-900 text-white font-black text-sm rounded-xl flex items-center justify-center gap-2 shadow-sm opacity-90">
                      <MessageCircle className="w-4 h-4 fill-white text-slate-900" />
                      <span>立即 WhatsApp 報名預留</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>

                <div className="bg-amber-100/70 border border-amber-300 rounded-xl p-3 text-xs font-bold text-amber-900 flex items-start gap-2">
                  <Sparkles className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                  <span>
                    按下「立即發佈」後，網站首頁的活動區塊會立刻更新為您剛剛新增的卡片！
                  </span>
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: MANAGE CURRENT EVENTS */}
          {activeTab === 'manage' && (
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-2xl border-[2px] border-slate-900">
                <div>
                  <h3 className="text-base font-black text-slate-900">
                    目前網站上公開的活動 ({events.length} 個)
                  </h3>
                  <p className="text-xs text-slate-600 font-bold">
                    您可以隨時編輯內容、調整順序、刪除過期活動，或新增更多海報活動。
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => { resetForm(); setActiveTab('create'); }}
                    className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-black rounded-xl flex items-center gap-1.5 transition-all cursor-pointer shadow-sm"
                  >
                    <Plus className="w-4 h-4 text-amber-400" />
                    <span>➕ 新增活動</span>
                  </button>

                  {events.length > 0 && (
                    <button
                      onClick={() => setShowClearAllEventsConfirm(true)}
                      className="px-3 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-black rounded-xl flex items-center gap-1.5 transition-all cursor-pointer border border-rose-300"
                      title="清空所有活動"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>清空全部</span>
                    </button>
                  )}

                  <button
                    onClick={() => setShowResetEventsConfirm(true)}
                    className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl flex items-center gap-1.5 transition-all cursor-pointer border border-slate-300"
                    title="重置回初始預設活動"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>還原預設範本</span>
                  </button>
                </div>
              </div>

              {/* Clear All Confirmation Box */}
              {showClearAllEventsConfirm && (
                <div className="p-4 bg-rose-50 border-2 border-rose-400 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3 animate-fadeIn">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 bg-rose-200 text-rose-800 rounded-xl">
                      <Trash2 className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-black text-rose-950">
                        確定要清空目前全部 {events.length} 個活動嗎？
                      </h4>
                      <p className="text-xs font-bold text-rose-700">
                        清空後，您可以只發佈您專屬的活動。
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleClearAllEvents}
                      className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-black shadow-sm transition-all cursor-pointer"
                    >
                      確認全部清空
                    </button>
                    <button
                      onClick={() => setShowClearAllEventsConfirm(false)}
                      className="px-3 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-xl text-xs font-bold transition-all cursor-pointer"
                    >
                      取消
                    </button>
                  </div>
                </div>
              )}

              {/* Reset Confirmation Box */}
              {showResetEventsConfirm && (
                <div className="p-4 bg-amber-50 border-2 border-amber-400 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3 animate-fadeIn">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 bg-amber-200 text-amber-800 rounded-xl">
                      <RotateCcw className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-black text-amber-950">
                        確定要還原為預設活動範本嗎？
                      </h4>
                      <p className="text-xs font-bold text-amber-700">
                        這將重新載入初始的 4 個活動海報。
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleResetToDefault}
                      className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-black shadow-sm transition-all cursor-pointer"
                    >
                      確認還原
                    </button>
                    <button
                      onClick={() => setShowResetEventsConfirm(false)}
                      className="px-3 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-xl text-xs font-bold transition-all cursor-pointer"
                    >
                      取消
                    </button>
                  </div>
                </div>
              )}

              {/* Empty state when 0 events */}
              {events.length === 0 && (
                <div className="bg-white p-10 rounded-2xl border-2 border-dashed border-slate-300 text-center flex flex-col items-center justify-center gap-3">
                  <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center text-2xl">
                    📅
                  </div>
                  <h4 className="text-base font-black text-slate-900">
                    目前活動清單為空
                  </h4>
                  <p className="text-xs text-slate-600 font-bold max-w-sm">
                    您可以點擊「新增活動」或「海報 OCR 智能解析」發佈最新活動！
                  </p>
                  <button
                    onClick={() => { resetForm(); setActiveTab('create'); }}
                    className="mt-2 px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-black rounded-xl flex items-center gap-2 shadow-md transition-all cursor-pointer"
                  >
                    <Plus className="w-4 h-4 text-amber-400" />
                    <span>立即發佈新活動</span>
                  </button>
                </div>
              )}

              {/* Events list */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {events.map((ev, index) => {
                  const isDeleting = eventToDelete === ev.id;
                  return (
                    <div 
                      key={ev.id}
                      className="bg-white rounded-2xl border-[2px] border-slate-900 p-4 flex flex-col justify-between shadow-xs hover:border-amber-500 transition-all"
                    >
                      <div className="flex gap-3">
                        <img 
                          src={ev.imageUrl} 
                          alt={ev.title} 
                          className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-xl border border-slate-200 flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1 text-[11px] font-black text-amber-700">
                            <span>順序 #{index + 1}</span>
                            {ev.theme && <span className="truncate">‧ {ev.theme}</span>}
                          </div>
                          <h4 className="text-sm font-black text-slate-900 truncate mt-0.5">
                            {ev.title}
                          </h4>
                          <p className="text-xs text-slate-600 font-bold truncate mt-0.5">
                            🕒 {ev.time}
                          </p>
                          <p className="text-xs text-emerald-700 font-black truncate mt-0.5">
                            💰 {ev.price}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-end gap-2 pt-3 mt-3 border-t border-slate-100">
                        {isDeleting ? (
                          <div className="flex items-center gap-1.5 bg-rose-50 p-1 rounded-xl border border-rose-300 w-full justify-between animate-fadeIn">
                            <span className="text-[11px] font-black text-rose-800 pl-1">
                              確定刪除？
                            </span>
                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => confirmDeleteEvent(ev.id)}
                                className="px-2.5 py-1 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-xs font-black transition-colors cursor-pointer"
                              >
                                是，刪除
                              </button>
                              <button
                                onClick={() => setEventToDelete(null)}
                                className="px-2 py-1 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg text-xs font-bold transition-colors cursor-pointer"
                              >
                                取消
                              </button>
                            </div>
                          </div>
                        ) : (
                          <>
                            <button
                              onClick={() => handleEditClick(ev)}
                              className="px-3 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-900 rounded-lg text-xs font-black flex items-center gap-1 transition-colors cursor-pointer border border-amber-300"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                              <span>編輯修改</span>
                            </button>
                            <button
                              onClick={() => setEventToDelete(ev.id)}
                              className="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-lg text-xs font-black flex items-center gap-1 transition-colors cursor-pointer border border-rose-200"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              <span>刪除</span>
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 3: EXPORT CODE / BACKUP */}
          {activeTab === 'export' && (
            <div className="space-y-4 bg-white p-5 rounded-2xl border-[2px] border-slate-900 shadow-sm">
              <div>
                <h3 className="text-base font-black text-slate-900">
                  💾 匯出活動程式碼與永久備份
                </h3>
                <p className="text-xs text-slate-600 font-bold mt-1">
                  您的活動已即時保存在瀏覽器中。如果您希望永久寫入專案的 <code className="bg-slate-100 px-1 py-0.5 rounded text-amber-800">src/data.ts</code> 檔案，您可以複製下方的 TypeScript 程式碼：
                </p>
              </div>

              <div className="relative">
                <textarea
                  readOnly
                  value={generatedCode}
                  rows={10}
                  className="w-full font-mono text-xs p-4 bg-slate-900 text-emerald-400 rounded-xl border border-slate-800 focus:outline-none"
                />
                <button
                  onClick={copyToClipboard}
                  className="absolute top-3 right-3 px-3 py-1.5 bg-white hover:bg-slate-100 text-slate-900 text-xs font-black rounded-lg flex items-center gap-1 shadow transition-all cursor-pointer"
                >
                  {copiedCode ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>已複製到剪貼簿！</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-slate-700" />
                      <span>一鍵複製程式碼</span>
                    </>
                  )}
                </button>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={downloadJson}
                  className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-black flex items-center gap-2 cursor-pointer shadow-sm"
                >
                  <Download className="w-4 h-4 text-amber-400" />
                  <span>下載 data-events.ts 檔案</span>
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Footer info */}
        <div className="bg-[#f4ebd9] border-t-[2px] border-slate-300 p-3 sm:p-4 px-6 flex flex-wrap items-center justify-between text-xs font-bold text-slate-600">
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-amber-600" />
            <span>池記桌遊宣傳海報生成後台 ‧ 支援圖片拖曳、AI OCR 文字辨識與即時上架</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-900 text-white rounded-lg font-black hover:bg-slate-800 transition-colors"
          >
            完成並關閉
          </button>
        </div>

      </div>
    </div>
  );
}
