import React, { useState, useEffect } from 'react';

function useAnimatedCount(targetValue, duration = 800) {
  const [displayValue, setDisplayValue] = useState(targetValue);

  useEffect(() => {
    let startTime = null;
    const startValue = displayValue;
    const diff = targetValue - startValue;

    if (diff === 0) return;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(Math.round(startValue + diff * easeProgress));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [targetValue]);

  return displayValue;
}

export default function Navbar({ activeTab, setActiveTab, totalTrees }) {
  const animatedTrees = useAnimatedCount(totalTrees);
  const [isBumping, setIsBumping] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setIsBumping(true);
    const timer = setTimeout(() => setIsBumping(false), 600);
    return () => clearTimeout(timer);
  }, [totalTrees]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { id: 'home', label: 'Home', icon: 'home' },
    { id: 'submit', label: 'Plant a Tree', icon: 'potted_plant' },
    { id: 'community', label: 'Community Forest', icon: 'forest' },
    { id: 'sdg', label: 'SDG 13 Impact', icon: 'psychiatry' },
  ];

  const handleMobileNav = (tabId) => {
    setActiveTab(tabId);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav className="rounded-full h-20 px-6 sm:px-8 bg-[#fff8f5]/90 backdrop-blur-md border-2 border-[#b0284b]/10 shadow-[0_8px_32px_rgba(176,40,75,0.1)] z-40 flex justify-between items-center max-w-7xl mx-auto w-full sticky top-4 mb-6 transition-all">
        {/* Logo and Brand */}
        <div 
          onClick={() => setActiveTab('home')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <img
            src="/assets/lorax_tree_logo.png"
            alt="Truffula Tracker"
            className="h-11 sm:h-12 w-auto object-contain group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300 drop-shadow-sm"
          />
          <div>
            <span className="font-['Quicksand'] font-bold text-xl sm:text-2xl text-[#b0284b] tracking-tight">
              Truffula Tracker
            </span>
          </div>
        </div>

        {/* Desktop Navigation Tabs (Unchanged on PC) */}
        <div className="hidden md:flex gap-6 lg:gap-8 items-center h-full">
          {navLinks.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`font-['Quicksand'] font-bold text-sm h-full flex items-center px-2 transition-all cursor-pointer ${
                  isActive
                    ? 'text-[#b0284b] border-b-4 border-[#feb72f] pt-1 scale-105'
                    : 'text-[#584143] hover:text-[#b0284b] hover:bg-[#fff8f5]'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Desktop Counter & CTA Button (Unchanged on PC) */}
        <div className="flex items-center gap-3">
          <div
            className={`hidden lg:flex items-center gap-1.5 bg-[#ffe3d3] px-4 py-2 rounded-full font-['Quicksand'] font-bold text-sm text-[#7e5700] border border-[#ffdbc7] transition-all shadow-sm ${
              isBumping ? 'animate-badge-pop bg-[#fed7aa] text-[#006c49]' : ''
            }`}
          >
            <span className="text-base">🌱</span>
            <span>
              {animatedTrees.toLocaleString()} {animatedTrees === 1 ? 'Tree' : 'Trees'}
            </span>
          </div>

          <button
            onClick={() => setActiveTab('submit')}
            className="hidden md:flex bg-[#b0284b] text-white font-['Quicksand'] font-bold text-sm px-5 sm:px-6 py-3 rounded-full hover:scale-105 transition-all duration-200 shadow-md items-center gap-1.5 active:scale-95 chunky-btn-shadow cursor-pointer"
          >
            <span className="material-symbols-outlined text-lg leading-none">add</span>
            <span>Log Planted Tree</span>
          </button>

          {/* Mobile Hamburger Menu Button (Phone view only) */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="md:hidden w-12 h-12 rounded-full bg-[#ffe3d3] text-[#b0284b] hover:bg-[#ffdbc7] transition-all border-2 border-[#ffdbc7] flex items-center justify-center active:scale-95 shadow-sm cursor-pointer"
            aria-label="Open Navigation Menu"
          >
            <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: '"FILL" 1' }}>
              menu
            </span>
          </button>
        </div>
      </nav>

      {/* Mobile Slide-Out Sidebar / Drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden animate-fadeIn">
          {/* Dark Backdrop Overlay */}
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setIsMobileMenuOpen(false)}
          ></div>

          {/* Right-aligned Slide-Out Drawer */}
          <div className="fixed inset-y-0 right-0 max-w-xs w-full bg-[#fff8f5] shadow-2xl border-l-4 border-[#ffdbc7] flex flex-col justify-between p-6 z-50 overflow-y-auto animate-fadeIn">
            <div>
              {/* Drawer Header */}
              <div className="flex items-center justify-between pb-6 border-b border-[#ffdbc7]">
                <div className="flex items-center gap-2.5">
                  <img
                    src="/assets/lorax_tree_logo.png"
                    alt="Truffula Tracker"
                    className="h-10 w-auto object-contain"
                  />
                  <span className="font-['Quicksand'] font-bold text-xl text-[#b0284b]">
                    Truffula Tracker
                  </span>
                </div>

                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 rounded-full text-[#584143] hover:text-[#b0284b] hover:bg-[#ffe3d3] transition-colors cursor-pointer"
                  aria-label="Close Menu"
                >
                  <span className="material-symbols-outlined text-2xl">close</span>
                </button>
              </div>

              {/* Mobile Live Tree Counter Badge */}
              <div className="mt-5 p-3.5 rounded-2xl bg-[#ffe3d3] border border-[#ffdbc7] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xl">🌱</span>
                  <div>
                    <p className="text-[10px] uppercase font-bold text-[#7e5700]">Total Reforested</p>
                    <p className="font-['Quicksand'] font-bold text-base text-[#006c49]">
                      {animatedTrees.toLocaleString()} Truffula {animatedTrees === 1 ? 'Tree' : 'Trees'}
                    </p>
                  </div>
                </div>
                <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] animate-ping"></span>
              </div>

              {/* Navigation Links */}
              <div className="flex flex-col gap-2 mt-6">
                {navLinks.map((tab) => {
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => handleMobileNav(tab.id)}
                      className={`flex items-center gap-3.5 w-full px-4 py-3.5 rounded-2xl font-['Quicksand'] font-bold text-base transition-all text-left cursor-pointer ${
                        isActive
                          ? 'bg-[#ff6584] text-[#6a0024] shadow-md border-b-2 border-[#b0284b]'
                          : 'text-[#584143] hover:bg-[#ffe3d3] hover:text-[#b0284b]'
                      }`}
                    >
                      <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: isActive ? '"FILL" 1' : '"FILL" 0' }}>
                        {tab.icon}
                      </span>
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Drawer Footer Actions */}
            <div className="pt-6 border-t border-[#ffdbc7] space-y-3">
              <button
                onClick={() => handleMobileNav('submit')}
                className="w-full bg-[#b0284b] hover:bg-[#8f0935] text-white font-['Quicksand'] font-bold py-3.5 px-6 rounded-full shadow-md flex items-center justify-center gap-2 active:scale-95 chunky-btn-shadow transition-all cursor-pointer text-sm"
              >
                <span className="material-symbols-outlined text-lg">add</span>
                <span>Log Planted Tree</span>
              </button>

              <p className="font-['Quicksand'] font-bold text-[11px] text-center text-[#7e5700] italic leading-tight px-2">
                "Unless someone like you cares a whole awful lot..."
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
