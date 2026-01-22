import React from 'react';

interface HeroProps {
  onCtaClick: () => void;
}

const Hero: React.FC<HeroProps> = ({ onCtaClick }) => {
  return (
    <section className="relative bg-white overflow-hidden">
      <div className="absolute inset-0">
        {/* Simple decorative background pattern */}
        <svg className="absolute right-0 top-0 transform translate-x-1/2 -translate-y-1/2 opacity-10" width="600" height="600" fill="none" viewBox="0 0 600 600">
           <circle cx="300" cy="300" r="300" fill="url(#hero-gradient)" />
           <defs>
             <radialGradient id="hero-gradient" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="rotate(90 300 300) scale(300)">
               <stop stopColor="#f59e0b" /> {/* Halida Gold/Yellowish color */}
               <stop offset="1" stopColor="#f59e0b" stopOpacity="0" />
             </radialGradient>
           </defs>
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center lg:pt-32">
        <h1 className="text-4xl tracking-tight font-extrabold text-slate-900 sm:text-5xl md:text-6xl">
          <span className="block xl:inline">Nhập Vai Cùng</span>{' '}
          <span className="block text-yellow-600 xl:inline">Halida Social</span>
        </h1>
        <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
          Biến hóa ảnh selfie của bạn thành 5 tính cách "bá đạo" trên bàn nhậu. Upload ảnh, chọn vai và chia sẻ khoảnh khắc vui vẻ cùng chiến hữu!
        </p>
        <div className="mt-10 max-w-sm mx-auto sm:max-w-none sm:flex sm:justify-center">
          <div className="space-y-4 sm:space-y-0 sm:mx-auto sm:inline-grid sm:grid-cols-1 sm:gap-5">
            <button
              onClick={onCtaClick}
              className="flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-yellow-600 hover:bg-yellow-700 md:py-4 md:text-lg md:px-10 shadow-lg transition-transform hover:-translate-y-1"
            >
              Thử Ngay
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
