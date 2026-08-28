import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HomeView from './components/HomeView';
import SubmitView from './components/SubmitView';
import CommunityView from './components/CommunityView';
import SDGImpactView from './components/SDGImpactView';
import CertificateModal from './components/CertificateModal';
import { INITIAL_PROJECTS, BASE_SEED_TREES } from './data/mockData';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [projects, setProjects] = useState(() => {
    const saved = localStorage.getItem('truffula_projects_v2');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved projects', e);
      }
    }
    return INITIAL_PROJECTS;
  });

  const [activeCertificate, setActiveCertificate] = useState(null);

  // Automatically scroll to top whenever changing tabs/pages
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [activeTab]);

  // Safe localStorage syncing with try-catch
  useEffect(() => {
    try {
      localStorage.setItem('truffula_projects_v2', JSON.stringify(projects));
    } catch (e) {
      console.warn('LocalStorage quota limit reached; maintaining in memory', e);
    }
  }, [projects]);

  // Calculate live global tree count
  const submittedTrees = projects.reduce((acc, p) => acc + (Number(p.treeCount) || 0), 0);
  const totalTrees = BASE_SEED_TREES + submittedTrees;
  const totalGroups = projects.length;

  const handleAddProject = (newProj) => {
    setProjects((prev) => [newProj, ...prev]);
  };

  const handleResetData = () => {
    setProjects([]);
    try {
      localStorage.removeItem('truffula_projects_v2');
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#fff8f5] text-[#311300] font-['Be_Vietnam_Pro',sans-serif] selection:bg-[#ff6584] selection:text-[#6a0024]">
      {/* Top Sticky Floating Navbar */}
      <div className="w-full px-4 sm:px-8 pt-3">
        <Navbar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          totalTrees={totalTrees}
        />
      </div>

      {/* Main Page Container */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-8 flex flex-col justify-center py-2">
        {activeTab === 'home' && (
          <HomeView
            setActiveTab={setActiveTab}
            totalTrees={totalTrees}
            totalGroups={totalGroups}
            projects={projects}
          />
        )}

        {activeTab === 'submit' && (
          <SubmitView
            onAddProject={handleAddProject}
            setActiveTab={setActiveTab}
            onOpenCertificate={setActiveCertificate}
          />
        )}

        {activeTab === 'community' && (
          <CommunityView
            projects={projects}
            setActiveTab={setActiveTab}
            onOpenCertificate={setActiveCertificate}
            totalTrees={totalTrees}
          />
        )}

        {activeTab === 'sdg' && (
          <SDGImpactView
            setActiveTab={setActiveTab}
          />
        )}
      </main>

      {/* Certificate Modal */}
      {activeCertificate && (
        <CertificateModal
          project={activeCertificate}
          onClose={() => setActiveCertificate(null)}
        />
      )}

      {/* Footer from Stitch - Fitted */}
      <footer className="bg-[#ffe3d3] w-full rounded-t-[2.5rem] mt-8 py-5 px-6 border-t-2 border-[#006c49]/20 flex flex-col items-center text-center gap-1.5 shadow-inner relative z-10">
        <div className="font-['Quicksand'] font-bold text-base sm:text-lg text-[#006c49] max-w-2xl leading-snug">
          "UNLESS someone like you cares a whole awful lot, nothing is going to get better. It's not."
        </div>

        <div className="flex flex-wrap justify-center gap-5 text-xs font-['Quicksand'] font-bold text-[#7e5700] py-1">
          <button onClick={() => setActiveTab('home')} className="hover:text-[#b0284b] transition-colors cursor-pointer">Home</button>
          <span>•</span>
          <button onClick={() => setActiveTab('submit')} className="hover:text-[#b0284b] transition-colors cursor-pointer">Plant a Tree</button>
          <span>•</span>
          <button onClick={() => setActiveTab('community')} className="hover:text-[#b0284b] transition-colors cursor-pointer">Community Forest</button>
          <span>•</span>
          <button onClick={() => setActiveTab('sdg')} className="hover:text-[#b0284b] transition-colors cursor-pointer">SDG 13 Impact</button>
        </div>

        <div className="flex items-center gap-3 text-[11px] text-[#8c7073]">
          <p>© 2026 Speak for the Trees Project. All rights reserved. Let it grow.</p>
          {projects.length > 0 && (
            <button
              onClick={handleResetData}
              className="text-amber-800 hover:text-rose-600 underline font-semibold transition-colors cursor-pointer"
              title="Reset all demo projects to 0 for a fresh video recording"
            >
              Reset Demo
            </button>
          )}
        </div>
      </footer>
    </div>
  );
}
