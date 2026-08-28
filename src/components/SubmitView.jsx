import React, { useState, useRef } from 'react';
import confetti from 'canvas-confetti';
import { CO2_PER_TREE_KG } from '../data/mockData';

const compressImage = (file) => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;
      img.onload = () => {
        const maxWidth = 600;
        const maxHeight = 450;
        let { width, height } = img;

        if (width > maxWidth || height > maxHeight) {
          if (width / height > maxWidth / maxHeight) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          } else {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', 0.65));
      };
      img.onerror = () => resolve(event.target.result);
    };
    reader.onerror = () => resolve('/assets/marshmallow_wonder.png');
  });
};

export default function SubmitView({ onAddProject, onShowCelebration }) {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isAnimatingSeed, setIsAnimatingSeed] = useState(false);

  const [groupName, setGroupName] = useState('');
  const [memberInput, setMemberInput] = useState('');
  const [membersList, setMembersList] = useState([]);
  const [location, setLocation] = useState('');
  const [treeCount, setTreeCount] = useState(1);
  const [notes, setNotes] = useState('');
  const [photosList, setPhotosList] = useState([]);
  const [photoError, setPhotoError] = useState(false);
  const [memberError, setMemberError] = useState(false);

  const fileInputRef = useRef(null);

  const resetFormState = () => {
    setGroupName('');
    setMemberInput('');
    setMembersList([]);
    setLocation('');
    setTreeCount(1);
    setNotes('');
    setPhotosList([]);
    setPhotoError(false);
    setMemberError(false);
    setIsUnlocked(false);
    setIsAnimatingSeed(false);
  };

  const handleAddMember = () => {
    if (memberInput.trim() && !membersList.includes(memberInput.trim())) {
      setMembersList([...membersList, memberInput.trim()]);
      setMemberInput('');
      setMemberError(false);
    }
  };

  const handleRemoveMember = (nameToRemove) => {
    const updated = membersList.filter((m) => m !== nameToRemove);
    setMembersList(updated);
    if (updated.length === 0) {
      setMemberError(true);
    }
  };

  const handlePhotoUpload = async (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      setPhotoError(false);
      for (const file of files) {
        try {
          const compressed = await compressImage(file);
          setPhotosList((prev) => [...prev, compressed]);
        } catch (err) {
          console.error(err);
        }
      }
    }
  };

  const handleRemovePhoto = (indexToRemove) => {
    setPhotosList(photosList.filter((_, idx) => idx !== indexToRemove));
  };

  const incrementTrees = () => setTreeCount((prev) => Number(prev || 0) + 1);
  const decrementTrees = () => setTreeCount((prev) => Math.max(1, Number(prev || 1) - 1));
  const handleTreeCountChange = (e) => {
    const val = parseInt(e.target.value, 10);
    if (isNaN(val)) {
      setTreeCount('');
    } else {
      setTreeCount(Math.max(1, val));
    }
  };

  const handleTriggerStory = () => {
    if (isUnlocked || isAnimatingSeed) return;

    setIsAnimatingSeed(true);

    setTimeout(() => {
      setIsUnlocked(true);
      setIsAnimatingSeed(false);

      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ff6584', '#6ffbbe', '#feb72f'],
      });
    }, 1800);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (membersList.length === 0) {
      setMemberError(true);
      return;
    }

    if (photosList.length === 0) {
      setPhotoError(true);
      return;
    }

    const finalTreeCount = Number(treeCount) >= 1 ? Number(treeCount) : 1;

    const newProject = {
      id: `proj-${Date.now()}`,
      groupName: groupName.trim() || 'BRACU Eco Club',
      members: membersList,
      location: location.trim() || 'BRAC Garden, Badda',
      treeCount: finalTreeCount,
      photoUrl: photosList[0] || '/assets/marshmallow_wonder.png',
      allPhotos: photosList,
      date: new Date().toISOString().split('T')[0],
      notes: notes.trim() || 'Planted with care to speak for the trees and restore clean air.',
      verified: true,
    };

    onAddProject(newProject);
    onShowCelebration(newProject);
    resetFormState();

    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.5 },
      colors: ['#ff6584', '#6ffbbe', '#feb72f', '#10B981', '#38BDF8'],
    });
  };

  return (
    <div className="w-full max-w-6xl mx-auto animate-fadeIn">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        <div className="lg:col-span-5 flex flex-col">
          <div className="bg-[#4A2E18] rounded-[2.5rem] p-6 sm:p-8 flex flex-col items-center justify-between text-center shadow-xl relative overflow-hidden group h-full min-h-[580px] lg:max-h-[660px] border-4 border-[#3A2211]">
            <div className="absolute inset-0 bg-black/20 pointer-events-none"></div>

            {isAnimatingSeed && (
              <div className="absolute left-1/2 -translate-x-1/2 z-30 flex flex-col items-center justify-center text-[#ffba3a] drop-shadow-[0_0_20px_rgba(255,186,58,0.9)] animate-bounce-subtle">
                <span className="material-symbols-outlined text-6xl" style={{ fontVariationSettings: '"FILL" 1' }}>
                  potted_plant
                </span>
                <span className="text-xs font-bold text-amber-300 bg-black/70 px-2.5 py-0.5 rounded-full mt-1">
                  Passing the Last Truffula Seed...
                </span>
              </div>
            )}

            <div className="w-full relative z-10 my-auto max-w-[340px]">
              <img
                src="/assets/once_ler_window.jpg"
                alt="The Once-ler Window"
                className={`w-full h-44 sm:h-48 object-cover rounded-2xl border-4 border-[#3A2211] shadow-inner transition-all duration-700 ${
                  isUnlocked ? 'brightness-125 drop-shadow-[0_0_25px_#feb72f]' : 'hover:scale-105'
                }`}
              />
            </div>

            <p className="font-['Quicksand'] text-lg sm:text-xl text-[#feb72f] my-auto relative z-10 italic drop-shadow-md leading-snug px-2">
              "Unless someone like you cares a whole awful lot, nothing is going to get better. It's not."
            </p>

            <div className="relative z-10 mt-auto pt-2">
              <button
                onClick={handleTriggerStory}
                disabled={isUnlocked || isAnimatingSeed}
                className={`font-['Quicksand'] font-bold text-sm px-8 py-3 rounded-full border-b-4 transition-all duration-300 shadow-lg flex items-center justify-center gap-2 cursor-pointer ${
                  isUnlocked
                    ? 'bg-[#00af79] text-[#003a25] border-[#008f63] cursor-default'
                    : 'bg-[#feb72f] text-[#6d4a00] border-[#D99A22] hover:scale-105 active:border-b-0 active:translate-y-1'
                }`}
              >
                <span className="material-symbols-outlined text-base" style={{ fontVariationSettings: '"FILL" 1' }}>
                  {isUnlocked ? 'verified' : 'eco'}
                </span>
                <span>{isUnlocked ? 'SEED CLAIMED!' : isAnimatingSeed ? 'CLAIMING SEED...' : 'I CARE!'}</span>
              </button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 relative flex flex-col">
          {!isUnlocked && (
            <div className="absolute inset-0 z-20 flex items-center justify-center bg-white/70 backdrop-blur-md rounded-[2.5rem] transition-all duration-700">
              <div className="text-center p-6 sm:p-8 bg-[#ffe3d3]/95 rounded-3xl border-2 border-[#dfbfc2] shadow-2xl max-w-xs sm:max-w-sm mx-4 transform transition-transform duration-500 hover:scale-105">
                <span
                  className="material-symbols-outlined text-5xl text-[#7e5700] mb-2 drop-shadow-sm"
                  style={{ fontVariationSettings: '"FILL" 1' }}
                >
                  lock
                </span>
                <h2 className="font-['Quicksand'] font-bold text-xl text-[#311300] mb-1.5">
                  Awaiting the Seed
                </h2>
                <p className="font-['Be_Vietnam_Pro'] text-xs sm:text-sm text-[#584143]">
                  Click <strong>"I CARE!"</strong> on the Once-ler's gate to receive the seed and unlock the planting form.
                </p>
              </div>
            </div>
          )}

          <div
            className={`bg-white/95 backdrop-blur-md rounded-[2.5rem] p-6 sm:p-7 shadow-[0_12px_40px_rgba(176,40,75,0.08)] relative overflow-hidden h-full min-h-[580px] lg:max-h-[660px] flex flex-col justify-between border-2 border-[#ffdbc7] transition-all duration-700 ${
              !isUnlocked ? 'opacity-40 blur-sm pointer-events-none' : 'opacity-100 blur-none'
            }`}
          >
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#ffb2bc]/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

            <div>
              <h1 className="font-['Quicksand'] font-bold text-2xl text-[#311300] mb-0.5">
                Submit Your Reforestation Impact
              </h1>
              <p className="font-['Be_Vietnam_Pro'] text-xs text-[#584143] mb-3 font-medium">
                All fields are required to verify your planting with the Forest Guardian.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-2.5 flex-1 flex flex-col justify-between overflow-y-auto pr-1">
              <div>
                <label className="block font-['Quicksand'] font-bold text-xs text-[#311300] mb-1">
                  Group / School Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={groupName}
                  onChange={(e) => setGroupName(e.target.value)}
                  placeholder="BRACU Eco Club"
                  className="w-full rounded-xl border-2 border-[#8c7073]/20 bg-[#fff8f5] focus:border-[#ff6584] focus:ring-2 focus:ring-[#ff6584]/20 px-3.5 py-1.5 font-['Be_Vietnam_Pro'] text-xs text-[#311300] transition-all outline-none"
                />
              </div>

              <div>
                <label className="block font-['Quicksand'] font-bold text-xs text-[#311300] mb-1">
                  Team Members <span className="text-rose-500">*</span>
                </label>
                {membersList.length > 0 && (
                  <div className="flex gap-1.5 mb-1.5 flex-wrap">
                    {membersList.map((member) => (
                      <span
                        key={member}
                        className="bg-[#ffdbc7] text-[#311300] px-2.5 py-0.5 rounded-full font-['Quicksand'] font-bold text-[11px] flex items-center gap-1 border border-[#dfbfc2]"
                      >
                        {member}
                        <span
                          onClick={() => handleRemoveMember(member)}
                          className="material-symbols-outlined text-xs cursor-pointer hover:text-red-600 transition-colors"
                        >
                          close
                        </span>
                      </span>
                    ))}
                  </div>
                )}

                <div className="flex gap-2">
                  <input
                    type="text"
                    value={memberInput}
                    onChange={(e) => setMemberInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddMember();
                      }
                    }}
                    placeholder="Add member name and click Add..."
                    className="flex-1 rounded-xl border-2 border-[#8c7073]/20 bg-[#fff8f5] focus:border-[#ff6584] px-3.5 py-1.5 font-['Be_Vietnam_Pro'] text-xs text-[#311300] transition-all outline-none"
                  />
                  <button
                    type="button"
                    onClick={handleAddMember}
                    className="bg-[#ffe3d3] text-[#311300] font-['Quicksand'] font-bold text-xs px-4 py-1.5 rounded-xl hover:bg-[#ffdbc7] active:scale-95 transition-all border-b-2 border-[#8c7073]/30 cursor-pointer"
                  >
                    Add
                  </button>
                </div>
                {memberError && (
                  <p className="text-[10px] text-rose-600 font-bold mt-1">Please add at least 1 team member.</p>
                )}
              </div>

              <div>
                <label className="block font-['Quicksand'] font-bold text-xs text-[#311300] mb-1">
                  Planting Location <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <span
                    className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#8c7073] text-sm"
                    style={{ fontVariationSettings: '"FILL" 1' }}
                  >
                    location_on
                  </span>
                  <input
                    type="text"
                    required
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="BRAC Garden, Badda"
                    className="w-full rounded-xl border-2 border-[#8c7073]/20 bg-[#fff8f5] focus:border-[#ff6584] pl-9 pr-3 py-1.5 font-['Be_Vietnam_Pro'] text-xs text-[#311300] transition-all outline-none"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="block font-['Quicksand'] font-bold text-xs text-[#311300]">
                    Dedication Quote / Message <span className="text-[#8c7073] font-normal">(Optional)</span>
                  </label>
                  <span className="text-[10px] text-[#8c7073] font-semibold">{notes.length}/120</span>
                </div>
                <input
                  type="text"
                  maxLength={120}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Planted with care to speak for the trees and restore clean air."
                  className="w-full rounded-xl border-2 border-[#8c7073]/20 bg-[#fff8f5] focus:border-[#ff6584] px-3.5 py-1.5 font-['Be_Vietnam_Pro'] text-xs text-[#311300] transition-all outline-none"
                />
              </div>

              <div className="bg-[#ffeadf] rounded-2xl p-2 sm:p-2.5 border border-[#dfbfc2] flex items-center justify-between">
                <div>
                  <label className="block font-['Quicksand'] font-bold text-xs text-[#311300]">
                    Trees Planted <span className="text-rose-500">*</span>
                  </label>
                  <p className="font-['Be_Vietnam_Pro'] text-[11px] font-semibold text-[#006c49]">
                    ~{(Number(treeCount) || 1) * CO2_PER_TREE_KG} kg CO₂ / yr absorbed
                  </p>
                </div>

                <div className="flex items-center gap-2 bg-white rounded-full p-1 shadow-sm border border-[#8c7073]/10">
                  <button
                    type="button"
                    onClick={decrementTrees}
                    className="w-7 h-7 rounded-full bg-[#ffe3d3] text-[#311300] flex items-center justify-center hover:bg-[#ffdbc7] active:scale-95 transition-all font-bold text-sm cursor-pointer"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min="1"
                    value={treeCount}
                    onChange={handleTreeCountChange}
                    onBlur={() => {
                      if (!treeCount || Number(treeCount) < 1) {
                        setTreeCount(1);
                      }
                    }}
                    className="w-14 text-center font-['Quicksand'] font-bold text-lg text-[#006c49] bg-transparent outline-none border-b border-transparent focus:border-[#006c49] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                  <button
                    type="button"
                    onClick={incrementTrees}
                    className="w-7 h-7 rounded-full bg-[#006c49] text-white flex items-center justify-center hover:bg-[#00af79] active:scale-95 transition-all font-bold text-sm cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block font-['Quicksand'] font-bold text-xs text-[#311300]">
                    Photo Evidence <span className="text-rose-500">*</span> ({photosList.length} Uploaded)
                  </label>
                  {photosList.length > 0 && (
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="text-[11px] font-['Quicksand'] font-bold text-[#b0284b] hover:underline cursor-pointer"
                    >
                      + Add More Photos
                    </button>
                  )}
                </div>

                {photosList.length === 0 ? (
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className={`border-2 border-dashed rounded-2xl p-2.5 flex items-center justify-center gap-3 bg-[#fff8f5] hover:bg-[#fff1ea] transition-colors cursor-pointer group ${
                      photoError ? 'border-rose-400 bg-rose-50/50' : 'border-[#dfbfc2]'
                    }`}
                  >
                    <span
                      className="material-symbols-outlined text-2xl text-[#ff6584] group-hover:scale-110 transition-transform"
                      style={{ fontVariationSettings: '"FILL" 1' }}
                    >
                      add_a_photo
                    </span>
                    <div className="text-left">
                      <p className="font-['Quicksand'] font-bold text-xs text-[#584143]">
                        Upload one or multiple planting photos
                      </p>
                      <p className="font-['Be_Vietnam_Pro'] text-[10px] text-[#8c7073]">Click or drag JPG, PNG files</p>
                    </div>
                  </div>
                ) : (
                  <div className="flex gap-2 overflow-x-auto py-1 max-w-full">
                    {photosList.map((photo, index) => (
                      <div
                        key={index}
                        className="relative w-16 h-14 rounded-xl overflow-hidden border-2 border-[#006c49] shrink-0 bg-slate-900 shadow-sm"
                      >
                        <img
                          src={photo}
                          alt={`Evidence ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemovePhoto(index)}
                          className="absolute top-1 right-1 p-0.5 rounded-full bg-slate-950/80 hover:bg-rose-600 text-white transition-colors cursor-pointer"
                          title="Remove this photo"
                        >
                          <span className="material-symbols-outlined text-[10px] block">close</span>
                        </button>
                        <span className="absolute bottom-0.5 left-1 text-[9px] text-white font-bold bg-black/60 px-1 rounded">
                          #{index + 1}
                        </span>
                      </div>
                    ))}

                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="w-14 h-14 rounded-xl border-2 border-dashed border-[#dfbfc2] hover:border-[#ff6584] flex flex-col items-center justify-center text-[#ff6584] shrink-0 bg-[#fff8f5] hover:bg-[#fff1ea] transition-colors cursor-pointer"
                      title="Upload more photos"
                    >
                      <span className="material-symbols-outlined text-base">add</span>
                      <span className="text-[8px] font-bold">More</span>
                    </button>
                  </div>
                )}

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handlePhotoUpload}
                  className="hidden"
                />

                {photoError && (
                  <p className="text-[10px] text-rose-600 font-bold mt-1">
                    Please upload at least 1 photo of your group planting trees.
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-[#10B981] hover:bg-[#059669] text-white font-['Quicksand'] font-bold py-2.5 rounded-full border-b-4 border-[#059669] active:border-b-0 active:translate-y-1 transition-colors shadow-md flex justify-center items-center gap-2 text-sm mt-1 cursor-pointer"
              >
                <span className="material-symbols-outlined text-base" style={{ fontVariationSettings: '"FILL" 1' }}>
                  park
                </span>
                <span>Plant These Trees & Speak for the Forest</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
