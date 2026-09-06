import React, { useState } from 'react';
import { 
  Sparkles, 
  Plus, 
  Eye, 
  Maximize2, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  MessageCircle, 
  Tag, 
  Image as ImageIcon,
  Layers,
  Sprout
} from 'lucide-react';
import { VenuePhoto, VenuePhotoCategory } from '../types';
import { VENUE_PHOTOS as DEFAULT_VENUE_PHOTOS } from '../data';
import VenueShowcaseBoard from './VenueShowcaseBoard';

interface VenueSectionProps {
  photos?: VenuePhoto[];
  onOpenPhotoStudio?: () => void;
}

export default function VenueSection({ 
  photos = DEFAULT_VENUE_PHOTOS,
  onOpenPhotoStudio 
}: VenueSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);

  // Filter photos by category
  const filteredPhotos = selectedCategory === 'all' 
    ? photos 
    : photos.filter(p => p.category === selectedCategory);

  const getCategoryBadge = (cat: VenuePhotoCategory) => {
    switch (cat) {
      case 'main_hall':
        return { label: '大場', bg: 'bg-[#ffdc5c] text-slate-950 border-slate-950' };
      case 'small_room':
        return { label: '細房', bg: 'bg-[#ffb076] text-slate-950 border-slate-950' };
      case 'boardgames':
        return { label: '桌遊相片', bg: 'bg-[#8be0d4] text-slate-950 border-slate-950' };
      case 'cat':
        return { label: '店貓日常', bg: 'bg-[#ffd3e2] text-slate-950 border-slate-950' };
      default:
        return { label: '場地設施', bg: 'bg-slate-200 text-slate-900 border-slate-900' };
    }
  };

  const handleOpenLightbox = (index: number) => {
    setActiveLightboxIndex(index);
  };

  const handleCloseLightbox = () => {
    setActiveLightboxIndex(null);
  };

  const handleNextPhoto = () => {
    if (activeLightboxIndex !== null) {
      setActiveLightboxIndex((activeLightboxIndex + 1) % filteredPhotos.length);
    }
  };

  const handlePrevPhoto = () => {
    if (activeLightboxIndex !== null) {
      setActiveLightboxIndex((activeLightboxIndex - 1 + filteredPhotos.length) % filteredPhotos.length);
    }
  };

  const currentLightboxPhoto: VenuePhoto | null = activeLightboxIndex !== null ? filteredPhotos[activeLightboxIndex] : null;

  return (
    <section id="venue" className="pt-0 pb-12 bg-[#ffa01b] text-slate-800 relative">
      
      {/* 1. TOP VENUE SHOWCASE BOARD (SEO-friendly text header + Clean venue photo collage, without extra frame or duplicate buttons) */}
      <VenueShowcaseBoard 
        onOpenWhatsApp={() => {
          window.open(
            'https://wa.me/85293737819?text=您好！我想向池記桌遊查詢場地（大場/細房包場）、預約睇場，謝謝！',
            '_blank',
            'noopener,noreferrer'
          );
        }}
      />

      {/* 2. DEDICATED SECTION: 「場相及桌遊相片」 (MATCHING PHOTO 2 TITLE EXACTLY) */}
      <div className="max-w-6xl mx-auto px-3 sm:px-6 pt-6 pb-2">
        
        {/* Cute Dashed Pill Header from Photo 2 */}
        <div className="flex flex-col items-center justify-center gap-3 text-center">
          <div className="relative inline-flex items-center justify-center">
            
            {/* Left Sprout Leaf */}
            <div className="absolute -left-6 sm:-left-8 top-1/2 -translate-y-1/2 text-2xl sm:text-3xl rotate-[-25deg] select-none">
              🌱
            </div>

            {/* Signature Pill Header */}
            <div 
              className="bg-[#fefce8] px-6 sm:px-10 py-2.5 sm:py-3.5 rounded-full border-[3.5px] border-slate-900 shadow-md flex items-center gap-3 transition-transform hover:scale-[1.02]"
              style={{ borderStyle: 'dashed' }}
            >
              <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-slate-900 tracking-wider m-0">
                場相及桌遊相片
              </h2>
            </div>

            {/* Right Sprout Leaf */}
            <div className="absolute -right-6 sm:-right-8 top-1/2 -translate-y-1/2 text-2xl sm:text-3xl rotate-[25deg] select-none">
              🌱
            </div>

          </div>

          <p className="text-xs sm:text-sm font-black text-slate-900/90 mt-1 max-w-xl">
            實景拍攝 ‧ 大場 700呎寬敞空間 ‧ 獨立隔音電動麻雀細房 ‧ 500+ 桌遊藏書 ‧ 店貓陪伴
          </p>

          {/* Owner Quick Upload / Layout Studio Button */}
          {onOpenPhotoStudio && (
            <button
              onClick={onOpenPhotoStudio}
              className="mt-1 px-4 py-2 bg-[#f4f8d3] hover:bg-white text-slate-950 text-xs sm:text-sm font-black rounded-xl border-[2.5px] border-slate-900 shadow-sm hover:shadow-md transition-all flex items-center gap-2 cursor-pointer hover:-translate-y-0.5"
              style={{ borderStyle: 'dashed' }}
            >
              <Sparkles className="w-4 h-4 text-amber-600 animate-pulse" />
              <span>📸 上傳新場相 / 自由排版 (Photo Studio)</span>
              <Plus className="w-4 h-4 text-slate-900 ml-0.5" />
            </button>
          )}
        </div>

        {/* Category Filter Tabs with Signature Badges */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 mt-6 mb-6">
          {[
            { id: 'all', label: '全部相片', icon: '✨', count: photos.length },
            { id: 'main_hall', label: '大場相片', icon: '🐱', count: photos.filter(p => p.category === 'main_hall').length },
            { id: 'small_room', label: '細房包廂', icon: '🐱', count: photos.filter(p => p.category === 'small_room').length },
            { id: 'boardgames', label: '桌遊藏書', icon: '🎲', count: photos.filter(p => p.category === 'boardgames').length },
            { id: 'cat', label: '店貓日常', icon: '🐾', count: photos.filter(p => p.category === 'cat').length }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedCategory(tab.id)}
              className={`px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-black border-[2.5px] transition-all flex items-center gap-1.5 cursor-pointer ${
                selectedCategory === tab.id
                  ? 'bg-slate-900 text-white border-slate-950 shadow-md scale-105'
                  : 'bg-[#faf5ea] text-slate-800 border-slate-900 hover:bg-white'
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                selectedCategory === tab.id ? 'bg-amber-400 text-slate-950' : 'bg-slate-200 text-slate-700'
              }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Photo Gallery Grid / Bento Layout */}
        {filteredPhotos.length === 0 ? (
          <div className="bg-[#faf5ea] rounded-3xl border-[3px] border-slate-900 p-8 sm:p-12 text-center max-w-xl mx-auto my-4 shadow-sm flex flex-col items-center justify-center gap-3">
            <div className="text-4xl">📸</div>
            <h3 className="text-lg font-black text-slate-900">
              {selectedCategory === 'all' ? '尚未發佈場相' : '此分類目前尚無相片'}
            </h3>
            <p className="text-xs sm:text-sm font-bold text-slate-700 max-w-md">
              池記店主隨時更新現場環境照片，歡迎直接聯絡 WhatsApp 預約現場睇場或查詢包場！
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 mt-2">
              <a
                href="https://wa.me/85293737819?text=您好！我想向池記桌遊查詢場地照片及包場詳情，謝謝！"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs sm:text-sm font-black flex items-center gap-1.5 shadow-sm transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp 查詢場地</span>
              </a>
              {onOpenPhotoStudio && (
                <button
                  onClick={onOpenPhotoStudio}
                  className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 rounded-xl text-xs sm:text-sm font-black flex items-center gap-1.5 border-2 border-slate-900 shadow-sm transition-all cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>立即上傳場相</span>
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className={`grid gap-4 sm:gap-6 ${
            filteredPhotos.length === 1 
              ? 'grid-cols-1 max-w-xl mx-auto' 
              : filteredPhotos.length === 2 
                ? 'grid-cols-1 sm:grid-cols-2 max-w-4xl mx-auto' 
                : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
          }`}>
            {filteredPhotos.map((photo, index) => {
              const badge = getCategoryBadge(photo.category);
              return (
                <div 
                  key={photo.id}
                  onClick={() => handleOpenLightbox(index)}
                  className="bg-[#faf5ea] rounded-2xl sm:rounded-3xl border-[3px] border-slate-900 shadow-sm hover:shadow-xl hover:border-amber-400 transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer group hover:-translate-y-1"
                >
                  <div>
                    {/* Image Container with Signature Cat Badge */}
                    <div className={`relative w-full ${filteredPhotos.length === 1 ? 'h-72 sm:h-80' : 'h-56 sm:h-64'} bg-slate-900/10 overflow-hidden`}>
                      <img 
                        src={photo.imageUrl} 
                        alt={photo.title}
                        onError={(e) => {
                          const target = e.currentTarget;
                          const fallbackUrl = (photo.imageUrl && (photo.imageUrl.includes('1bg') || photo.category === 'boardgames' || photo.imageUrl.includes('boardgames')))
                            ? '/venue-boardgames.jpg'
                            : (photo.imageUrl && (photo.imageUrl.includes('mahjong') || photo.imageUrl.includes('plant') || photo.imageUrl.includes('2')))
                            ? '/venue-mahjong-plant.jpg'
                            : '/venue-cat-table.jpg';
                          if (target.src !== window.location.origin + fallbackUrl) {
                            target.src = fallbackUrl;
                          }
                        }}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />

                      {/* Gradient overlay on hover */}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-black/10 opacity-60 group-hover:opacity-80 transition-opacity" />

                      {/* Signature Cat Category Tag (Matching Photo 1 style) */}
                      <div className="absolute top-3 left-3 flex items-center gap-1.5">
                        <span className={`text-xs font-black px-2.5 py-1 rounded-lg border-2 shadow-sm flex items-center gap-1 ${badge.bg}`}>
                          <span>🐱</span>
                          <span>{badge.label}</span>
                        </span>
                      </div>

                      {/* Hover Zoom Icon */}
                      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity p-2 bg-slate-900/80 text-white rounded-xl shadow-sm">
                        <Maximize2 className="w-4 h-4" />
                      </div>

                      {/* Bottom Title on Image */}
                      <div className="absolute bottom-3 left-3 right-3 text-white">
                        <h3 className="text-sm sm:text-base font-black tracking-wide drop-shadow-md line-clamp-1">
                          {photo.title}
                        </h3>
                      </div>
                    </div>

                    {/* Caption & Details */}
                    <div className="p-4 space-y-2">
                      {photo.description && (
                        <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed line-clamp-2">
                          {photo.description}
                        </p>
                      )}

                      {/* Tags */}
                      {photo.tags && photo.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {photo.tags.map((t, idx) => (
                            <span 
                              key={idx}
                              className="text-[11px] font-bold bg-white text-slate-700 px-2 py-0.5 rounded-md border border-slate-300 shadow-2xs"
                            >
                              #{t}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Card Action Footer */}
                  <div className="px-4 pb-3.5 pt-1 flex items-center justify-between border-t border-slate-200/60 mt-2">
                    <span className="text-[11px] font-bold text-slate-500">
                      點擊放大看高清細節
                    </span>
                    <a
                      href={`https://wa.me/85293737819?text=您好！我在池記網站看到這張相片「${encodeURIComponent(photo.title)}」，想查詢預約與詳情！`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="text-xs font-black text-emerald-700 hover:text-emerald-900 flex items-center gap-1 transition-colors"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>WhatsApp 查詢</span>
                    </a>
                  </div>

                </div>
              );
            })}
          </div>
        )}

      </div>

      {/* 3. LIGHTBOX FULLSCREEN PREVIEW MODAL */}
      {currentLightboxPhoto && (
        <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-2 sm:p-4">
          <div className="relative max-w-4xl w-full bg-[#faf5ea] rounded-3xl border-[3px] border-slate-900 shadow-2xl overflow-hidden flex flex-col max-h-[95vh]">
            
            {/* Lightbox Header */}
            <div className="bg-[#ffa01b] border-b-[3px] border-slate-900 p-3 sm:p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className={`text-xs font-black px-2.5 py-1 rounded-lg border-2 shadow-xs ${getCategoryBadge(currentLightboxPhoto.category).bg}`}>
                  🐱 {getCategoryBadge(currentLightboxPhoto.category).label}
                </span>
                <h3 className="text-sm sm:text-base font-black text-slate-950 truncate max-w-[240px] sm:max-w-md">
                  {currentLightboxPhoto.title}
                </h3>
              </div>
              <button 
                onClick={handleCloseLightbox}
                className="p-1.5 bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Lightbox Image & Navigation */}
            <div className="relative flex-1 bg-black flex items-center justify-center overflow-hidden min-h-[300px] max-h-[60vh]">
              <img 
                src={currentLightboxPhoto.imageUrl} 
                alt={currentLightboxPhoto.title}
                onError={(e) => {
                  const target = e.currentTarget;
                  const fallbackUrl = (currentLightboxPhoto.imageUrl && (currentLightboxPhoto.imageUrl.includes('1bg') || currentLightboxPhoto.category === 'boardgames' || currentLightboxPhoto.imageUrl.includes('boardgames')))
                    ? '/venue-boardgames.jpg'
                    : (currentLightboxPhoto.imageUrl && (currentLightboxPhoto.imageUrl.includes('mahjong') || currentLightboxPhoto.imageUrl.includes('plant') || currentLightboxPhoto.imageUrl.includes('2')))
                    ? '/venue-mahjong-plant.jpg'
                    : '/venue-cat-table.jpg';
                  if (target.src !== window.location.origin + fallbackUrl) {
                    target.src = fallbackUrl;
                  }
                }}
                className="max-h-[60vh] max-w-full object-contain"
              />

              {/* Prev Button */}
              {filteredPhotos.length > 1 && (
                <button
                  onClick={handlePrevPhoto}
                  className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 bg-slate-900/80 hover:bg-slate-900 text-white rounded-full transition-all cursor-pointer shadow-lg"
                  title="上一張"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
              )}

              {/* Next Button */}
              {filteredPhotos.length > 1 && (
                <button
                  onClick={handleNextPhoto}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 bg-slate-900/80 hover:bg-slate-900 text-white rounded-full transition-all cursor-pointer shadow-lg"
                  title="下一張"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Lightbox Footer Details */}
            <div className="p-4 sm:p-5 bg-white space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h4 className="text-base sm:text-lg font-black text-slate-900">
                    {currentLightboxPhoto.title}
                  </h4>
                  {currentLightboxPhoto.description && (
                    <p className="text-xs sm:text-sm text-slate-600 font-medium mt-1 leading-relaxed">
                      {currentLightboxPhoto.description}
                    </p>
                  )}
                </div>

                <a
                  href={`https://wa.me/85293737819?text=您好池記！我想預約/查詢相片中的場地設施「${encodeURIComponent(currentLightboxPhoto.title)}」，請教收費及可預約時段，謝謝！`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all flex-shrink-0"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>即時 WhatsApp 預約查詢</span>
                </a>
              </div>

              {currentLightboxPhoto.tags && currentLightboxPhoto.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-1 border-t border-slate-100">
                  {currentLightboxPhoto.tags.map((t, idx) => (
                    <span key={idx} className="text-xs font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                      #{t}
                    </span>
                  ))}
                </div>
              )}
            </div>

          </div>
        </div>
      )}

    </section>
  );
}
