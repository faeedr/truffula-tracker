import React, { useState, useEffect, useRef } from 'react';
import { CO2_PER_TREE_KG, O2_PER_TREE_KG } from '../data/mockData';
import TruffulaGroveCanvas from './TruffulaGroveCanvas';

function AnimatedStatNumber({ value, isVisible, decimals = 0, suffix = '' }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!isVisible) {
      setCurrent(0);
      return;
    }

    let startTime = null;
    const target = Number(value) || 0;
    const duration = 1200;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const nextVal = easeProgress * target;
      
      setCurrent(nextVal);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCurrent(target);
      }
    };

    requestAnimationFrame(animate);
  }, [value, isVisible]);

  return (
    <span>
      {decimals > 0 ? current.toFixed(decimals) : Math.round(current).toLocaleString()}
      {suffix}
    </span>
  );
}

export default function HomeView({ setActiveTab, totalTrees, totalGroups }) {
  const totalCO2Tons = (totalTrees * CO2_PER_TREE_KG) / 1000;
  const totalO2Tons = (totalTrees * O2_PER_TREE_KG) / 1000;

  const statsRef = useRef(null);
  const [isStatsVisible, setIsStatsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsStatsVisible(true);
        }
      },
      { threshold: 0.25 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="flex flex-col gap-12 animate-fadeIn pb-16">
      <section className="relative rounded-3xl overflow-hidden mt-2 flex items-center justify-start p-6 sm:p-10 md:p-14 lorax-shadow min-h-[560px] md:min-h-[600px] border-2 border-[#ff6584]/20">
        <div className="absolute inset-0 bg-black/15 z-10"></div>
        
        <div
          className="absolute inset-0 bg-cover bg-center md:bg-top"
          style={{
            backgroundImage: 'url(/assets/stitch_hero_bg.jpg)',
            opacity: 0.95,
          }}
        ></div>

        <div className="relative z-20 w-full max-w-5xl flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 max-w-xl text-left bg-[#fff8f5]/40 backdrop-blur-xl p-8 md:p-12 rounded-[2rem] border-4 border-[#ffdbc7] shadow-2xl card-pop">
            <h1 className="font-['Quicksand'] font-bold text-3xl sm:text-4xl md:text-5xl text-[#311300] mb-6 drop-shadow-sm leading-tight">
              Speak for the Trees. Take Action for Climate.
            </h1>
            <p className="font-['Be_Vietnam_Pro'] text-base sm:text-lg text-[#584143] mb-10 leading-relaxed font-medium">
              Track every seed planted, restore the forest, and combat global warming in real-time.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-start">
              <button
                onClick={() => setActiveTab('submit')}
                className="bg-[#ff6584] text-[#6a0024] font-['Quicksand'] font-bold text-base px-8 py-4 rounded-full flex items-center justify-center gap-2 hover:brightness-110 transition-all chunky-btn-shadow cursor-pointer hover:scale-105 active:scale-95"
              >
                <span className="material-symbols-outlined" style={{ fontVariationSettings: '"FILL" 1' }}>
                  potted_plant
                </span>
                <span>Start Planting Today</span>
              </button>

              <button
                onClick={() => setActiveTab('community')}
                className="border-2 border-[#b0284b] text-[#b0284b] font-['Quicksand'] font-bold text-base px-8 py-4 rounded-full hover:bg-[#b0284b] hover:text-white transition-all bg-[#fff8f5]/50 backdrop-blur-sm cursor-pointer hover:scale-105 active:scale-95 flex items-center justify-center gap-1.5"
              >
                <span className="material-symbols-outlined text-lg">forest</span>
                <span>View Community Forest</span>
              </button>
            </div>
          </div>

          <div className="hidden md:block flex-1"></div>
        </div>
      </section>

      <section className="space-y-3">
        <div className="px-2">
          <h2 className="font-['Quicksand'] font-bold text-2xl text-[#311300]">
            Interactive Truffula Valley Grove
          </h2>
          <p className="text-xs sm:text-sm text-[#584143]">
            Watch new trees sprout in real-time as projects are submitted!
          </p>
        </div>
        <TruffulaGroveCanvas totalTrees={totalTrees} />
      </section>

      <section ref={statsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-3xl lorax-shadow card-pop border-b-4 border-[#006c49] border-t border-x border-[#ffdbc7]/50">
          <div className="w-12 h-12 bg-[#006c49]/20 text-[#006c49] rounded-2xl flex items-center justify-center mb-4">
            <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: '"FILL" 1' }}>
              forest
            </span>
          </div>
          <h3 className="font-['Quicksand'] font-bold text-3xl text-[#311300]">
            <AnimatedStatNumber value={totalTrees} isVisible={isStatsVisible} />
          </h3>
          <p className="font-['Quicksand'] text-xs font-bold text-[#584143] uppercase tracking-wider mt-1">
            Total Trees Planted
          </p>
        </div>

        <div className="bg-white p-6 rounded-3xl lorax-shadow card-pop border-b-4 border-[#feb72f] border-t border-x border-[#ffdbc7]/50">
          <div className="w-12 h-12 bg-[#feb72f]/20 text-[#7e5700] rounded-2xl flex items-center justify-center mb-4">
            <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: '"FILL" 1' }}>
              group
            </span>
          </div>
          <h3 className="font-['Quicksand'] font-bold text-3xl text-[#311300]">
            <AnimatedStatNumber value={totalGroups} isVisible={isStatsVisible} />
          </h3>
          <p className="font-['Quicksand'] text-xs font-bold text-[#584143] uppercase tracking-wider mt-1">
            Groups contributed
          </p>
        </div>

        <div className="bg-white p-6 rounded-3xl lorax-shadow card-pop border-b-4 border-[#4edea3] border-t border-x border-[#ffdbc7]/50">
          <div className="w-12 h-12 bg-[#4edea3]/20 text-[#003a25] rounded-2xl flex items-center justify-center mb-4">
            <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: '"FILL" 1' }}>
              cloud_sync
            </span>
          </div>
          <h3 className="font-['Quicksand'] font-bold text-3xl text-[#311300]">
            <AnimatedStatNumber value={totalCO2Tons} isVisible={isStatsVisible} decimals={1} suffix=" Tons" />
          </h3>
          <p className="font-['Quicksand'] text-xs font-bold text-[#584143] uppercase tracking-wider mt-1">
            Annual CO2 Offset
          </p>
        </div>

        <div className="bg-white p-6 rounded-3xl lorax-shadow card-pop border-b-4 border-[#ff6584] border-t border-x border-[#ffdbc7]/50 relative overflow-hidden">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-[#ff6584]/10 rounded-full blur-xl"></div>
          <div className="w-12 h-12 bg-[#ff6584]/20 text-[#b0284b] rounded-2xl flex items-center justify-center mb-4">
            <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: '"FILL" 1' }}>
              air
            </span>
          </div>
          <h3 className="font-['Quicksand'] font-bold text-3xl text-[#311300]">
            <AnimatedStatNumber value={totalO2Tons} isVisible={isStatsVisible} decimals={1} suffix=" Tons" />
          </h3>
          <p className="font-['Quicksand'] text-xs font-bold text-[#584143] uppercase tracking-wider mt-1 mb-2">
            Oxygen Generated
          </p>
          <div className="inline-block bg-[#ffdbc7] text-[#584143] text-xs font-bold px-2.5 py-1 rounded-full">
            100% Free vs. O'Hare Bottled Air!
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-8">
        <h2 className="font-['Quicksand'] font-bold text-3xl sm:text-4xl text-center text-[#ff6584]">
          Why SDG 13 Matters
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-3xl overflow-hidden lorax-shadow group flex flex-col justify-between border-2 border-[#ffdbc7] card-pop">
            <div>
              <div className="h-64 relative overflow-hidden bg-slate-900">
                <img
                  src="/assets/ted_holding_seed.png"
                  alt="The Last Truffula Seed"
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-6 sm:p-8">
                <h3 className="font-['Quicksand'] font-bold text-2xl text-[#311300] mb-4">
                  The Lesson of Thneedville
                </h3>
                <p className="font-['Be_Vietnam_Pro'] text-sm sm:text-base text-[#584143] leading-relaxed mb-6">
                  When the last Truffula tree falls, the real cost of unchecked industry becomes clear. Smog-filled skies and artificial landscapes are a warning. Climate action (SDG 13) demands we heed this warning before it's too late to reverse the damage.
                </p>
              </div>
            </div>

            <div className="p-6 sm:p-8 pt-0">
              <button
                onClick={() => setActiveTab('sdg')}
                className="inline-flex items-center justify-center bg-[#ff6584] text-[#6a0024] font-['Quicksand'] font-bold text-sm px-6 py-3 rounded-full transition-all duration-200 hover:scale-105 active:scale-95 chunky-btn-shadow cursor-pointer"
              >
                <span>Learn More about SDG 13</span>
                <span className="material-symbols-outlined text-base ml-2">arrow_forward</span>
              </button>
            </div>
          </div>

          <div className="bg-[#006c49]/10 rounded-3xl overflow-hidden lorax-shadow flex flex-col justify-center p-6 sm:p-8 border-l-8 border-[#006c49] border-2 border-[#006c49]/20 relative card-pop">
            <span
              className="material-symbols-outlined text-9xl absolute -bottom-10 -right-10 text-[#006c49]/10 rotate-12 pointer-events-none transition-transform group-hover:rotate-45 duration-700"
              style={{ fontVariationSettings: '"FILL" 1' }}
            >
              public
            </span>

            <div className="relative z-10 space-y-4">
              <div className="bg-[#006c49] text-white font-['Quicksand'] font-bold text-xs inline-block px-4 py-1.5 rounded-full shadow-sm">
                Global Goal 13
              </div>

              <h3 className="font-['Quicksand'] font-bold text-2xl text-[#006c49]">
                Our Real-World Solution
              </h3>

              <p className="font-['Be_Vietnam_Pro'] text-base text-[#584143] font-semibold">
                Planting trees is the most direct action we can take.
              </p>

              <ul className="space-y-3 font-['Be_Vietnam_Pro'] text-sm sm:text-base text-[#584143]">
                <li className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-[#006c49] mt-0.5" style={{ fontVariationSettings: '"FILL" 1' }}>
                    check_circle
                  </span>
                  <span><strong>Urban Cooling:</strong> Trees reduce city temperatures by up to 8°C.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-[#006c49] mt-0.5" style={{ fontVariationSettings: '"FILL" 1' }}>
                    check_circle
                  </span>
                  <span><strong>Carbon Sink:</strong> Mature forests are vital for absorbing atmospheric CO2.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-[#006c49] mt-0.5" style={{ fontVariationSettings: '"FILL" 1' }}>
                    check_circle
                  </span>
                  <span><strong>Biodiversity:</strong> Restoring habitats for local wildlife and pollinators.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
