import React, { useState } from 'react';
import { ScreenId } from '../../types';

interface SettingsScreenProps {
  onNavigate: (screen: ScreenId) => void;
}

export const SettingsScreen: React.FC<SettingsScreenProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'learning' | 'ai' | 'difficulty' | 'notifications' | 'account' | 'privacy'>('learning');
  const [pacing, setPacing] = useState<'adaptive' | 'relaxed' | 'fast'>('adaptive');
  const [modalities, setModalities] = useState<string[]>(['First-Principles Derivations']);
  const [intervention, setIntervention] = useState(65);
  const [tone, setTone] = useState<'academic' | 'coach' | 'concise'>('academic');
  const [audioStream, setAudioStream] = useState(true);
  const [failureThreshold, setFailureThreshold] = useState<'strict' | 'balanced' | 'permissive'>('balanced');
  const [decayModel, setDecayModel] = useState<'personalized' | 'ebbinghaus'>('personalized');
  
  // Toggles
  const [sparks, setSparks] = useState(true);
  const [digest, setDigest] = useState(true);
  const [impasse, setImpasse] = useState(false);
  const [hesitationTracking, setHesitationTracking] = useState(true);
  const [transcriptStorage, setTranscriptStorage] = useState(true);

  // Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const toggleModality = (name: string) => {
    if (modalities.includes(name)) {
      if (modalities.length > 1) {
        setModalities(modalities.filter((m) => m !== name));
      }
    } else {
      setModalities([...modalities, name]);
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#fbf8ff] py-8 md:py-12 px-4 md:px-12 relative">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3 rounded-full bg-black text-white shadow-2xl border border-white/20 animate-bounce">
          <span className="w-2 h-2 rounded-full bg-[#ff5e1a] animate-pulse"></span>
          <span className="text-xs font-bold">{toastMessage}</span>
        </div>
      )}

      <div className="max-w-[1340px] mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 md:mb-12">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#ff5e1a]"></span>
              <span className="text-xs font-bold uppercase tracking-wider text-[#aa3600]">
                Neural Configuration Engine
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold text-[#1a1b22] tracking-tight">
              System Settings &amp; Preferences
            </h1>
            <p className="text-sm md:text-base text-[#444748] max-w-2xl leading-relaxed">
              Calibrate Lumio's cognitive diagnostics, real-time pedagogical adaptations, and telemetry privacy parameters.
            </p>
          </div>

          <div className="flex items-center gap-2.5 self-start md:self-auto">
            <button
              onClick={() => showToast('Restored default cognitive baseline parameters.')}
              className="px-4 py-2 rounded-full text-xs font-bold text-[#444748] bg-[#eeedf7] hover:bg-[#e8e7f1] transition-all cursor-pointer"
            >
              Revert to Default
            </button>
            <button
              onClick={() => showToast('Preferences successfully applied to active runtime.')}
              className="flex items-center gap-1.5 px-6 py-2 rounded-full text-xs font-bold text-white bg-black hover:bg-neutral-800 transition-all shadow-sm cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">check</span>
              <span>Save Changes</span>
            </button>
          </div>
        </div>

        {/* 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Navigation Sidebar */}
          <nav className="lg:col-span-3 space-y-4 lg:sticky lg:top-14">
            <div className="p-2 bg-[#f4f2fd] rounded-2xl shadow-xs border border-[#e3e1ec] space-y-1">
              {[
                { id: 'learning', label: 'Learning Preferences', icon: 'auto_stories' },
                { id: 'ai', label: 'AI Companion & Persona', icon: 'neurology' },
                { id: 'difficulty', label: 'Difficulty & Cadence', icon: 'tune' },
                { id: 'notifications', label: 'Notifications & Recalls', icon: 'notifications_active' },
                { id: 'account', label: 'Account & Security', icon: 'shield_person' },
                { id: 'privacy', label: 'Privacy & Telemetry', icon: 'fingerprint' },
              ].map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id as any)}
                    className={`w-full text-left flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      isActive
                        ? 'bg-white text-black shadow-xs'
                        : 'text-[#444748] hover:text-[#1a1b22] hover:bg-[#eeedf7]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className={`material-symbols-outlined text-[18px] ${isActive ? 'text-[#aa3600]' : ''}`}>
                        {item.icon}
                      </span>
                      <span>{item.label}</span>
                    </div>
                    {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#ff5e1a]"></span>}
                  </button>
                );
              })}
            </div>

            {/* Sync State Card */}
            <div className="p-5 bg-white rounded-2xl shadow-xs border border-[#eeedf7] space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-[#747878] uppercase tracking-wider">Sync State</span>
                <span className="text-[11px] font-bold text-[#005045] bg-[#e6fbf7] px-2 py-0.5 rounded-full">
                  Active Engine
                </span>
              </div>
              <p className="text-xs text-[#444748]">Profile synced across 3 interactive runtime nodes.</p>
              <div className="h-1.5 w-full bg-[#eeedf7] rounded-full overflow-hidden">
                <div className="h-full bg-[#ff5e1a] rounded-full w-[88%]"></div>
              </div>
              <span className="text-[11px] text-[#747878] block text-right font-medium">88% Context Allocated</span>
            </div>
          </nav>

          {/* Main Content Workspace */}
          <div className="lg:col-span-9 space-y-6">
            {/* PANE 1: Learning Preferences */}
            {activeTab === 'learning' && (
              <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-[#eeedf7] space-y-8">
                <div className="space-y-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#aa3600]">
                    Pacing Architecture
                  </span>
                  <h2 className="text-xl md:text-2xl font-extrabold text-[#1a1b22]">Adaptive Progression Dynamics</h2>
                  <p className="text-xs md:text-sm text-[#444748] leading-relaxed">
                    Control the real-time velocity at which Lumio unpacks prerequisites, pushes into novel domains, or holds you at conceptual boundaries.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Option 1: Adaptive */}
                  <div
                    onClick={() => setPacing('adaptive')}
                    className={`cursor-pointer p-5 rounded-2xl transition-all relative border flex flex-col justify-between ${
                      pacing === 'adaptive'
                        ? 'bg-[#f4f2fd] border-2 border-black shadow-sm'
                        : 'bg-white border-[#eeedf7] hover:bg-[#fbf8ff]'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="material-symbols-outlined text-[22px] text-[#aa3600]">dynamic_form</span>
                        <div className={`w-4 h-4 rounded-full flex items-center justify-center ${pacing === 'adaptive' ? 'bg-[#ff5e1a]' : 'bg-[#e8e7f1]'}`}>
                          <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
                        </div>
                      </div>
                      <h3 className="text-base font-bold text-[#1a1b22] mb-1">Adaptive Dynamic</h3>
                      <p className="text-xs text-[#444748] leading-relaxed">
                        Real-time acceleration based on micro-diagnostic confidence score and latency cues.
                      </p>
                    </div>
                    <div className="mt-4 pt-2 text-[#aa3600] text-xs font-bold flex items-center gap-1">
                      <span>Default Recommendation</span>
                    </div>
                  </div>

                  {/* Option 2: Relaxed */}
                  <div
                    onClick={() => setPacing('relaxed')}
                    className={`cursor-pointer p-5 rounded-2xl transition-all relative border flex flex-col justify-between ${
                      pacing === 'relaxed'
                        ? 'bg-[#f4f2fd] border-2 border-black shadow-sm'
                        : 'bg-white border-[#eeedf7] hover:bg-[#fbf8ff]'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="material-symbols-outlined text-[22px] text-[#747878]">anchor</span>
                        <div className={`w-4 h-4 rounded-full flex items-center justify-center ${pacing === 'relaxed' ? 'bg-[#ff5e1a]' : 'bg-[#e8e7f1]'}`}>
                          <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
                        </div>
                      </div>
                      <h3 className="text-base font-bold text-[#1a1b22] mb-1">Relaxed Mastery</h3>
                      <p className="text-xs text-[#444748] leading-relaxed">
                        Insists on deep conceptual repetition, alternate proofs, and edge-case testing before unlocking.
                      </p>
                    </div>
                    <div className="mt-4 pt-2 text-[#747878] text-xs font-medium">
                      <span>High Retention</span>
                    </div>
                  </div>

                  {/* Option 3: Fast-Track */}
                  <div
                    onClick={() => setPacing('fast')}
                    className={`cursor-pointer p-5 rounded-2xl transition-all relative border flex flex-col justify-between ${
                      pacing === 'fast'
                        ? 'bg-[#f4f2fd] border-2 border-black shadow-sm'
                        : 'bg-white border-[#eeedf7] hover:bg-[#fbf8ff]'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="material-symbols-outlined text-[22px] text-[#747878]">bolt</span>
                        <div className={`w-4 h-4 rounded-full flex items-center justify-center ${pacing === 'fast' ? 'bg-[#ff5e1a]' : 'bg-[#e8e7f1]'}`}>
                          <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
                        </div>
                      </div>
                      <h3 className="text-base font-bold text-[#1a1b22] mb-1">Fast-Track</h3>
                      <p className="text-xs text-[#444748] leading-relaxed">
                        Condenses contextual setup and advances directly to synthesis hurdles and high-leverage challenges.
                      </p>
                    </div>
                    <div className="mt-4 pt-2 text-[#747878] text-xs font-medium">
                      <span>Sprint Speed</span>
                    </div>
                  </div>
                </div>

                {/* Explanation Modality */}
                <div className="space-y-4 pt-4 border-t border-[#eeedf7]">
                  <div>
                    <h3 className="text-base font-bold text-[#1a1b22]">Preferred Explanation Modality</h3>
                    <p className="text-xs text-[#444748]">Select your primary cognitive interface for deconstructing novel formulations.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { title: 'First-Principles Derivations', desc: 'Mathematical step-by-step unrollings, axiomatic proofs, and formal bounds.', icon: 'functions' },
                      { title: 'Visual Intuition Diagrams', desc: 'Spatial abstractions, topological vector fields, and reactive mental maps.', icon: 'schema' },
                      { title: 'Interactive Code Sandboxes', desc: 'Executable REPL modules, benchmark tests, and algorithmic unit experiments.', icon: 'terminal' },
                      { title: 'Socratic Dialogues', desc: 'Back-and-forth interrogative cues teasing out personal breakthroughs.', icon: 'forum' },
                    ].map((mod) => {
                      const isSelected = modalities.includes(mod.title);
                      return (
                        <div
                          key={mod.title}
                          onClick={() => toggleModality(mod.title)}
                          className={`cursor-pointer p-4 rounded-2xl transition-all flex items-start gap-3 border ${
                            isSelected
                              ? 'bg-[#f4f2fd] border-black shadow-xs'
                              : 'bg-white border-[#eeedf7] hover:bg-[#fbf8ff]'
                          }`}
                        >
                          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shrink-0 shadow-xs border border-[#eeedf7]">
                            <span className={`material-symbols-outlined text-[20px] ${isSelected ? 'text-[#aa3600]' : 'text-[#747878]'}`}>
                              {mod.icon}
                            </span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                              <h4 className="text-xs font-bold text-[#1a1b22] truncate">{mod.title}</h4>
                              <span className={`material-symbols-outlined text-[16px] ${isSelected ? 'text-[#aa3600]' : 'text-[#c4c7c7]'}`}>
                                {isSelected ? 'check_circle' : 'circle'}
                              </span>
                            </div>
                            <p className="text-[11px] text-[#444748] leading-relaxed">{mod.desc}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* PANE 2: AI Companion */}
            {activeTab === 'ai' && (
              <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-[#eeedf7] space-y-8">
                <div className="space-y-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#aa3600]">
                    Tuning the Socratic Core
                  </span>
                  <h2 className="text-xl md:text-2xl font-extrabold text-[#1a1b22]">AI Companion &amp; Persona Parameters</h2>
                  <p className="text-xs md:text-sm text-[#444748] leading-relaxed">
                    Adjust how aggressively Lumio pushes back, challenges your assumptions, or steps in when impasse is detected.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-[#f4f2fd] space-y-4 border border-[#e3e1ec]">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-bold text-[#1a1b22]">Intervention Spectrum</h3>
                      <p className="text-xs text-[#444748]">Balance open cognitive discovery against tactical clarity.</p>
                    </div>
                    <span className="text-xs font-bold text-[#aa3600] bg-white px-3 py-1 rounded-full shadow-xs border border-[#eeedf7]">
                      {intervention < 33
                        ? `Subtle Socratic (${intervention}%)`
                        : intervention < 66
                        ? `Balanced Scaffolding (${intervention}%)`
                        : `Direct Technical (${intervention}%)`}
                    </span>
                  </div>

                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={intervention}
                    onChange={(e) => setIntervention(parseInt(e.target.value, 10))}
                    className="w-full h-2 bg-[#eeedf7] rounded-full appearance-none cursor-pointer accent-black"
                  />
                  <div className="flex justify-between text-[11px] text-[#747878] font-medium">
                    <span>Subtle Socratic Hints</span>
                    <span>Balanced Scaffolding</span>
                    <span>Direct Technical Breakdown</span>
                  </div>
                </div>

                {/* Tone Grid */}
                <div className="space-y-3">
                  <h3 className="text-sm font-bold text-[#1a1b22]">Instructional Voice &amp; Temperament</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      { id: 'academic', title: 'Calm & Academic', desc: 'Measured, neutral, heavily referenced, and focused on rigorous structural truth.' },
                      { id: 'coach', title: 'Energetic Coach', desc: 'Direct momentum reinforcement, gamified metrics, and motivating high-tempo focus prompts.' },
                      { id: 'concise', title: 'Ultra-Concise', desc: 'Minimum viable words. Bulleted conclusions, raw equations, and zero small talk.' },
                    ].map((t) => {
                      const isSelected = tone === t.id;
                      return (
                        <button
                          key={t.id}
                          type="button"
                          onClick={() => setTone(t.id as any)}
                          className={`text-left p-4 rounded-2xl transition-all border cursor-pointer ${
                            isSelected
                              ? 'bg-[#f4f2fd] border-black shadow-xs'
                              : 'bg-white border-[#eeedf7] hover:bg-[#fbf8ff]'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="text-xs font-bold text-[#1a1b22]">{t.title}</span>
                            <span className={`w-2 h-2 rounded-full ${isSelected ? 'bg-[#ff5e1a]' : 'bg-[#e8e7f1]'}`}></span>
                          </div>
                          <p className="text-[11px] text-[#444748] leading-relaxed">{t.desc}</p>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Audio toggle */}
                <div className="flex items-center justify-between p-4 rounded-2xl bg-[#eeedf7]/50 border border-[#e3e1ec]">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-black shadow-xs">
                      <span className="material-symbols-outlined text-[20px]">record_voice_over</span>
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-[#1a1b22]">Real-time Audio Socratic Stream</h4>
                      <p className="text-[11px] text-[#444748]">Allows companion to verbally guide your thought process when hesitation surpasses 12 seconds.</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setAudioStream(!audioStream)}
                    className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full transition-colors ${
                      audioStream ? 'bg-black' : 'bg-[#c4c7c7]'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform mt-1 ml-1 ${
                        audioStream ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    ></span>
                  </button>
                </div>
              </div>
            )}

            {/* PANE 3: Difficulty & Cadence */}
            {activeTab === 'difficulty' && (
              <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-[#eeedf7] space-y-6">
                <div className="space-y-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#aa3600]">Evaluation Thresholds</span>
                  <h2 className="text-xl md:text-2xl font-extrabold text-[#1a1b22]">Difficulty &amp; Feedback Cadence</h2>
                  <p className="text-xs md:text-sm text-[#444748]">
                    Control failure budgets, diagnostic intervals, and algorithmic memory decay calculations.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-5 rounded-2xl bg-[#f4f2fd] space-y-3 border border-[#e3e1ec]">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xs font-bold text-[#1a1b22]">Failure Tolerance Threshold</h3>
                      <span className="text-xs font-bold text-[#aa3600] bg-white px-2.5 py-0.5 rounded-full border border-[#eeedf7]">
                        {failureThreshold === 'strict' ? '1 Attempt' : failureThreshold === 'balanced' ? '3 Attempts' : '5 Attempts'}
                      </span>
                    </div>
                    <p className="text-xs text-[#444748]">Maximum incorrect solutions before Lumio pivots to an isomorphic sub-problem.</p>
                    <div className="flex gap-2 pt-1">
                      {(['strict', 'balanced', 'permissive'] as const).map((lvl) => (
                        <button
                          key={lvl}
                          type="button"
                          onClick={() => setFailureThreshold(lvl)}
                          className={`flex-1 py-1.5 rounded-full text-xs font-bold capitalize transition-all cursor-pointer ${
                            failureThreshold === lvl ? 'bg-black text-white' : 'bg-white text-[#1a1b22] border border-[#eeedf7]'
                          }`}
                        >
                          {lvl}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="p-5 rounded-2xl bg-[#f4f2fd] space-y-3 border border-[#e3e1ec]">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xs font-bold text-[#1a1b22]">Spaced Repetition Decay</h3>
                      <span className="text-xs font-bold text-[#009580] bg-white px-2.5 py-0.5 rounded-full border border-[#eeedf7]">
                        {decayModel === 'personalized' ? 'Neuro-Decay' : 'Ebbinghaus'}
                      </span>
                    </div>
                    <p className="text-xs text-[#444748]">Calculates intervals for resurfacing previously mastered knowledge nodes.</p>
                    <div className="flex gap-2 pt-1">
                      <button
                        type="button"
                        onClick={() => setDecayModel('personalized')}
                        className={`flex-1 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                          decayModel === 'personalized' ? 'bg-black text-white' : 'bg-white text-[#1a1b22] border border-[#eeedf7]'
                        }`}
                      >
                        Personalized
                      </button>
                      <button
                        type="button"
                        onClick={() => setDecayModel('ebbinghaus')}
                        className={`flex-1 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                          decayModel === 'ebbinghaus' ? 'bg-black text-white' : 'bg-white text-[#1a1b22] border border-[#eeedf7]'
                        }`}
                      >
                        Classical
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* PANE 4: Notifications */}
            {activeTab === 'notifications' && (
              <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-[#eeedf7] space-y-6">
                <div className="space-y-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#aa3600]">Active Priming</span>
                  <h2 className="text-xl md:text-2xl font-extrabold text-[#1a1b22]">Notifications &amp; Recalls</h2>
                  <p className="text-xs md:text-sm text-[#444748]">
                    Configure contextual recall alerts during optimal daily neuro-cognitive focus windows.
                  </p>
                </div>

                <div className="space-y-3">
                  {[
                    { state: sparks, toggle: () => setSparks(!sparks), title: 'High-Yield Recall Sparks', desc: 'Single-question micro-prompts delivered during scheduled focus blocks.' },
                    { state: digest, toggle: () => setDigest(!digest), title: 'Weekly Synthesis Digest', desc: 'Comprehensive breakdown of mastered abstractions and persistent blindspots.' },
                    { state: impasse, toggle: () => setImpasse(!impasse), title: 'Impasse Detection Push', desc: 'Notification when an unsolved sandbox challenge has a newly synthesised prerequisite.' },
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 rounded-2xl bg-[#f4f2fd] border border-[#e3e1ec]">
                      <div className="space-y-0.5 pr-4">
                        <h4 className="text-xs font-bold text-[#1a1b22]">{item.title}</h4>
                        <p className="text-xs text-[#444748]">{item.desc}</p>
                      </div>
                      <button
                        type="button"
                        onClick={item.toggle}
                        className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full transition-colors ${
                          item.state ? 'bg-black' : 'bg-[#c4c7c7]'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform mt-1 ml-1 ${
                            item.state ? 'translate-x-5' : 'translate-x-0'
                          }`}
                        ></span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* PANE 5: Account */}
            {activeTab === 'account' && (
              <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-[#eeedf7] space-y-6">
                <div className="space-y-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#aa3600]">User Identity</span>
                  <h2 className="text-xl md:text-2xl font-extrabold text-[#1a1b22]">Account &amp; Security</h2>
                  <p className="text-xs md:text-sm text-[#444748]">Manage your credentials, multi-factor hardware keys, and device sync profiles.</p>
                </div>

                <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#f4f2fd] border border-[#e3e1ec]">
                  <div className="w-14 h-14 rounded-full bg-black text-white flex items-center justify-center font-bold text-lg">
                    ER
                  </div>
                  <div className="space-y-0.5 flex-1">
                    <h3 className="text-sm font-bold text-[#1a1b22]">Elena Rostova</h3>
                    <p className="text-xs text-[#444748]">elena.rostova@synthlabs.ai • Researcher Tier</p>
                  </div>
                  <button
                    onClick={() => showToast('Persona edit modal opened.')}
                    className="px-4 py-1.5 rounded-full text-xs font-bold bg-white text-black border border-[#eeedf7] shadow-xs hover:bg-[#eeedf7] transition-all cursor-pointer"
                  >
                    Edit Persona
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-[#f4f2fd] border border-[#e3e1ec] space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#1a1b22]">Hardware Security Key</span>
                      <span className="text-[10px] font-bold text-[#005045] bg-[#e6fbf7] px-2 py-0.5 rounded-full">FIDO2 Active</span>
                    </div>
                    <p className="text-xs text-[#444748]">YubiKey 5C NFC configured as primary multi-factor barrier.</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-[#f4f2fd] border border-[#e3e1ec] space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#1a1b22]">Active API Key</span>
                      <span className="text-[10px] font-mono font-bold text-[#aa3600] bg-white px-2 py-0.5 rounded-full border border-[#eeedf7]">lum_live_9a4f</span>
                    </div>
                    <p className="text-xs text-[#444748]">Used for local programmatic telemetry and editor integration.</p>
                  </div>
                </div>
              </div>
            )}

            {/* PANE 6: Privacy */}
            {activeTab === 'privacy' && (
              <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-[#eeedf7] space-y-6">
                <div className="space-y-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#aa3600]">Cognitive Sovereignty</span>
                  <h2 className="text-xl md:text-2xl font-extrabold text-[#1a1b22]">Privacy &amp; Learning Data Controls</h2>
                  <p className="text-xs md:text-sm text-[#444748]">
                    You retain complete autonomy over your cognitive telemetry, hesitation models, and conversational transcripts.
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between p-4 rounded-2xl bg-[#f4f2fd] border border-[#e3e1ec]">
                    <div className="space-y-0.5 pr-4">
                      <h4 className="text-xs font-bold text-[#1a1b22]">Adapt Based on Hesitation Signals</h4>
                      <p className="text-xs text-[#444748]">Monitors keystroke latency, cursor pauses, and backtrack behaviors to deduce cognitive friction.</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setHesitationTracking(!hesitationTracking)}
                      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full transition-colors ${
                        hesitationTracking ? 'bg-black' : 'bg-[#c4c7c7]'
                      }`}
                    >
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform mt-1 ml-1 ${hesitationTracking ? 'translate-x-5' : 'translate-x-0'}`}></span>
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-2xl bg-[#f4f2fd] border border-[#e3e1ec]">
                    <div className="space-y-0.5 pr-4">
                      <h4 className="text-xs font-bold text-[#1a1b22]">Store Transcripts for Memory Synthesis</h4>
                      <p className="text-xs text-[#444748]">Permits the companion to index your historical problem-solving reasoning across long-term sessions.</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setTranscriptStorage(!transcriptStorage)}
                      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full transition-colors ${
                        transcriptStorage ? 'bg-black' : 'bg-[#c4c7c7]'
                      }`}
                    >
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform mt-1 ml-1 ${transcriptStorage ? 'translate-x-5' : 'translate-x-0'}`}></span>
                    </button>
                  </div>
                </div>

                {/* Export / Clear */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 rounded-2xl bg-[#f4f2fd] border border-[#e3e1ec] space-y-2">
                    <h4 className="text-xs font-bold text-[#1a1b22]">Wipe Ephemeral Context</h4>
                    <p className="text-xs text-[#444748]">Clears working-memory scratchpads while preserving long-term weights.</p>
                    <button
                      onClick={() => showToast('Session short-term memory flushed.')}
                      className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-white text-black border border-[#eeedf7] hover:bg-[#eeedf7] transition-all cursor-pointer"
                    >
                      Clear Scratchpad Memory
                    </button>
                  </div>
                  <div className="p-4 rounded-2xl bg-[#f4f2fd] border border-[#e3e1ec] space-y-2">
                    <h4 className="text-xs font-bold text-[#1a1b22]">Portability &amp; Self-Custody</h4>
                    <p className="text-xs text-[#444748]">Extract complete neural state graphs and error distributions.</p>
                    <div className="flex gap-2">
                      <button
                        onClick={() => showToast('Downloading JSON Vector Graph...')}
                        className="px-3 py-1.5 rounded-full text-xs font-bold bg-white text-black border border-[#eeedf7] hover:bg-[#eeedf7] transition-all cursor-pointer"
                      >
                        JSON Graph
                      </button>
                      <button
                        onClick={() => showToast('Downloading CSV Telemetry Logs...')}
                        className="px-3 py-1.5 rounded-full text-xs font-bold bg-white text-black border border-[#eeedf7] hover:bg-[#eeedf7] transition-all cursor-pointer"
                      >
                        CSV Logs
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Bottom Bar Verification */}
            <div className="flex items-center justify-between p-4 rounded-2xl bg-white shadow-xs border border-[#eeedf7]">
              <div className="flex items-center gap-2 text-xs text-[#444748]">
                <span className="material-symbols-outlined text-[18px] text-[#009580]">verified</span>
                <span>Configuration verified against Lumio Schema v4.2</span>
              </div>
              <button
                onClick={() => showToast('Preferences successfully applied to active runtime.')}
                className="px-6 py-2 rounded-full text-xs font-bold text-white bg-black hover:bg-neutral-800 transition-all shadow-xs cursor-pointer"
              >
                Save Preferences
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
