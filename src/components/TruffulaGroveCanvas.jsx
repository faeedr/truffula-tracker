import React, { useMemo } from 'react';

// Generates dynamic trees based on total count
export default function TruffulaGroveCanvas({ totalTrees }) {
  const treeCount = Math.max(0, totalTrees);

  const truffulaColors = [
    { tuft: '#FF6584', tuftGlow: '#FFA0B4', ring: '#D83A60' }, // Classic Pink
    { tuft: '#FEB72F', tuftGlow: '#FED47D', ring: '#D99106' }, // Sunny Yellow
    { tuft: '#A855F7', tuftGlow: '#C084FC', ring: '#7E22CE' }, // Purple
    { tuft: '#38BDF8', tuftGlow: '#7DD3FC', ring: '#0284C7' }, // Sky Blue
    { tuft: '#FB7185', tuftGlow: '#FDA4AF', ring: '#E11D48' }, // Coral
    { tuft: '#4ADE80', tuftGlow: '#86EFAC', ring: '#16A34A' }, // Lime Green
    { tuft: '#F472B6', tuftGlow: '#F9A8D4', ring: '#DB2777' }, // Bright Pink
    { tuft: '#FBBF24', tuftGlow: '#FDE68A', ring: '#D97706' }, // Gold
  ];

  // Distribute trees evenly
  const dynamicTrees = useMemo(() => {
    if (treeCount === 0) return [];
    if (treeCount === 1) {
      return [
        {
          id: 1,
          left: 50,
          bottom: 22,
          height: 160,
          scale: 1.15,
          color: truffulaColors[0],
          swayDelay: 0,
          swayDuration: 4.5,
          trunkAngle: 2,
        },
      ];
    }

    const trees = [];
    const step = 84 / (treeCount - 1);

    for (let i = 0; i < treeCount; i++) {
      const left = 8 + i * step;
      const height = 120 + ((i * 37) % 65);
      const bottom = 14 + ((i * 23) % 18);
      const scale = 0.85 + ((i * 17) % 35) / 100;
      const color = truffulaColors[i % truffulaColors.length];
      const swayDelay = (i * 0.4) % 3;
      const swayDuration = 3.5 + (i % 3) * 0.7;
      const trunkAngle = ((i % 5) - 2) * 2.5;

      trees.push({
        id: i + 1,
        left,
        bottom,
        height,
        scale,
        color,
        swayDelay,
        swayDuration,
        trunkAngle,
      });
    }

    return trees;
  }, [treeCount]);

  return (
    <div className="relative w-full h-80 sm:h-96 rounded-3xl overflow-hidden shadow-2xl border-4 border-[#ffdbc7] bg-gradient-to-b from-[#BAE6FD] via-[#E0F2FE] to-[#FEF3C7] select-none">
      {/* Sun and Sky Clouds */}
      <div className="absolute top-4 right-12 w-20 h-20 rounded-full bg-[#FEF08A] opacity-90 blur-xs shadow-[0_0_40px_#FDE047] animate-pulse"></div>
      <div className="absolute top-8 left-16 w-32 h-10 bg-white/70 rounded-full blur-sm"></div>
      <div className="absolute top-14 right-44 w-24 h-8 bg-white/60 rounded-full blur-xs"></div>

      {/* Mountain Backdrops */}
      <svg
        className="absolute bottom-16 w-full h-44 opacity-40 pointer-events-none"
        preserveAspectRatio="none"
        viewBox="0 0 1000 300"
      >
        <path
          d="M0,300 L0,180 Q200,80 400,200 T800,120 Q900,150 1000,220 L1000,300 Z"
          fill="#86EFAC"
        />
        <path
          d="M0,300 L0,220 Q300,140 600,240 T1000,180 L1000,300 Z"
          fill="#4ADE80"
        />
      </svg>

      {/* Rolling Foreground Hills */}
      <div className="absolute inset-x-0 bottom-0 h-28 bg-[#22C55E] rounded-t-[100%] scale-x-125 translate-y-6 shadow-inner"></div>
      <div className="absolute -inset-x-10 bottom-0 h-24 bg-[#16A34A] rounded-t-[90%] scale-x-110 translate-y-8"></div>
      <div className="absolute inset-x-0 bottom-0 h-16 bg-[#15803D] rounded-t-[80%] translate-y-6"></div>

      {/* Render Trees Synchronized 1-to-1 */}
      {dynamicTrees.map((tree) => (
        <div
          key={tree.id}
          className="absolute flex flex-col items-center pointer-events-none transition-all duration-1000 ease-out"
          style={{
            left: `${tree.left}%`,
            bottom: `${tree.bottom}%`,
            transform: `translateX(-50%) scale(${tree.scale})`,
            zIndex: Math.round(tree.bottom * 2),
          }}
        >
          {/* Animated Swaying Tree Group */}
          <div
            className="flex flex-col items-center origin-bottom transition-transform"
            style={{
              animation: `sway ${tree.swayDuration}s ease-in-out infinite alternate`,
              animationDelay: `${tree.swayDelay}s`,
            }}
          >
            {/* Fluffy Truffula Tuft Head */}
            <div className="relative -mb-3 z-20 group-hover:scale-110 transition-transform">
              <div
                className="w-16 h-16 rounded-full shadow-lg relative flex items-center justify-center"
                style={{
                  backgroundColor: tree.color.tuft,
                  boxShadow: `0 8px 25px ${tree.color.tuftGlow}88, inset 0 -4px 8px ${tree.color.ring}aa`,
                }}
              >
                {/* Fluff Texture Ring */}
                <div
                  className="absolute inset-1 rounded-full border-2 border-dashed opacity-40"
                  style={{ borderColor: tree.color.ring }}
                ></div>
                <div
                  className="w-8 h-8 rounded-full opacity-60"
                  style={{ backgroundColor: tree.color.tuftGlow }}
                ></div>
              </div>

              {/* Extra Fluff Tufts */}
              <div
                className="absolute -top-1 left-1 w-6 h-6 rounded-full"
                style={{ backgroundColor: tree.color.tuft }}
              ></div>
              <div
                className="absolute -top-2 right-3 w-7 h-7 rounded-full"
                style={{ backgroundColor: tree.color.tuftGlow }}
              ></div>
              <div
                className="absolute top-2 -left-2 w-7 h-7 rounded-full"
                style={{ backgroundColor: tree.color.tuft }}
              ></div>
              <div
                className="absolute top-3 -right-2 w-7 h-7 rounded-full"
                style={{ backgroundColor: tree.color.tuftGlow }}
              ></div>
            </div>

            {/* Striped Bar-ba-loot Truffula Trunk */}
            <svg
              width="18"
              height={tree.height}
              viewBox={`0 0 18 ${tree.height}`}
              className="z-10"
              style={{ transform: `rotate(${tree.trunkAngle}deg)` }}
            >
              <defs>
                <pattern
                  id={`stripes-${tree.id}`}
                  width="18"
                  height="14"
                  patternUnits="userSpaceOnUse"
                  patternTransform="rotate(15)"
                >
                  <rect width="18" height="7" fill="#FEF08A" />
                  <rect y="7" width="18" height="7" fill="#1F2937" />
                </pattern>
              </defs>
              <path
                d={`M7,0 Q9,${tree.height / 2} 6,${tree.height} L12,${tree.height} Q11,${tree.height / 2} 11,0 Z`}
                fill={`url(#stripes-${tree.id})`}
                stroke="#1F2937"
                strokeWidth="1.5"
              />
            </svg>

            {/* Grass Tuft at Base */}
            <div className="w-8 h-2.5 bg-[#14532D] rounded-full -mt-1.5 z-10 opacity-80"></div>
          </div>
        </div>
      ))}

      {/* Floating Indicator Banner */}
      <div className="absolute top-4 left-4 z-30 bg-[#fff8f5]/90 backdrop-blur-md px-4 py-2 rounded-2xl border-2 border-[#ffdbc7] shadow-md flex items-center gap-2">
        <span className="w-3 h-3 rounded-full bg-[#10B981] animate-ping"></span>
        <span className="font-['Quicksand'] font-bold text-xs sm:text-sm text-[#311300]">
          {treeCount === 0
            ? '🌱 Awaiting the First Seed to be Planted!'
            : treeCount === 1
            ? '🌱 1 Truffula Seed growing strong!'
            : `🌳 ${treeCount} Truffula Trees Swaying in Harmony!`}
        </span>
      </div>
    </div>
  );
}
