import React from 'react';

export default function VenueSection() {
  return (
    <section id="venue" className="pt-0 pb-0 bg-[#ffa01b] text-slate-800 relative">
      <div className="w-full">
        <div className="flex justify-center items-center w-full">
          {/* NOTE: Upload the venue photo collage image to the /public folder as "venue-photo.jpg" */}
          <a 
            href="https://wa.me/85293737819?text=您好！我想向池記桌遊查詢場地、台牌教學及3D打印，謝謝！" 
            target="_blank" 
            rel="noopener noreferrer"
            className="relative w-full block cursor-pointer group"
            title="點擊即時聯絡 WhatsApp: 93737819"
          >
            <img 
              src="/venue-photo.jpg" 
              alt="池記桌遊 場相及桌遊空間" 
              className="w-full h-auto object-contain drop-shadow-xl transition-transform duration-300 group-hover:scale-[1.01]"
            />
          </a>
        </div>
      </div>
    </section>
  );
}
