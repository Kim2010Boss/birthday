import React, { useState, useEffect } from 'react';
import { Menu, X, Calendar, Phone, Sparkles } from 'lucide-react';
import { NAV_LINKS } from '../data/packages';

interface NavbarProps {
  onOpenBooking: (packageCode?: string) => void;
  activeSection: string;
  onNavigate: (id: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenBooking,
  activeSection,
  onNavigate
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent background scroll when mobile drawer is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const handleLinkClick = (id: string) => {
    setIsMobileMenuOpen(false);
    onNavigate(id);
  };

  return (
    <>
      <header
        id="site-header"
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/90 backdrop-blur-md shadow-xs border-b border-rose-100/70 py-3'
            : 'bg-transparent py-4 sm:py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <button
            type="button"
            id="nav-logo"
            onClick={() => handleLinkClick('home')}
            className="flex items-baseline gap-1 group text-left cursor-pointer focus:outline-none"
          >
            <span className="font-heading text-2xl sm:text-3xl font-semibold tracking-wide text-[#3d3231] group-hover:text-[#c86b7b] transition-colors">
              baby<span className="text-[#c86b7b]">.</span>bloom
            </span>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2 bg-white/70 backdrop-blur-sm px-4 py-1.5 rounded-full border border-pink-100/80 shadow-xs">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.id || link.active;
              return (
                <button
                  key={link.id}
                  id={`nav-link-${link.id}`}
                  onClick={() => handleLinkClick(link.id)}
                  className={`px-3.5 py-1.5 text-sm font-medium rounded-full transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#c86b7b] text-white shadow-xs'
                      : 'text-[#5d5251] hover:text-[#c86b7b] hover:bg-pink-50/60'
                  }`}
                >
                  {link.label}
                  {link.id === 'birthday' && (
                    <span className="ml-1 inline-block w-1.5 h-1.5 rounded-full bg-rose-200 align-middle"></span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action / CTA Buttons */}
          <div className="hidden sm:flex items-center gap-2.5">
            <a
              id="header-phone-btn"
              href="tel:+60123456789"
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-[#786b6a] hover:text-[#c86b7b] transition-colors rounded-full"
            >
              <Phone className="w-3.5 h-3.5 text-[#c86b7b]" />
              <span>+60 12-345 6789</span>
            </a>

            <button
              type="button"
              id="header-booking-cta"
              onClick={() => onOpenBooking()}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold text-white bg-[#c86b7b] hover:bg-[#b55869] shadow-xs hover:shadow-sm transition-all transform active:scale-95 cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>预约档期</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 sm:hidden">
            <button
              type="button"
              id="mobile-quick-book-btn"
              onClick={() => onOpenBooking()}
              className="px-2.5 py-1.5 text-xs font-medium bg-[#c86b7b] text-white rounded-full flex items-center gap-1"
            >
              <Sparkles className="w-3 h-3" />
              <span>预约</span>
            </button>
            <button
              type="button"
              id="mobile-menu-toggle"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white/80 border border-pink-200 text-[#4a3e3d] hover:text-[#c86b7b] active:scale-95 transition-all focus:outline-none"
              aria-label="切换菜单"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      <div
        id="mobile-drawer-overlay"
        onClick={() => setIsMobileMenuOpen(false)}
        className={`fixed inset-0 z-50 bg-black/40 backdrop-blur-xs transition-opacity duration-300 md:hidden ${
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      />

      <div
        id="mobile-drawer-menu"
        className={`fixed top-0 right-0 bottom-0 z-50 w-[80%] max-w-xs bg-white shadow-2xl flex flex-col justify-between p-6 transition-transform duration-300 ease-out md:hidden ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div>
          <div className="flex items-center justify-between pb-6 border-b border-pink-100">
            <span className="font-heading text-2xl font-semibold text-[#3d3231]">
              baby<span className="text-[#c86b7b]">.</span>bloom
            </span>
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-8 h-8 rounded-full flex items-center justify-center text-gray-500 hover:text-gray-900 bg-pink-50 focus:outline-none"
              aria-label="关闭菜单"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="py-6 space-y-1">
            <p className="text-[11px] uppercase tracking-wider text-gray-400 font-semibold mb-3 px-3">
              导航服务
            </p>
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.id || link.active;
              return (
                <button
                  key={link.id}
                  type="button"
                  id={`drawer-link-${link.id}`}
                  onClick={() => handleLinkClick(link.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-left text-base font-medium transition-all ${
                    isActive
                      ? 'bg-pink-50 text-[#c86b7b] font-semibold'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-[#c86b7b]'
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-[#c86b7b] text-white">
                      当前
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="pt-2 border-t border-pink-100/60 space-y-2">
            <button
              type="button"
              id="drawer-book-btn"
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full py-3 px-4 rounded-xl text-sm font-semibold text-white bg-[#c86b7b] hover:bg-[#b55869] shadow-sm flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>立即预约档期</span>
            </button>
            <a
              href="tel:+60123456789"
              className="w-full py-3 px-4 rounded-xl text-sm font-medium text-[#5d5251] bg-pink-50/70 hover:bg-pink-100/70 flex items-center justify-center gap-2 transition-colors"
            >
              <Phone className="w-4 h-4 text-[#c86b7b]" />
              <span>电话咨询 (+60 12-345 6789)</span>
            </a>
          </div>
        </div>

        {/* Footer info in drawer */}
        <div className="pt-4 border-t border-gray-100 text-xs text-gray-400">
          <p>营业时间: 周一至周日 09:30 - 20:30</p>
          <p className="mt-1">吉隆坡 · 雪兰莪及全马跨州定制</p>
          <p className="mt-2 text-[11px]">© 2026 BABY BLOOM. ALL RIGHTS RESERVED.</p>
        </div>
      </div>
    </>
  );
};
