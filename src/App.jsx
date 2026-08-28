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
        console.error(e);
      }
    }
    return INITIAL_PROJECTS;
  });

  const [activeCertificate, setActiveCertificate] = useState(null);
  
  // Password Protection for Reset Demo
  const [showResetModal, setShowResetModal] = useState(false);
  const [resetPasswordInput, setResetPasswordInput] = useState('');
  const [resetError, setResetError] = useState('');

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [activeTab]);

  useEffect(() => {
    try {
      localStorage.setItem('truffula_projects_v2', JSON.stringify(projects));
    } catch (e) {
      console.warn(e);
    }
  }, [projects]);

  const submittedTrees = projects.reduce((acc, p) => acc + (Number(p.treeCount) || 0), 0);
  const totalTrees = BASE_SEED_TREES + submittedTrees;
  const totalGroups = projects.length;

  const handleAddProject = (newProj) => {
    setProjects((prev) => [newProj, ...prev]);
  };

  const handleConfirmReset = (e) => {
    e.preventDefault();
    // Default master passcodes: 'unless' or 'lorax' or 'admin'
    const trimmed = resetPasswordInput.trim().toLowerCase();
    if (trimmed === 'unless' || trimmed === 'lorax' || trimmed === 'admin') {
      setProjects([]);
      try {
        localStorage.removeItem('truffula_projects_v2');
      } catch (err) {
        console.error(err);
      }
      setShowResetModal(false);
      setResetPasswordInput('');
      setResetError('');
    } else {
      setResetError('Incorrect passcode. Hint: "UNLESS"');
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#fff8f5] text-[#311300] font-['Be_Vietnam_Pro',sans-serif] selection:bg-[#ff6584] selection:text-[#6a0024]">
      <div className="w-full px-4 sm:px-8 pt-3 relative z-40">
        <Navbar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          totalTrees={totalTrees}
        />
      </div>

      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-8 flex flex-col justify-center py-2 relative z-10">
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

      {activeCertificate && (
        <CertificateModal
          project={activeCertificate}
          onClose={() => setActiveCertificate(null)}
        />
      )}

      {/* Password-Protected Reset Demo Modal */}
      {showResetModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-[#fff8f5] rounded-3xl border-4 border-[#ff6584] shadow-2xl p-6 sm:p-8 max-w-md w-full text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-[#ff6584]/20 text-[#b0284b] flex items-center justify-center mx-auto">
              <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: '"FILL" 1' }}>
                lock_reset
              </span>
            </div>

            <div className="space-y-1">
              <h3 className="font-['Quicksand'] font-bold text-2xl text-[#311300]">
                Admin Reset Demo
              </h3>
              <p className="text-xs text-[#584143]">
                Enter passcode to reset all planted trees back to 0.
              </p>
            </div>

            <form onSubmit={handleConfirmReset} className="space-y-3 pt-2">
              <div>
                <input
                  type="password"
                  autoFocus
                  value={resetPasswordInput}
                  onChange={(e) => {
                    setResetPasswordInput(e.target.value);
                    setResetError('');
                  }}
                  placeholder="Enter passcode (e.g. unless)"
                  className="w-full text-center tracking-widest font-mono text-sm py-2.5 px-4 rounded-xl border-2 border-[#dfbfc2] bg-white focus:border-[#ff6584] outline-none"
                />
                {resetError && (
                  <p className="text-xs text-rose-600 font-bold mt-1.5">{resetError}</p>
                )}
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowResetModal(false);
                    setResetPasswordInput('');
                    setResetError('');
                  }}
                  className="flex-1 py-2.5 rounded-full font-['Quicksand'] font-bold text-xs text-[#584143] bg-[#ffe3d3] hover:bg-[#ffdbc7] transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-full font-['Quicksand'] font-bold text-xs text-white bg-[#b0284b] hover:bg-[#8f0935] shadow-md transition-colors cursor-pointer"
                >
                  Confirm Reset
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <footer className="bg-[#ffe3d3] w-full rounded-t-[2.5rem] mt-8 py-5 px-6 border-t-2 border-[#006c49]/20 flex flex-col items-center text-center gap-1.5 shadow-inner relative z-20">
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
              onClick={() => setShowResetModal(true)}
              className="text-amber-800 hover:text-rose-600 underline font-semibold transition-colors cursor-pointer"
              title="Reset all demo projects with admin password"
            >
              Reset Demo
            </button>
          )}
        </div>
      </footer>
    </div>
  );
}
