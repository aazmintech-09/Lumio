import React, { useState } from 'react';
import { ScreenId } from '../../types';

interface MilestoneTransitionsScreenProps {
  onNavigate: (screen: ScreenId) => void;
}

export const MilestoneTransitionsScreen: React.FC<MilestoneTransitionsScreenProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'all' | 'recalibration' | 'curves'>('all');
  const [sandboxLaunched, setSandboxLaunched] = useState(false);

  return (
    <div className="w-full min-h-screen bg-[#fbf8ff] py-8 md:py-12 px-4 md:px-12">
      <div className="max-w-[1340px] mx-auto">
        {/* Dynamic Top Banner */}
        <section className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 md:pb-10">
          <div className="space-y-2 max-w-3xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#eeedf7] rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ff5e1a]"></span>
              <span className="text-xs font-bold text-[#1a1b22] tracking-wider uppercase">Mastery Synthesis</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold text-[#1a1b22] tracking-tight">
              Achievement &amp; Milestone Transitions
            </h1>
            <p className="text-sm md:text-base text-[#444748] max-w-2xl leading-relaxed">
              Acknowledging conceptual breakthroughs with empirical metric updates and real-time next step recalibration.
            </p>
          </div>

          {/* Active State Toggle Filters */}
          <div className="flex items-center gap-1 p-1 bg-[#f4f2fd] rounded-full self-start lg:self-auto border border-[#e3e1ec]">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'all' ? 'bg-white text-black shadow-xs' : 'text-[#444748] hover:text-[#1a1b22]'
              }`}
            >
              All Transitions (5)
            </button>
            <button
              onClick={() => setActiveTab('recalibration')}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'recalibration' ? 'bg-white text-black shadow-xs' : 'text-[#444748] hover:text-[#1a1b22]'
              }`}
            >
              Live Recalibration
            </button>
            <button
              onClick={() => setActiveTab('curves')}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'curves' ? 'bg-white text-black shadow-xs' : 'text-[#444748] hover:text-[#1a1b22]'
              }`}
            >
              Parametric Curves
            </button>
          </div>
        </section>

        {/* Showcase Canvas: Bento Mosaic of 5 Completion States */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-6 pb-10">
          {/* 1. Lesson Completed (Span 7 cols) */}
          <div className="md:col-span-12 lg:col-span-7 bg-white rounded-3xl p-6 md:p-8 flex flex-col justify-between relative overflow-hidden shadow-sm border border-[#eeedf7]">
            <div className="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-[#41ddc2]/10 blur-3xl pointer-events-none"></div>
            <div>
              <div className="flex items-center justify-between gap-4 pb-4 border-b border-[#eeedf7] mb-4">
                <div className="flex items-center gap-2.5">
                  <span className="flex items-center justify-center w-7 h-7 rounded-full bg-[#f4f2fd] text-black">
                    <span className="material-symbols-outlined text-[16px]">menu_book</span>
                  </span>
                  <span className="text-xs font-bold text-[#444748] uppercase tracking-wider">Lesson Completed</span>
                </div>
                <span className="text-xs font-bold text-[#005045] bg-[#e6fbf7] px-3 py-1 rounded-full">
                  Synchronized
                </span>
              </div>

              <div className="space-y-1 mb-5">
                <div className="text-xs font-bold text-[#aa3600]">Quantum Foundations • Module 4</div>
                <h2 className="text-2xl md:text-3xl font-extrabold text-[#1a1b22] tracking-tight">
                  Quantum Entanglement &amp; Bell Inequalities
                </h2>
              </div>

              {/* Empirical Observation Strip */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-[#f4f2fd] rounded-2xl mb-5 border border-[#e3e1ec]">
                <div className="flex flex-col gap-1">
                  <span className="text-xs text-[#444748]">Active Session Duration</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-bold text-[#1a1b22]">14</span>
                    <span className="text-xs text-[#444748]">mins</span>
                  </div>
                  <span className="text-[11px] text-[#444748]">Optimal cognitive flow boundary</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-xs text-[#444748]">Cognitive Friction Index</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-bold text-[#1a1b22]">0.00</span>
                    <span className="text-xs text-[#444748]">lat. coeff</span>
                  </div>
                  <span className="text-[11px] text-[#444748]">Zero hesitation on spin-basis transformations</span>
                </div>
              </div>

              {/* Algorithmic Recalibration Prompt */}
              <div className="flex items-start gap-3 p-4 bg-[#eeedf7] rounded-2xl mb-6">
                <span className="material-symbols-outlined text-[20px] text-[#ff5e1a] mt-0.5">neurology</span>
                <div className="space-y-0.5">
                  <p className="text-xs font-bold text-[#1a1b22] uppercase tracking-wider">Algorithmic Recalibration</p>
                  <p className="text-xs text-[#1a1b22]">
                    Lumio updated your roadmap: Ready for Greenberger-Horne-Zeilinger states tomorrow.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
              <div className="flex items-center gap-1.5 text-[#444748] text-xs font-medium">
                <span className="w-2 h-2 rounded-full bg-[#009580]"></span>
                State verified against 14 theorem checks
              </div>
              <button
                type="button"
                onClick={() => onNavigate('loading-states')}
                className="w-full sm:w-auto px-6 py-3 rounded-full bg-black text-white text-xs font-bold hover:bg-neutral-800 transition-all flex items-center justify-center gap-2 group cursor-pointer shadow-sm"
              >
                <span>Proceed to Next Concept</span>
                <span className="material-symbols-outlined text-[16px] transition-transform group-hover:translate-x-0.5">
                  arrow_forward
                </span>
              </button>
            </div>
          </div>

          {/* 2. Practice Completed (Span 5 cols) */}
          <div className="md:col-span-12 lg:col-span-5 bg-white rounded-3xl p-6 md:p-8 flex flex-col justify-between shadow-sm border border-[#eeedf7] relative overflow-hidden">
            <div className="absolute -left-10 -bottom-10 w-44 h-44 rounded-full bg-[#ffb59c]/20 blur-2xl pointer-events-none"></div>
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#eeedf7] mb-4">
                <div className="flex items-center gap-2.5">
                  <span className="flex items-center justify-center w-7 h-7 rounded-full bg-[#f4f2fd] text-black">
                    <span className="material-symbols-outlined text-[16px]">cycle</span>
                  </span>
                  <span className="text-xs font-bold text-[#444748] uppercase tracking-wider">Practice Completed</span>
                </div>
                <span className="text-xs font-bold text-[#822800] bg-[#ffdbcf] px-3 py-1 rounded-full">
                  100% Convergence
                </span>
              </div>

              <h3 className="text-xl font-extrabold text-[#1a1b22] pb-3">
                12/12 Spaced Retrieval Drills Mastered
              </h3>

              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="p-4 bg-[#f4f2fd] rounded-2xl border border-[#e3e1ec]">
                  <span className="text-xs text-[#444748]">Accuracy</span>
                  <p className="text-2xl font-extrabold text-[#1a1b22] mt-1">100%</p>
                  <span className="text-[11px] text-[#444748]">Perfect recall rate</span>
                </div>
                <div className="p-4 bg-[#f4f2fd] rounded-2xl border border-[#e3e1ec]">
                  <span className="text-xs text-[#444748]">Avg. Latency</span>
                  <p className="text-2xl font-extrabold text-[#1a1b22] mt-1">3.2<span className="text-xs text-[#444748] font-normal">s</span></p>
                  <span className="text-[11px] text-[#444748]">-0.8s vs baseline</span>
                </div>
              </div>

              {/* Sparkline */}
              <div className="p-4 bg-[#f4f2fd] rounded-2xl mb-4 border border-[#e3e1ec]">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-[#1a1b22]">Retention Curve Projection</span>
                  <span className="text-xs text-[#ff5e1a] font-bold">+18 Days</span>
                </div>
                <div className="h-10 w-full flex items-end">
                  <svg className="w-full h-full text-[#aa3600]" fill="none" preserveAspectRatio="none" viewBox="0 0 240 48">
                    <path d="M0 44 C 40 42, 70 30, 110 20 C 150 10, 190 6, 240 4" stroke="currentColor" strokeLinecap="round" strokeWidth="2.5"></path>
                    <path d="M0 44 C 40 42, 70 30, 110 20 C 150 10, 190 6, 240 4 L 240 48 L 0 48 Z" fill="currentColor" fillOpacity="0.08"></path>
                  </svg>
                </div>
                <p className="text-[11px] text-[#444748] mt-1">
                  Decay curve extended by +18 days. Spaced repetition interval updated.
                </p>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => onNavigate('landing')}
                className="w-full py-2.5 rounded-full bg-[#eeedf7] text-[#1a1b22] font-bold text-xs hover:bg-[#e8e7f1] transition-colors cursor-pointer"
              >
                Return to Hub
              </button>
            </div>
          </div>

          {/* 3. Assessment Completed (Span 5 cols) */}
          <div className="md:col-span-12 lg:col-span-5 bg-white rounded-3xl p-6 md:p-8 flex flex-col justify-between shadow-sm border border-[#eeedf7]">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#eeedf7] mb-4">
                <div className="flex items-center gap-2.5">
                  <span className="flex items-center justify-center w-7 h-7 rounded-full bg-[#f4f2fd] text-black">
                    <span className="material-symbols-outlined text-[16px]">analytics</span>
                  </span>
                  <span className="text-xs font-bold text-[#444748] uppercase tracking-wider">Assessment Completed</span>
                </div>
                <span className="text-xs text-[#1a1b22] bg-[#eeedf7] px-3 py-1 rounded-full font-bold">
                  Calibrated Score
                </span>
              </div>

              <div className="space-y-0.5 mb-4">
                <span className="text-xs font-bold text-[#aa3600]">Mid-Sprint Diagnostic</span>
                <h3 className="text-xl font-extrabold text-[#1a1b22]">Linear Dynamical Systems</h3>
              </div>

              {/* Percentile Gauge Visual */}
              <div className="p-5 bg-[#f4f2fd] rounded-2xl flex items-center justify-between gap-4 mb-4 border border-[#e3e1ec]">
                <div>
                  <div className="text-4xl font-extrabold text-[#1a1b22] leading-none">
                    94<span className="text-lg text-[#444748] align-top">th</span>
                  </div>
                  <div className="text-xs text-[#444748] mt-1 font-semibold">Global Cohort Percentile</div>
                </div>
                <div className="w-16 h-16 shrink-0 relative flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                    <path className="text-[#eeedf7]" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3.5"></path>
                    <path className="text-black" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeDasharray="94, 100" strokeLinecap="round" strokeWidth="3.5"></path>
                  </svg>
                  <span className="material-symbols-outlined text-[18px] absolute text-black">verified</span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs text-[#1a1b22] p-3.5 bg-[#eeedf7] rounded-xl mb-4">
                <span className="material-symbols-outlined text-[18px] text-[#009580]">lock_open</span>
                <p>
                  Prerequisites for <strong className="font-bold">Multivariable Feedback Loops</strong> are now unlocked.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 pt-2">
              <button
                type="button"
                onClick={() => alert('Diagnostic Breakdown: Eigenvalues (100%), Phase Portrait (95%), Stability Criteria (92%)')}
                className="flex-1 py-2.5 px-3 rounded-full bg-[#f4f2fd] text-[#1a1b22] text-xs font-bold hover:bg-[#eeedf7] transition-colors text-center cursor-pointer border border-[#e3e1ec]"
              >
                Diagnostic Breakdown
              </button>
              <button
                type="button"
                onClick={() => onNavigate('loading-states')}
                className="flex-1 py-2.5 px-3 rounded-full bg-black text-white text-xs font-bold hover:bg-neutral-800 transition-colors text-center cursor-pointer shadow-xs"
              >
                Continue Learning
              </button>
            </div>
          </div>

          {/* 4. Topic Mastered (Span 7 cols) */}
          <div className="md:col-span-12 lg:col-span-7 bg-white rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 justify-between shadow-sm border border-[#eeedf7] relative overflow-hidden">
            {/* Concentric Rings Emblem */}
            <div className="shrink-0 w-36 h-36 relative flex items-center justify-center">
              <div className="absolute inset-0 rounded-full bg-[#f4f2fd] animate-pulse"></div>
              <div className="absolute inset-3 rounded-full bg-[#eeedf7] flex items-center justify-center"></div>
              <div className="absolute inset-6 rounded-full bg-[#e8e7f1] flex items-center justify-center"></div>
              <div className="w-14 h-14 rounded-full bg-black flex items-center justify-center z-10 shadow-md">
                <span className="material-symbols-outlined text-[#65fade] text-[24px]">workspace_premium</span>
              </div>
            </div>

            <div className="flex-1 flex flex-col justify-between h-full text-center md:text-left">
              <div>
                <div className="flex items-center justify-center md:justify-start gap-2 pb-1">
                  <span className="text-[11px] font-bold text-[#aa3600] uppercase tracking-wider">Deep Intellectual Mastery</span>
                  <span className="w-1 h-1 rounded-full bg-[#747878]"></span>
                  <span className="text-[11px] text-[#747878]">Concept Engine</span>
                </div>
                <h3 className="text-xl md:text-2xl font-extrabold text-[#1a1b22] pb-1">
                  Eigenvalue Decomposition Mastered
                </h3>
                <div className="space-y-1 mb-4">
                  <div className="flex items-center justify-center md:justify-start gap-2">
                    <span className="text-xs text-[#444748]">Confidence Index:</span>
                    <span className="text-xs font-bold text-[#1a1b22]">98.2%</span>
                  </div>
                  <p className="text-xs text-[#444748] leading-relaxed">
                    Stored in permanent long-term memory index. Intuition verified across canonical matrix forms and spectral theory proofs.
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 border-t border-[#eeedf7]">
                <span className="text-[11px] text-[#747878] font-mono">Immutable Archive ID: #EIG-8841</span>
                <button
                  type="button"
                  onClick={() => alert('Loading synthesis card for Eigenvalue Decomposition...')}
                  className="px-5 py-2 rounded-full bg-[#f4f2fd] text-[#1a1b22] text-xs font-bold hover:bg-[#eeedf7] transition-colors cursor-pointer border border-[#e3e1ec]"
                >
                  Review Concept Synthesis
                </button>
              </div>
            </div>
          </div>

          {/* 5. Learning-Path Milestone (Full-Width Span 12 cols) */}
          <div className="md:col-span-12 bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-[#eeedf7] relative overflow-hidden">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
              <div className="space-y-1 max-w-2xl">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-0.5 bg-[#eeedf7] rounded-full text-xs font-bold text-[#1a1b22]">
                    Milestone 2 of 4 Reached
                  </span>
                  <span className="text-xs text-[#747878]">Curriculum Phase Track</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-extrabold text-[#1a1b22]">
                  Foundational Modern Physics
                </h2>
                <p className="text-xs md:text-sm text-[#444748]">
                  Next Phase: Relativistic Electrodynamics. Lumio has scheduled introductory intuition sandboxes.
                </p>
              </div>

              <div className="flex items-center gap-6 self-start lg:self-auto p-3.5 bg-[#f4f2fd] rounded-2xl border border-[#e3e1ec]">
                <div>
                  <div className="text-[11px] text-[#747878]">Total Theorems</div>
                  <div className="text-base font-bold text-[#1a1b22]">42 Verified</div>
                </div>
                <div className="w-px h-6 bg-[#c4c7c7]"></div>
                <div>
                  <div className="text-[11px] text-[#747878]">Curriculum State</div>
                  <div className="text-base font-bold text-[#aa3600]">75% Complete</div>
                </div>
              </div>
            </div>

            {/* Segmented Progress Bar */}
            <div className="space-y-2 mb-6">
              <div className="flex flex-wrap justify-between text-[11px] text-[#444748]">
                <span>01 Classical Mechanics (100%)</span>
                <span className="font-bold text-black">02 Modern Physics (100%)</span>
                <span className="font-bold text-[#aa3600]">03 Relativistic Electrodynamics (Starting)</span>
                <span className="text-[#c4c7c7]">04 Quantum Field Primer</span>
              </div>
              <div className="w-full h-3 bg-[#eeedf7] rounded-full overflow-hidden flex gap-1 p-0.5">
                <div className="h-full bg-black rounded-full" style={{ width: '25%' }}></div>
                <div className="h-full bg-black rounded-full" style={{ width: '25%' }}></div>
                <div className="h-full bg-[#ff5e1a] rounded-full transition-all duration-1000" style={{ width: '25%' }}></div>
                <div className="h-full bg-[#e8e7f1] rounded-full" style={{ width: '25%' }}></div>
              </div>
              <div className="flex items-center justify-between text-[11px] pt-1">
                <span className="text-[#747878]">Prior threshold: 50%</span>
                <div className="flex items-center gap-1 text-[#aa3600] font-bold">
                  <span className="material-symbols-outlined text-[14px]">auto_graph</span>
                  <span>Current Pathway Alignment: 75%</span>
                </div>
              </div>
            </div>

            {/* Sandbox Drawer */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-3 bg-[#f4f2fd] p-4 rounded-2xl border border-[#e3e1ec]">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center text-white">
                  <span className="material-symbols-outlined text-[18px]">terminal</span>
                </div>
                <div>
                  <p className="text-xs font-bold text-[#1a1b22]">Interactive Sandbox Ready</p>
                  <p className="text-[11px] text-[#444748]">Minkowski space-time diagram visualizer is calibrated</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => onNavigate('onboarding-2')}
                  className="flex-1 sm:flex-initial px-5 py-2.5 rounded-full bg-white text-[#1a1b22] text-xs font-bold hover:bg-[#eeedf7] transition-colors border border-[#eeedf7] cursor-pointer"
                >
                  Curriculum Map
                </button>
                <button
                  type="button"
                  onClick={() => setSandboxLaunched(!sandboxLaunched)}
                  className="flex-1 sm:flex-initial px-6 py-2.5 rounded-full bg-black text-white text-xs font-bold hover:bg-neutral-800 transition-colors shadow-xs cursor-pointer"
                >
                  {sandboxLaunched ? 'Close Sandbox' : 'Launch Intuition Sandbox'}
                </button>
              </div>
            </div>

            {sandboxLaunched && (
              <div className="mt-4 p-5 rounded-2xl bg-black text-white space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono text-[#65fade]">sandbox@minkowski-v1.4</span>
                  <span className="text-neutral-400">c = 1 (Natural Units)</span>
                </div>
                <div className="h-32 bg-neutral-900 rounded-xl flex items-center justify-center border border-neutral-800 relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center opacity-30">
                    <div className="w-48 h-48 border border-[#ff5e1a] rotate-45"></div>
                  </div>
                  <div className="relative z-10 text-center">
                    <span className="text-xs font-mono text-[#65fade] block">Lorentz Boost Matrix: γ = (1 - v²/c²)^(-1/2)</span>
                    <span className="text-[11px] text-neutral-400">Worldline lightcone slope: 45° invariant</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Telemetry Footer Strip */}
        <section className="flex flex-col md:flex-row items-center justify-between gap-4 py-3.5 text-xs text-[#747878] bg-[#f4f2fd] rounded-2xl px-5 border border-[#e3e1ec]">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 font-medium text-[#1a1b22]">
              <span className="w-2 h-2 rounded-full bg-[#009580]"></span>
              Neural weights updated
            </span>
            <span>•</span>
            <span>Confidence intervals cross-validated with 120,000+ benchmark trials</span>
          </div>
          <div className="flex items-center gap-1.5 font-medium text-black">
            <span className="material-symbols-outlined text-[16px]">lock</span>
            <span>Cryptographically attested mastery artifact</span>
          </div>
        </section>
      </div>
    </div>
  );
};
