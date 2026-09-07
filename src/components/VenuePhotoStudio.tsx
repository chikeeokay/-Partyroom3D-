import React, { useState, useRef } from 'react';
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
  Eye, 
  CheckCircle2, 
  Layers, 
  Tag, 
  Grid, 
  FileText,
  Maximize2,
  FolderPlus,
  Sliders
} from 'lucide-react';
import { VenuePhoto, VenuePhotoCategory } from '../types';
import { VENUE_PHOTOS as DEFAULT_VENUE_PHOTOS } from '../data';

interface VenuePhotoStudioProps {
  isOpen: boolean;
  onClose: () => void;
  photos: VenuePhoto[];
  onUpdatePhotos: (newPhotos: VenuePhoto[]) => void;
}

export default function VenuePhotoStudio({
  isOpen,
  onClose,
  photos,
  onUpdatePhotos
}: VenuePhotoStudioProps) {
  const [activeTab, setActiveTab] = useState<'upload' | 'manage' | 'layout' | 'export'>('upload');
  
  // Form State
  const [editingPhotoId, setEditingPhotoId] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<VenuePhotoCategory>('main_hall');
  const [description, setDescription] = useState('');
  const [tagInput, setTagInput] = useState('大場, 實木長桌, 500款桌遊');
  const [imageUrl, setImageUrl] = useState('');
  const [previewDataUrl, setPreviewDataUrl] = useState('');
  const [autoPublishOnUpload, setAutoPublishOnUpload] = useState(false);
  const [isFeatured, setIsFeatured] = useState(false);
  
  // Batch upload & Persist state
  const [batchUploadCount, setBatchUploadCount] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [isPersisting, setIsPersisting] = useState(false);
  const [lastPersistedTime, setLastPersistedTime] = useState<string | null>(null);
  const [copiedCode, setCopiedCode] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  
  const singleFileInputRef = useRef<HTMLInputElement>(null);
  const multiFileInputRef = useRef<HTMLInputElement>(null);

  // Delete & Confirmation state
  const [photoToDelete, setPhotoToDelete] = useState<string | null>(null);
  const [showClearAllConfirm, setShowClearAllConfirm] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const showToast = (msg: string) => {
    setSuccessMessage(msg);
    setTimeout(() => setSuccessMessage(null), 3500);
  };

  // Quick Preset Samples for rapid setup
  const PHOTO_PRESETS = [
    {
      title: '大場 ‧ 700呎實木長桌與桌遊牆',
      category: 'main_hall' as VenuePhotoCategory,
      description: '大場採光充足，可容納多達18人包場，配備豪華實木長桌與落地500+款桌遊展示牆。',
      tags: '大場, 實木長桌, 500款桌遊, 寬敞舒適',
      imageUrl: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=1000&auto=format&fit=crop'
    },
    {
      title: '細房 ‧ 獨立電動麻將包廂實景',
      category: 'small_room' as VenuePhotoCategory,
      description: '全自動電動42號/36號麻將機，獨立私密隔音包廂，專屬冷氣沙發，提供最舒適打牌環境。',
      tags: '細房, 電動麻將, 獨立包廂, 隔音私密',
      imageUrl: 'https://images.unsplash.com/photo-1601987177651-8edfe6c20009?q=80&w=1000&auto=format&fit=crop'
    },
    {
      title: '桌遊相片 ‧ 經典策略與熱門派對遊戲',
      category: 'boardgames' as VenuePhotoCategory,
      description: '池記精選各國頂級桌遊，《夏克頓》、《五大部落》、《北灣漁村》一應俱全。',
      tags: '桌遊相片, 策略遊戲, 派對遊戲, 店主親授',
      imageUrl: 'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?q=80&w=1000&auto=format&fit=crop'
    },
    {
      title: '店貓阿池 ‧ 麻將機前監工日常',
      category: 'cat' as VenuePhotoCategory,
      description: '店貓阿池最愛在電動麻將機出牌口旁打盹，陪伴大家度過歡樂打牌時光。',
      tags: '店貓日常, 阿池, 肥橘, 貓店長',
      imageUrl: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=1000&auto=format&fit=crop'
    }
  ];

  const applyPreset = (preset: typeof PHOTO_PRESETS[0]) => {
    setTitle(preset.title);
    setCategory(preset.category);
    setDescription(preset.description);
    setTagInput(preset.tags);
    setImageUrl(preset.imageUrl);
    setPreviewDataUrl(preset.imageUrl);
    showToast(`已套用「${preset.title}」範本！點擊右側【🚀 立即發佈】即可生效`);
  };

  // Core: Directly writes photos into src/data.ts source code & saves files to public/uploads
  const persistToDataTs = async (photosToPersist: VenuePhoto[]): Promise<boolean> => {
    setIsPersisting(true);
    try {
      const res = await fetch('/api/save-photos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ photos: photosToPersist })
      });
      const data = await res.json();
      if (data && data.success) {
        if (data.updatedPhotos && Array.isArray(data.updatedPhotos)) {
          onUpdatePhotos(data.updatedPhotos);
        }
        const nowStr = new Date().toLocaleTimeString('zh-HK');
        setLastPersistedTime(nowStr);
        showToast(`🎉 成功！已 100% 永久寫入專案 src/data.ts 原始碼 (共 ${data.count} 張)！發佈至 chikeechi.com 即全球生效！`);
        return true;
      } else {
        throw new Error(data.error || '後台寫入失敗');
      }
    } catch (err: any) {
      console.error('寫入 src/data.ts 失敗:', err);
      showToast(`⚠️ 已更新畫面，背景寫入提示: ${err.message || '請確認後台運作'}`);
      return false;
    } finally {
      setIsPersisting(false);
    }
  };

  // Handle single photo upload
  const handleSingleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const reader = new FileReader();
    reader.onload = async (event) => {
      const base64 = event.target?.result as string;
      // Immediately set preview so user sees instant feedback with 0 latency
      setPreviewDataUrl(base64);

      // Auto deduce title and category from filename
      const cleanName = file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ');
      let deducedCategory = category;
      let deducedTitle = title;
      let deducedTags = tagInput;

      if (!title) {
        if (/大場|main|hall|table/i.test(cleanName)) {
          deducedTitle = `大場 ‧ ${cleanName}`;
          deducedCategory = 'main_hall';
          deducedTags = '大場, 聚會空間, 實木長桌';
        } else if (/細房|room|mahjong|麻雀|麻將/i.test(cleanName)) {
          deducedTitle = `細房 ‧ ${cleanName}`;
          deducedCategory = 'small_room';
          deducedTags = '細房, 電動麻將, 獨立包廂';
        } else if (/cat|貓|阿池|肥橘/i.test(cleanName)) {
          deducedTitle = `店貓日常 ‧ ${cleanName}`;
          deducedCategory = 'cat';
          deducedTags = '店貓日常, 阿池, 貓店長';
        } else {
          deducedTitle = `池記相片 ‧ ${cleanName}`;
          deducedTags = '池記桌遊, 場地相片';
        }
        setTitle(deducedTitle);
        setCategory(deducedCategory);
        setTagInput(deducedTags);
      }

      // Try saving directly to public/uploads/
      let finalUrl = base64;
      try {
        const uploadRes = await fetch('/api/upload-image', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ base64, prefix: `venue-${deducedCategory}` })
        });
        const uploadData = await uploadRes.json();
        if (uploadData.success && uploadData.url) {
          finalUrl = uploadData.url;
        }
      } catch (err) {
        console.warn('Fallback to base64 image representation', err);
      }

      setImageUrl(finalUrl);
      setIsUploading(false);

      if (autoPublishOnUpload) {
        showToast('⚡ 自動發佈已啟用！正在寫入專案 src/data.ts 原始碼...');
        await executePublish(finalUrl, deducedTitle, deducedCategory, deducedTags);
      } else {
        showToast('📸 照片已成功載入！請點擊【🚀 立即發佈相片】即可寫入原始碼並同步至前台！');
      }
    };
    reader.readAsDataURL(file);
  };

  // Handle multiple batch photo upload & auto layout & persist to src/data.ts
  const handleBatchImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    const newAddedPhotos: VenuePhoto[] = [];

    for (let index = 0; index < files.length; index++) {
      const file = files[index];
      const reader = new FileReader();

      await new Promise<void>((resolve) => {
        reader.onload = async (event) => {
          const base64 = event.target?.result as string;
          const cleanName = file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ');
          
          let detectedCategory: VenuePhotoCategory = 'main_hall';
          let detectedTags = ['池記桌遊', '場地實景'];

          if (/細房|room|mahjong|麻雀|麻將/i.test(cleanName)) {
            detectedCategory = 'small_room';
            detectedTags = ['細房', '電動麻將', '獨立包廂'];
          } else if (/cat|貓|阿池|肥橘/i.test(cleanName)) {
            detectedCategory = 'cat';
            detectedTags = ['店貓日常', '阿池', '寵物友善'];
          } else if (/game|boardgame|桌遊|盒/i.test(cleanName)) {
            detectedCategory = 'boardgames';
            detectedTags = ['桌遊相片', '精選遊戲'];
          }

          let finalUrl = base64;
          try {
            const uploadRes = await fetch('/api/upload-image', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ base64, prefix: `venue-${detectedCategory}` })
            });
            const uploadData = await uploadRes.json();
            if (uploadData.success && uploadData.url) {
              finalUrl = uploadData.url;
            }
          } catch {
            // fallback to base64
          }

          const newPhotoItem: VenuePhoto = {
            id: `photo-${Date.now()}-${index}`,
            title: cleanName.length > 2 ? cleanName : `池記現場相片 #${photos.length + index + 1}`,
            category: detectedCategory,
            imageUrl: finalUrl,
            description: `池記桌遊現場實景拍攝。`,
            tags: detectedTags,
            date: '2025-2026'
          };

          newAddedPhotos.push(newPhotoItem);
          resolve();
        };
        reader.readAsDataURL(file);
      });
    }

    const merged = [...newAddedPhotos, ...photos];
    onUpdatePhotos(merged);
    setIsUploading(false);
    setBatchUploadCount(files.length);
    setActiveTab('manage');

    // Automatically persist all photos into src/data.ts!
    await persistToDataTs(merged);
  };

  // Core publish execution function (can be called manually or automatically)
  const executePublish = async (
    overrideUrl?: string,
    overrideTitle?: string,
    overrideCategory?: VenuePhotoCategory,
    overrideTags?: string
  ) => {
    const finalImg = overrideUrl || imageUrl.trim() || previewDataUrl.trim();
    if (!finalImg) {
      showToast('⚠️ 請先上傳照片或輸入照片網址');
      return;
    }

    const currentTitle = overrideTitle || title.trim() || '池記桌遊現場實拍';
    const currentCategory = overrideCategory || category;
    const currentTagsStr = overrideTags !== undefined ? overrideTags : tagInput;

    const tagsArray = currentTagsStr
      .split(/[,，#]/)
      .map(t => t.trim())
      .filter(t => t.length > 0);

    const newPhoto: VenuePhoto = {
      id: editingPhotoId || `photo-${Date.now()}`,
      title: currentTitle,
      category: currentCategory,
      imageUrl: finalImg,
      description: description.trim() || undefined,
      tags: tagsArray.length > 0 ? tagsArray : ['池記桌遊', '場地相片'],
      featured: isFeatured,
      date: '2026'
    };

    let updatedList: VenuePhoto[];
    if (editingPhotoId) {
      updatedList = photos.map(p => p.id === editingPhotoId ? newPhoto : p);
      showToast('🎉 相片已成功更新！正在寫入 src/data.ts 原始碼...');
    } else {
      updatedList = [newPhoto, ...photos];
      showToast('🎉 新相片已成功建立！正在寫入 src/data.ts 並更新前台...');
    }

    onUpdatePhotos(updatedList);
    resetForm();
    setActiveTab('manage');

    // Persist directly to src/data.ts!
    await persistToDataTs(updatedList);
  };

  // Save or update single photo & write to src/data.ts
  const handleSavePhoto = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    await executePublish();
  };

  const resetForm = () => {
    setEditingPhotoId(null);
    setTitle('');
    setCategory('main_hall');
    setDescription('');
    setTagInput('大場, 實木長桌, 500款桌遊');
    setImageUrl('');
    setPreviewDataUrl('');
    setIsFeatured(false);
  };

  const handleEditClick = (photo: VenuePhoto) => {
    setEditingPhotoId(photo.id);
    setTitle(photo.title);
    setCategory(photo.category);
    setDescription(photo.description || '');
    setTagInput((photo.tags || []).join(', '));
    setImageUrl(photo.imageUrl);
    setPreviewDataUrl(photo.imageUrl);
    setIsFeatured(!!photo.featured);
    setActiveTab('upload');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Immediate delete photo and sync with src/data.ts
  const confirmDeletePhoto = async (id: string) => {
    const updated = photos.filter(p => p.id !== id);
    onUpdatePhotos(updated);
    setPhotoToDelete(null);
    showToast('🗑️ 已成功刪除該張相片！正在更新 src/data.ts...');
    await persistToDataTs(updated);
  };

  // Clear all photos and sync with src/data.ts
  const handleClearAllPhotos = async () => {
    onUpdatePhotos([]);
    setShowClearAllConfirm(false);
    showToast('🗑️ 已清空所有相片！正在更新 src/data.ts...');
    await persistToDataTs([]);
  };

  // Reset to default and sync with src/data.ts
  const handleResetToDefault = async () => {
    onUpdatePhotos(DEFAULT_VENUE_PHOTOS);
    setShowResetConfirm(false);
    showToast('已還原為預設相片清單！正在更新 src/data.ts...');
    await persistToDataTs(DEFAULT_VENUE_PHOTOS);
  };

  // Export Code
  const generatedCode = `export const VENUE_PHOTOS: VenuePhoto[] = ${JSON.stringify(photos, null, 2)};`;

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
    a.download = 'data-venue-photos.ts';
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!isOpen) return null;

  const previewTags = tagInput.split(/[,，#]/).map(t => t.trim()).filter(t => t.length > 0);

  const getCategoryBadge = (cat: VenuePhotoCategory) => {
    switch (cat) {
      case 'main_hall':
        return { label: '大場', bg: 'bg-[#ffdc5c] text-slate-950' };
      case 'small_room':
        return { label: '細房', bg: 'bg-[#ffb076] text-slate-950' };
      case 'boardgames':
        return { label: '桌遊相片', bg: 'bg-[#8be0d4] text-slate-950' };
      case 'cat':
        return { label: '店貓日常', bg: 'bg-[#ffd3e2] text-slate-950' };
      default:
        return { label: '場地設施', bg: 'bg-slate-200 text-slate-900' };
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4">
      <div className="bg-[#faf5ea] w-full max-w-5xl rounded-3xl border-[3px] border-slate-900 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Top Header */}
        <div className="bg-[#ffa01b] border-b-[3px] border-slate-900 p-4 sm:p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-slate-900 text-amber-400 rounded-2xl shadow-sm">
              <ImageIcon className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl">🌱</span>
                <h2 className="text-xl sm:text-2xl font-black text-slate-950">
                  場相及桌遊相片 ‧ 智能排版與上傳後台
                </h2>
                <span className="text-xl">🌱</span>
              </div>
              <p className="text-xs sm:text-sm font-bold text-slate-800">
                專為店主打造：上傳大場、細房、桌遊、店貓照片 ➔ 自動美化排版 ➔ 即時呈現在「場相及桌遊相片」區！
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
            onClick={() => setActiveTab('upload')}
            className={`px-4 py-2.5 rounded-t-xl font-black text-sm transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'upload'
                ? 'bg-[#faf5ea] text-slate-950 border-t-[3px] border-x-[3px] border-slate-900 -mb-[2px]'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/40'
            }`}
          >
            <Upload className="w-4 h-4 text-amber-600" />
            <span>{editingPhotoId ? '✏️ 編輯相片' : '➕ 上傳相片 / 智能排版'}</span>
          </button>

          <button
            onClick={() => setActiveTab('manage')}
            className={`px-4 py-2.5 rounded-t-xl font-black text-sm transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'manage'
                ? 'bg-[#faf5ea] text-slate-950 border-t-[3px] border-x-[3px] border-slate-900 -mb-[2px]'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/40'
            }`}
          >
            <Grid className="w-4 h-4 text-orange-600" />
            <span>🖼️ 管理場相列表 ({photos.length} 張)</span>
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

        {/* Global Persistence Status Bar (src/data.ts Direct Sync) */}
        <div className="bg-amber-100/90 border-b-[2px] border-amber-300 px-4 py-2 flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2 font-black text-slate-900">
            <span className={`w-2.5 h-2.5 rounded-full ${isPersisting ? 'bg-amber-500 animate-ping' : 'bg-emerald-500'} inline-block`} />
            <span>
              寫入狀態：照片將直接寫入專案 <code>src/data.ts</code> 源碼及 <code>public/uploads/</code> 目錄
            </span>
            <span className="bg-emerald-200 text-emerald-950 text-[11px] px-2 py-0.5 rounded-full font-bold border border-emerald-400">
              {lastPersistedTime ? `已同步寫入 (${lastPersistedTime})` : '自動雙向寫入已就緒'}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => persistToDataTs(photos)}
              disabled={isPersisting}
              className="bg-slate-950 hover:bg-slate-800 text-amber-300 px-3 py-1 rounded-lg font-black text-xs flex items-center gap-1.5 transition-transform hover:scale-105 cursor-pointer shadow-sm disabled:opacity-50"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isPersisting ? '寫入中...' : '⚡ 強制寫入 src/data.ts'}</span>
            </button>
          </div>
        </div>

        {/* Success Toast */}
        {successMessage && (
          <div className="bg-emerald-500 text-white text-sm font-black px-4 py-2 text-center flex items-center justify-center gap-2 animate-bounce">
            <CheckCircle2 className="w-4 h-4" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          
          {/* TAB 1: UPLOAD & AUTO-LAYOUT */}
          {activeTab === 'upload' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Left Column: Upload Form */}
              <div className="lg:col-span-7 space-y-5">
                
                {/* 1. Drag & Drop Upload Zone */}
                <div className="bg-white p-4 sm:p-5 rounded-2xl border-[2.5px] border-slate-900 shadow-sm space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <label className="text-sm font-black text-slate-900 flex items-center gap-2">
                      <Upload className="w-4 h-4 text-amber-500" />
                      <span>第一步：選擇或拖曳相片（支援單張或多張批量上傳）</span>
                    </label>
                    {isUploading ? (
                      <span className="text-xs font-bold text-amber-600 flex items-center gap-1 animate-pulse bg-amber-50 px-2 py-0.5 rounded-full border border-amber-300">
                        <Sparkles className="w-3.5 h-3.5" />
                        📸 正在讀取並寫入相片...
                      </span>
                    ) : (previewDataUrl || imageUrl) ? (
                      <span className="text-xs font-black text-emerald-700 flex items-center gap-1 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-300">
                        <Check className="w-3.5 h-3.5" />
                        相片已就緒
                      </span>
                    ) : null}
                  </div>

                  {/* Auto-publish toggle */}
                  <div className="bg-[#faf5ea] p-2.5 rounded-xl border border-amber-300 flex items-center justify-between gap-3">
                    <label className="inline-flex items-center gap-2 text-xs font-black text-slate-800 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={autoPublishOnUpload}
                        onChange={(e) => setAutoPublishOnUpload(e.target.checked)}
                        className="rounded text-amber-500 focus:ring-amber-400 w-4 h-4 cursor-pointer"
                      />
                      <span>⚡ 快速模式：選取相片後「自動一鍵發佈」至首頁（免手動點發佈）</span>
                    </label>
                    {autoPublishOnUpload && (
                      <span className="text-[11px] font-black bg-amber-400 text-slate-950 px-2 py-0.5 rounded-md">
                        已啟用
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {/* Single Upload */}
                    <div 
                      onClick={() => singleFileInputRef.current?.click()}
                      className={`border-2 border-dashed ${
                        (previewDataUrl || imageUrl) 
                          ? 'border-emerald-500 bg-emerald-50/70' 
                          : 'border-amber-400 hover:border-amber-600 bg-amber-50/50 hover:bg-amber-100/50'
                      } p-4 rounded-xl text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-1.5 group`}
                    >
                      <input 
                        type="file" 
                        ref={singleFileInputRef}
                        onChange={handleSingleImageUpload} 
                        accept="image/*" 
                        className="hidden" 
                      />
                      <div className={`w-10 h-10 ${
                        (previewDataUrl || imageUrl) ? 'bg-emerald-200 text-emerald-800' : 'bg-amber-100 group-hover:bg-amber-200 text-amber-700'
                      } rounded-full flex items-center justify-center transition-transform group-hover:scale-110`}>
                        <ImageIcon className="w-5 h-5" />
                      </div>
                      <p className="text-xs font-black text-slate-900">
                        {(previewDataUrl || imageUrl) ? '🔄 點此更換其他相片' : '上傳單張相片'}
                      </p>
                      <p className="text-[11px] font-bold text-slate-500">
                        點擊選擇或直接拖曳圖片至此
                      </p>
                    </div>

                    {/* Batch Upload */}
                    <div 
                      onClick={() => multiFileInputRef.current?.click()}
                      className="border-2 border-dashed border-emerald-400 hover:border-emerald-600 bg-emerald-50/50 hover:bg-emerald-100/50 p-4 rounded-xl text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-1.5 group"
                    >
                      <input 
                        type="file" 
                        ref={multiFileInputRef}
                        onChange={handleBatchImageUpload} 
                        accept="image/*" 
                        multiple
                        className="hidden" 
                      />
                      <div className="w-10 h-10 bg-emerald-100 group-hover:bg-emerald-200 rounded-full flex items-center justify-center text-emerald-700 transition-transform group-hover:scale-110">
                        <FolderPlus className="w-5 h-5" />
                      </div>
                      <p className="text-xs font-black text-slate-900">
                        ⚡ 批量上傳多張相片
                      </p>
                      <p className="text-[11px] font-bold text-emerald-700">
                        多張一鍵自動歸類並永久存檔！
                      </p>
                    </div>
                  </div>

                  {/* Immediate Action Banner when single image is loaded */}
                  {(previewDataUrl || imageUrl) && (
                    <div className="bg-emerald-50 border-2 border-emerald-500 rounded-xl p-3 flex flex-col sm:flex-row items-center justify-between gap-2.5">
                      <div className="flex items-center gap-2.5">
                        <div className="w-10 h-10 rounded-lg overflow-hidden border border-emerald-600 bg-slate-100 shrink-0">
                          <img 
                            src={previewDataUrl || imageUrl} 
                            alt="Thumb" 
                            className="w-full h-full object-cover" 
                          />
                        </div>
                        <div>
                          <p className="text-xs font-black text-emerald-950">
                            相片已就緒：{title || '池記現場相片'}
                          </p>
                          <p className="text-[11px] font-bold text-emerald-700">
                            排版已自動生成，點擊右方按鈕即可立即發佈！
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleSavePhoto()}
                        disabled={isPersisting}
                        className="w-full sm:w-auto px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-amber-300 rounded-lg font-black text-xs flex items-center justify-center gap-1.5 shadow-sm transition-transform hover:scale-105 cursor-pointer disabled:opacity-50"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                        <span>{isPersisting ? '寫入中...' : '🚀 立即發佈'}</span>
                      </button>
                    </div>
                  )}

                  {/* Preset samples */}
                  <div className="pt-2">
                    <span className="text-xs font-black text-slate-700 block mb-1.5">
                      💡 或是點擊下方範例快速測試：
                    </span>
                    <div className="grid grid-cols-2 gap-2">
                      {PHOTO_PRESETS.map((preset, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => applyPreset(preset)}
                          className="text-left px-2.5 py-1.5 bg-slate-100 hover:bg-amber-100 text-slate-800 rounded-lg text-xs font-bold transition-all border border-slate-300 hover:border-amber-400 truncate"
                        >
                          {preset.title}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 2. Photo Info & Category Form */}
                <form onSubmit={handleSavePhoto} className="bg-white p-4 sm:p-5 rounded-2xl border-[2.5px] border-slate-900 shadow-sm space-y-4">
                  <h3 className="text-sm font-black text-slate-900 flex items-center gap-2 border-b pb-2">
                    <FileText className="w-4 h-4 text-amber-500" />
                    <span>第二步：選擇分類與填寫相片文字</span>
                  </h3>

                  {/* Category Selection with signature badges */}
                  <div>
                    <label className="text-xs font-black text-slate-800 block mb-1.5">
                      🏷️ 相片所屬專區分類（自動加上可愛貓咪標籤）*
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {[
                        { id: 'main_hall', label: '🐱 大場', color: 'bg-[#ffdc5c]' },
                        { id: 'small_room', label: '🐱 細房', color: 'bg-[#ffb076]' },
                        { id: 'boardgames', label: '🎲 桌遊相片', color: 'bg-[#8be0d4]' },
                        { id: 'cat', label: '🐾 店貓日常', color: 'bg-[#ffd3e2]' }
                      ].map((cat) => (
                        <button
                          key={cat.id}
                          type="button"
                          onClick={() => setCategory(cat.id as VenuePhotoCategory)}
                          className={`px-3 py-2 rounded-xl text-xs font-black border-2 transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                            category === cat.id
                              ? `${cat.color} text-slate-950 border-slate-950 shadow-sm scale-[1.02]`
                              : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                          }`}
                        >
                          <span>{cat.label}</span>
                          {category === cat.id && <Check className="w-3.5 h-3.5" />}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Title */}
                  <div>
                    <label className="text-xs font-black text-slate-800 block mb-1">
                      📸 相片標題（如：大場 ‧ 700呎實木長桌與500款桌遊牆）*
                    </label>
                    <input 
                      type="text" 
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="例：大場 ‧ 700呎實木長桌與500款桌遊牆"
                      className="w-full px-3.5 py-2.5 rounded-xl border-2 border-slate-300 focus:border-amber-500 focus:outline-none text-sm font-bold text-slate-900"
                      required
                    />
                  </div>

                  {/* Image URL / Input */}
                  <div>
                    <label className="text-xs font-black text-slate-800 block mb-1">
                      🔗 相片網址或 Base64 代碼 (在上傳圖片後會自動填入)
                    </label>
                    <input 
                      type="text" 
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                      placeholder="請在上方上傳圖片或貼上圖片網址"
                      className="w-full px-3.5 py-2 rounded-xl border-2 border-slate-300 focus:border-amber-500 focus:outline-none text-xs font-mono text-slate-700 truncate"
                      required
                    />
                  </div>

                  {/* Description */}
                  <div>
                    <label className="text-xs font-black text-slate-800 block mb-1">
                      📝 相片介紹 / 特色說明 (選填)
                    </label>
                    <textarea 
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      rows={2}
                      placeholder="例：實木超大長桌，支援 10-18 人同場開局！背靠整面 500+ 款桌遊牆..."
                      className="w-full px-3.5 py-2 rounded-xl border-2 border-slate-300 focus:border-amber-500 focus:outline-none text-xs sm:text-sm font-medium text-slate-900 leading-relaxed"
                    />
                  </div>

                  {/* Tags */}
                  <div>
                    <label className="text-xs font-black text-slate-800 block mb-1 flex items-center gap-1">
                      <Tag className="w-3.5 h-3.5 text-blue-500" />
                      <span>相片標籤 Tags (用逗號隔開)</span>
                    </label>
                    <input 
                      type="text" 
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      placeholder="大場, 實木長桌, 500款桌遊, 寬敞舒適"
                      className="w-full px-3.5 py-2 rounded-xl border-2 border-slate-300 focus:border-amber-500 focus:outline-none text-xs sm:text-sm font-bold text-slate-900"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2 flex items-center gap-3">
                    <button
                      type="submit"
                      disabled={isPersisting}
                      className="flex-1 py-3.5 px-6 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-black text-sm sm:text-base flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer disabled:opacity-50"
                    >
                      <Check className="w-5 h-5 text-amber-400" />
                      <span>
                        {isPersisting 
                          ? '正在永久寫入 src/data.ts 原始碼中...' 
                          : (editingPhotoId ? '💾 儲存並寫入 src/data.ts 原始碼' : '🚀 發佈並永久寫入 src/data.ts 原始碼')}
                      </span>
                    </button>
                    {editingPhotoId && (
                      <button
                        type="button"
                        onClick={resetForm}
                        disabled={isPersisting}
                        className="py-3.5 px-4 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-xl font-bold text-sm transition-all cursor-pointer disabled:opacity-50"
                      >
                        取消
                      </button>
                    )}
                  </div>
                  <p className="text-[11px] text-center font-bold text-slate-500">
                    💡 提示：點擊按鈕後照片將直接寫入本專案的 <code>src/data.ts</code> 及靜態資源資料夾，發佈網站至 <code>chikeechi.com</code> 全世界訪客 100% 永久看見！
                  </p>
                </form>

              </div>

              {/* Right Column: Live 1:1 Card Preview */}
              <div className="lg:col-span-5 flex flex-col space-y-3">
                <div className="flex items-center justify-between px-1">
                  <span className="text-xs font-black text-slate-800 flex items-center gap-1.5">
                    <Eye className="w-4 h-4 text-emerald-600" />
                    <span>即時排版效果預覽：</span>
                  </span>
                </div>

                {/* EXACT PHOTO CARD PREVIEW */}
                <div className="bg-white rounded-2xl border-[3px] border-slate-900 shadow-md overflow-hidden flex flex-col justify-between group">
                  <div>
                    {/* Photo Container with Cat Badge */}
                    <div className="relative w-full bg-slate-100 min-h-[200px] flex items-center justify-center overflow-hidden">
                      {(previewDataUrl || imageUrl) ? (
                        <img 
                          src={previewDataUrl || imageUrl} 
                          alt={title || "Preview"} 
                          className="w-full h-56 sm:h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                          onError={(e) => {
                            if (previewDataUrl && e.currentTarget.src !== previewDataUrl) {
                              e.currentTarget.src = previewDataUrl;
                            }
                          }}
                        />
                      ) : (
                        <div className="p-8 text-center text-slate-400 font-bold text-xs flex flex-col items-center gap-2">
                          <ImageIcon className="w-10 h-10 text-slate-300" />
                          <span>請在左側上傳照片</span>
                        </div>
                      )}
                      
                      {/* Signature Cute Cat Tag on Photo */}
                      <div className="absolute bottom-3 left-3">
                        <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border-2 border-slate-900 shadow-sm font-black text-xs ${getCategoryBadge(category).bg}`}>
                          <span>🐱</span>
                          <span className="tracking-wide">{getCategoryBadge(category).label}</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 space-y-2">
                      <h4 className="text-base font-black text-slate-900 leading-snug">
                        {title || '大場 ‧ 700呎實木長桌與500款桌遊牆'}
                      </h4>

                      {description && (
                        <p className="text-xs text-slate-600 font-medium leading-relaxed">
                          {description}
                        </p>
                      )}

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {previewTags.map((tag, idx) => (
                          <span 
                            key={idx}
                            className="text-[11px] font-bold bg-[#faf5ea] border border-slate-300 text-slate-700 px-2 py-0.5 rounded shadow-xs"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Immediate Action Card directly under Live Preview */}
                <div className={`p-4 rounded-2xl border-2 transition-all ${
                  (previewDataUrl || imageUrl) 
                    ? 'bg-emerald-50 border-emerald-500 shadow-md ring-2 ring-emerald-400/30' 
                    : 'bg-amber-50 border-amber-300'
                }`}>
                  <div className="flex items-center gap-2 mb-2">
                    {(previewDataUrl || imageUrl) ? (
                      <>
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 font-black shrink-0" />
                        <span className="text-xs sm:text-sm font-black text-emerald-950">
                          相片排版已就緒！點擊下方按鈕即可發佈：
                        </span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
                        <span className="text-xs font-bold text-amber-950">
                          在左側上傳照片後，點擊下方即可一鍵發佈至前台
                        </span>
                      </>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => handleSavePhoto()}
                    disabled={isPersisting || (!imageUrl && !previewDataUrl)}
                    className="w-full py-3.5 px-4 bg-slate-950 hover:bg-slate-800 text-amber-300 rounded-xl font-black text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    <Sparkles className="w-5 h-5 text-amber-400" />
                    <span>
                      {isPersisting 
                        ? '正在永久寫入 src/data.ts 原始碼中...' 
                        : (editingPhotoId ? '💾 立即儲存修改並寫入' : '🚀 立即發佈這張相片（寫入 src/data.ts）')}
                    </span>
                  </button>
                  <p className="text-[11px] text-center font-bold text-slate-500 mt-2">
                    點擊後將 100% 寫入專案 <code>src/data.ts</code> 並同步到首頁展示區！
                  </p>
                </div>

                <div className="bg-amber-100/80 border border-amber-300 rounded-xl p-3 text-xs font-bold text-amber-950 flex items-start gap-2">
                  <Sparkles className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                  <span>
                    支援分類快速篩選（大場 / 細房 / 桌遊 / 店貓），訪客點擊照片即可全螢幕放大查看高清細節！
                  </span>
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: MANAGE ALL VENUE PHOTOS */}
          {activeTab === 'manage' && (
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-2xl border-[2px] border-slate-900 shadow-sm">
                <div>
                  <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                    <span>🖼️ 目前相片展示列表 ({photos.length} 張)</span>
                    {photos.length === 1 && (
                      <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full border border-emerald-300">
                        只顯示 1 張精選相片
                      </span>
                    )}
                  </h3>
                  <p className="text-xs text-slate-600 font-bold mt-0.5">
                    支援個別刪除、編輯修改，或一鍵清空所有範例相片以僅保留您的實拍相片。
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => { resetForm(); setActiveTab('upload'); }}
                    className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-black rounded-xl flex items-center gap-1.5 transition-all cursor-pointer shadow-sm"
                  >
                    <Plus className="w-4 h-4 text-amber-400" />
                    <span>➕ 上傳/新增相片</span>
                  </button>

                  {/* Clear all photos button */}
                  {photos.length > 0 && (
                    <button
                      onClick={() => setShowClearAllConfirm(true)}
                      className="px-3 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-black rounded-xl flex items-center gap-1.5 transition-all cursor-pointer border border-rose-300"
                      title="一鍵清空所有相片"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>清空全部</span>
                    </button>
                  )}

                  <button
                    onClick={() => setShowResetConfirm(true)}
                    className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl flex items-center gap-1.5 transition-all cursor-pointer border border-slate-300"
                    title="重置回初始預設相片"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>還原預設範本</span>
                  </button>
                </div>
              </div>

              {/* Clear All Confirmation Box */}
              {showClearAllConfirm && (
                <div className="p-4 bg-rose-50 border-2 border-rose-400 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3 animate-fadeIn">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 bg-rose-200 text-rose-800 rounded-xl">
                      <Trash2 className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-black text-rose-950">
                        確定要清空目前全部 {photos.length} 張相片嗎？
                      </h4>
                      <p className="text-xs font-bold text-rose-700">
                        清空後，您可以只上傳 1 張相片，網站前台就會只乾淨展示該 1 張相片。
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleClearAllPhotos}
                      className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-black shadow-sm transition-all cursor-pointer"
                    >
                      確認全部清空
                    </button>
                    <button
                      onClick={() => setShowClearAllConfirm(false)}
                      className="px-3 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-xl text-xs font-bold transition-all cursor-pointer"
                    >
                      取消
                    </button>
                  </div>
                </div>
              )}

              {/* Reset to Default Confirmation Box */}
              {showResetConfirm && (
                <div className="p-4 bg-amber-50 border-2 border-amber-400 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3 animate-fadeIn">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 bg-amber-200 text-amber-800 rounded-xl">
                      <RotateCcw className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-black text-amber-950">
                        確定要還原為預設相片範本嗎？
                      </h4>
                      <p className="text-xs font-bold text-amber-700">
                        這將重新載入初始的 6 張場地示範相片。
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
                      onClick={() => setShowResetConfirm(false)}
                      className="px-3 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-xl text-xs font-bold transition-all cursor-pointer"
                    >
                      取消
                    </button>
                  </div>
                </div>
              )}

              {/* Empty state when 0 photos */}
              {photos.length === 0 && (
                <div className="bg-white p-10 rounded-2xl border-2 border-dashed border-slate-300 text-center flex flex-col items-center justify-center gap-3">
                  <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center text-2xl">
                    📸
                  </div>
                  <h4 className="text-base font-black text-slate-900">
                    目前相片庫為空
                  </h4>
                  <p className="text-xs text-slate-600 font-bold max-w-sm">
                    現在您可以只上傳 1 張相片，前台就會乾淨俐落地只顯示該 1 張相片！
                  </p>
                  <button
                    onClick={() => { resetForm(); setActiveTab('upload'); }}
                    className="mt-2 px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-black rounded-xl flex items-center gap-2 shadow-md transition-all cursor-pointer"
                  >
                    <Plus className="w-4 h-4 text-amber-400" />
                    <span>立即上傳 1 張新相片</span>
                  </button>
                </div>
              )}

              {/* Photo Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {photos.map((photo) => {
                  const badge = getCategoryBadge(photo.category);
                  const isDeleting = photoToDelete === photo.id;

                  return (
                    <div 
                      key={photo.id}
                      className="bg-white rounded-2xl border-[2px] border-slate-900 overflow-hidden flex flex-col justify-between shadow-xs hover:border-amber-500 transition-all group"
                    >
                      <div>
                        <div className="relative h-44 bg-slate-100 overflow-hidden">
                          <img 
                            src={photo.imageUrl} 
                            alt={photo.title} 
                            onError={(e) => {
                              const target = e.currentTarget;
                              if (target.src.includes('/uploads/')) {
                                target.src = target.src.replace('/uploads/', '/');
                                return;
                              }
                              const fallbackUrl = (photo.imageUrl && (photo.imageUrl.includes('1bg') || photo.category === 'boardgames' || photo.imageUrl.includes('boardgames')))
                                ? '/venue-boardgames.jpg'
                                : (photo.imageUrl && (photo.imageUrl.includes('mahjong') || photo.imageUrl.includes('plant') || photo.imageUrl.includes('2')))
                                ? '/venue-mahjong-plant.jpg'
                                : '/venue-cat-table.jpg';
                              if (target.src !== window.location.origin + fallbackUrl) {
                                target.src = fallbackUrl;
                              }
                            }}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute top-2 left-2 flex items-center gap-1">
                            <span className={`text-[11px] font-black px-2 py-0.5 rounded border border-slate-900 ${badge.bg}`}>
                              🐱 {badge.label}
                            </span>
                          </div>
                        </div>

                        <div className="p-3.5 space-y-1.5">
                          <h4 className="text-sm font-black text-slate-900 leading-snug line-clamp-2">
                            {photo.title}
                          </h4>
                          {photo.description && (
                            <p className="text-xs text-slate-600 line-clamp-2 font-medium">
                              {photo.description}
                            </p>
                          )}
                          <div className="flex flex-wrap gap-1 pt-1">
                            {(photo.tags || []).slice(0, 3).map((t, i) => (
                              <span key={i} className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded font-bold">
                                #{t}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Card Action / Delete Confirm State */}
                      <div className="p-3 pt-0 border-t border-slate-100 flex items-center justify-end gap-2 mt-2">
                        {isDeleting ? (
                          <div className="flex items-center gap-1.5 bg-rose-50 p-1 rounded-xl border border-rose-300 w-full justify-between animate-fadeIn">
                            <span className="text-[11px] font-black text-rose-800 pl-1">
                              確定刪除？
                            </span>
                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => confirmDeletePhoto(photo.id)}
                                className="px-2.5 py-1 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-xs font-black transition-colors cursor-pointer"
                              >
                                是，刪除
                              </button>
                              <button
                                onClick={() => setPhotoToDelete(null)}
                                className="px-2 py-1 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg text-xs font-bold transition-colors cursor-pointer"
                              >
                                取消
                              </button>
                            </div>
                          </div>
                        ) : (
                          <>
                            <button
                              onClick={() => handleEditClick(photo)}
                              className="px-2.5 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-900 rounded-lg text-xs font-black flex items-center gap-1 border border-amber-300 cursor-pointer transition-colors"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                              <span>編輯</span>
                            </button>
                            <button
                              onClick={() => setPhotoToDelete(photo.id)}
                              className="px-2.5 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-lg text-xs font-black flex items-center gap-1 border border-rose-200 cursor-pointer transition-colors"
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

          {/* TAB 3: EXPORT CODE & PERSISTENCE */}
          {activeTab === 'export' && (
            <div className="space-y-5 bg-white p-5 rounded-2xl border-[2px] border-slate-900 shadow-sm">
              <div className="bg-emerald-50 border-2 border-emerald-400 p-4 rounded-xl flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-black text-emerald-950">
                    🎉 專案原始碼已自動 100% 永久同步！
                  </h4>
                  <p className="text-xs text-emerald-800 font-bold mt-1 leading-relaxed">
                    您在此上傳及編輯的相片已直接寫入後端伺服器的 <code>src/data.ts</code> 源碼及 <code>public/uploads/</code> 資料夾。當專案發佈至 <code>chikeechi.com</code> 時，系統會直接編譯這份最新的相片檔案，全球訪客無論用任何手機或電腦均可 100% 永久看見您的實景相片！
                  </p>
                  <div className="mt-3 flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => persistToDataTs(photos)}
                      disabled={isPersisting}
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-black flex items-center gap-1.5 transition-all cursor-pointer shadow-sm disabled:opacity-50"
                    >
                      <Sparkles className="w-4 h-4 text-emerald-200" />
                      <span>{isPersisting ? '正在寫入中...' : '⚡ 立即強制重新寫入 src/data.ts'}</span>
                    </button>
                    {lastPersistedTime && (
                      <span className="text-xs font-bold text-emerald-700">
                        最後寫入時間：{lastPersistedTime}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                  <span>💾</span>
                  <span>即時產生的 TypeScript 原始碼備份</span>
                </h3>
                <p className="text-xs text-slate-600 font-bold mt-1">
                  以下為後台寫入 <code className="bg-slate-100 px-1 py-0.5 rounded text-amber-800">src/data.ts</code> 的完整資料結構，您亦可隨時複製或下載備份：
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
                  <span>下載 data-venue-photos.ts 檔案</span>
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Footer info */}
        <div className="bg-[#f4ebd9] border-t-[2px] border-slate-300 p-3 sm:p-4 px-6 flex flex-wrap items-center justify-between gap-3 text-xs font-bold text-slate-600">
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-amber-600" />
            <span>池記桌遊場相排版後台 ‧ 支援大場、細房、桌遊與店貓照片管理</span>
          </div>
          <div className="flex items-center gap-2">
            {activeTab === 'upload' && (previewDataUrl || imageUrl) && (
              <button
                type="button"
                onClick={() => handleSavePhoto()}
                disabled={isPersisting}
                className="px-4 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-amber-300 rounded-lg font-black flex items-center gap-1.5 shadow-sm transition-all cursor-pointer disabled:opacity-50"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>{isPersisting ? '寫入中...' : '🚀 立即發佈相片'}</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="px-4 py-1.5 bg-slate-900 text-white rounded-lg font-black hover:bg-slate-800 transition-colors"
            >
              完成並關閉
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
