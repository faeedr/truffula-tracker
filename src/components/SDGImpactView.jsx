import React, { useState } from 'react';
import { CO2_PER_TREE_KG, O2_PER_TREE_KG, OHARE_BOTTLES_SAVED_PER_TREE } from '../data/mockData';

export default function SDGImpactView({ setActiveTab }) {
  const [sliderTrees, setSliderTrees] = useState(50);

  const co2Absorbed = (sliderTrees * CO2_PER_TREE_KG).toLocaleString();
  const o2Produced = (sliderTrees * O2_PER_TREE_KG).toLocaleString();
  const bottlesAvoided = (sliderTrees * OHARE_BOTTLES_SAVED_PER_TREE).toLocaleString();
  const peopleOxygen = sliderTrees * 2;

  // Exact 0 to 100% calculation
  const sliderPercent = ((sliderTrees - 1) / (100 - 1)) * 100;

  return (
    <div className="w-full flex flex-col gap-10 pb-16 animate-fadeIn">
      {/* Hero Section */}
      <section className="w-full flex flex-col lg:flex-row items-center justify-between gap-8 pt-4">
        {/* Left Text */}
        <div className="w-full lg:w-1/2 text-left space-y-4">
          <h1 className="font-['Quicksand'] font-bold text-3xl sm:text-4xl md:text-5xl text-[#311300] leading-tight">
            <span className="text-[#ff6584]">SDG 13: Climate Action</span> &amp;<br />
            <span className="text-[#006c49]">The Lorax</span>
          </h1>
          <p className="font-['Be_Vietnam_Pro'] text-base sm:text-lg text-[#584143] leading-relaxed max-w-xl font-medium">
            How Dr. Seuss's 1971 warning became the world's most urgent sustainability mission.
          </p>
        </div>

        {/* Right Hero Image (The Lorax with UN SDG Wheel) */}
        <div className="w-full lg:w-1/2 flex justify-center items-center">
          <div className="relative p-4 sm:p-6 bg-white rounded-3xl border-2 border-[#ffdbc7] shadow-xl max-w-md w-full flex items-center justify-center">
            <img
              src="/assets/lorax_sdg_wheel.png"
              alt="The Lorax and UN Sustainable Development Goals"
              className="max-h-72 w-auto object-contain drop-shadow-md"
            />
          </div>
        </div>
      </section>

      {/* Narrative Section answering "How 1971 warning became sustainability mission" */}
      <section className="bg-white rounded-3xl p-6 sm:p-10 border-2 border-[#ffdbc7] shadow-md space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <div className="inline-block bg-[#006c49]/10 text-[#006c49] font-['Quicksand'] font-bold text-xs px-4 py-1 rounded-full uppercase tracking-wider">
            From 1971 Parable to 2030 Global Agenda
          </div>
          <h2 className="font-['Quicksand'] font-bold text-2xl sm:text-3xl text-[#311300]">
            The Evolution of a Warning
          </h2>
          <p className="text-xs sm:text-sm text-[#584143] leading-relaxed">
            When Theodor Seuss Geisel wrote <em>The Lorax</em> in 1971, critics deemed it alarmist. Today, the United Nations has made its central warning the foundation of <strong>Sustainable Development Goal 13: Climate Action</strong>.
          </p>
        </div>

        {/* 3-Step Milestone Journey */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Step 1 */}
          <div className="bg-[#fff8f5] p-6 rounded-3xl border-2 border-[#dfbfc2] flex flex-col justify-between space-y-3 relative overflow-hidden">
            <div className="space-y-2">
              <span className="text-xs font-bold font-['Quicksand'] text-[#b0284b] bg-[#ffdbc7] px-3 py-1 rounded-full">
                1971 • The Parable
              </span>
              <h3 className="font-['Quicksand'] font-bold text-lg text-[#311300] pt-1">
                The Once-ler's Greed
              </h3>
              <p className="font-['Be_Vietnam_Pro'] text-xs sm:text-sm text-[#584143] leading-relaxed">
                The story exposed how short-sighted industrial expansion ("Biggering &amp; Biggering") exhausts natural capital, destroys biodiversity (Bar-ba-loots &amp; Swomee-Swans), and pollutes common air and water.
              </p>
            </div>
            <div className="pt-2 text-[11px] font-bold text-[#b0284b]">
              ⚠ Allegory of Ecological Overshoot
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-[#fff8f5] p-6 rounded-3xl border-2 border-[#dfbfc2] flex flex-col justify-between space-y-3 relative overflow-hidden">
            <div className="space-y-2">
              <span className="text-xs font-bold font-['Quicksand'] text-[#7e5700] bg-[#fed7aa] px-3 py-1 rounded-full">
                2015 • The Global Accord
              </span>
              <h3 className="font-['Quicksand'] font-bold text-lg text-[#311300] pt-1">
                UN SDG 13 Mandate
              </h3>
              <p className="font-['Be_Vietnam_Pro'] text-xs sm:text-sm text-[#584143] leading-relaxed">
                193 world nations adopted SDG 13 to urgently limit global warming, reduce greenhouse emissions, and strengthen planetary resilience against climate-related disasters and extreme heat.
              </p>
            </div>
            <div className="pt-2 text-[11px] font-bold text-[#7e5700]">
              🌍 Institutionalized Climate Target
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-[#fff8f5] p-6 rounded-3xl border-2 border-[#006c49]/30 flex flex-col justify-between space-y-3 relative overflow-hidden">
            <div className="space-y-2">
              <span className="text-xs font-bold font-['Quicksand'] text-[#006c49] bg-[#bbf7d0] px-3 py-1 rounded-full">
                2026 • The Action
              </span>
              <h3 className="font-['Quicksand'] font-bold text-lg text-[#311300] pt-1">
                The Real-World "Unless"
              </h3>
              <p className="font-['Be_Vietnam_Pro'] text-xs sm:text-sm text-[#584143] leading-relaxed">
                Tree planting is recognized as humanity's most scalable, biologically proven carbon capture technology. Every community grove directly sequesters atmospheric CO₂ and generates clean oxygen for free.
              </p>
            </div>
            <div className="pt-2 text-[11px] font-bold text-[#006c49]">
              🌱 Grassroots Reforestation
            </div>
          </div>
        </div>
      </section>

      {/* Impact Simulator */}
      <section className="w-full">
        <div className="bg-white rounded-3xl p-6 sm:p-10 md:p-12 shadow-[0_10px_40px_-10px_rgba(255,101,132,0.15)] flex flex-col gap-8 w-full border-2 border-[#ffdbc7]">
          <div className="text-center space-y-2">
            <h2 className="font-['Quicksand'] font-bold text-2xl sm:text-3xl text-[#311300] flex items-center justify-center gap-2">
              <span>🌳</span>
              <span>See the Science: Simulate Your Grove's Impact</span>
            </h2>
            <p className="font-['Be_Vietnam_Pro'] text-xs sm:text-sm text-[#584143] max-w-xl mx-auto">
              Adjust the slider below to see how planting Truffula trees actively combats climate change.
            </p>
          </div>

          <div className="flex flex-col gap-4 max-w-3xl mx-auto w-full">
            <div className="flex justify-between items-end">
              <label className="font-['Quicksand'] font-bold text-sm sm:text-base text-[#311300]">
                Number of Trees to Plant
              </label>
              <span className="font-['Quicksand'] font-bold text-2xl text-[#ff6584]">
                {sliderTrees} {sliderTrees === 1 ? 'Tree' : 'Trees'}
              </span>
            </div>

            {/* Hardware-Synced Responsive Slider Track */}
            <div className="relative w-full h-8 flex items-center">
              {/* Background Track Bar */}
              <div className="absolute w-full h-4 bg-[#ffdbc7] rounded-full overflow-hidden pointer-events-none">
                {/* Instant Gradient Fill */}
                <div
                  className="h-full bg-gradient-to-r from-[#00af79] to-[#006c49] rounded-full"
                  style={{ width: `${sliderPercent}%` }}
                ></div>
              </div>

              {/* Native Range Input with high responsiveness */}
              <input
                type="range"
                min="1"
                max="100"
                value={sliderTrees}
                onChange={(e) => setSliderTrees(Number(e.target.value))}
                className="w-full h-6 opacity-0 z-20 cursor-pointer"
              />

              {/* Centered Leaf Thumb */}
              <div
                className="absolute w-8 h-8 sm:w-9 sm:h-9 bg-white border-4 border-[#006c49] rounded-full shadow-md flex items-center justify-center pointer-events-none z-10"
                style={{
                  left: `calc(${sliderPercent}% - ${(sliderPercent / 100) * 32}px)`,
                }}
              >
                <span
                  className="material-symbols-outlined text-[#006c49] text-sm sm:text-base leading-none"
                  style={{ fontVariationSettings: '"FILL" 1' }}
                >
                  eco
                </span>
              </div>
            </div>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-2">
            {/* Metric 1 */}
            <div className="bg-[#fff8f5] rounded-3xl p-6 flex flex-col items-center text-center gap-2 border-2 border-[#ffdbc7] hover:-translate-y-1 transition-transform shadow-sm">
              <div className="w-16 h-16 rounded-full bg-[#ff6584]/20 flex items-center justify-center text-[#b0284b] mb-1">
                <span className="material-symbols-outlined text-3xl">co2</span>
              </div>
              <h3 className="font-['Quicksand'] font-bold text-3xl text-[#311300]">
                {co2Absorbed} kg
              </h3>
              <p className="font-['Quicksand'] font-bold text-xs uppercase tracking-wider text-[#584143]">
                CO₂ Absorbed / Year
              </p>
              <p className="font-['Be_Vietnam_Pro'] text-xs text-[#8c7073] mt-1">
                Helping clear the air.
              </p>
            </div>

            {/* Metric 2 */}
            <div className="bg-[#fff8f5] rounded-3xl p-6 flex flex-col items-center text-center gap-2 border-2 border-[#ffdbc7] hover:-translate-y-1 transition-transform shadow-sm">
              <div className="w-16 h-16 rounded-full bg-[#00af79]/20 flex items-center justify-center text-[#006c49] mb-1">
                <span className="material-symbols-outlined text-3xl">air</span>
              </div>
              <h3 className="font-['Quicksand'] font-bold text-3xl text-[#311300]">
                {o2Produced} kg
              </h3>
              <p className="font-['Quicksand'] font-bold text-xs uppercase tracking-wider text-[#584143]">
                O₂ Produced / Year
              </p>
              <p className="font-['Quicksand'] font-bold text-xs text-[#006c49] bg-[#00af79]/15 px-3 py-1 rounded-full mt-1">
                Enough for {peopleOxygen} people!
              </p>
            </div>

            {/* Metric 3 */}
            <div className="bg-[#fff8f5] rounded-3xl p-6 flex flex-col items-center text-center gap-2 border-2 border-[#ffdbc7] hover:-translate-y-1 transition-transform shadow-sm">
              <div className="w-16 h-16 rounded-full bg-[#feb72f]/25 flex items-center justify-center text-[#7e5700] mb-1">
                <span className="material-symbols-outlined text-3xl">water_bottle</span>
              </div>
              <h3 className="font-['Quicksand'] font-bold text-3xl text-[#311300]">
                {bottlesAvoided}
              </h3>
              <p className="font-['Quicksand'] font-bold text-xs uppercase tracking-wider text-[#584143]">
                Bottles Avoided
              </p>
              <p className="font-['Be_Vietnam_Pro'] text-xs text-[#8c7073] mt-1">
                O'Hare bottled air replaced.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Allegory vs Reality Section */}
      <section className="w-full flex flex-col gap-6">
        <div className="text-center">
          <h2 className="font-['Quicksand'] font-bold text-3xl text-[#311300]">
            The Story vs. The Science
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card A: The Warning */}
          <div className="bg-white rounded-3xl overflow-hidden border-2 border-red-200/80 shadow-md group flex flex-col justify-between">
            <div>
              <div className="relative h-60 w-full overflow-hidden bg-slate-950">
                <img
                  src="/assets/once_ler_window.jpg"
                  alt="The Warning - Smog and Deforestation"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-6 flex items-center gap-2 bg-rose-600/90 text-white px-3 py-1 rounded-full text-xs font-['Quicksand'] font-bold shadow-md">
                  <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: '"FILL" 1' }}>
                    warning
                  </span>
                  <span className="uppercase tracking-wider">The Warning</span>
                </div>
              </div>

              <div className="p-6 sm:p-8 space-y-3">
                <h3 className="font-['Quicksand'] font-bold text-2xl text-[#311300]">
                  Thneedville &amp; O'Hare Air
                </h3>
                <p className="font-['Be_Vietnam_Pro'] text-sm sm:text-base text-[#584143] leading-relaxed">
                  Unchecked deforestation destroys natural ecosystems, causing severe air pollution and commodifying basic survival. When the last Truffula falls, the air turns to smog, and artificial solutions replace natural balance.
                </p>
              </div>
            </div>
          </div>

          {/* Card B: The Action */}
          <div className="bg-white rounded-3xl overflow-hidden border-2 border-emerald-200/80 shadow-md group flex flex-col justify-between">
            <div>
              <div className="relative h-60 w-full overflow-hidden bg-slate-950">
                <img
                  src="/assets/truffula_valley.jpg"
                  alt="The Action - Truffula Reforestation"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-6 flex items-center gap-2 bg-[#006c49] text-white px-3 py-1 rounded-full text-xs font-['Quicksand'] font-bold shadow-md">
                  <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: '"FILL" 1' }}>
                    psychiatry
                  </span>
                  <span className="uppercase tracking-wider">The Action</span>
                </div>
              </div>

              <div className="p-6 sm:p-8 space-y-3">
                <h3 className="font-['Quicksand'] font-bold text-2xl text-[#311300]">
                  SDG 13 &amp; Reforestation
                </h3>
                <p className="font-['Be_Vietnam_Pro'] text-sm sm:text-base text-[#584143] leading-relaxed">
                  Trees actively cool urban areas, stabilize local climates, absorb significant amounts of carbon dioxide, and restore essential wildlife habitats. Planting is our direct action for climate resilience.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="w-full">
        <div className="bg-[#ff6584]/15 rounded-3xl p-8 sm:p-12 md:p-14 text-center border-2 border-[#ff6584]/30 flex flex-col items-center gap-6 relative overflow-hidden shadow-lg">
          {/* Decorative blur elements */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#feb72f]/20 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-[#00af79]/20 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 space-y-3">
            <span className="material-symbols-outlined text-4xl text-[#b0284b] opacity-60">
              format_quote
            </span>
            <blockquote className="font-['Quicksand'] font-bold text-xl sm:text-2xl md:text-3xl text-[#6a0024] max-w-3xl mx-auto italic leading-snug">
              "Unless someone like you cares a whole awful lot, nothing is going to get better. It's not."
            </blockquote>
            <p className="font-['Quicksand'] font-bold text-xs sm:text-sm text-[#b0284b] uppercase tracking-widest">
              — Dr. Seuss
            </p>
          </div>

          <button
            onClick={() => setActiveTab('submit')}
            className="relative z-10 bg-[#b0284b] hover:bg-[#8f0935] text-white font-['Quicksand'] font-bold text-base sm:text-lg px-8 py-4 rounded-full shadow-[0_6px_0_0_rgba(106,0,36,0.6)] active:translate-y-1 active:shadow-none transition-all flex items-center gap-3 cursor-pointer"
          >
            <span>🌱</span>
            <span>Join the Movement — Plant a Truffula Seed Today</span>
          </button>
        </div>
      </section>
    </div>
  );
}
