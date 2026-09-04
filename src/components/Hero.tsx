import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, HeartHandshake, Eye } from 'lucide-react';
import { HERO_IMAGE_URL } from '../data/packages';

interface HeroProps {
  onOpenBooking: () => void;
  onScrollToPackages: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking, onScrollToPackages }) => {
  return (
    <section
      id="home"
      className="relative min-h-[90vh] sm:min-h-[85vh] lg:min-h-[92vh] flex items-center pt-24 sm:pt-20 pb-16 overflow-hidden"
    >
      {/* Background Image with responsive positioning */}
      <div
        className="absolute inset-0 bg-cover bg-right sm:bg-center z-0 transition-all duration-700"
        style={{
          backgroundImage: `url('${HERO_IMAGE_URL}')`,
          backgroundPosition: 'right 20% center',
        }}
      />

      {/* Sophisticated gradient overlay for guaranteed text legibility */}
      <div className="absolute inset-0 z-1 bg-gradient-to-b sm:bg-gradient-to-r from-[#fdf0f2]/95 via-[#fdf0f2]/88 to-[#fdf0f2]/30 sm:via-[#fdf0f2]/80 sm:to-transparent" />

      {/* Soft warm light glow effect */}
      <div className="absolute top-1/4 left-10 w-72 h-72 rounded-full bg-rose-200/20 blur-3xl pointer-events-none z-1" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-xl lg:max-w-2xl py-4 sm:py-8">
          {/* Floating Aesthetic Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-pink-200/70 shadow-xs mb-5 sm:mb-6 animate-soft-float">
            <Sparkles className="w-4 h-4 text-[#c86b7b]" />
            <span className="text-xs sm:text-sm font-semibold tracking-wide text-[#c86b7b]">
              ✨ 3D Pastel Balloon & Cake Aesthetic
            </span>
          </div>

          {/* Hero Headline */}
          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-[4rem] font-bold text-[#3d3231] tracking-tight leading-[1.12] mb-5 sm:mb-6">
            Where Every Detail Sparks Joy!
          </h1>

          {/* Subtitle Description */}
          <p className="text-base sm:text-lg text-[#615453] leading-relaxed mb-7 sm:mb-9 max-w-lg font-normal">
            我们精心策划每一个宝贵的生日时刻。融合梦幻柔粉 3D 浮空立体气球、法式奢雅马卡龙层叠蛋糕台、发光霓虹字母牌与莫兰迪全案定制布景。
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4 mb-9">
            <button
              type="button"
              id="hero-book-cta-btn"
              onClick={onOpenBooking}
              className="px-7 py-3.5 rounded-full text-sm sm:text-base font-semibold text-white bg-[#c86b7b] hover:bg-[#b85a6b] shadow-md hover:shadow-lg transition-all transform active:scale-98 text-center cursor-pointer flex items-center justify-center gap-2 group"
            >
              <span>立即预约档期</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              type="button"
              id="hero-view-packages-btn"
              onClick={onScrollToPackages}
              className="px-6 py-3.5 rounded-full text-sm sm:text-base font-medium text-[#c86b7b] bg-white/90 hover:bg-white border border-pink-200/90 shadow-xs hover:shadow-sm transition-all text-center cursor-pointer backdrop-blur-sm"
            >
              查看套餐详情
            </button>
          </div>

          {/* Trust points */}
          <div className="grid grid-cols-3 gap-2 sm:gap-4 pt-6 border-t border-rose-200/60 max-w-lg">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <ShieldCheck className="w-4 h-4 text-[#c86b7b] shrink-0" />
              <span className="text-xs text-[#6e5f5e] font-medium leading-tight">
                环保进口气球
              </span>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <Eye className="w-4 h-4 text-[#c86b7b] shrink-0" />
              <span className="text-xs text-[#6e5f5e] font-medium leading-tight">
                免费出 3D 方案
              </span>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <HeartHandshake className="w-4 h-4 text-[#c86b7b] shrink-0" />
              <span className="text-xs text-[#6e5f5e] font-medium leading-tight">
                全案布撤无忧
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
