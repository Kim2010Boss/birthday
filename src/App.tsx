/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { FeaturedGallery } from './components/FeaturedGallery';
import { PackageCalculator } from './components/PackageCalculator';
import { Footer } from './components/Footer';
import { MobileBottomBar } from './components/MobileBottomBar';
import { BookingModal } from './components/BookingModal';
import { CaseDetailModal } from './components/CaseDetailModal';
import { ShowcaseCase } from './types';

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('birthday');
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingPackageCode, setBookingPackageCode] = useState<string>('Type 1');
  const [bookingAddons, setBookingAddons] = useState<Record<string, number>>({});
  const [bookingEstimatedTotal, setBookingEstimatedTotal] = useState<number | undefined>(undefined);
  const [selectedCase, setSelectedCase] = useState<ShowcaseCase | null>(null);

  const handleOpenBooking = (
    packageCode: string = 'Type 1',
    addons: Record<string, number> = {},
    estimatedTotal?: number
  ) => {
    setBookingPackageCode(packageCode);
    setBookingAddons(addons);
    setBookingEstimatedTotal(estimatedTotal);
    setIsBookingOpen(true);
  };

  const handleSelectCase = (caseItem: ShowcaseCase) => {
    setSelectedCase(caseItem);
  };

  const handleBookThisCase = (caseItem: ShowcaseCase) => {
    setSelectedCase(null);
    handleOpenBooking(caseItem.title);
  };

  const handleScrollToPackages = () => {
    const el = document.getElementById('packages');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToEstimator = () => {
    const el = document.getElementById('price-estimator');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      handleScrollToPackages();
    }
  };

  const handleNavigate = (id: string) => {
    setActiveSection(id);
    if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (id === 'birthday') {
      const el = document.getElementById('gallery');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else {
      // If other categories like 婚礼 or 公司 are clicked, scroll to packages or open booking
      handleScrollToPackages();
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fdf8f9] text-[#3d3231]">
      {/* Top Glassmorphic Navigation Bar */}
      <Navbar
        onOpenBooking={() => handleOpenBooking('全案预约')}
        activeSection={activeSection}
        onNavigate={handleNavigate}
      />

      {/* Main Content Sections */}
      <main className="flex-grow">
        {/* 3D Pastel Balloon & Cake Hero Section */}
        <Hero
          onOpenBooking={() => handleOpenBooking('全案预约')}
          onScrollToPackages={handleScrollToPackages}
        />

        {/* Featured Setups Showcase (Asymmetric layout) */}
        <FeaturedGallery
          onSelectCase={handleSelectCase}
          onOpenBookingForCase={handleBookThisCase}
        />

        {/* Packages & Interactive Pricing / Add-on Calculator */}
        <PackageCalculator
          onOpenBooking={(pkgCode, addons, total) =>
            handleOpenBooking(pkgCode, addons, total)
          }
        />
      </main>

      {/* Footer with service details and user copyright */}
      <Footer
        onOpenBooking={() => handleOpenBooking('全案预约')}
        onNavigate={handleNavigate}
      />

      {/* Dedicated Thumb-Friendly Bottom Bar for Mobile Viewports */}
      <MobileBottomBar
        onOpenBooking={() => handleOpenBooking('移动端预约')}
        onScrollToEstimator={handleScrollToEstimator}
      />

      {/* Booking & Schedule Consultation Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        initialPackageCode={bookingPackageCode}
        initialAddons={bookingAddons}
        estimatedTotal={bookingEstimatedTotal}
      />

      {/* Case Study Details Lightbox Modal */}
      <CaseDetailModal
        caseItem={selectedCase}
        onClose={() => setSelectedCase(null)}
        onBookThisCase={handleBookThisCase}
      />
    </div>
  );
}
