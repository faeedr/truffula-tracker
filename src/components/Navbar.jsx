import React from 'react';

export default function Navbar({ activeTab, setActiveTab, totalTrees }) {
  return (
    <nav className="rounded-full h-20 px-6 sm:px-8 bg-[#fff8f5]/90 backdrop-blur-md border-2 border-[#b0284b]/10 shadow-[0_8px_32px_rgba(176,40,75,0.1)] z-50 flex justify-between items-center max-w-7xl mx-auto w-full sticky top-4 mb-6 transition-all">
      {/* Brand Logo with New Lorax Tree Icon */}
      <div 
        onClick={() => setActiveTab('home')}
        className="flex items-center gap-3 cursor-pointer group"
      >
        <img
          src="/assets/lorax_tree_logo.png"
          alt="Truffula Tracker Logo"
          className="h-11 sm:h-12 w-auto object-contain group-hover:scale-110 transition-transform duration-300 drop-shadow-sm"
        />
        <div>
          <span className="font-['Quicksand'] font-bold text-2xl text-[#b0284b] tracking-tight">
            Truffula Tracker
          </span>
        </div>
      </div>

      {/* Navigation Links */}
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
                  ? 'text-[#b0284b] border-b-4 border-[#feb72f] pt-1'
                  : 'text-[#584143] hover:text-[#b0284b] hover:bg-[#fff8f5]'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Counter & Action CTA */}
      <div className="flex items-center gap-3">
        <div className="hidden lg:flex items-center gap-1 bg-[#ffe3d3] px-4 py-2 rounded-full font-['Quicksand'] font-bold text-sm text-[#7e5700] border border-[#ffdbc7]">
          🌱 {totalTrees.toLocaleString()} {totalTrees === 1 ? 'Tree' : 'Trees'}
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
