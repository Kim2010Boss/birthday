import React, { useState, useEffect, useMemo } from 'react';
import {
  X,
  Calendar,
  Phone,
  User,
  Sparkles,
  CheckCircle2,
  MessageSquare,
  MapPin,
  Plus,
  Minus,
  ShoppingBag,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { DECORATION_PACKAGES, MASTER_ADDONS } from '../data/packages';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPackageCode?: string;
  initialAddons?: Record<string, number>;
  estimatedTotal?: number;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  initialPackageCode = 'Type 1',
  initialAddons = {},
  estimatedTotal
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [eventType, setEventType] = useState('宝宝周岁宴');
  const [venueType, setVenueType] = useState('室内酒店宴会厅');
  const [packageCode, setPackageCode] = useState(initialPackageCode);
  const [addons, setAddons] = useState<Record<string, number>>(initialAddons || {});
  const [notes, setNotes] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isAddonsExpanded, setIsAddonsExpanded] = useState(true);

  // Sync props when modal opens or initial values change
  useEffect(() => {
    if (isOpen) {
      if (initialPackageCode) {
        setPackageCode(initialPackageCode);
      }
      if (initialAddons && Object.keys(initialAddons).length > 0) {
        setAddons({ ...initialAddons });
      }
      setIsSubmitted(false);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, initialPackageCode, initialAddons]);

  // Find matched package and base price
  const matchedPackage = useMemo(() => {
    return (
      DECORATION_PACKAGES.find(
        (p) => p.code === packageCode || p.name.includes(packageCode) || p.id === packageCode
      ) || null
    );
  }, [packageCode]);

  const basePrice = matchedPackage ? matchedPackage.basePrice : 0;

  // Calculate addons subtotal and total
  const addonsTotal = useMemo(() => {
    return MASTER_ADDONS.reduce((sum, item) => {
      const qty = addons[item.id] || 0;
      return sum + item.price * qty;
    }, 0);
  }, [addons]);

  const activeAddonList = useMemo(() => {
    return MASTER_ADDONS.filter((item) => (addons[item.id] || 0) > 0);
  }, [addons]);

  const currentTotal = useMemo(() => {
    if (basePrice > 0 || addonsTotal > 0) {
      return basePrice + addonsTotal;
    }
    return estimatedTotal || 0;
  }, [basePrice, addonsTotal, estimatedTotal]);

  const updateAddonQty = (id: string, delta: number) => {
    setAddons((prev) => {
      const current = prev[id] || 0;
      const next = Math.max(0, current + delta);
      return { ...prev, [id]: next };
    });
  };

  if (!isOpen) return null;

  const createWhatsAppUrl = (
    clientName = name,
    clientPhone = phone,
    eventDate = date,
    type = eventType,
    venue = venueType,
    pkg = packageCode,
    userNotes = notes
  ) => {
    // Format list of selected add-ons
    const addonLines = activeAddonList.map((item) => {
      const qty = addons[item.id] || 1;
      const sub = item.price * qty;
      return `  • ${item.name} × ${qty} ${item.unit} (RM ${sub})`;
    });

    const addonsBlock =
      addonLines.length > 0
        ? `✨ 已选加购项目 (${addonLines.length}项，小计 RM ${addonsTotal})：\n${addonLines.join('\n')}\n`
        : `✨ 已选加购项目：暂无加购（可在后续沟通中按需增配）\n`;

    const text =
      `您好 Baby Bloom！我想预约生日派对档期：\n\n` +
      `👤 客户称呼：${clientName.trim() || '客户'}\n` +
      `📱 联系电话：${clientPhone.trim() || '未提供'}\n` +
      `📅 派对日期：${eventDate || '待定'}\n` +
      `🎉 庆典类型：${type}\n` +
      `🏢 场地类型：${venue}\n` +
      `📦 意向方案：${pkg}\n\n` +
      `${addonsBlock}\n` +
      `💰 预估总额：RM ${currentTotal > 0 ? currentTotal : '按方案核算'}\n` +
      (userNotes.trim() ? `💬 补充偏好：${userNotes.trim()}\n` : '') +
      `\n期待策划师与我联系确认档期细节！`;

    return `https://wa.me/60123456789?text=${encodeURIComponent(text)}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !date) {
      alert('请完整填写您的姓名、联系电话以及派对预定日期。');
      return;
    }

    const waUrl = createWhatsAppUrl();
    setIsSubmitted(true);

    // 直接打开发送界面
    try {
      window.open(waUrl, '_blank', 'noopener,noreferrer');
    } catch {
      window.location.href = waUrl;
    }
  };

  const handleWhatsAppDirect = () => {
    const waUrl = createWhatsAppUrl();
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      id="booking-modal-backdrop"
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
    >
      <div
        id="booking-modal-container"
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-3xl max-w-xl w-full overflow-hidden shadow-2xl border border-pink-100 my-auto animate-in fade-in zoom-in-95 duration-200"
      >
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-[#fdf0f2] to-pink-50/50 p-5 sm:p-6 border-b border-pink-100 relative">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#c86b7b] mb-1">
            <Sparkles className="w-4 h-4" />
            <span>Schedule &amp; Consultation</span>
          </div>
          <h3 className="font-heading text-2xl sm:text-3xl font-bold text-[#3d3231]">
            预约专属档期与定制咨询
          </h3>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            提交后将直接携带您填写的档期、套餐与加购项跳转至 WhatsApp 快速对接
          </p>

          <button
            type="button"
            onClick={onClose}
            className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white text-gray-400 hover:text-gray-700 flex items-center justify-center shadow-xs focus:outline-none cursor-pointer"
            aria-label="关闭"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content / Form */}
        <div className="p-5 sm:p-7 max-h-[75vh] overflow-y-auto">
          {isSubmitted ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-green-50 text-green-600 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="font-heading text-2xl font-bold text-[#3d3231]">
                已生成预约信息，正为您拉起 WhatsApp！
              </h4>
              <p className="text-xs sm:text-sm text-gray-500 max-w-sm mx-auto">
                已将您选择的【{packageCode}】以及 {activeAddonList.length} 项加购内容整理就绪。
              </p>

              {/* Summary card in submitted view */}
              <div className="bg-pink-50/70 rounded-2xl p-4 text-left border border-pink-100 text-xs space-y-2">
                <div className="flex justify-between text-gray-600">
                  <span>活动日期：</span>
                  <span className="font-semibold text-gray-800">{date || '待定'}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>意向方案：</span>
                  <span className="font-semibold text-[#c86b7b]">{packageCode}</span>
                </div>
                {activeAddonList.length > 0 && (
                  <div className="pt-2 border-t border-pink-100/60">
                    <span className="text-gray-500 block mb-1.5 font-medium">包含加购项：</span>
                    <div className="flex flex-wrap gap-1.5">
                      {activeAddonList.map((item) => (
                        <span
                          key={item.id}
                          className="px-2 py-0.5 rounded-md bg-white border border-pink-200 text-[#c86b7b] text-[11px] font-medium"
                        >
                          {item.name} × {addons[item.id]}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                <div className="pt-2 border-t border-pink-100/60 flex justify-between items-center">
                  <span className="text-gray-600">预估总价：</span>
                  <span className="font-bold text-[#c86b7b] text-base">
                    RM {currentTotal > 0 ? currentTotal : '按需核算'}
                  </span>
                </div>
              </div>

              <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={handleWhatsAppDirect}
                  className="w-full sm:w-auto px-6 py-3 rounded-full text-xs sm:text-sm font-semibold text-white bg-[#25D366] hover:bg-[#20b858] shadow-xs flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>在 WhatsApp 中发送预约信息</span>
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full sm:w-auto px-5 py-3 rounded-full text-xs font-medium text-gray-500 hover:text-gray-800 bg-gray-100 cursor-pointer"
                >
                  完成并返回
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-left">
              {/* Form Row 1: Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-medium text-[#4a3e3d] mb-1">
                    您的称呼 / 姓名 *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                    <input
                      type="text"
                      required
                      placeholder="如：陈小姐 / Kevin"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border border-pink-100 bg-white focus:outline-none focus:ring-2 focus:ring-[#c86b7b]/30 focus:border-[#c86b7b]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#4a3e3d] mb-1">
                    联络电话 / WhatsApp *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                    <input
                      type="tel"
                      required
                      placeholder="+60 1x-xxx xxxx"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border border-pink-100 bg-white focus:outline-none focus:ring-2 focus:ring-[#c86b7b]/30 focus:border-[#c86b7b]"
                    />
                  </div>
                </div>
              </div>

              {/* Form Row 2: Date & Package */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-medium text-[#4a3e3d] mb-1">
                    派对活动日期 *
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                    <input
                      type="date"
                      required
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border border-pink-100 bg-white focus:outline-none focus:ring-2 focus:ring-[#c86b7b]/30 focus:border-[#c86b7b]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#4a3e3d] mb-1">
                    意向套餐方案
                  </label>
                  <select
                    value={packageCode}
                    onChange={(e) => setPackageCode(e.target.value)}
                    className="w-full px-3 py-2 text-sm rounded-xl border border-pink-100 bg-white focus:outline-none focus:ring-2 focus:ring-[#c86b7b]/30 focus:border-[#c86b7b]"
                  >
                    {DECORATION_PACKAGES.map((p) => (
                      <option key={p.id} value={p.code}>
                        {p.name} {p.basePrice > 0 ? `(RM ${p.basePrice})` : ''}
                      </option>
                    ))}
                    <option value="全案高定非标方案">全案非标定制（独家3D手稿设计）</option>
                  </select>
                </div>
              </div>

              {/* Form Row 3: Event Type & Venue */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-medium text-[#4a3e3d] mb-1">
                    派对庆典类型
                  </label>
                  <select
                    value={eventType}
                    onChange={(e) => setEventType(e.target.value)}
                    className="w-full px-3 py-2 text-sm rounded-xl border border-pink-100 bg-white focus:outline-none focus:ring-2 focus:ring-[#c86b7b]/30 focus:border-[#c86b7b]"
                  >
                    <option value="宝宝百日宴 / 满月">宝宝百日宴 / 满月酒</option>
                    <option value="宝宝周岁宴 / 抓周">宝宝周岁宴 / 抓周礼</option>
                    <option value="18/21岁成人礼">18 / 21 岁成人礼</option>
                    <option value="闺蜜私享生日晚宴">闺蜜私享生日晚宴</option>
                    <option value="福寿康宁长辈祝寿">福寿康宁长辈祝寿</option>
                    <option value="浪漫求婚与纪念日">浪漫求婚与纪念日</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#4a3e3d] mb-1">
                    场地类型
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                    <select
                      value={venueType}
                      onChange={(e) => setVenueType(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border border-pink-100 bg-white focus:outline-none focus:ring-2 focus:ring-[#c86b7b]/30 focus:border-[#c86b7b]"
                    >
                      <option value="室内酒店宴会厅">室内酒店宴会厅</option>
                      <option value="精品西餐厅/咖啡馆">精品西餐厅 / 咖啡馆包间</option>
                      <option value="户外草坪/泳池边">户外草坪 / 泳池边</option>
                      <option value="居家客厅/公寓多功能厅">居家客厅 / 公寓 Function Room</option>
                      <option value="私人会所/庄园">私人会所 / 独栋 Villa 庄园</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Add-ons Section (Interactive & included in WhatsApp) */}
              <div className="rounded-2xl border border-pink-100 bg-pink-50/40 p-3.5 sm:p-4">
                <div
                  className="flex items-center justify-between cursor-pointer select-none"
                  onClick={() => setIsAddonsExpanded(!isAddonsExpanded)}
                >
                  <div className="flex items-center gap-2">
                    <ShoppingBag className="w-4 h-4 text-[#c86b7b]" />
                    <span className="text-xs font-bold text-[#4a3e3d]">
                      加购项目清单与配件选择
                    </span>
                    {activeAddonList.length > 0 && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#c86b7b] text-white">
                        已选 {activeAddonList.length} 项 (RM {addonsTotal})
                      </span>
                    )}
                  </div>
                  <button
                    type="button"
                    className="text-gray-400 hover:text-gray-600 focus:outline-none"
                  >
                    {isAddonsExpanded ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </button>
                </div>

                {isAddonsExpanded && (
                  <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2 border-t border-pink-100/70">
                    {MASTER_ADDONS.map((addon) => {
                      const qty = addons[addon.id] || 0;
                      const hasQty = qty > 0;
                      return (
                        <div
                          key={addon.id}
                          className={`p-2.5 rounded-xl border flex items-center justify-between gap-2 transition-all ${
                            hasQty
                              ? 'bg-white border-[#c86b7b]/40 shadow-xs'
                              : 'bg-white/70 border-pink-100 hover:border-pink-200'
                          }`}
                        >
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-1.5">
                              <span className="text-xs font-semibold text-[#3d3231] truncate">
                                {addon.name}
                              </span>
                            </div>
                            <div className="flex items-center gap-1.5 mt-0.5 text-[11px]">
                              <span className="font-bold text-[#c86b7b]">
                                RM {addon.price}
                              </span>
                              <span className="text-gray-400">/ {addon.unit}</span>
                              <span className="text-gray-400 text-[10px]">· {addon.note}</span>
                            </div>
                          </div>

                          {/* Stepper buttons */}
                          <div className="flex items-center gap-1 shrink-0 bg-pink-50/80 rounded-lg p-0.5 border border-pink-100">
                            <button
                              type="button"
                              onClick={() => updateAddonQty(addon.id, -1)}
                              disabled={qty <= 0}
                              className={`w-6 h-6 rounded-md flex items-center justify-center transition-colors ${
                                qty <= 0
                                  ? 'text-gray-300 cursor-not-allowed'
                                  : 'text-gray-600 hover:bg-white hover:text-[#c86b7b] cursor-pointer'
                              }`}
                              aria-label={`减少 ${addon.name}`}
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-5 text-center text-xs font-bold text-[#3d3231]">
                              {qty}
                            </span>
                            <button
                              type="button"
                              onClick={() => updateAddonQty(addon.id, 1)}
                              className="w-6 h-6 rounded-md flex items-center justify-center text-gray-600 hover:bg-white hover:text-[#c86b7b] transition-colors cursor-pointer"
                              aria-label={`增加 ${addon.name}`}
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Remarks */}
              <div>
                <label className="block text-xs font-medium text-[#4a3e3d] mb-1">
                  补充说明与特殊偏好 (选填)
                </label>
                <textarea
                  rows={2}
                  placeholder="如：期望主色调、宝宝名字、现场进场时间等"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full p-2.5 text-xs sm:text-sm rounded-xl border border-pink-100 bg-white focus:outline-none focus:ring-2 focus:ring-[#c86b7b]/30 focus:border-[#c86b7b]"
                />
              </div>

              {/* Price Calculation Notice */}
              <div className="p-3.5 bg-gradient-to-r from-pink-50 to-[#fff0f3] rounded-xl flex items-center justify-between text-xs border border-pink-100">
                <div className="space-y-0.5">
                  <span className="text-gray-500 font-medium block">
                    当前预估总价（套餐 + 已选加购）：
                  </span>
                  <span className="text-[11px] text-gray-400">
                    套餐 RM {basePrice} + 加购 RM {addonsTotal}
                  </span>
                </div>
                <span className="font-bold text-[#c86b7b] text-base sm:text-lg">
                  RM {currentTotal > 0 ? currentTotal : '按方案计算'}
                </span>
              </div>

              {/* Submit Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                <button
                  type="submit"
                  className="w-full sm:flex-1 py-3 px-6 rounded-full text-xs sm:text-sm font-semibold text-white bg-[#c86b7b] hover:bg-[#b55869] shadow-md hover:shadow-lg transition-all transform active:scale-98 cursor-pointer"
                >
                  立即提交并跳转 WhatsApp
                </button>

                <button
                  type="button"
                  onClick={handleWhatsAppDirect}
                  className="w-full sm:w-auto py-3 px-4 rounded-full text-xs font-medium text-[#1fa855] hover:bg-[#25D366]/10 border border-[#25D366]/40 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp 极速咨询</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
