import React from 'react';
import { MessageSquare, Calculator, Calendar, Phone } from 'lucide-react';

interface MobileBottomBarProps {
  onOpenBooking: () => void;
  onScrollToEstimator: () => void;
}

export const MobileBottomBar: React.FC<MobileBottomBarProps> = ({
  onOpenBooking,
  onScrollToEstimator
}) => {
  return (
    <div
      id="mobile-bottom-dock"
      className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-pink-100/90 px-4 py-2.5 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] flex items-center justify-between gap-2"
      style={{ paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 0.6rem)' }}
    >
      {/* Quick Phone Call */}
      <a
        href="tel:+60123456789"
        className="flex flex-col items-center justify-center text-[#786b6a] hover:text-[#c86b7b] px-2 py-1 transition-colors"
        aria-label="一键拨号"
      >
        <Phone className="w-4 h-4 text-[#c86b7b]" />
        <span className="text-[10px] mt-0.5 font-medium">电话</span>
      </a>

      {/* WhatsApp Quick Chat */}
      <a
        href="https://wa.me/60123456789?text=%E6%82%A8%E5%A5%BD%EF%BC%8C%E6%83%B3%E5%92%A8%E8%AF%A2Baby%20Bloom%E7%94%9F%E6%97%A5%E6%B4%BE%E5%AF%B9%E5%B8%83%E7%BD%AE"
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col items-center justify-center text-[#786b6a] hover:text-[#25D366] px-2 py-1 transition-colors"
        aria-label="WhatsApp 咨询"
      >
        <MessageSquare className="w-4 h-4 text-[#25D366]" />
        <span className="text-[10px] mt-0.5 font-medium">WhatsApp</span>
      </a>

      {/* Calculator Shortcut */}
      <button
        type="button"
        onClick={onScrollToEstimator}
        className="flex flex-col items-center justify-center text-[#786b6a] hover:text-[#c86b7b] px-2 py-1 transition-colors cursor-pointer"
        aria-label="价格测算"
      >
        <Calculator className="w-4 h-4 text-[#c86b7b]" />
        <span className="text-[10px] mt-0.5 font-medium">预算测算</span>
      </button>

      {/* Primary Booking Button */}
      <button
        type="button"
        id="mobile-dock-book-btn"
        onClick={onOpenBooking}
        className="flex-1 ml-1 py-2.5 px-4 rounded-full text-xs font-semibold text-white bg-[#c86b7b] hover:bg-[#b55869] shadow-xs flex items-center justify-center gap-1.5 active:scale-98 transition-all cursor-pointer"
      >
        <Calendar className="w-3.5 h-3.5" />
        <span>立即预约档期</span>
      </button>
    </div>
  );
};
