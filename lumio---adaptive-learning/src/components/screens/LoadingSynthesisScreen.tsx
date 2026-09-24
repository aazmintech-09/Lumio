import React, { useState, useEffect } from 'react';
import { ScreenId } from '../../types';

interface LoadingSynthesisScreenProps {
  onNavigate: (screen: ScreenId) => void;
}

export const LoadingSynthesisScreen: React.FC<LoadingSynthesisScreenProps> = ({ onNavigate }) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'ai' | 'path' | 'friction' | 'material' | 'progress'>('all');
  const [speedMultiplier, setSpeedMultiplier] = useState<1.0 | 2.5>(1.0);
  const [tokenRate, setTokenRate] = useState(184);
  const [socraticIndex, setSocraticIndex] = useState(0);
  const [pathProgress, setPathProgress] = useState(84);
  const [syncState, setSyncState] = useState<'idle' | 'syncing' | 'synced'>('idle');

  const socraticPrompts = [
    'Synthesizing Socratic cue from first-principles...',
    'Querying prerequisite gap in Hamiltonian formulations...',
    'Evaluating intuition barrier on orthogonal projection...',
    'Generating scaffolded multi-choice hint vector...',
    'Calibrating inquiry depth for active recall threshold...',
  ];

  // Token counter fluctuation
  useEffect(() => {
    const interval = setInterval(() => {
      const base = speedMultiplier === 2.5 ? 420 : 180;
      setTokenRate(base + Math.floor(Math.random() * 30));
    }, 1000);
    return () => clearInterval(interval);
  }, [speedMultiplier]);

  const cycleSocraticVector = () => {
    setSocraticIndex((prev) => (prev + 1) % socraticPrompts.length);
  };

  const handleRegeneratePath = () => {
    setPathProgress(15);
    setTimeout(() => setPathProgress(45), 300);
    setTimeout(() => setPathProgress(72), 700);
    setTimeout(() => setPathProgress(92), 1200);
  };

  const handleTriggerSync = () => {
    setSyncState('syncing');
    setTimeout(() => {
      setSyncState('synced');
      setTimeout(() => setSyncState('idle'), 2000);
    }, 1000);
  };

  return (
    <div className="w-full min-h-screen bg-[#fbf8ff] py-8 md:py-12 px-4 md:px-12">
      <div className="max-w-[1340px] mx-auto">
        {/* Header & Narrative Strip */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8 md:mb-12">
          <div className="flex flex-col gap-2 max-w-3xl">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#eeedf7] text-[#1a1b22] text-xs font-bold tracking-widest uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ff5e1a] animate-ping"></span>
                Neural Progress Engine
              </span>
              <span className="text-xs text-[#747878]">v3.4 · Runtime Diagnostics</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold text-[#1a1b22] tracking-tight">
              Cognitive Loading &amp; Synthesis States
            </h1>
            <p className="text-sm md:text-base text-[#444748] mt-1 leading-relaxed">
              Low-latency adaptive indicators showing real-time conceptual graph construction, cognitive friction analysis, and semantic ingestion. Built specifically to eliminate static waiting fatigue through deterministic conceptual transparency.
            </p>
          </div>

          {/* Engine Telemetry Overview Pill */}
          <div className="flex items-center gap-4 p-2.5 bg-[#f4f2fd] rounded-2xl self-start lg:self-auto shadow-xs border border-[#e3e1ec]">
            <div className="flex items-center gap-1.5 px-3 py-1 bg-white rounded-full shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#41ddc2]"></span>
              <span className="text-xs font-bold text-[#1a1b22]">Synapse 60fps</span>
            </div>
            <div className="h-4 w-px bg-[#c4c7c7]"></div>
            <div className="flex items-center gap-1.5 text-[#444748] text-xs font-semibold pr-2">
              <span className="material-symbols-outlined text-[16px]">sensors</span>
              <span>0.04s Mean Jitter</span>
            </div>
          </div>
        </div>

        {/* Interactive State Sandbox Filter */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-2 bg-[#f4f2fd] rounded-2xl mb-8 border border-[#e3e1ec]">
          <div className="flex flex-wrap items-center gap-1">
            {[
              { id: 'all', label: 'All Systems (5)' },
              { id: 'ai', label: 'AI Responses' },
              { id: 'path', label: 'Learning-Path Gen' },
              { id: 'friction', label: 'Diagnostic Friction' },
              { id: 'material', label: 'Material Ingestion' },
              { id: 'progress', label: 'Progress Sync' },
            ].map((tab) => {
              const isActive = activeFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveFilter(tab.id as any)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-black text-white shadow-sm'
                      : 'text-[#444748] hover:text-[#1a1b22] hover:bg-[#eeedf7]'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setSpeedMultiplier(speedMultiplier === 1.0 ? 2.5 : 1.0)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer ${
                speedMultiplier === 2.5
                  ? 'bg-[#ffdbcf] text-[#822800] border border-[#ffb59c]'
                  : 'bg-white text-[#1a1b22] border border-[#e3e1ec]'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">
                {speedMultiplier === 2.5 ? 'bolt' : 'speed'}
              </span>
              <span>Pacing: {speedMultiplier === 2.5 ? 'Fast (2.5x)' : 'Normal (1.0x)'}</span>
            </button>
          </div>
        </div>

        {/* Showcase Canvas Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* STATE 1: AI Responses (Span 7 cols) */}
          {(activeFilter === 'all' || activeFilter === 'ai') && (
            <div className="lg:col-span-7 bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-[#eeedf7] flex flex-col justify-between relative overflow-hidden transition-all">
              <div className="flex items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center text-white">
                    <span className="material-symbols-outlined text-[16px]">neurology</span>
                  </div>
                  <div>
                    <h2 className="text-base md:text-lg font-bold text-[#1a1b22]">01 · Real-Time Socratic Cue Synthesis</h2>
                    <p className="text-[11px] text-[#747878] uppercase tracking-wider font-semibold">Semantic Vector Alignment</p>
                  </div>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-[#ffdbcf] text-[#822800] text-xs font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ff5e1a] animate-pulse"></span> Streaming
                </span>
              </div>

              {/* Synthesis Motion Visualizer */}
              <div className="bg-[#f4f2fd] rounded-2xl p-5 flex flex-col gap-4 relative overflow-hidden border border-[#e3e1ec]">
                <div className="flex items-center justify-between text-[#444748] text-xs">
                  <span className="flex items-center gap-1.5 truncate">
                    <span className="material-symbols-outlined text-[14px]">psychology</span>
                    Active Context: Quantum Harmonic Oscillators &amp; Wave Mechanics
                  </span>
                  <span className="font-mono text-black font-bold shrink-0">{tokenRate} tokens/sec</span>
                </div>

                {/* Synaptic Wave SVG */}
                <div className="h-24 flex flex-col items-center justify-center relative">
                  <svg className="w-full h-14 text-black" fill="none" viewBox="0 0 600 60">
                    <path
                      className="opacity-20"
                      d="M 0 30 Q 75 5 150 30 T 300 30 T 450 30 T 600 30"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeWidth="2"
                    ></path>
                    <path
                      className="text-[#ff5e1a]"
                      d="M 0 30 Q 75 55 150 30 T 300 30 T 450 30 T 600 30"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeWidth="2.5"
                    ></path>
                    <circle className="text-black animate-ping opacity-75" cx="300" cy="30" fill="currentColor" r="4"></circle>
                    <circle className="text-black" cx="300" cy="30" fill="currentColor" r="5"></circle>
                    <circle className="text-[#ff5e1a]" cx="450" cy="30" fill="currentColor" r="3.5"></circle>
                  </svg>
                  {/* Floating Tokens */}
                  <div className="flex flex-wrap items-center gap-2 mt-2">
                    <span className="px-2 py-0.5 rounded-full bg-white text-xs font-semibold text-[#1a1b22] shadow-xs">#boundary-conditions</span>
                    <span className="px-2 py-0.5 rounded-full bg-white text-xs font-semibold text-[#1a1b22] shadow-xs">#hermite-polynomials</span>
                    <span className="px-2 py-0.5 rounded-full bg-[#ffdbcf] text-[#822800] text-xs font-bold">#eigenstates (probing)</span>
                  </div>
                </div>

                {/* Terminal Status Output Line */}
                <div className="bg-white p-3 rounded-xl flex items-center justify-between border border-[#eeedf7] shadow-xs">
                  <div className="flex items-center gap-2 overflow-hidden">
                    <div className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-black animate-bounce"></span>
                      <span className="w-1.5 h-1.5 rounded-full bg-black animate-bounce [animation-delay:0.15s]"></span>
                      <span className="w-1.5 h-1.5 rounded-full bg-black animate-bounce [animation-delay:0.3s]"></span>
                    </div>
                    <p className="text-xs font-medium text-[#1a1b22] truncate">
                      {socraticPrompts[socraticIndex]}
                    </p>
                  </div>
                  <span className="text-[10px] text-[#747878] font-mono font-bold bg-[#eeedf7] px-2 py-0.5 rounded">
                    L3-Prompt
                  </span>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between text-xs text-[#444748]">
                <span>Cognitive Latency Target: &lt; 280ms</span>
                <button
                  onClick={cycleSocraticVector}
                  className="font-bold text-black hover:text-[#aa3600] underline underline-offset-4 cursor-pointer"
                >
                  Cycle Cognitive Vector
                </button>
              </div>
            </div>
          )}

          {/* STATE 2: Friction Analysis Radar (Span 5 cols) */}
          {(activeFilter === 'all' || activeFilter === 'friction') && (
            <div className="lg:col-span-5 bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-[#eeedf7] flex flex-col justify-between relative overflow-hidden transition-all">
              <div className="flex items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center text-white">
                    <span className="material-symbols-outlined text-[16px]">radar</span>
                  </div>
                  <div>
                    <h2 className="text-base md:text-lg font-bold text-[#1a1b22]">02 · Friction Analysis</h2>
                    <p className="text-[11px] text-[#747878] uppercase tracking-wider font-semibold">Hesitation &amp; Entropy Radar</p>
                  </div>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-[#f4f2fd] text-xs font-bold text-[#1a1b22]">
                  Active Trace
                </span>
              </div>

              {/* Friction Radar Visual */}
              <div className="bg-[#f4f2fd] rounded-2xl p-5 flex flex-col items-center justify-center relative border border-[#e3e1ec]">
                <div className="relative w-40 h-40 flex items-center justify-center my-2">
                  <div className="absolute inset-0 rounded-full border border-[#c4c7c7]"></div>
                  <div className="absolute inset-4 rounded-full border border-[#e3e1ec]"></div>
                  <div className="absolute inset-8 rounded-full border border-[#c4c7c7]/50"></div>
                  {/* Radar Sweep */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#ff5e1a]/25 to-transparent animate-spin [animation-duration:4s]"></div>
                  {/* Centroids */}
                  <div className="absolute top-8 left-10 w-2 h-2 rounded-full bg-[#ff5e1a] animate-ping"></div>
                  <div className="absolute top-8 left-10 w-2.5 h-2.5 rounded-full bg-[#ff5e1a]"></div>
                  <div className="absolute bottom-10 right-10 w-2.5 h-2.5 rounded-full bg-black"></div>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-black/10 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-black"></div>
                  </div>
                  <div className="absolute bottom-1 left-2 text-[10px] text-[#747878] font-mono">R: 0.89 σ</div>
                  <div className="absolute top-1 right-2 text-[10px] text-[#aa3600] font-mono font-bold">Δ 1.4s</div>
                </div>

                <div className="w-full bg-white p-3 rounded-xl mt-2 border border-[#eeedf7]">
                  <p className="text-xs font-bold text-[#1a1b22]">
                    Calculating friction points across linear algebra &amp; vector spaces
                  </p>
                  <div className="flex items-center justify-between text-[11px] text-[#444748] mt-1">
                    <span>Analyzing hesitation interval: <strong className="text-black">1.4s</strong></span>
                    <span className="text-[#aa3600] font-bold">92% Confidence</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between text-xs text-[#444748]">
                <span>Sub-domain: Hilbert Subspaces</span>
                <span className="flex items-center gap-1.5 text-black font-bold">
                  <span className="w-2 h-2 rounded-full bg-[#ff5e1a]"></span> Modulating difficulty
                </span>
              </div>
            </div>
          )}

          {/* STATE 3: Learning-Path Generation (Span 12 cols) */}
          {(activeFilter === 'all' || activeFilter === 'path') && (
            <div className="lg:col-span-12 bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-[#eeedf7] flex flex-col justify-between relative overflow-hidden transition-all">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center text-white">
                    <span className="material-symbols-outlined text-[16px]">account_tree</span>
                  </div>
                  <div>
                    <h2 className="text-base md:text-lg font-bold text-[#1a1b22]">03 · Adaptive Path Graph Construction</h2>
                    <p className="text-[11px] text-[#747878] uppercase tracking-wider font-semibold">Topological Dependency Resolution</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-[#444748]">Prerequisite Depth:</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#eeedf7] text-black font-mono font-bold text-xs">
                    {pathProgress}% Calibrated
                  </span>
                </div>
              </div>

              {/* Pipeline Container */}
              <div className="bg-[#f4f2fd] rounded-2xl p-5 md:p-6 flex flex-col gap-6 border border-[#e3e1ec]">
                <div className="relative w-full bg-[#e8e7f1] h-2 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-black transition-all duration-700 ease-out"
                    style={{ width: `${pathProgress}%` }}
                  ></div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* Step 1 */}
                  <div className="p-4 bg-white rounded-xl shadow-xs border border-[#eeedf7] flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="w-6 h-6 rounded-full bg-black text-white text-xs flex items-center justify-center font-bold">
                          ✓
                        </span>
                        <span className="text-[11px] text-[#747878] font-bold">Phase 01</span>
                      </div>
                      <h3 className="font-bold text-sm text-[#1a1b22]">Syllabus Ingestion</h3>
                      <p className="text-xs text-[#444748] mt-1">Parsed 28 core milestones &amp; prerequisites into DAG schema.</p>
                    </div>
                    <div className="mt-3 text-xs text-[#009580] font-bold flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm">verified</span>
                      <span>100% complete</span>
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div className="p-4 bg-white rounded-xl shadow-xs border-2 border-[#ff5e1a] flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="w-6 h-6 rounded-full bg-[#ff5e1a] text-white text-xs flex items-center justify-center font-bold animate-spin">
                          ⟳
                        </span>
                        <span className="text-[11px] text-[#aa3600] font-bold">Active Node</span>
                      </div>
                      <h3 className="font-bold text-sm text-[#1a1b22]">Deconstructing Nodes</h3>
                      <p className="text-xs text-[#444748] mt-1">Calibrating cognitive prerequisite depth across discrete branches.</p>
                    </div>
                    <div className="mt-3 text-xs text-[#aa3600] font-bold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#ff5e1a] animate-pulse"></span>
                      <span>Linking branch [T-420]</span>
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div className="p-4 bg-white/70 rounded-xl border border-[#eeedf7] flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="w-6 h-6 rounded-full bg-[#eeedf7] text-[#444748] text-xs flex items-center justify-center font-bold">
                          03
                        </span>
                        <span className="text-[11px] text-[#747878]">Queued</span>
                      </div>
                      <h3 className="font-bold text-sm text-[#747878]">Retention Spacing</h3>
                      <p className="text-xs text-[#747878] mt-1">Synthesizing personalized forget-curve attenuation schedules.</p>
                    </div>
                    <div className="mt-3 text-[11px] text-[#747878]">Pending Phase 02 resolve</div>
                  </div>

                  {/* Step 4 */}
                  <div className="p-4 bg-white/70 rounded-xl border border-[#eeedf7] flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="w-6 h-6 rounded-full bg-[#eeedf7] text-[#444748] text-xs flex items-center justify-center font-bold">
                          04
                        </span>
                        <span className="text-[11px] text-[#747878]">Output</span>
                      </div>
                      <h3 className="font-bold text-sm text-[#747878]">Final Dynamic Graph</h3>
                      <p className="text-xs text-[#747878] mt-1">Publishing interactive branch trajectory with instant preview.</p>
                    </div>
                    <div className="mt-3 text-[11px] text-[#747878]">Est. time: 0.8s</div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                  <span className="text-xs text-[#1a1b22] font-medium">
                    Graph topology: 42 active vertices, 64 directed dependencies.
                  </span>
                  <button
                    onClick={handleRegeneratePath}
                    className="px-4 py-2 rounded-full bg-black text-white font-bold text-xs hover:bg-neutral-800 transition-all flex items-center gap-1.5 shadow-sm cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[16px]">refresh</span>
                    <span>Regenerate Trajectory</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* STATE 4: Material Ingestion (Span 6 cols) */}
          {(activeFilter === 'all' || activeFilter === 'material') && (
            <div className="lg:col-span-6 bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-[#eeedf7] flex flex-col justify-between relative overflow-hidden transition-all">
              <div className="flex items-center justify-between gap-4 mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center text-white">
                    <span className="material-symbols-outlined text-[16px]">layers</span>
                  </div>
                  <div>
                    <h2 className="text-base md:text-lg font-bold text-[#1a1b22]">04 · Semantic Document Ingestion</h2>
                    <p className="text-[11px] text-[#747878] uppercase tracking-wider font-semibold">OCR &amp; Concept Distillation</p>
                  </div>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-[#eeedf7] text-xs font-mono font-bold text-[#1a1b22]">
                  PDF / 48.2 MB
                </span>
              </div>

              <div className="bg-[#f4f2fd] rounded-2xl p-5 flex flex-col gap-4 border border-[#e3e1ec]">
                <div className="flex items-center justify-between p-3 bg-white rounded-xl shadow-xs border border-[#eeedf7]">
                  <div className="flex items-center gap-3 truncate">
                    <div className="w-8 h-8 rounded-lg bg-[#ffdbcf] flex items-center justify-center text-[#822800]">
                      <span className="material-symbols-outlined text-[18px]">menu_book</span>
                    </div>
                    <div className="truncate">
                      <h4 className="text-xs font-bold text-[#1a1b22] truncate">Organic_Chemistry_Vol2.pdf</h4>
                      <p className="text-[11px] text-[#747878]">Page 142 of 380 · Chapter 8: Stereocenters</p>
                    </div>
                  </div>
                  <span className="font-mono text-xs font-bold text-[#aa3600]">Parsing</span>
                </div>

                {/* Laser scan line visual */}
                <div className="relative bg-white rounded-xl p-4 overflow-hidden flex flex-col gap-2 border border-[#eeedf7]">
                  <div className="absolute left-0 right-0 h-0.5 bg-[#ff5e1a] shadow-[0_0_8px_rgba(255,94,26,0.8)] animate-[bounce_2.4s_infinite]"></div>
                  <div className="flex items-center justify-between text-xs text-[#444748]">
                    <span>Extracting theorem hierarchies &amp; synthetic reaction pathways...</span>
                    <span className="font-mono font-bold text-black">142 micro-cards</span>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    <span className="px-2.5 py-1 rounded-full bg-[#f4f2fd] text-xs text-[#1a1b22] font-medium flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px] text-[#009580]">check_circle</span>
                      Chiral Inversion
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-[#f4f2fd] text-xs text-[#1a1b22] font-medium flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px] text-[#009580]">check_circle</span>
                      Enantiomeric Excess
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-[#ffdbcf] text-xs text-[#822800] font-bold flex items-center gap-1 animate-pulse">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#ff5e1a]"></span>
                      SN2 Transition State
                    </span>
                    <span className="px-2 py-1 rounded-full bg-[#eeedf7] text-xs text-[#747878]">
                      +139 more
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <div className="flex-1 h-1.5 rounded-full bg-black"></div>
                  <div className="flex-1 h-1.5 rounded-full bg-black"></div>
                  <div className="flex-1 h-1.5 rounded-full bg-black"></div>
                  <div className="flex-1 h-1.5 rounded-full bg-[#ff5e1a] animate-pulse"></div>
                  <div className="flex-1 h-1.5 rounded-full bg-[#e8e7f1]"></div>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between text-xs text-[#444748]">
                <span>OCR Engine: Lumio Vision V4</span>
                <span className="text-black font-bold">99.4% Syntactic Fidelity</span>
              </div>
            </div>
          )}

          {/* STATE 5: Progress Sync (Span 6 cols) */}
          {(activeFilter === 'all' || activeFilter === 'progress') && (
            <div className="lg:col-span-6 bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-[#eeedf7] flex flex-col justify-between relative overflow-hidden transition-all">
              <div className="flex items-center justify-between gap-4 mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center text-white">
                    <span className="material-symbols-outlined text-[16px]">sync_alt</span>
                  </div>
                  <div>
                    <h2 className="text-base md:text-lg font-bold text-[#1a1b22]">05 · Memory Index Synchronization</h2>
                    <p className="text-[11px] text-[#747878] uppercase tracking-wider font-semibold">Recall Latency Recalibration</p>
                  </div>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-[#eeedf7] text-xs font-mono font-bold text-[#1a1b22]">
                  Ebbinghaus R-3
                </span>
              </div>

              <div className="bg-[#f4f2fd] rounded-2xl p-5 flex flex-col gap-4 border border-[#e3e1ec]">
                <div className="bg-white rounded-xl p-4 shadow-xs flex flex-col gap-2 border border-[#eeedf7]">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#1a1b22]">
                      Re-indexing spaced repetition curve with today’s recall latency cues
                    </span>
                    <span className="font-mono text-xs text-[#aa3600] font-bold">Δ -18m</span>
                  </div>

                  {/* Retention Sparkline */}
                  <div className="w-full h-16 relative">
                    <svg className="w-full h-full" fill="none" viewBox="0 0 400 80">
                      <path className="text-[#c4c7c7]" d="M 10 20 C 100 25, 200 65, 390 70" stroke="currentColor" strokeWidth="2"></path>
                      <path className="text-black" d="M 10 20 C 80 18, 160 38, 390 52" stroke="currentColor" strokeWidth="2.5"></path>
                      <circle className="text-black" cx="10" cy="20" fill="currentColor" r="3.5"></circle>
                      <circle className="text-[#ff5e1a] animate-ping" cx="160" cy="38" fill="currentColor" r="4.5"></circle>
                      <circle className="text-[#ff5e1a]" cx="160" cy="38" fill="currentColor" r="4"></circle>
                      <circle className="text-black" cx="390" cy="52" fill="currentColor" r="3.5"></circle>
                    </svg>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-[#444748] pt-1">
                    <span>Interval Shift: <strong className="text-black">+3.2 Days</strong></span>
                    <span>Decay Rate: <strong className="text-black">Stabilized</strong></span>
                    <span className="font-mono text-black font-bold">Optimal Cue: 08:30 AM</span>
                  </div>
                </div>

                <div className="flex items-center justify-between p-2.5 bg-white rounded-xl px-4 text-[#444748] text-xs border border-[#eeedf7]">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#ff5e1a]"></span>
                    Synchronizing with mobile companion offline buffer...
                  </span>
                  <span className="font-mono font-bold text-black">3 items queued</span>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between text-xs text-[#444748]">
                <span>Model: Adaptive-Leitner Hybrid</span>
                <button
                  onClick={handleTriggerSync}
                  className="text-black hover:text-[#aa3600] font-bold transition-colors cursor-pointer"
                >
                  {syncState === 'syncing' ? 'Recalibrating...' : syncState === 'synced' ? 'Curve Refreshed ✓' : 'Force Re-index Cycle'}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Cognitive Flow Philosophy */}
        <div className="mt-12 p-6 md:p-8 bg-[#f4f2fd] rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6 border border-[#e3e1ec]">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-black flex items-center justify-center text-white shrink-0 shadow-sm">
              <span className="material-symbols-outlined text-[24px]">psychology</span>
            </div>
            <div>
              <h4 className="text-base font-bold text-[#1a1b22]">Cognitive Flow Philosophy</h4>
              <p className="text-xs md:text-sm text-[#444748] max-w-2xl mt-0.5 leading-relaxed">
                By exposing real-time micro-operations instead of opaque loading spinners, Lumio reinforces student mental models—teaching the structure of knowledge even in transitional states.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => onNavigate('milestone-states')}
              className="px-5 py-2.5 rounded-full text-xs font-bold bg-white text-black hover:bg-[#eeedf7] transition-all shadow-xs cursor-pointer"
            >
              View Milestone States
            </button>
            <button
              onClick={() => onNavigate('landing')}
              className="px-5 py-2.5 rounded-full text-xs font-bold bg-black text-white hover:bg-neutral-800 transition-all shadow-xs cursor-pointer"
            >
              Return to Hub
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
