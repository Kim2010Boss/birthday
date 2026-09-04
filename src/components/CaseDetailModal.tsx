import React, { useEffect, useState } from 'react';
import { X, ChevronLeft, ChevronRight, Calendar, Camera } from 'lucide-react';
import { ShowcaseCase } from '../types';

interface CaseDetailModalProps {
  caseItem: ShowcaseCase | null;
  onClose: () => void;
  onBookThisCase: (caseItem: ShowcaseCase) => void;
  onUpdateCaseImage?: (caseId: string, dataUrl: string) => void;
}

export const CaseDetailModal: React.FC<CaseDetailModalProps> = ({
  caseItem,
  onClose,
  onBookThisCase,
  onUpdateCaseImage
}) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [overrideImage, setOverrideImage] = useState<string | null>(null);

  // Reset image index whenever a different case is selected
  useEffect(() => {
    setCurrentIdx(0);
    setOverrideImage(null);
  }, [caseItem]);

  const images = caseItem
    ? overrideImage
      ? [overrideImage, ...(caseItem.images || [])]
      : caseItem.images && caseItem.images.length > 0
        ? caseItem.images
        : [caseItem.image]
    : [];

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !caseItem) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const res = ev.target?.result as string;
      if (res) {
        setOverrideImage(res);
        try {
          const saved = JSON.parse(localStorage.getItem('party_case_custom_images') || '{}');
          saved[caseItem.id] = res;
          localStorage.setItem('party_case_custom_images', JSON.stringify(saved));
        } catch {
          // ignore quota
        }
        if (onUpdateCaseImage) {
          onUpdateCaseImage(caseItem.id, res);
        }
      }
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && images.length > 1) {
        setCurrentIdx((prev) => (prev > 0 ? prev - 1 : images.length - 1));
      }
      if (e.key === 'ArrowRight' && images.length > 1) {
        setCurrentIdx((prev) => (prev < images.length - 1 ? prev + 1 : 0));
      }
    };
    if (caseItem) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [caseItem, onClose, images.length]);

  if (!caseItem) return null;

  const currentImg = images[currentIdx] || caseItem.image;

  return (
    <div
      id="case-image-lightbox-backdrop"
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/92 backdrop-blur-md flex flex-col items-center justify-between p-3 sm:p-6 select-none animate-in fade-in duration-200"
    >
      {/* Top Header Bar */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-5xl flex items-center justify-between py-2 text-white z-10"
      >
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 rounded-full bg-white/15 text-xs font-semibold backdrop-blur-xs text-white">
            {caseItem.categoryLabel}
          </span>
          <h3 className="text-sm sm:text-base font-medium text-white/90 truncate max-w-xs sm:max-w-md">
            {caseItem.title}
          </h3>
          {images.length > 1 && (
            <span className="text-xs text-white/70 bg-white/10 px-2.5 py-0.5 rounded-full">
              {currentIdx + 1} / {images.length}
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={onClose}
          className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer focus:outline-none"
          aria-label="关闭预览"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Center Image Container */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative flex-1 w-full max-w-5xl flex items-center justify-center my-auto p-1 sm:p-4"
      >
        <img
          src={currentImg}
          alt={caseItem.title}
          className="max-h-[76vh] max-w-full w-auto object-contain rounded-2xl shadow-2xl transition-all duration-200 pointer-events-auto"
        />

        {/* Previous / Next buttons for multiple images */}
        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={() =>
                setCurrentIdx((prev) => (prev > 0 ? prev - 1 : images.length - 1))
              }
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/60 hover:bg-black/85 text-white flex items-center justify-center backdrop-blur-xs transition-colors cursor-pointer border border-white/20"
              aria-label="上一张图片"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              type="button"
              onClick={() =>
                setCurrentIdx((prev) => (prev < images.length - 1 ? prev + 1 : 0))
              }
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/60 hover:bg-black/85 text-white flex items-center justify-center backdrop-blur-xs transition-colors cursor-pointer border border-white/20"
              aria-label="下一张图片"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </>
        )}
      </div>

      {/* Bottom Bar with Thumbnails & Actions */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-5xl flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 pb-1 z-10"
      >
        {/* Thumbnails */}
        {images.length > 1 ? (
          <div className="flex items-center gap-2 overflow-x-auto max-w-full py-1">
            {images.map((img, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrentIdx(idx)}
                className={`relative w-12 h-12 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                  currentIdx === idx
                    ? 'border-[#e88495] scale-105 shadow-md shadow-pink-500/40'
                    : 'border-white/20 opacity-60 hover:opacity-100'
                }`}
              >
                <img
                  src={img}
                  alt={`实景 ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        ) : (
          <div />
        )}

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-medium transition-colors cursor-pointer"
          >
            返回
          </button>
          <button
            type="button"
            onClick={() => onBookThisCase(caseItem)}
            className="px-6 py-2 rounded-full bg-[#c86b7b] hover:bg-[#b55869] text-white text-xs sm:text-sm font-semibold transition-colors flex items-center gap-2 cursor-pointer shadow-lg shadow-pink-900/40"
          >
            <Calendar className="w-4 h-4" />
            <span>以此实例咨询预约</span>
          </button>
        </div>
      </div>
    </div>
  );
};

