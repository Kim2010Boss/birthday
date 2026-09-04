import React, { useState, useMemo } from 'react';
import {
  Check,
  Plus,
  Minus,
  Sparkles,
  Calculator,
  Calendar,
  HelpCircle,
  PackageCheck,
  Layers,
  ChevronRight
} from 'lucide-react';
import { DECORATION_PACKAGES, MASTER_ADDONS } from '../data/packages';
import { DecorationPackage } from '../types';

interface PackageCalculatorProps {
  onOpenBooking: (packageCode: string, initialAddons?: Record<string, number>, estimatedTotal?: number) => void;
}

export const PackageCalculator: React.FC<PackageCalculatorProps> = ({ onOpenBooking }) => {
  // Selected package for calculation
  const [selectedPackageId, setSelectedPackageId] = useState<string>('type-1-board');

  // Add-on quantities state
  const [addonQuantities, setAddonQuantities] = useState<Record<string, number>>({
    'baby-box': 0,
    'light-number-32': 1,
    'cartoon-standee': 0,
    'giant-bear': 0,
    'a1-easel': 0,
    'cake-stand-steel': 0,
    'cake-stand-paper': 0,
    'helium-balloon': 10
  });

  const selectedPkg = useMemo(() => {
    return DECORATION_PACKAGES.find((p) => p.id === selectedPackageId) || DECORATION_PACKAGES[0];
  }, [selectedPackageId]);

  // Master add-on dictionary
  const masterAddons = MASTER_ADDONS;

  const updateQuantity = (id: string, delta: number) => {
    setAddonQuantities((prev) => {
      const current = prev[id] || 0;
      const next = Math.max(0, current + delta);
      return { ...prev, [id]: next };
    });
  };

  const calculatedTotal = useMemo(() => {
    const base = selectedPkg.basePrice;
    let addonsTotal = 0;
    masterAddons.forEach((addon) => {
      const qty = addonQuantities[addon.id] || 0;
      addonsTotal += addon.price * qty;
    });
    return base + addonsTotal;
  }, [selectedPkg, addonQuantities, masterAddons]);

  const activeAddonCount = useMemo(() => {
    return (Object.values(addonQuantities) as number[]).reduce((acc: number, curr: number) => acc + (curr > 0 ? 1 : 0), 0);
  }, [addonQuantities]);

  const handleSelectPackageForConfig = (pkgId: string) => {
    setSelectedPackageId(pkgId);
    // Scroll smoothly to calculator preview if on mobile
    const calcElement = document.getElementById('price-estimator');
    if (calcElement && window.innerWidth < 1024) {
      calcElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="packages" className="py-16 sm:py-24 bg-[#fff9fa] border-y border-pink-100/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-pink-100/80 text-[#c86b7b] text-xs font-semibold uppercase tracking-wider mb-3">
            <Layers className="w-3.5 h-3.5" />
            <span>Transparent Pricing &amp; Customization</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-[#3d3231] mb-3 sm:mb-4">
            Birthday Decoration Packages
          </h2>
          <p className="text-[#786b6a] text-sm sm:text-base">
            模块化透明定价 · 严格杜绝隐形消费 · 支持按需自由增配
          </p>
        </div>

        {/* 4 Cards Grid (User's packages styled impeccably) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
          {DECORATION_PACKAGES.map((pkg) => {
            const isSelected = selectedPackageId === pkg.id;
            return (
              <div
                key={pkg.id}
                id={`pkg-card-${pkg.id}`}
                className={`bg-white rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 relative border ${
                  isSelected
                    ? 'border-[#c86b7b] ring-2 ring-[#c86b7b]/20 shadow-lg -translate-y-1.5'
                    : 'border-pink-100/90 hover:border-pink-200 shadow-sm hover:shadow-md'
                }`}
              >
                {/* Popular Pill */}
                {pkg.popular && (
                  <div className="absolute -top-3 left-6">
                    <span className="px-3 py-0.5 rounded-full bg-gradient-to-r from-[#e5788f] to-[#c86b7b] text-white text-[11px] font-bold shadow-xs">
                      HOT · 热选
                    </span>
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-[#c86b7b] uppercase tracking-wider">
                      {pkg.code}
                    </span>
                    <span className="text-[11px] text-gray-400 bg-pink-50/80 px-2 py-0.5 rounded-md">
                      {pkg.tag}
                    </span>
                  </div>

                  <h3 className="font-heading text-xl sm:text-2xl font-bold text-[#3d3231] mb-2 leading-snug">
                    {pkg.name}
                  </h3>

                  <div className="mb-4 pb-4 border-b border-pink-50">
                    <div className="flex items-baseline gap-1">
                      {pkg.basePrice > 0 ? (
                        <>
                          <span className="text-xs font-medium text-gray-400">底价</span>
                          <span className="text-2xl sm:text-3xl font-bold text-[#c86b7b] font-heading">
                            RM {pkg.basePrice}
                          </span>
                          <span className="text-xs text-gray-400">起</span>
                        </>
                      ) : (
                        <span className="text-xl font-bold text-[#c86b7b] font-heading">
                          自由单品加购
                        </span>
                      )}
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-[#665857] leading-relaxed mb-5">
                    {pkg.highlight}
                  </p>

                  {/* Highlight Specs (Strictly matched from user prompt) */}
                  <div className="space-y-2 mb-6">
                    <div className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
                      包含配置 / 规格清单
                    </div>
                    {pkg.specs.map((spec, sIdx) => (
                      <div key={sIdx} className="flex items-start gap-2 text-xs text-[#524544]">
                        <div className="w-4 h-4 rounded-full bg-pink-100/70 text-[#c86b7b] flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-2.5 h-2.5 stroke-[3]" />
                        </div>
                        <span className="leading-tight">{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2 pt-4 border-t border-pink-50">
                  <button
                    type="button"
                    onClick={() => handleSelectPackageForConfig(pkg.id)}
                    className={`w-full py-2.5 px-4 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                      isSelected
                        ? 'bg-[#c86b7b] text-white shadow-xs'
                        : 'bg-pink-50 text-[#c86b7b] hover:bg-pink-100/70'
                    }`}
                  >
                    <PackageCheck className="w-3.5 h-3.5" />
                    <span>{isSelected ? '已选为配置基准' : '选此套餐预估'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => onOpenBooking(pkg.code)}
                    className="w-full py-2 text-xs font-medium text-gray-500 hover:text-[#c86b7b] transition-colors"
                  >
                    直接快速咨询 →
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Interactive Estimator / Add-ons Customizer Box */}
        <div
          id="price-estimator"
          className="bg-white rounded-3xl p-6 sm:p-8 lg:p-10 shadow-lg border border-pink-200/80"
        >
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-pink-100">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Calculator className="w-5 h-5 text-[#c86b7b]" />
                <h3 className="font-heading text-2xl sm:text-3xl font-bold text-[#3d3231]">
                  自由加购与预算测算器
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-gray-500">
                当前基准：<span className="font-semibold text-[#c86b7b]">{selectedPkg.name}</span> (底价 RM {selectedPkg.basePrice})
              </p>
            </div>

            {/* Quick Package Selector Pills */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs text-gray-400 font-medium">切换基准：</span>
              {DECORATION_PACKAGES.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setSelectedPackageId(p.id)}
                  className={`px-3 py-1 text-xs rounded-full font-medium transition-all ${
                    selectedPackageId === p.id
                      ? 'bg-[#c86b7b] text-white'
                      : 'bg-pink-50 text-gray-600 hover:bg-pink-100'
                  }`}
                >
                  {p.code}
                </button>
              ))}
            </div>
          </div>

          {/* Add-ons Selector Grid */}
          <div className="py-6 sm:py-8">
            <div className="text-sm font-semibold text-[#4a3e3d] mb-4 flex items-center justify-between">
              <span>选择加购项目 (点击 ＋ 或 － 自由增减数量)</span>
              <span className="text-xs text-[#c86b7b]">已选 {activeAddonCount} 项加购</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
              {masterAddons.map((addon) => {
                const qty = addonQuantities[addon.id] || 0;
                const isItemActive = qty > 0;
                return (
                  <div
                    key={addon.id}
                    className={`rounded-2xl p-3.5 sm:p-4 border transition-all flex flex-col justify-between ${
                      isItemActive
                        ? 'bg-pink-50/50 border-[#c86b7b]/60 shadow-xs'
                        : 'bg-white border-pink-100 hover:border-pink-200'
                    }`}
                  >
                    <div className="mb-3">
                      <div className="flex items-start justify-between gap-1 mb-1">
                        <span className="text-xs sm:text-sm font-semibold text-[#3d3231] leading-tight">
                          {addon.name}
                        </span>
                        <span className="text-xs font-bold text-[#c86b7b] shrink-0">
                          RM {addon.price}
                        </span>
                      </div>
                      <span className="text-[11px] text-gray-400 block">{addon.note}</span>
                    </div>

                    {/* Stepper controls */}
                    <div className="flex items-center justify-between pt-2 border-t border-pink-100/60">
                      <span className="text-xs text-gray-500">
                        {qty > 0 ? (
                          <span className="font-semibold text-[#c86b7b]">
                            小计 RM {qty * addon.price}
                          </span>
                        ) : (
                          '未添加'
                        )}
                      </span>

                      <div className="flex items-center gap-1.5 bg-white rounded-lg p-1 border border-pink-200 shadow-2xs">
                        <button
                          type="button"
                          onClick={() => updateQuantity(addon.id, -1)}
                          disabled={qty === 0}
                          className="w-6 h-6 rounded-md flex items-center justify-center text-gray-500 hover:bg-pink-100 hover:text-[#c86b7b] disabled:opacity-30 disabled:pointer-events-none transition-colors"
                          aria-label={`减少 ${addon.name}`}
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-6 text-center text-xs font-bold text-[#3d3231]">
                          {qty}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(addon.id, 1)}
                          className="w-6 h-6 rounded-md flex items-center justify-center text-gray-500 hover:bg-pink-100 hover:text-[#c86b7b] transition-colors"
                          aria-label={`增加 ${addon.name}`}
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Calculator Bottom Summary Bar */}
          <div className="pt-6 border-t border-pink-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-pink-50/80 to-white -mx-6 sm:-mx-8 lg:-mx-10 -mb-6 sm:-mb-8 lg:-mb-10 p-6 sm:p-8 rounded-b-3xl">
            <div>
              <span className="text-xs text-gray-500 uppercase tracking-wider block mb-0.5">
                预估总价 (含已选配置与加购)
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-xs font-semibold text-gray-400">EST. TOTAL</span>
                <span className="font-heading text-3xl sm:text-4xl font-bold text-[#c86b7b]">
                  RM {calculatedTotal}
                </span>
                <span className="text-xs text-gray-400">
                  (基础套餐 RM {selectedPkg.basePrice} + 加购 RM {calculatedTotal - selectedPkg.basePrice})
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                id="calc-reset-btn"
                onClick={() => {
                  setAddonQuantities({
                    'baby-box': 0,
                    'light-number-32': 0,
                    'cartoon-standee': 0,
                    'giant-bear': 0,
                    'a1-easel': 0,
                    'cake-stand-steel': 0,
                    'cake-stand-paper': 0,
                    'helium-balloon': 0
                  });
                }}
                className="px-4 py-3 rounded-full text-xs font-medium text-gray-500 hover:text-gray-800 bg-white border border-gray-200 transition-colors"
              >
                重置选项
              </button>

              <button
                type="button"
                id="calc-book-cta-btn"
                onClick={() => onOpenBooking(selectedPkg.code, addonQuantities, calculatedTotal)}
                className="px-6 sm:px-8 py-3.5 rounded-full text-sm font-semibold text-white bg-[#c86b7b] hover:bg-[#b55869] shadow-md hover:shadow-lg transition-all transform active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>以此配置锁定档期</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
