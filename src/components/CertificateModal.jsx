import React, { useRef } from 'react';
import { X, Printer, Download, Award, Sparkles, Sprout } from 'lucide-react';
import { CO2_PER_TREE_KG } from '../data/mockData';

export default function CertificateModal({ project, onClose }) {
  if (!project) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
      <div className="relative bg-[#FFFDF8] rounded-3xl border-8 border-amber-400 shadow-2xl p-6 sm:p-10 max-w-2xl w-full my-8 text-slate-900 space-y-6">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-amber-100 transition-colors cursor-pointer"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Certificate Printable Area */}
        <div id="certificate-print" className="border-4 border-double border-amber-600/40 rounded-2xl p-6 sm:p-8 bg-gradient-to-b from-amber-50/50 via-white to-amber-50/50 text-center space-y-5 relative overflow-hidden">
          {/* Watermark Lorax */}
          <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
            <img src="/assets/lorax_standing_cutout.png" alt="watermark" className="w-80 h-80 object-contain" />
          </div>

          {/* Header */}
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 bg-amber-200 text-amber-950 px-3 py-1 rounded-full text-xs font-['Fredoka'] font-bold tracking-wider uppercase">
              <Award className="w-3.5 h-3.5 text-amber-700" />
              <span>UN SDG 13 Climate Action Award</span>
            </div>
            <h2 className="font-['Fredoka'] font-bold text-3xl sm:text-4xl text-amber-950 tracking-wide pt-2">
              Forest Protector Certificate
            </h2>
            <p className="text-xs text-amber-800 font-semibold uppercase tracking-widest">
              Awarded in the Name of The Lorax & The Truffula Valley
            </p>
          </div>

          {/* Recipient */}
          <div className="space-y-1 py-2">
            <p className="text-xs text-slate-500 font-semibold">This honor is officially awarded to:</p>
            <h3 className="font-['Fredoka'] font-bold text-2xl sm:text-3xl text-emerald-800 border-b-2 border-amber-300 pb-2 max-w-md mx-auto">
              {project.groupName}
            </h3>
            <p className="text-xs text-slate-600 font-medium pt-1">
              <strong>Team Members:</strong> {project.members.join(', ')}
            </p>
          </div>

          {/* Achievement */}
          <div className="bg-amber-100/60 rounded-xl p-4 border border-amber-200 text-xs sm:text-sm text-slate-800 space-y-1">
            <p>
              For actively defending our planet's climate by planting{' '}
              <strong className="text-emerald-700 text-base font-bold">{project.treeCount} Truffula Trees</strong> in{' '}
              <strong>{project.location}</strong>.
            </p>
            <p className="text-emerald-800 font-semibold text-xs">
              🌱 Preventing an estimated <strong>~{project.treeCount * CO2_PER_TREE_KG} kg of CO₂</strong> annually!
            </p>
          </div>

          {/* Dr. Seuss Quote */}
          <div className="pt-2">
            <p className="font-['Fredoka'] text-amber-900 text-sm sm:text-base font-bold italic max-w-lg mx-auto">
              "Unless someone like you cares a whole awful lot, nothing is going to get better. It's not."
            </p>
            <p className="text-xs text-slate-500 font-semibold mt-0.5">— Dr. Seuss</p>
          </div>

          {/* Signatures & Seal */}
          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-amber-200 items-end">
            <div className="text-left space-y-1">
              <p className="font-['Fredoka'] text-sm text-slate-800 font-bold">The Guardian of the Forest</p>
              <div className="flex items-center gap-1.5 text-xs text-amber-700 font-semibold">
                <Sprout className="w-3.5 h-3.5" />
                <span>The Lorax ✓</span>
              </div>
            </div>

            <div className="text-right space-y-1">
              <p className="text-xs text-slate-500 font-semibold">Date of Restoration</p>
              <p className="text-xs font-bold text-slate-800">{project.date}</p>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center justify-end gap-3 pt-2">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-full font-bold text-xs text-slate-600 hover:bg-amber-100 transition-colors cursor-pointer"
          >
            Close
          </button>
          <button
            onClick={handlePrint}
            className="px-6 py-2.5 rounded-full font-['Fredoka'] font-bold text-xs text-white bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 shadow-md flex items-center gap-2 cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Print / Save as PDF</span>
          </button>
        </div>
      </div>
    </div>
  );
}
