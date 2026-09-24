import React, { useState } from 'react';
import { ScreenId } from '../../types';

interface OnboardingCalibrationScreenProps {
  onNavigate: (screen: ScreenId) => void;
}

export const OnboardingCalibrationScreen: React.FC<OnboardingCalibrationScreenProps> = ({ onNavigate }) => {
  const [selectedStage, setSelectedStage] = useState('undergrad');
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>(['calc', 'orgo', 'linalg']);
  const [selectedExam, setSelectedExam] = useState('MCAT');
  const [activeFrictions, setActiveFrictions] = useState<string[]>(['derivation', 'pacing']);
  const [isSaved, setIsSaved] = useState(false);

  const toggleSubject = (id: string) => {
    if (selectedSubjects.includes(id)) {
      setSelectedSubjects(selectedSubjects.filter((s) => s !== id));
    } else {
      setSelectedSubjects([...selectedSubjects, id]);
    }
  };

  const toggleFriction = (id: string) => {
    if (activeFrictions.includes(id)) {
      setActiveFrictions(activeFrictions.filter((f) => f !== id));
    } else {
      setActiveFrictions([...activeFrictions, id]);
    }
  };

  const handleSave = () => {
    setIsSaved(true);
    setTimeout(() => {
      onNavigate('loading-states');
    }, 1200);
  };

  return (
    <div className="w-full min-h-screen bg-[#fbf8ff] flex flex-col items-center px-4 md:px-12 py-8 md:py-12">
      <div className="w-full max-w-[1340px] mx-auto">
        {/* Top Stepper Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-8 mb-8 border-b border-[#eeedf7]">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-black text-white font-bold text-xs">
              02
            </span>
            <div className="flex flex-col">
              <span className="text-xs uppercase tracking-wider text-[#444748] font-bold">Onboarding Sequence</span>
              <span className="text-lg font-bold text-[#1a1b22]">Step 2 of 4: Academic Calibration</span>
            </div>
          </div>

          {/* Segmented Progress Meter */}
          <div className="flex items-center gap-3 w-full md:w-80">
            <div className="flex-1 h-2 rounded-full bg-[#eeedf7] flex overflow-hidden p-0.5">
              <div className="w-1/2 h-full bg-black rounded-full transition-all duration-500 ease-out"></div>
            </div>
            <span className="text-xs text-[#444748] font-mono font-bold">50% CALIBRATED</span>
          </div>
        </div>

        {/* Editorial Intro Hero Block */}
        <div className="relative mb-10">
          <div className="absolute -left-6 top-1/2 -translate-y-1/2 w-1.5 h-16 bg-[#ff5e1a] rounded-full hidden md:block"></div>
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ffdbcf] text-[#822800] text-xs font-bold mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ff5e1a] animate-pulse"></span>
              <span>High-Precision Adaptive Engine</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold text-[#1a1b22] tracking-tight leading-tight mb-2">
              Calibrate your academic trajectory.
            </h1>
            <p className="text-base text-[#444748] leading-relaxed">
              Tell Lumio where you are, where you want to excel, and where friction happens. We turn syllabus overload into intuitive mastery.
            </p>
          </div>
        </div>

        {/* Main Grid Layout: Workspace (8 cols) + Sticky Preview (4 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Primary Configuration Workspace */}
          <div className="lg:col-span-8 flex flex-col gap-8">
            {/* 1. Academic Level & Stage */}
            <section className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-[#eeedf7]">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#aa3600]">school</span>
                  <h2 className="text-lg md:text-xl font-bold text-[#1a1b22]">Academic Level &amp; Stage</h2>
                </div>
                <span className="text-xs text-[#444748]">Select dominant domain</span>
              </div>
              <p className="text-xs text-[#444748] mb-5">Determines foundational rigor, theorem depth, and algorithmic pacing.</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { id: 'highschool', title: 'High School Accelerated', sub: 'AP, Honors, International Baccalaureate (IB)' },
                  { id: 'undergrad', title: 'Undergraduate STEM', sub: 'Foundational Engineering, Pure Math, Pre-Med' },
                  { id: 'grad', title: 'Graduate & Professional', sub: 'Ph.D. Qualifying, Postgrad Specialization' },
                  { id: 'self', title: 'Self-Directed Mastery', sub: 'Polymath sprints, cross-discipline agility' },
                ].map((stage) => {
                  const isSelected = selectedStage === stage.id;
                  return (
                    <button
                      key={stage.id}
                      type="button"
                      onClick={() => setSelectedStage(stage.id)}
                      className={`text-left p-4 rounded-2xl transition-all flex items-start justify-between cursor-pointer border ${
                        isSelected
                          ? 'bg-black text-white shadow-md border-black'
                          : 'bg-[#fbf8ff] text-[#1a1b22] border-[#eeedf7] hover:bg-[#eeedf7]'
                      }`}
                    >
                      <div>
                        <span className={`block font-bold text-sm ${isSelected ? 'text-white' : 'text-[#1a1b22]'}`}>
                          {stage.title}
                        </span>
                        <span className={`block text-xs mt-1 ${isSelected ? 'text-neutral-300' : 'text-[#444748]'}`}>
                          {stage.sub}
                        </span>
                      </div>
                      <span className={`material-symbols-outlined text-sm ${isSelected ? 'text-[#65fade]' : 'text-[#747878]'}`}>
                        {isSelected ? 'check_circle' : 'radio_button_unchecked'}
                      </span>
                    </button>
                  );
                })}
              </div>
            </section>

            {/* 2. Target Subjects & Curricula */}
            <section className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-[#eeedf7]">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#aa3600]">account_tree</span>
                  <h2 className="text-lg md:text-xl font-bold text-[#1a1b22]">Target Subjects &amp; Curricula</h2>
                </div>
                <span className="text-xs text-[#444748] font-mono font-bold">
                  {selectedSubjects.length} SELECTED
                </span>
              </div>
              <p className="text-xs text-[#444748] mb-5">Active courses mapped to real-time derivation engines and synthesis maps.</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { id: 'calc', icon: '∫dx', badge: 'High Load', title: 'AP Calculus BC', desc: 'Taylor series, parametric vectors, polar integration schemas.', rigor: '4.8/5' },
                  { id: 'orgo', icon: '⬡', badge: 'Synthesis Heavy', title: 'Organic Chemistry II', desc: 'Retrosynthetic analysis, carbonyl reactions, NMR spectrometry.', rigor: '4.9/5' },
                  { id: 'linalg', icon: '[A]', badge: 'Abstract', title: 'Linear Algebra & Multivariable', desc: "Eigenvalues, SVD decomposition, Stokes' & Green's theorems.", rigor: '4.7/5' },
                  { id: 'econ', icon: 'ΔP', badge: 'Models', title: 'Micro & Macro Economics', desc: 'Equilibrium theorems, fiscal multipliers, game theoretic equilibria.', rigor: '3.9/5' },
                  { id: 'cs', icon: '</>', badge: 'Applied', title: 'Computer Science & Algo', desc: 'Time complexity, recursive data trees, pointer memory models.', rigor: '4.4/5' },
                  { id: 'physics', icon: 'F=ma', badge: 'Classical', title: 'Physics: Mechanics (C)', desc: 'Rotational dynamics, harmonic oscillators, Lagrangian setups.', rigor: '4.6/5' },
                ].map((subj) => {
                  const isSelected = selectedSubjects.includes(subj.id);
                  return (
                    <div
                      key={subj.id}
                      onClick={() => toggleSubject(subj.id)}
                      className={`p-5 rounded-2xl transition cursor-pointer relative border flex flex-col justify-between ${
                        isSelected
                          ? 'bg-[#f4f2fd] border-black shadow-sm'
                          : 'bg-white border-[#eeedf7] opacity-75 hover:opacity-100 hover:bg-[#fbf8ff]'
                      }`}
                    >
                      <div>
                        <div className="flex items-start justify-between gap-3 mb-2">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                            isSelected ? 'bg-black text-white' : 'bg-[#eeedf7] text-[#1a1b22]'
                          }`}>
                            {subj.icon}
                          </div>
                          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold ${
                            isSelected ? 'bg-[#ffdbcf] text-[#822800]' : 'bg-[#eeedf7] text-[#444748]'
                          }`}>
                            {subj.badge}
                          </span>
                        </div>
                        <h3 className="font-bold text-base text-[#1a1b22] mb-1">{subj.title}</h3>
                        <p className="text-xs text-[#444748] leading-relaxed">{subj.desc}</p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-[#e8e7f1] flex items-center justify-between">
                        <span className="text-xs font-mono font-medium text-black flex items-center gap-1.5">
                          <span className={`w-2 h-2 rounded-full ${isSelected ? 'bg-[#41ddc2]' : 'bg-[#c4c7c7]'}`}></span>
                          Rigor Lvl: {subj.rigor}
                        </span>
                        <span className={`material-symbols-outlined text-base ${isSelected ? 'text-black' : 'text-[#747878]'}`}>
                          {isSelected ? 'check_box' : 'check_box_outline_blank'}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* 3. High-Stakes Exam Goals */}
            <section className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-[#eeedf7]">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#aa3600]">timer</span>
                  <h2 className="text-lg md:text-xl font-bold text-[#1a1b22]">High-Stakes Exam Targets</h2>
                </div>
                <span className="text-xs font-bold text-[#ff5e1a] bg-[#ffdbcf] px-2.5 py-1 rounded-full">
                  T-MINUS 74 DAYS
                </span>
              </div>
              <p className="text-xs text-[#444748] mb-5">Anchor automated diagnostic drills and timed memory-retrieval tests to actual exam days.</p>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 mb-5">
                {[
                  { label: 'SAT/ACT', sub: 'Undergrad' },
                  { label: 'MCAT', sub: 'Medical' },
                  { label: 'LSAT', sub: 'Law' },
                  { label: 'GRE/GMAT', sub: 'Grad' },
                  { label: 'AP Exams', sub: 'May Session' },
                  { label: 'Finals', sub: 'Semester' },
                ].map((exam) => {
                  const isSelected = selectedExam === exam.label;
                  return (
                    <button
                      key={exam.label}
                      type="button"
                      onClick={() => setSelectedExam(exam.label)}
                      className={`p-3 rounded-2xl text-center transition cursor-pointer border ${
                        isSelected
                          ? 'bg-black text-white border-black shadow-sm'
                          : 'bg-[#fbf8ff] text-[#1a1b22] border-[#eeedf7] hover:bg-[#eeedf7]'
                      }`}
                    >
                      <span className={`block font-bold text-xs ${isSelected ? 'text-white' : 'text-[#1a1b22]'}`}>
                        {exam.label}
                      </span>
                      <span className={`block text-[10px] mt-0.5 ${isSelected ? 'text-neutral-300' : 'text-[#444748]'}`}>
                        {exam.sub}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Date & Cadence Controls */}
              <div className="p-4 rounded-2xl bg-[#f4f2fd] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border border-[#e3e1ec]">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-black text-xl">event</span>
                  <div>
                    <span className="block font-bold text-xs text-[#1a1b22]">Target Test Date</span>
                    <span className="block text-xs text-[#444748]">Friday, May 16, 2025 (North America Test Center)</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-[#444748] uppercase tracking-wider font-semibold">Velocity:</span>
                  <span className="px-3 py-1 rounded-full bg-white text-[#1a1b22] text-xs font-bold shadow-xs">
                    High-Density (12h/wk)
                  </span>
                </div>
              </div>
            </section>

            {/* 4. Cognitive Friction Diagnostics */}
            <section className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-[#eeedf7]">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#aa3600]">psychology_alt</span>
                  <h2 className="text-lg md:text-xl font-bold text-[#1a1b22]">Cognitive Friction Diagnostics</h2>
                </div>
                <span className="text-xs text-[#444748]">Tap all that impede flow</span>
              </div>
              <p className="text-xs text-[#444748] mb-5">Lumio uses friction diagnostics to insert intermediate conceptual stepping stones and micro-proofs.</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { id: 'derivation', title: 'Derivation steps feel arbitrary', desc: 'Difficulty predicting mathematical transforms without explicit intuition hooks.' },
                  { id: 'memory', title: 'Remembering multi-variable formulas', desc: 'Loss of recall under high cognitive load or nested condition sets.' },
                  { id: 'pacing', title: 'Pacing under timed test conditions', desc: 'Time allocation collapses on complex multi-tier question topologies.' },
                  { id: 'translation', title: 'Theory-to-Problem Translation', desc: 'Can state textbook lemmas but hesitate on synthetic novel problem sets.' },
                ].map((fric) => {
                  const isSelected = activeFrictions.includes(fric.id);
                  return (
                    <div
                      key={fric.id}
                      onClick={() => toggleFriction(fric.id)}
                      className={`p-4 rounded-2xl transition cursor-pointer flex items-start gap-3 border ${
                        isSelected
                          ? 'bg-[#eeedf7] border-black'
                          : 'bg-white border-[#eeedf7] hover:bg-[#fbf8ff]'
                      }`}
                    >
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center text-xs mt-0.5 shrink-0 ${
                        isSelected ? 'bg-black text-white' : 'bg-[#e8e7f1] text-transparent'
                      }`}>
                        <span className="material-symbols-outlined text-[13px]">check</span>
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-xs font-bold text-[#1a1b22]">{fric.title}</h4>
                        <p className="text-xs text-[#444748] mt-1 leading-relaxed">{fric.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          </div>

          {/* Right Column: Real-time Adaptive Diagnosis Synthesis HUD */}
          <aside className="lg:col-span-4 flex flex-col gap-6 lg:sticky lg:top-14">
            {/* Adaptive Synthesis Card */}
            <div className="bg-black text-white p-6 md:p-8 rounded-3xl shadow-xl relative overflow-hidden border border-neutral-800">
              <div className="absolute -right-12 -top-12 w-48 h-48 bg-[#ff5e1a] opacity-20 rounded-full blur-3xl pointer-events-none"></div>

              <div className="flex items-center justify-between mb-5">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-900 text-[#65fade] text-xs font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#65fade] animate-ping"></span> Live Engine
                </span>
                <span className="text-xs text-neutral-400 font-mono">v4.1.8-SYNTH</span>
              </div>

              <h3 className="text-xl font-bold text-white mb-1.5">Curriculum Synthesis</h3>
              <p className="text-xs text-neutral-400 mb-5 leading-relaxed">
                Real-time recalibration based on active friction points and syllabus parameters.
              </p>

              {/* Diagnostic Metrics Graph Sparkline */}
              <div className="p-4 rounded-2xl bg-neutral-900 mb-5 border border-neutral-800">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-neutral-400">Cognitive Load Profile</span>
                  <span className="text-xs text-[#65fade] font-mono font-bold">+34% Deep Work</span>
                </div>
                <svg className="w-full h-16 text-[#65fade]" fill="none" viewBox="0 0 280 64">
                  <defs>
                    <linearGradient id="curve-gradient" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="currentColor" stopOpacity="0.3"></stop>
                      <stop offset="100%" stopColor="currentColor" stopOpacity="0.0"></stop>
                    </linearGradient>
                  </defs>
                  <path d="M0,52 C40,48 70,12 110,24 C150,36 190,8 230,16 C250,20 270,4 280,2 L280,64 L0,64 Z" fill="url(#curve-gradient)"></path>
                  <path d="M0,52 C40,48 70,12 110,24 C150,36 190,8 230,16 C250,20 270,4 280,2" stroke="currentColor" strokeLinecap="round" strokeWidth="2.5"></path>
                  <circle cx="280" cy="2" fill="#ffffff" r="3.5"></circle>
                </svg>
                <div className="flex justify-between items-center text-neutral-400 text-[11px] font-mono mt-2 pt-2 border-t border-neutral-800">
                  <span>Wk 1: Intuition</span>
                  <span>Wk 6: Mastery</span>
                  <span>Wk 11: Speed</span>
                </div>
              </div>

              {/* Dynamic Rebalancing Rules Active */}
              <div className="flex flex-col gap-3.5 mb-5 text-xs">
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-[#ff5e1a] text-base mt-0.5">alt_route</span>
                  <div>
                    <span className="block font-bold text-white">Socratic First-Principles Injected</span>
                    <span className="block text-neutral-400 text-[11px] mt-0.5 leading-snug">
                      Activated by: <em>Derivation steps feel arbitrary</em>. Adds interactive step-validation.
                    </span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-[#ff5e1a] text-base mt-0.5">speed</span>
                  <div>
                    <span className="block font-bold text-white">Micro-Interval Pressure Runs</span>
                    <span className="block text-neutral-400 text-[11px] mt-0.5 leading-snug">
                      Activated by: <em>Timed pacing friction</em>. 90-second rapid heuristic diagnostics.
                    </span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-[#ff5e1a] text-base mt-0.5">verified</span>
                  <div>
                    <span className="block font-bold text-white">Daily Mastery Retention Index</span>
                    <span className="block text-neutral-400 text-[11px] mt-0.5 leading-snug">
                      Spaced retrieval scheduling prioritized for active units.
                    </span>
                  </div>
                </div>
              </div>

              {/* Target Benchmark Projection */}
              <div className="p-3.5 rounded-2xl bg-neutral-900 border border-neutral-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#65fade] text-base">insights</span>
                  <span className="text-xs text-white font-medium">Predicted {selectedExam} Readiness</span>
                </div>
                <span className="text-sm text-[#65fade] font-mono font-bold">518 - 522</span>
              </div>
            </div>

            {/* Student Environment Context Card */}
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-[#eeedf7] flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <img
                  className="w-12 h-12 rounded-full object-cover shadow-sm"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDfbKB8SLTdP8sD8PyohMc03Y6pyMeYimtxiD5J57diSzDjHbI-bAJh5tukgeGfjWinEvLedfx4VNsKNsa2ifx9WxID7BECphOsnompRMLV37JaOzxr4SIXl-nuOADJjjJ010nkL8dbJInbzhSrEyUrWdz8VrgjjCAqT8t2ijjs9Duql28bL0tqcKZmWM5mHpV4XiQxzhXPPNXmDHs5hth28Dd4LOLirQ5HE37zZoY6C29koZx59o_u"
                  alt="Student workspace"
                />
                <div>
                  <span className="block font-bold text-xs text-[#1a1b22]">Cognitive Profile: Accelerated</span>
                  <span className="block text-[11px] text-[#444748] font-mono">Matched to: 4,120 peers</span>
                </div>
              </div>
              <p className="text-xs text-[#444748] leading-relaxed">
                Lumio adapts the difficulty gradient continuously. As you complete flash-proofs, modules auto-collapse or fork deeper.
              </p>
            </div>
          </aside>
        </div>

        {/* Bottom Persistent Action Bar */}
        <div className="mt-12 pt-6 border-t border-[#eeedf7] flex flex-col-reverse sm:flex-row items-center justify-between gap-4">
          <button
            onClick={() => onNavigate('onboarding-1')}
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#444748] hover:text-[#1a1b22] px-4 py-3 rounded-full hover:bg-[#eeedf7] transition cursor-pointer"
          >
            <span className="material-symbols-outlined text-base">arrow_back</span>
            Back to General Goals
          </button>

          <div className="flex items-center gap-4 w-full sm:w-auto">
            <span className="hidden md:inline text-xs text-[#444748]">Calibration autosaved to your Lumio profile</span>
            <button
              onClick={handleSave}
              className={`w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full text-white font-bold text-xs md:text-sm shadow-md hover:shadow-lg transition-all transform active:scale-95 cursor-pointer ${
                isSaved ? 'bg-[#ff5e1a]' : 'bg-black hover:bg-neutral-800'
              }`}
            >
              <span>{isSaved ? 'Trajectory Synthesized!' : 'Save & Build Trajectory'}</span>
              <span className="material-symbols-outlined text-base">
                {isSaved ? 'check' : 'arrow_forward'}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
