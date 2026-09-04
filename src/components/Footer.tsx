import React from 'react';
import { Phone, Mail, MapPin, Sparkles, Clock, Heart } from 'lucide-react';
import { NAV_LINKS, BRAND_STATS, SERVICE_PROCESS } from '../data/packages';

interface FooterProps {
  onOpenBooking: () => void;
  onNavigate: (id: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenBooking, onNavigate }) => {
  return (
    <footer className="bg-[#302625] text-[#d6cdcc] pt-16 pb-24 md:pb-16 border-t border-[#443736]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Brand Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pb-12 mb-12 border-b border-[#443736]">
          {BRAND_STATS.map((stat, i) => (
            <div key={i} className="text-center sm:text-left">
              <span className="font-heading text-3xl sm:text-4xl font-bold text-[#f7a8b8] block">
                {stat.number}
              </span>
              <span className="text-xs sm:text-sm text-gray-400 mt-1 block">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        {/* 4-Step Process Section */}
        <div className="mb-14 pb-14 border-b border-[#443736]">
          <div className="text-center max-w-xl mx-auto mb-8">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#f7a8b8]">
              Service Process
            </span>
            <h3 className="font-heading text-2xl sm:text-3xl font-bold text-white mt-1">
              简单四步，开启梦幻生日派对
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICE_PROCESS.map((p, idx) => (
              <div key={idx} className="bg-[#3d3130] rounded-2xl p-5 border border-[#4d3e3d] flex flex-col justify-between">
                <div>
                  <span className="font-mono text-xs font-bold text-[#f7a8b8] bg-[#4a3a39] px-2.5 py-1 rounded-md">
                    {p.step}
                  </span>
                  <h4 className="font-heading text-lg font-bold text-white mt-3 mb-1">
                    {p.title}
                  </h4>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Footer Links & Info */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
          {/* Brand Col */}
          <div className="md:col-span-5 space-y-4">
            <span className="font-heading text-3xl font-bold text-white tracking-wide block">
              baby<span className="text-[#f7a8b8]">.</span>bloom
            </span>
            <p className="text-xs sm:text-sm text-gray-400 max-w-sm leading-relaxed">
              我们精心策划每一个宝贵的生日时刻。融合梦幻柔粉 3D 浮空立体气球、法式奢雅马卡龙层叠蛋糕台、发光霓虹字母牌与莫兰迪全案定制布景。
            </p>
            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={onOpenBooking}
                className="px-5 py-2.5 rounded-full text-xs font-semibold bg-[#c86b7b] hover:bg-[#b55869] text-white transition-all cursor-pointer"
              >
                立即预约档期
              </button>
              <a
                href="https://wa.me/60123456789"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-full text-xs font-medium text-[#f7a8b8] border border-[#f7a8b8]/40 hover:bg-[#f7a8b8]/10 transition-colors"
              >
                WhatsApp 咨询
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white">
              导航服务
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              {NAV_LINKS.map((link) => (
                <li key={link.id}>
                  <button
                    type="button"
                    onClick={() => onNavigate(link.id)}
                    className={`hover:text-[#f7a8b8] transition-colors cursor-pointer ${
                      link.active ? 'text-[#f7a8b8] font-medium' : 'text-gray-400'
                    }`}
                  >
                    {link.label}
                    {link.id === 'birthday' && ' · 生日派对美学'}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Location */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white">
              联络方式与服务区域
            </h4>
            <div className="space-y-2.5 text-xs sm:text-sm text-gray-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#f7a8b8] shrink-0 mt-0.5" />
                <span>吉隆坡 (Kuala Lumpur) · 雪兰莪 (Selangor) · 全马跨州定制</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#f7a8b8] shrink-0" />
                <a href="tel:+60123456789" className="hover:text-white transition-colors">
                  +60 12-345 6789 (WhatsApp 同号)
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#f7a8b8] shrink-0" />
                <span>contact@babybloom.my</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-[#f7a8b8] shrink-0" />
                <span>周一至周日 09:30 - 20:30 (全天在线)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright matching user's original exact text */}
        <div className="pt-8 border-t border-[#443736] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-400">
          <div className="flex items-center gap-1">
            <span>© 2026 BABY BLOOM. ALL RIGHTS RESERVED.</span>
          </div>
          <div className="flex items-center gap-4 text-gray-400 text-[11px]">
            <span>空间美学</span>
            <span>·</span>
            <span>3D气球定制</span>
            <span>·</span>
            <span>生日晚宴全案</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
