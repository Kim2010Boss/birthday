import React, { useState } from 'react';
import { ArrowRight, Sparkles, CheckCircle2, SlidersHorizontal, Camera, ImagePlus } from 'lucide-react';
import { SHOWCASE_CASES } from '../data/packages';
import { ShowcaseCase } from '../types';

interface FeaturedGalleryProps {
  onSelectCase: (caseItem: ShowcaseCase) => void;
  onOpenBookingForCase: (caseItem: ShowcaseCase) => void;
}

export const FeaturedGallery: React.FC<FeaturedGalleryProps> = ({
  onSelectCase,
  onOpenBookingForCase
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [customImages, setCustomImages] = useState<Record<string, string>>(() => {
    try {
      const saved = localStorage.getItem('party_case_custom_images');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const handleUploadImage = (caseId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (result) {
        setCustomImages((prev) => {
          const next = { ...prev, [caseId]: result };
          try {
            localStorage.setItem('party_case_custom_images', JSON.stringify(next));
          } catch {
            // ignore quota exceeded
          }
          return next;
        });
      }
    };
    reader.readAsDataURL(file);
  };

  const getDisplayCase = (item: ShowcaseCase): ShowcaseCase => {
    const customImg = customImages[item.id] || (item.id === 'baby-moana-island' ? customImages['baby-ands-jayho-ballroom'] : undefined);
    if (customImg) {
      return {
        ...item,
        image: customImg,
        images: [customImg, ...(item.images || [])]
      };
    }
    return item;
  };

  // 在“精选案例”默认总览下，每个分类严格只取 1 个代表作品，长辈寿宴与宝宝百日绝不出现超过 1 个
  const featuredCases = React.useMemo(() => {
    const categoryMap = new Map<string, ShowcaseCase>();
    for (const c of SHOWCASE_CASES) {
      if (!categoryMap.has(c.category)) {
        categoryMap.set(c.category, c);
      }
    }
    return Array.from(categoryMap.values());
  }, []);

  const rawMainCase = featuredCases[0] || SHOWCASE_CASES[0];
  const mainCase = getDisplayCase(rawMainCase);
  const sideCases = featuredCases.slice(1).map(getDisplayCase);

  const filterTabs = [
    { id: 'all', label: '精选案例' },
    { id: 'birthday18_21', label: '18/21岁成人礼' },
    { id: 'baby', label: '宝宝百日/周岁' },
    { id: 'elder', label: '长辈寿宴' }
  ];

  const filteredCases = (activeCategory === 'all'
    ? featuredCases
    : SHOWCASE_CASES.filter((c) => c.category === activeCategory)
  ).map(getDisplayCase);

  return (
    <section id="gallery" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-pink-100/70 text-[#c86b7b] text-xs font-semibold uppercase tracking-wider mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Real Project Gallery</span>
        </div>
        <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-[#3d3231] mb-3 sm:mb-4">
          Bespoke Birthday Setups
        </h2>
        <p className="text-[#786b6a] text-sm sm:text-base">
          真实案例品鉴 · 空间结构感与粉调温柔美学的完美融合
        </p>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveCategory(tab.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                activeCategory === tab.id
                  ? 'bg-[#c86b7b] text-white shadow-xs'
                  : 'bg-white text-[#6b5c5b] hover:bg-pink-50 border border-pink-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Asymmetric Gallery Layout (Matches user's signature design) */}
      {activeCategory === 'all' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          {/* Left Column: Featured Signature Setup (Large Main Showcase) */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl border border-pink-100/90 flex flex-col h-full transition-all duration-300 group">
              {/* Photo Area with Tag and Badge */}
              <div className="relative h-64 sm:h-80 md:h-96 w-full overflow-hidden bg-pink-50">
                <img
                  src={mainCase.image}
                  alt={mainCase.title}
                  className="w-full h-full object-cover object-center group-hover:scale-103 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />

                <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                  <span className="px-3 py-1 rounded-full bg-white/95 backdrop-blur-sm text-[11px] font-bold text-[#c86b7b] tracking-wider uppercase shadow-xs">
                    {mainCase.tag}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-black/40 backdrop-blur-sm text-[11px] font-medium text-white shadow-xs">
                    {mainCase.dimensions}
                  </span>
                </div>

                {/* Color Palette Swatches */}
                <div className="absolute bottom-4 right-4 flex items-center gap-1.5 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full shadow-xs">
                  <span className="text-[10px] text-gray-500 font-medium mr-1">配色</span>
                  {mainCase.palette.map((color, idx) => (
                    <span
                      key={idx}
                      className="w-3 h-3 rounded-full border border-white/60 shadow-xs"
                      style={{ backgroundColor: color }}
                      title={color}
                    />
                  ))}
                </div>

                <label
                  onClick={(e) => e.stopPropagation()}
                  className="absolute top-4 right-4 p-2 rounded-full bg-black/45 hover:bg-black/75 text-white backdrop-blur-xs transition-all cursor-pointer shadow-xs flex items-center justify-center z-10"
                  title="上传/更换此案例照片"
                >
                  <Camera className="w-4 h-4" />
                  <span className="sr-only">上传照片</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleUploadImage(mainCase.id, e)}
                  />
                </label>
              </div>

              {/* Body Content */}
              <div className="p-6 sm:p-8 flex flex-col justify-between flex-grow">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold uppercase tracking-widest text-[#c86b7b]">
                      Featured Signature Setup
                    </span>
                    <span className="text-xs text-[#8f7e7d] bg-pink-50 px-2.5 py-0.5 rounded-full">
                      {mainCase.categoryLabel}
                    </span>
                  </div>

                  <h3 className="font-heading text-2xl sm:text-3xl font-bold text-[#3d3231] mb-3">
                    {mainCase.title}
                  </h3>

                  <p className="text-[#6b5c5b] text-sm sm:text-base leading-relaxed mb-5">
                    {mainCase.description}
                  </p>

                  {/* Highlights checklist */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6">
                    {mainCase.features.slice(0, 4).map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-[#5d5150]">
                        <CheckCircle2 className="w-4 h-4 text-[#c86b7b] shrink-0" />
                        <span className="truncate">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Footer Bar */}
                <div className="pt-4 border-t border-pink-100/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <span className="text-xs sm:text-sm text-[#786b6a]">
                    适合：{mainCase.suitableFor}
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => onOpenBookingForCase(mainCase)}
                      className="px-5 py-2.5 text-xs font-semibold rounded-full text-white bg-[#c86b7b] hover:bg-[#b55869] shadow-xs transition-colors cursor-pointer flex items-center gap-1.5"
                    >
                      <span>预定同款</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Stacked Mini Showcase Cards */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            {sideCases.slice(0, 3).map((caseItem) => (
              <div
                key={caseItem.id}
                className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm hover:shadow-md border border-pink-100/80 flex flex-col sm:flex-row gap-4 sm:gap-5 items-center transition-all duration-300 hover:-translate-y-1 group"
              >
                {/* Thumbnail Image */}
                <div 
                  className="w-full sm:w-36 md:w-40 h-44 sm:h-36 rounded-xl overflow-hidden shrink-0 bg-pink-50 relative cursor-pointer"
                  onClick={() => onSelectCase(caseItem)}
                >
                  <img
                    src={caseItem.image}
                    alt={caseItem.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-2 left-2">
                    <span className="px-2 py-0.5 rounded-md bg-white/90 text-[10px] font-semibold text-[#c86b7b]">
                      {caseItem.tag}
                    </span>
                  </div>
                  <label
                    onClick={(e) => e.stopPropagation()}
                    className="absolute top-2 right-2 p-1.5 rounded-full bg-black/45 hover:bg-black/75 text-white backdrop-blur-xs transition-all cursor-pointer shadow-xs flex items-center justify-center z-10"
                    title="上传/更换此案例照片"
                  >
                    <Camera className="w-3 h-3" />
                    <span className="sr-only">上传照片</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleUploadImage(caseItem.id, e)}
                    />
                  </label>
                </div>

                {/* Text & Actions */}
                <div className="flex flex-col justify-between flex-grow w-full">
                  <div>
                    <span className="text-[11px] text-[#8f7e7d] font-medium">
                      {caseItem.categoryLabel}
                    </span>
                    <h4 className="font-heading text-lg sm:text-xl font-bold text-[#3d3231] mt-0.5 mb-1.5 group-hover:text-[#c86b7b] transition-colors">
                      {caseItem.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-[#6b5c5b] leading-relaxed line-clamp-2 mb-3">
                      {caseItem.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-pink-50">
                    <div className="flex items-center gap-1">
                      {caseItem.palette.slice(0, 3).map((c, i) => (
                        <span
                          key={i}
                          className="w-2.5 h-2.5 rounded-full border border-gray-100"
                          style={{ backgroundColor: c }}
                        />
                      ))}
                    </div>
                    <button
                      type="button"
                      onClick={() => onOpenBookingForCase(caseItem)}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-[#c86b7b] hover:text-[#a8485c] cursor-pointer transition-colors"
                    >
                      <span>预定同款</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Filtered Grid View */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCases.map((caseItem) => (
            <div
              key={caseItem.id}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md border border-pink-100 flex flex-col group transition-all"
            >
              <div 
                className="relative h-56 overflow-hidden bg-pink-50 cursor-pointer"
                onClick={() => onSelectCase(caseItem)}
              >
                <img
                  src={caseItem.image}
                  alt={caseItem.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-white/90 text-xs font-semibold text-[#c86b7b]">
                  {caseItem.categoryLabel}
                </span>
                <label
                  onClick={(e) => e.stopPropagation()}
                  className="absolute top-3 right-3 p-1.5 rounded-full bg-black/45 hover:bg-black/75 text-white/90 hover:text-white backdrop-blur-xs transition-all cursor-pointer shadow-xs flex items-center justify-center group/btn"
                  title="上传/更换此案例照片"
                >
                  <Camera className="w-3.5 h-3.5" />
                  <span className="sr-only">上传/更换照片</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleUploadImage(caseItem.id, e)}
                  />
                </label>
              </div>
              <div className="p-5 flex flex-col justify-between flex-grow">
                <div>
                  <h3 className="font-heading text-xl font-bold text-[#3d3231] mb-2">
                    {caseItem.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#6b5c5b] line-clamp-3 mb-4">
                    {caseItem.description}
                  </p>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-pink-50">
                  <span className="text-xs text-gray-500">{caseItem.suitableFor}</span>
                  <button
                    type="button"
                    onClick={() => onOpenBookingForCase(caseItem)}
                    className="text-xs font-semibold text-[#c86b7b] hover:text-[#b55869] flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <span>预定同款</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      )}
    </section>
  );
};
