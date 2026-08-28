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

  useEffect(() => {
    setIsBumping(true);
    const timer = setTimeout(() => setIsBumping(false), 600);
    return () => clearTimeout(timer);
  }, [totalTrees]);

  return (
    <nav className="rounded-full h-20 px-6 sm:px-8 bg-[#fff8f5]/90 backdrop-blur-md border-2 border-[#b0284b]/10 shadow-[0_8px_32px_rgba(176,40,75,0.1)] z-50 flex justify-between items-center max-w-7xl mx-auto w-full sticky top-4 mb-6 transition-all">
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
          <span className="font-['Quicksand'] font-bold text-2xl text-[#b0284b] tracking-tight">
            Truffula Tracker
          </span>
        </div>
      </div>

      <div className="hidden md:flex gap-6 lg:gap-8 items-center h-full">
        {[
          { id: 'home', label: 'Home' },
          { id: 'submit', label: 'Plant a Tree' },
          { id: 'community', label: 'Community Forest' },
          { id: 'sdg', label: 'SDG 13 Impact' },
        ].map((tab) => {
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
          className="bg-[#b0284b] text-white font-['Quicksand'] font-bold text-sm px-5 sm:px-6 py-3 rounded-full hover:scale-105 transition-all duration-200 shadow-md flex items-center gap-1.5 active:scale-95 chunky-btn-shadow cursor-pointer"
        >
          <span className="material-symbols-outlined text-lg leading-none">add</span>
          <span>Log Planted Tree</span>
        </button>
      </div>
    </nav>
  );
}
