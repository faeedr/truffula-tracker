import React, { useState, useMemo } from 'react';
import { Search, MapPin, Sprout, Award, Calendar, Sparkles, Image as ImageIcon } from 'lucide-react';
import { CO2_PER_TREE_KG } from '../data/mockData';

export default function CommunityView({ projects, setActiveTab, onOpenCertificate, totalTrees }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  // Filter and search logic
  const filteredProjects = useMemo(() => {
    return projects
      .filter((p) => {
        const matchesSearch =
          p.groupName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.members.some((m) => m.toLowerCase().includes(searchTerm.toLowerCase()));

        if (!matchesSearch) return false;
        if (activeFilter === 'large') return p.treeCount >= 25;
        return true;
      })
      .sort((a, b) => {
        if (activeFilter === 'most') return b.treeCount - a.treeCount;
        if (activeFilter === 'recent') return new Date(b.date) - new Date(a.date);
        return 0;
      });
  }, [projects, searchTerm, activeFilter]);

  return (
    <div className="space-y-8 pb-16 animate-fadeIn">
      {/* Panoramic Header with Smooth Vertical Fade */}
      <div className="relative w-full rounded-3xl overflow-hidden shadow-lg border-2 border-amber-200 bg-emerald-950">
        {/* Background Panoramic Image */}
        <div className="relative h-64 sm:h-80 w-full overflow-hidden">
          <img
            src="/assets/truffula_valley.jpg"
            alt="The Truffula Valley Panorama"
            className="w-full h-full object-cover object-center scale-105"
          />

          {/* Smooth Vertical Fade Mask */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-slate-900/40 to-[#fff8f5]"></div>
        </div>

        {/* Header Overlay Text */}
        <div className="absolute bottom-6 left-6 right-6 sm:left-10 sm:right-10 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 bg-[#feb72f] text-[#281900] px-3 py-1 rounded-full text-xs font-['Quicksand'] font-bold shadow-md mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Verified Reforestation Network</span>
            </div>
            <h1 className="font-['Quicksand'] font-bold text-3xl sm:text-4xl lg:text-5xl text-[#311300] drop-shadow-sm">
              The Community Truffula Forest
            </h1>
            <p className="text-xs sm:text-sm text-[#584143] font-semibold max-w-xl mt-1">
              Explore real-world tree planting projects submitted by student groups, schools, and planet protectors worldwide.
            </p>
          </div>

          <div className="bg-[#fff8f5]/95 backdrop-blur-md px-5 py-3 rounded-2xl border-2 border-[#ffdbc7] shadow-md text-center shrink-0">
            <p className="text-[10px] uppercase font-bold text-[#006c49]">Collective Impact</p>
            <p className="font-['Quicksand'] font-bold text-2xl text-[#006c49]">
              {totalTrees.toLocaleString()} {totalTrees === 1 ? 'Seed' : 'Trees'}
            </p>
            <p className="text-[11px] text-[#584143] font-medium">{projects.length} Verified Projects</p>
          </div>
        </div>
      </div>

      {/* Search and Filters Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 bg-white rounded-3xl border-2 border-[#ffdbc7] shadow-sm">
        {/* Search Input */}
        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#7e5700]" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by group name, member, or city..."
            className="w-full pl-11 pr-4 py-2.5 rounded-full bg-[#fff8f5] border border-[#ffdbc7] text-xs sm:text-sm font-semibold text-[#311300] focus:outline-none focus:border-[#006c49] focus:bg-white transition-all"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto justify-start sm:justify-end">
          {[
            { id: 'all', label: 'All Projects' },
            { id: 'most', label: '🌳 Most Trees' },
            { id: 'recent', label: '⚡ Most Recent' },
            { id: 'large', label: '🏆 25+ Trees' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold font-['Quicksand'] transition-all cursor-pointer ${
                activeFilter === tab.id
                  ? 'bg-[#006c49] text-white shadow-sm'
                  : 'bg-[#fff8f5] text-[#7e5700] hover:bg-[#ffe3d3] border border-[#ffdbc7]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Project Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="bg-white rounded-3xl border-2 border-[#ffdbc7] shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between overflow-hidden group"
          >
            <div>
              {/* Photo Area with Truffula Badge */}
              <div className="relative aspect-16/10 overflow-hidden bg-slate-900">
                <img
                  src={project.photoUrl}
                  alt={project.groupName}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                {/* Tree Badge Top Right */}
                <div className="absolute top-3 right-3 bg-[#006c49] text-white text-xs font-['Quicksand'] font-bold px-3 py-1 rounded-full shadow-md flex items-center gap-1 border border-emerald-300">
                  <Sprout className="w-3.5 h-3.5" />
                  <span>+{project.treeCount} {project.treeCount === 1 ? 'Truffula' : 'Truffulas'}</span>
                </div>

                {/* Multi-Photo Count Badge */}
                {project.allPhotos && project.allPhotos.length > 1 && (
                  <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 border border-white/30">
                    <ImageIcon className="w-3 h-3" />
                    <span>{project.allPhotos.length} Photos</span>
                  </div>
                )}

                {/* Date Tag Bottom Left */}
                <div className="absolute bottom-2 left-3 flex items-center gap-1 text-white text-[11px] font-semibold">
                  <Calendar className="w-3 h-3 text-[#feb72f]" />
                  <span>{project.date}</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 space-y-3">
                <div>
                  <h3 className="font-['Quicksand'] font-bold text-lg text-[#311300] line-clamp-1 group-hover:text-[#006c49] transition-colors">
                    {project.groupName}
                  </h3>
                  <p className="text-xs text-[#584143] flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3 text-[#7e5700] shrink-0" />
                    <span className="line-clamp-1">{project.location}</span>
                  </p>
                </div>

                {/* Member Tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {project.members.map((m, i) => (
                    <span
                      key={i}
                      className="bg-[#fff8f5] text-[#7e5700] border border-[#ffdbc7] text-[10px] font-bold px-2.5 py-0.5 rounded-full"
                    >
                      {m}
                    </span>
                  ))}
                </div>

                {/* Notes */}
                {project.notes && (
                  <p className="text-xs text-[#584143] italic bg-[#fff8f5] p-2.5 rounded-xl border border-[#ffdbc7] line-clamp-2">
                    "{project.notes}"
                  </p>
                )}
              </div>
            </div>

            {/* Card Footer: Impact Stat & Lorax Stamp */}
            <div className="px-5 py-3.5 bg-[#ffe3d3]/40 border-t border-[#ffdbc7] flex items-center justify-between">
              <div>
                <p className="text-[10px] font-bold uppercase text-[#006c49]">Carbon Offset</p>
                <p className="font-['Quicksand'] font-bold text-xs text-[#006c49]">
                  ~{project.treeCount * CO2_PER_TREE_KG} kg CO₂ / yr
                </p>
              </div>

              <button
                onClick={() => onOpenCertificate(project)}
                className="flex items-center gap-1 text-[11px] font-['Quicksand'] font-bold text-[#7e5700] hover:text-[#311300] bg-white hover:bg-[#ffe3d3] border border-[#ffdbc7] px-3 py-1 rounded-full shadow-sm transition-colors cursor-pointer"
                title="View Certificate"
              >
                <Award className="w-3.5 h-3.5 text-[#7e5700]" />
                <span>Certificate</span>
              </button>
            </div>
          </div>
        ))}

        {/* Call to Action Card: Add Yours */}
        <div
          onClick={() => setActiveTab('submit')}
          className="rounded-3xl border-3 border-dashed border-[#ff6584] hover:border-[#b0284b] bg-[#ff6584]/10 hover:bg-[#ff6584]/20 p-8 flex flex-col items-center justify-center text-center gap-4 cursor-pointer transition-all duration-300 group min-h-[320px]"
        >
          <div className="w-16 h-16 rounded-full bg-[#ff6584]/20 text-[#b0284b] flex items-center justify-center group-hover:scale-110 transition-transform shadow-md">
            <Sprout className="w-8 h-8" />
          </div>

          <div className="space-y-1.5">
            <h3 className="font-['Quicksand'] font-bold text-xl text-[#311300]">
              {projects.length === 0 ? 'Plant the Next Truffula Tree!' : 'Your Group Belongs Here!'}
            </h3>
            <p className="text-xs text-[#584143] max-w-xs leading-relaxed">
              {projects.length === 0
                ? 'The Last Truffula Seed has been planted in the ground. Log your group’s project to grow the valley!'
                : 'Plant seeds with your team, snap a photo on video, and watch the Truffula Valley expand.'}
            </p>
          </div>

          <button className="px-6 py-2.5 rounded-full font-['Quicksand'] font-bold text-xs text-white bg-[#ff6584] hover:bg-[#b0284b] shadow-md group-hover:shadow-lg transition-all">
            + Log Your Planting Project
          </button>
        </div>
      </div>
    </div>
  );
}
