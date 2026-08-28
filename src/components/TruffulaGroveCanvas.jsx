import React, { useMemo } from 'react';

export default function TruffulaGroveCanvas({ treeCount, totalTrees }) {
  const actualCount = Number(treeCount ?? totalTrees ?? 0);

  const truffulaColors = [
    { tuft: '#FF6584', tuftGlow: '#FF8DA6', ring: '#D8385E', name: 'Pink' },
    { tuft: '#FEB72F', tuftGlow: '#FFD166', ring: '#D99A22', name: 'Yellow' },
    { tuft: '#6FFBBE', tuftGlow: '#A7FCD6', ring: '#20C97E', name: 'Mint' },
    { tuft: '#A855F7', tuftGlow: '#C084FC', ring: '#7E22CE', name: 'Purple' },
    { tuft: '#38BDF8', tuftGlow: '#7DD3FC', ring: '#0284C7', name: 'Sky Blue' },
    { tuft: '#F43F5E', tuftGlow: '#FB7185', ring: '#BE123C', name: 'Rose' },
    { tuft: '#F59E0B', tuftGlow: '#FBBF24', ring: '#B45309', name: 'Amber' },
    { tuft: '#10B981', tuftGlow: '#34D399', ring: '#047857', name: 'Emerald' },
  ];

  const dynamicTrees = useMemo(() => {
    if (actualCount === 0) return [];
    if (actualCount === 1) {
      return [
        {
          id: 1,
          left: 50,
          bottom: 7,
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
    const visualCount = Math.min(actualCount, 28);
    const step = 84 / (visualCount - 1);

    for (let i = 0; i < visualCount; i++) {
      const left = 8 + i * step;
      const height = 120 + ((i * 37) % 65);
      const bottom = 5 + ((i * 5) % 6);
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
  }, [actualCount]);

  return (
    <div className="relative w-full h-80 sm:h-96 rounded-3xl overflow-hidden shadow-2xl border-4 border-[#ffdbc7] bg-gradient-to-b from-[#BAE6FD] via-[#E0F2FE] to-[#FEF3C7] select-none">
      <div className="absolute top-4 right-12 w-20 h-20 rounded-full bg-[#FEF08A] opacity-90 blur-xs shadow-[0_0_40px_#FDE047] animate-pulse"></div>
      <div className="absolute top-8 left-16 w-32 h-10 bg-white/70 rounded-full blur-sm"></div>
      <div className="absolute top-14 right-44 w-24 h-8 bg-white/60 rounded-full blur-xs"></div>

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

      <div className="absolute inset-x-0 bottom-0 h-28 bg-[#22C55E] rounded-t-[100%] scale-x-125 translate-y-6 shadow-inner"></div>
      <div className="absolute -inset-x-10 bottom-0 h-24 bg-[#16A34A] rounded-t-[90%] scale-x-110 translate-y-8"></div>
      <div className="absolute inset-x-0 bottom-0 h-16 bg-[#15803D] rounded-t-[80%] translate-y-6"></div>

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
          <div
            className="flex flex-col items-center origin-bottom transition-transform"
            style={{
              animation: `sway ${tree.swayDuration}s ease-in-out infinite alternate`,
              animationDelay: `${tree.swayDelay}s`,
            }}
          >
            <div className="relative -mb-3 z-20 group-hover:scale-110 transition-transform">
              <div
                className="w-16 h-16 rounded-full shadow-lg relative flex items-center justify-center"
                style={{
                  backgroundColor: tree.color.tuft,
                  boxShadow: `0 8px 25px ${tree.color.tuftGlow}88, inset 0 -4px 8px ${tree.color.ring}aa`,
                }}
              >
                <div
                  className="absolute inset-1 rounded-full border-2 border-dashed opacity-40"
                  style={{ borderColor: tree.color.ring }}
                ></div>
                <div
                  className="w-8 h-8 rounded-full opacity-60"
                  style={{ backgroundColor: tree.color.tuftGlow }}
                ></div>
              </div>

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

            <svg
              width="24"
              height={tree.height}
              className="z-10 overflow-visible"
              style={{
                transform: `rotate(${tree.trunkAngle}deg)`,
                transformOrigin: 'bottom center',
              }}
            >
              <defs>
                <pattern
                  id={`stripes-${tree.id}`}
                  width="10"
                  height="16"
                  patternUnits="userSpaceOnUse"
                  patternTransform="rotate(25)"
                >
                  <line x1="0" y1="0" x2="0" y2="16" stroke="#2B2D42" strokeWidth="12" />
                  <line x1="0" y1="0" x2="0" y2="16" stroke="#FDE047" strokeWidth="5" />
                </pattern>
              </defs>

              <path
                d={`M 9 0 Q ${12 + tree.trunkAngle} ${tree.height / 2} 9 ${tree.height} L 15 ${tree.height} Q ${18 + tree.trunkAngle} ${tree.height / 2} 15 0 Z`}
                fill={`url(#stripes-${tree.id})`}
                stroke="#1E1B18"
                strokeWidth="1.5"
              />
            </svg>

            <div className="w-7 h-2 rounded-full bg-[#15803D] opacity-90 -mt-1 shadow-sm"></div>
          </div>
        </div>
      ))}

      <div className="absolute top-4 left-4 z-30 bg-white/85 backdrop-blur-md px-4 py-2 rounded-2xl border-2 border-[#ffdbc7] shadow-lg flex items-center gap-2">
        <span className="w-3 h-3 rounded-full bg-[#10B981] animate-ping"></span>
        <span className="font-['Quicksand'] font-bold text-xs sm:text-sm text-[#311300]">
          {actualCount === 0
            ? 'The Truffula Valley Awaits Its First Seed...'
            : actualCount === 1
            ? '🌱 1 Truffula Tree Sprouting in the Valley!'
            : `🌲 ${actualCount} Truffula Trees Swaying in Harmony!`}
        </span>
      </div>
    </div>
  );
}
