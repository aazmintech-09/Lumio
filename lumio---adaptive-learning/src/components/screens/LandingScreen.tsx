import React, { useState } from 'react';
import { ScreenId } from '../../types';

interface LandingScreenProps {
  onNavigate: (screen: ScreenId) => void;
}

export const LandingScreen: React.FC<LandingScreenProps> = ({ onNavigate }) => {
  // Interactive Socratic simulation state in hero
  const [heroPromptChoice, setHeroPromptChoice] = useState<string | null>(null);
  
  // Interactive modality tab state in feature section
  const [activeModality, setActiveModality] = useState<'visual' | 'interactive' | 'dialogue'>('interactive');
  
  // Interactive Socratic tutor dialogue in mid section
  const [tutorMessages, setTutorMessages] = useState<Array<{ sender: 'user' | 'tutor'; text: string; clue?: string }>>([
    {
      sender: 'user',
      text: "Why can't I just copy a qubit's quantum state using a regular measurement operator?",
    },
    {
      sender: 'tutor',
      text: "Think about what happens when you observe a superposition. Does measuring preserve the unknown amplitudes α and β, or force the state to collapse?",
      clue: "Look at the No-Cloning Theorem. If measurement yields a single definite bit, what happens to the phase information?",
    },
  ]);
  const [selectedResponse, setSelectedResponse] = useState<string | null>(null);

  // File upload simulation
  const [uploadedFiles, setUploadedFiles] = useState<Array<{ name: string; meta: string; icon: string }>>([
    { name: 'Distributed_Consensus.pdf', meta: '32 micro-lessons created', icon: 'picture_as_pdf' },
    { name: 'Karpathy_LLM_Intro.mp4', meta: 'Interactive quiz generated', icon: 'play_circle' },
    { name: 'React_19_Compiler_Docs.md', meta: 'Mental model verified', icon: 'article' },
  ]);
  const [isUploading, setIsUploading] = useState(false);

  // Metric time range
  const [metricRange, setMetricRange] = useState<'30days' | 'alltime'>('30days');

  const handleTutorChoice = (choice: string) => {
    setSelectedResponse(choice);
    if (choice.includes('collapses the superposition')) {
      setTutorMessages((prev) => [
        ...prev,
        { sender: 'user', text: '"It collapses the superposition into |0⟩ or |1⟩"' },
        {
          sender: 'tutor',
          text: 'Exactly! Once it collapses into |0⟩ or |1⟩, all continuous probability amplitude coefficients are destroyed forever. Hence, you copy only the classical outcome, not the pristine quantum state.',
        },
      ]);
    } else {
      setTutorMessages((prev) => [
        ...prev,
        { sender: 'user', text: '"Show me the linear operator proof"' },
        {
          sender: 'tutor',
          text: 'Assume a unitary cloning operator U such that U(|ψ⟩|0⟩) = |ψ⟩|ψ⟩ and U(|φ⟩|0⟩) = |φ⟩|φ⟩. Taking the inner product ⟨ψ|φ⟩ = ⟨ψ|φ⟩², which only holds if |⟨ψ|φ⟩| ∈ {0, 1}. Thus, non-orthogonal quantum states cannot be cloned!',
        },
      ]);
    }
  };

  const handleSimulateUpload = () => {
    setIsUploading(true);
    setTimeout(() => {
      const demoNames = [
        { name: 'Quantum_Computing_Nielsen.pdf', meta: '24 interactive derivations created', icon: 'picture_as_pdf' },
        { name: 'Susskind_Classical_Mechanics.epub', meta: 'Lagrangian path map generated', icon: 'auto_stories' },
        { name: 'Attention_Is_All_You_Need.pdf', meta: '18 vector sandboxes built', icon: 'picture_as_pdf' },
      ];
      const randomDoc = demoNames[Math.floor(Math.random() * demoNames.length)];
      setUploadedFiles((prev) => [randomDoc, ...prev.slice(0, 3)]);
      setIsUploading(false);
    }, 1200);
  };

  return (
    <div className="w-full flex flex-col bg-[#fbf8ff]">
      {/* HERO SECTION */}
      <section className="w-full max-w-[1340px] mx-auto px-4 sm:px-6 md:px-12 pt-10 md:pt-16 pb-16 md:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Typography & CTAs */}
          <div className="lg:col-span-5 flex flex-col items-start space-y-6 md:space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#eeedf7] text-[#444748] text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-[#ff5e1a] animate-pulse"></span>
              Adaptive Intelligence v2.4
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#1a1b22] leading-[1.08] text-balance">
              Learning should adapt to you.
            </h1>
            
            <p className="text-base sm:text-lg text-[#444748] leading-relaxed max-w-lg">
              Lumio learns how you learn and adapts the entire curriculum around your pace, cognitive load, and curiosity.
            </p>
            
            <div className="flex flex-wrap items-center gap-3 pt-2 w-full sm:w-auto">
              <button
                onClick={() => onNavigate('onboarding-1')}
                className="w-full sm:w-auto bg-black text-white font-bold text-sm rounded-full px-8 py-3.5 shadow-sm hover:scale-[1.01] hover:bg-neutral-800 transition-all cursor-pointer text-center"
              >
                Start learning
              </button>
              <button
                onClick={() => {
                  const el = document.getElementById('how-it-works');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full sm:w-auto bg-[#eeedf7] text-[#1a1b22] font-semibold text-sm rounded-full px-7 py-3.5 hover:bg-[#e8e7f1] transition-colors cursor-pointer text-center"
              >
                Explore Lumio
              </button>
            </div>
            
            <div className="flex items-center gap-6 pt-2 text-[#444748] text-xs font-medium">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[18px] text-[#1a1b22]">verified_user</span>
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[18px] text-[#ff5e1a]">bolt</span>
                <span>Real-time calibration</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Canvas & Adaptive Preview Mosaic */}
          <div className="lg:col-span-7 relative">
            <div className="relative w-full h-[460px] md:h-[540px] bg-[#f4f2fd] rounded-3xl p-6 overflow-hidden shadow-sm flex items-center justify-center border border-[#e3e1ec]">
              {/* Background Matrix Accent */}
              <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px]"></div>

              {/* Overlapping Card 1: Core Neural Mastery */}
              <div className="absolute top-4 left-4 md:left-8 md:top-8 w-64 md:w-80 bg-white rounded-2xl p-4 md:p-5 shadow-lg border border-[#eeedf7] transition-all hover:-translate-y-1">
                <div className="flex items-center justify-between pb-2">
                  <span className="inline-flex items-center gap-1.5 text-xs text-[#aa3600] font-bold uppercase tracking-wider">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#ff5e1a]"></span> Live Model
                  </span>
                  <span className="text-xs text-[#444748]">Cognitive load: 38%</span>
                </div>
                <div className="text-base md:text-lg font-bold text-[#1a1b22]">Distributed Systems</div>
                <p className="text-xs text-[#444748] mt-0.5">Consensus Protocols &amp; Byzantine Faults</p>
                <div className="mt-3 pt-2 bg-[#f4f2fd] rounded-xl p-3">
                  <div className="flex justify-between text-xs mb-1.5 text-[#1a1b22]">
                    <span>Comprehension Velocity</span>
                    <span className="font-bold text-[#aa3600]">+18.4%</span>
                  </div>
                  <div className="w-full bg-[#e8e7f1] h-1.5 rounded-full overflow-hidden">
                    <div className="bg-[#ff5e1a] h-full w-4/5 rounded-full transition-all duration-700"></div>
                  </div>
                </div>
              </div>

              {/* Overlapping Card 2: Interactive Socratic Prompt (Centerpiece) */}
              <div className="relative z-20 w-76 sm:w-88 md:w-96 bg-black text-white rounded-2xl p-5 md:p-6 shadow-2xl border border-neutral-800">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-[#ff5e1a] flex items-center justify-center text-xs text-white font-bold">
                      <span className="material-symbols-outlined text-[14px]">psychology</span>
                    </div>
                    <span className="text-xs md:text-sm font-bold tracking-tight">Lumio Socratic Tutor</span>
                  </div>
                  <span className="text-neutral-400 text-xs">Active inference</span>
                </div>
                <p className="text-xs md:text-sm text-neutral-100 mb-4 leading-relaxed font-normal">
                  "You paused on RAFT log replication. Do you want to see a step-by-step visual state machine or test edge-case latency first?"
                </p>
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => setHeroPromptChoice('visual')}
                    className={`w-full text-left rounded-full px-4 py-2 text-xs font-semibold transition-all flex items-center justify-between cursor-pointer ${
                      heroPromptChoice === 'visual'
                        ? 'bg-[#ff5e1a] text-white shadow-sm'
                        : 'bg-white/10 hover:bg-white/20 text-white'
                    }`}
                  >
                    <span>Show visual state simulation</span>
                    <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </button>
                  <button
                    onClick={() => setHeroPromptChoice('quiz')}
                    className={`w-full text-left rounded-full px-4 py-2 text-xs font-semibold transition-all flex items-center justify-between cursor-pointer ${
                      heroPromptChoice === 'quiz'
                        ? 'bg-[#65fade] text-black shadow-sm'
                        : 'bg-white/10 hover:bg-white/20 text-white'
                    }`}
                  >
                    <span>Run diagnostic quiz</span>
                    <span className="material-symbols-outlined text-[16px]">quiz</span>
                  </button>
                </div>
                {heroPromptChoice && (
                  <div className="mt-3 p-2.5 rounded-xl bg-white/10 text-xs text-neutral-200 border border-white/10 flex items-center justify-between">
                    <span>
                      {heroPromptChoice === 'visual'
                        ? '✓ Raft leader election DAG visualized on canvas'
                        : '✓ 3 micro-checks generated for quorum voting'}
                    </span>
                    <button
                      onClick={() => onNavigate('loading-states')}
                      className="text-[#65fade] font-bold underline hover:text-white ml-2 shrink-0 cursor-pointer"
                    >
                      View Live
                    </button>
                  </div>
                )}
              </div>

              {/* Overlapping Card 3: Realtime Pathway Node Floating Right */}
              <div className="absolute bottom-4 right-4 md:right-8 md:bottom-8 w-60 md:w-72 bg-white rounded-2xl p-4 shadow-xl border border-[#eeedf7] transition-all hover:-translate-y-1">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#eeedf7] flex items-center justify-center text-[#1a1b22]">
                    <span className="material-symbols-outlined text-[20px]">timeline</span>
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#1a1b22]">Milestone Rescheduled</div>
                    <div className="text-[11px] text-[#444748]">Shifted to conversational mode</div>
                  </div>
                </div>
                <div className="mt-3 flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#eeedf7] text-[#1a1b22] text-[11px] font-semibold">
                    Retention 96%
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#ffdbcf] text-[#822800] text-[11px] font-bold">
                    Deep Focus
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PARTNERS / TRUSTED TEAMS STRIP */}
      <section className="w-full bg-white py-8 border-y border-[#eeedf7]">
        <div className="max-w-[1340px] mx-auto px-4 md:px-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="text-xs font-bold uppercase tracking-widest text-[#747878]">
              Trusted by technical learners &amp; teams at
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6 md:gap-14 opacity-70 grayscale hover:grayscale-0 transition-all font-extrabold text-sm md:text-base tracking-tight text-[#1a1b22]">
              <span>OpenScale</span>
              <span>VectorLab</span>
              <span>Hyperion</span>
              <span>Synthetix</span>
              <span>KernelBio</span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 1: ADAPTIVE SENSING */}
      <section className="w-full max-w-[1340px] mx-auto px-4 md:px-12 py-16 md:py-24" id="how-it-works">
        <div className="max-w-2xl mb-12 md:mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-[#aa3600]">Sense. Calibrate. Master.</span>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-[#1a1b22] mt-2 leading-tight">
            A system that understands cognitive signals before you get stuck.
          </h2>
          <p className="text-base text-[#444748] mt-4 leading-relaxed">
            Traditional courses treat everyone identical. Lumio watches subtle shifts in response cadence, hesitation intervals, and retention decay to reconfigure the curriculum dynamically.
          </p>
        </div>

        {/* 3-Column Bento of Adaptive Modalities */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Modality 1: Comprehension Speed */}
          <div className="bg-white rounded-2xl p-7 shadow-sm border border-[#eeedf7] flex flex-col justify-between h-[340px] group hover:shadow-md transition-shadow">
            <div>
              <div className="w-12 h-12 rounded-full bg-[#f4f2fd] flex items-center justify-center text-[#1a1b22] mb-6 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-[24px]">speed</span>
              </div>
              <h3 className="text-lg font-bold text-[#1a1b22] mb-2">Comprehension Velocity</h3>
              <p className="text-sm text-[#444748] leading-relaxed">
                Skips past fundamentals you grasp intuitively; expands complex architectural nuances with granular micro-steps.
              </p>
            </div>
            <div className="bg-[#f4f2fd] rounded-xl p-3.5 flex items-center justify-between">
              <span className="text-xs text-[#444748]">Dynamic Pacing</span>
              <span className="text-xs text-[#ff5e1a] font-bold">1.4x Standard Pace</span>
            </div>
          </div>

          {/* Modality 2: Multi-Modal Shifting */}
          <div className="bg-white rounded-2xl p-7 shadow-sm border border-[#eeedf7] flex flex-col justify-between h-[340px] group hover:shadow-md transition-shadow">
            <div>
              <div className="w-12 h-12 rounded-full bg-[#f4f2fd] flex items-center justify-center text-[#1a1b22] mb-6 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-[24px]">view_in_ar</span>
              </div>
              <h3 className="text-lg font-bold text-[#1a1b22] mb-2">Multi-Modal Shifting</h3>
              <p className="text-sm text-[#444748] leading-relaxed">
                Automatically alternates between interactive code sandboxes, visual topology diagrams, and structured text summaries.
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setActiveModality('visual')}
                className={`px-3 py-1 rounded-full text-xs font-semibold cursor-pointer transition-colors ${
                  activeModality === 'visual' ? 'bg-black text-white' : 'bg-[#eeedf7] text-[#1a1b22]'
                }`}
              >
                Visual
              </button>
              <button
                onClick={() => setActiveModality('interactive')}
                className={`px-3 py-1 rounded-full text-xs font-semibold cursor-pointer transition-colors ${
                  activeModality === 'interactive' ? 'bg-black text-white' : 'bg-[#eeedf7] text-[#1a1b22]'
                }`}
              >
                Interactive
              </button>
              <button
                onClick={() => setActiveModality('dialogue')}
                className={`px-3 py-1 rounded-full text-xs font-semibold cursor-pointer transition-colors ${
                  activeModality === 'dialogue' ? 'bg-black text-white' : 'bg-[#eeedf7] text-[#1a1b22]'
                }`}
              >
                Dialogue
              </button>
            </div>
          </div>

          {/* Modality 3: Retention Spaced Curve */}
          <div className="bg-white rounded-2xl p-7 shadow-sm border border-[#eeedf7] flex flex-col justify-between h-[340px] group hover:shadow-md transition-shadow">
            <div>
              <div className="w-12 h-12 rounded-full bg-[#f4f2fd] flex items-center justify-center text-[#1a1b22] mb-6 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-[24px]">cached</span>
              </div>
              <h3 className="text-lg font-bold text-[#1a1b22] mb-2">Cognitive Retention</h3>
              <p className="text-sm text-[#444748] leading-relaxed">
                Intelligently reintroduces prerequisite concepts right at the moment of peak neurological forgetting.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-full bg-[#eeedf7] h-2 rounded-full overflow-hidden">
                <div className="bg-black h-full w-[92%] rounded-full"></div>
              </div>
              <span className="text-xs text-[#1a1b22] font-bold">92%</span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: PERSONALIZED LEARNING PATHS (ROADMAP UI) */}
      <section className="w-full bg-white py-16 md:py-24 border-y border-[#eeedf7]">
        <div className="max-w-[1340px] mx-auto px-4 md:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#aa3600]">Fluid Curriculum</span>
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-[#1a1b22] mt-2">
                Roadmaps that rewrite themselves.
              </h2>
              <p className="text-base text-[#444748] mt-2 max-w-xl">
                As you answer, question, or skip, the path splits and recalibrates in real-time. No static tables of contents.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3.5 py-1.5 rounded-full bg-[#eeedf7] text-[#1a1b22]">
                <span className="w-2 h-2 rounded-full bg-[#009580]"></span>
                Path: Zero to Production ML
              </span>
            </div>
          </div>

          {/* Interactive Node Timeline */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Node 1: Completed */}
            <div className="bg-[#f4f2fd] p-6 rounded-2xl relative flex flex-col justify-between h-72 border border-[#e3e1ec]">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold text-[#009580] uppercase tracking-wider">Completed</span>
                  <span className="material-symbols-outlined text-[#009580] text-[22px]">check_circle</span>
                </div>
                <h4 className="text-lg font-bold text-[#1a1b22] mb-2 leading-snug">Linear Algebra Fundamentals</h4>
                <p className="text-xs text-[#444748] leading-relaxed">Eigenvectors, projections, and matrix decomposition.</p>
              </div>
              <div className="text-xs font-medium text-[#444748] bg-white/70 p-2.5 rounded-xl">
                Mastered in 4.2 hrs (1.3x faster)
              </div>
            </div>

            {/* Node 2: In-Progress / Current Focus */}
            <div className="bg-white p-6 rounded-2xl shadow-md relative flex flex-col justify-between h-72 border-2 border-[#ff5e1a]">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold text-[#ff5e1a] uppercase tracking-wider">Current Focus</span>
                  <span className="w-3 h-3 rounded-full bg-[#ff5e1a] animate-ping"></span>
                </div>
                <h4 className="text-lg font-bold text-[#1a1b22] mb-2 leading-snug">Attention Mechanisms &amp; Transformers</h4>
                <p className="text-xs text-[#444748] leading-relaxed">Self-attention, query-key vectors, multi-head projections.</p>
              </div>
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-[#444748]">Modality: Visual Tensor</span>
                  <span className="text-[#1a1b22]">76%</span>
                </div>
                <div className="w-full bg-[#e8e7f1] h-2 rounded-full overflow-hidden">
                  <div className="bg-[#ff5e1a] h-full w-[76%] rounded-full"></div>
                </div>
              </div>
            </div>

            {/* Node 3: Adaptive Insertion */}
            <div className="bg-[#f4f2fd] p-6 rounded-2xl relative flex flex-col justify-between h-72 border border-[#e3e1ec]">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold text-[#444748] uppercase tracking-wider">Adaptive Insertion</span>
                  <span className="material-symbols-outlined text-[#444748] text-[20px]">tune</span>
                </div>
                <h4 className="text-lg font-bold text-[#1a1b22] mb-2 leading-snug">KV-Cache Memory Footprint</h4>
                <p className="text-xs text-[#444748] leading-relaxed">Inserted automatically based on your query in Node 02.</p>
              </div>
              <div className="text-xs text-[#444748] bg-white/70 p-2.5 rounded-xl font-medium">
                Dynamic deep dive
              </div>
            </div>

            {/* Node 4: Future Capstone */}
            <div className="bg-[#f4f2fd]/60 p-6 rounded-2xl relative flex flex-col justify-between h-72 opacity-75 border border-[#e3e1ec]">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold text-[#747878] uppercase tracking-wider">Upcoming</span>
                  <span className="material-symbols-outlined text-[#747878] text-[20px]">lock</span>
                </div>
                <h4 className="text-lg font-bold text-[#1a1b22] mb-2 leading-snug">Inference Engine Optimization</h4>
                <p className="text-xs text-[#444748] leading-relaxed">vLLM, continuous batching, quantized weights.</p>
              </div>
              <div className="text-xs text-[#747878] bg-white/40 p-2.5 rounded-xl">
                Est. 6 hours
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: AI SOCRATIC TUTOR WIDGET */}
      <section className="w-full max-w-[1340px] mx-auto px-4 md:px-12 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-[#aa3600]">Contextual AI Tutor</span>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-[#1a1b22] leading-tight">
              Never told the answer. Always guided to the breakthrough.
            </h2>
            <p className="text-base text-[#444748] leading-relaxed">
              Lumio employs active Socratic interrogation. Instead of spewing endless textbook paragraphs, it asks the exact micro-question that triggers conceptual clarity.
            </p>
            <ul className="space-y-3.5 pt-2">
              <li className="flex items-start gap-3">
                <span className="material-symbols-outlined text-black text-[20px] mt-0.5">check_circle</span>
                <span className="text-sm font-medium text-[#1a1b22]">Pinpoints false cognitive models instantly</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="material-symbols-outlined text-black text-[20px] mt-0.5">check_circle</span>
                <span className="text-sm font-medium text-[#1a1b22]">Deconstructs multi-stage math and code derivations</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="material-symbols-outlined text-black text-[20px] mt-0.5">check_circle</span>
                <span className="text-sm font-medium text-[#1a1b22]">Reflects your exact tone and conceptual preferences</span>
              </li>
            </ul>
          </div>

          {/* Dialogue Shell UI */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 md:p-8 shadow-md border border-[#eeedf7]">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#eeedf7]">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-black flex items-center justify-center text-white">
                  <span className="material-symbols-outlined text-[18px]">psychology</span>
                </div>
                <div>
                  <div className="font-bold text-sm text-[#1a1b22]">Lumio Tutor</div>
                  <div className="text-xs text-[#444748]">Active context: Quantum Computing Qubits</div>
                </div>
              </div>
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#aa3600] bg-[#ffdbcf] px-3 py-1 rounded-full">
                <span className="w-2 h-2 rounded-full bg-[#ff5e1a] animate-pulse"></span> Live Feedback
              </span>
            </div>

            <div className="space-y-4 max-h-[360px] overflow-y-auto pr-1">
              {tutorMessages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-md p-4 rounded-2xl text-sm leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-[#e8e7f1] text-[#1a1b22] font-medium'
                        : 'bg-[#f4f2fd] text-[#1a1b22] space-y-2.5 border border-[#e3e1ec]'
                    }`}
                  >
                    <p>{msg.text}</p>
                    {msg.clue && (
                      <div className="p-3 bg-white rounded-xl text-xs text-[#1a1b22] border border-[#eeedf7]">
                        <strong className="text-[#aa3600]">Clue: </strong>
                        {msg.clue}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* User Response Options */}
            <div className="pt-4 border-t border-[#eeedf7] mt-4 flex flex-wrap gap-2">
              <button
                onClick={() => handleTutorChoice('collapses')}
                className={`text-xs font-semibold px-4 py-2.5 rounded-full transition-all cursor-pointer ${
                  selectedResponse === 'collapses'
                    ? 'bg-black text-white'
                    : 'bg-[#eeedf7] hover:bg-[#e8e7f1] text-[#1a1b22]'
                }`}
              >
                "It collapses the superposition into |0⟩ or |1⟩"
              </button>
              <button
                onClick={() => handleTutorChoice('proof')}
                className={`text-xs font-semibold px-4 py-2.5 rounded-full transition-all cursor-pointer ${
                  selectedResponse === 'proof'
                    ? 'bg-black text-white'
                    : 'bg-[#eeedf7] hover:bg-[#e8e7f1] text-[#1a1b22]'
                }`}
              >
                "Show me the linear operator proof"
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: INGEST PERSONAL FILES */}
      <section className="w-full bg-[#eeedf7]/50 py-16 md:py-24 border-y border-[#e3e1ec]">
        <div className="max-w-[1340px] mx-auto px-4 md:px-12">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-[#aa3600]">Instant Transformation</span>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-[#1a1b22] mt-2">
              Turn your personal files into an interactive masterclass.
            </h2>
            <p className="text-base text-[#444748] mt-3">
              Drop in lecture PDFs, dense technical documentation, YouTube talk links, or meeting transcripts. Lumio converts them into modular adaptive trajectories in seconds.
            </p>
          </div>

          {/* Upload Sandbox Component */}
          <div className="max-w-4xl mx-auto bg-white rounded-3xl p-6 md:p-10 shadow-sm border border-[#eeedf7]">
            <div
              onClick={handleSimulateUpload}
              className="flex flex-col items-center justify-center p-8 md:p-12 bg-[#f4f2fd] border-2 border-dashed border-[#c4c7c7] rounded-2xl hover:border-black transition-all cursor-pointer group"
            >
              <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-black mb-4 group-hover:scale-105 transition-transform shadow-sm">
                <span className="material-symbols-outlined text-[32px]">
                  {isUploading ? 'sync' : 'cloud_upload'}
                </span>
              </div>
              <p className="text-base md:text-lg font-bold text-[#1a1b22] mb-1">
                {isUploading ? 'Ingesting and parsing document DAG...' : 'Drag & drop syllabi, papers, or textbooks'}
              </p>
              <p className="text-xs md:text-sm text-[#444748] mb-5 text-center">
                Supports PDF, EPUB, Markdown, MP4, and Notion exports up to 500MB
              </p>
              <button
                type="button"
                className="bg-black text-white text-xs md:text-sm font-bold rounded-full px-6 py-2.5 group-hover:scale-105 transition-transform"
              >
                {isUploading ? 'Processing...' : 'Browse files or Click to Test'}
              </button>
            </div>

            {/* Synthesized Documents Rail */}
            <div className="mt-8 pt-6 border-t border-[#eeedf7]">
              <div className="text-xs font-bold uppercase tracking-wider text-[#444748] mb-4">
                Recent Synthesized Sources
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {uploadedFiles.map((file, i) => (
                  <div key={i} className="p-3.5 rounded-xl bg-[#f4f2fd] flex items-center gap-3 border border-[#e3e1ec]">
                    <span className="material-symbols-outlined text-[#aa3600] text-[24px]">{file.icon}</span>
                    <div className="overflow-hidden min-w-0">
                      <div className="text-xs font-bold text-[#1a1b22] truncate">{file.name}</div>
                      <div className="text-[11px] text-[#444748] truncate">{file.meta}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: PROGRESS & COGNITIVE INSIGHTS */}
      <section className="w-full max-w-[1340px] mx-auto px-4 md:px-12 py-16 md:py-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#aa3600]">Deep Measurement</span>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-[#1a1b22] mt-2">
              Your mind, mapped in empirical metrics.
            </h2>
            <p className="text-base text-[#444748] mt-2 max-w-xl">
              Move beyond arbitrary streaks. Inspect active neuro-retention, conceptual stability, and optimal focus windows.
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setMetricRange('30days')}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold cursor-pointer transition-colors ${
                metricRange === '30days' ? 'bg-black text-white' : 'bg-[#eeedf7] text-[#1a1b22]'
              }`}
            >
              Past 30 Days
            </button>
            <button
              onClick={() => setMetricRange('alltime')}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold cursor-pointer transition-colors ${
                metricRange === 'alltime' ? 'bg-black text-white' : 'bg-[#eeedf7] text-[#1a1b22]'
              }`}
            >
              All Time
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Metric 1: Retention Heatmap / SVG */}
          <div className="md:col-span-8 bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-[#eeedf7]">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h4 className="text-lg font-bold text-[#1a1b22]">Knowledge Decay Projection</h4>
                <p className="text-xs text-[#444748]">Estimated stability across 64 learned concepts</p>
              </div>
              <span className="text-xs font-bold text-[#009580] bg-[#e6fbf7] px-3 py-1 rounded-full">
                Optimal Recall
              </span>
            </div>

            {/* Inline SVG Visualization */}
            <div className="w-full h-44 py-2">
              <svg className="w-full h-full text-black" fill="none" preserveAspectRatio="none" viewBox="0 0 600 160">
                <path
                  d="M0,130 C80,110 120,40 200,45 C280,50 320,110 400,70 C480,30 520,60 600,20"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeWidth="2.5"
                ></path>
                <path
                  d="M0,130 C80,110 120,40 200,45 C280,50 320,110 400,70 C480,30 520,60 600,20 L600,160 L0,160 Z"
                  fill="currentColor"
                  fillOpacity="0.04"
                ></path>
                <circle className="fill-[#ff5e1a]" cx="200" cy="45" r="4.5"></circle>
                <circle className="fill-[#ff5e1a]" cx="400" cy="70" r="4.5"></circle>
                <circle className="fill-[#ff5e1a]" cx="600" cy="20" r="4.5"></circle>
              </svg>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-[#eeedf7]">
              <div>
                <div className="text-xs text-[#444748]">Active Stability</div>
                <div className="text-xl md:text-2xl font-bold text-[#1a1b22]">98.2 days</div>
              </div>
              <div>
                <div className="text-xs text-[#444748]">Average Recall Rate</div>
                <div className="text-xl md:text-2xl font-bold text-[#1a1b22]">94.6%</div>
              </div>
              <div>
                <div className="text-xs text-[#444748]">Cognitive Debt</div>
                <div className="text-xl md:text-2xl font-bold text-[#aa3600]">0.0 hrs</div>
              </div>
            </div>
          </div>

          {/* Metric 2: Peak Processing Velocity */}
          <div className="md:col-span-4 bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-[#eeedf7] flex flex-col justify-between">
            <div>
              <h4 className="text-lg font-bold text-[#1a1b22] mb-1">Peak Processing Velocity</h4>
              <p className="text-xs text-[#444748] mb-6">Calculated from interaction friction</p>
              <div className="relative w-36 h-36 mx-auto flex items-center justify-center my-2">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle className="text-[#eeedf7]" cx="50" cy="50" fill="transparent" r="42" stroke="currentColor" strokeWidth="8"></circle>
                  <circle
                    className="text-black"
                    cx="50"
                    cy="50"
                    fill="transparent"
                    r="42"
                    stroke="currentColor"
                    strokeDasharray="264"
                    strokeDashoffset="40"
                    strokeLinecap="round"
                    strokeWidth="8"
                  ></circle>
                </svg>
                <div className="absolute flex flex-col items-center">
                  <span className="text-3xl font-extrabold text-[#1a1b22]">88%</span>
                  <span className="text-[11px] text-[#444748] font-semibold">Focus Index</span>
                </div>
              </div>
            </div>
            <div className="p-3 bg-[#f4f2fd] rounded-xl text-xs text-[#444748] text-center border border-[#e3e1ec]">
              Optimal intake window: <strong className="text-[#1a1b22]">09:30 AM – 11:45 AM</strong>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: PERSONAS */}
      <section className="w-full bg-white py-16 md:py-24 border-y border-[#eeedf7]">
        <div className="max-w-[1340px] mx-auto px-4 md:px-12">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-[#aa3600]">Tailored Cognitive Accommodations</span>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-[#1a1b22] mt-2">
              Designed for non-linear brains.
            </h2>
            <p className="text-base text-[#444748] mt-3">
              Every mind is wired uniquely. Lumio customizes sensory delivery, sprint durations, and cognitive pacing for how you actually think.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Persona 1 */}
            <div className="bg-[#f4f2fd] p-6 rounded-2xl flex flex-col justify-between h-[340px] hover:shadow-md transition-shadow border border-[#e3e1ec]">
              <div>
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-black mb-4 shadow-sm">
                  <span className="material-symbols-outlined text-[20px]">school</span>
                </div>
                <h4 className="text-lg font-bold text-[#1a1b22] mb-2 leading-snug">College &amp; Prep Students</h4>
                <p className="text-sm text-[#444748] leading-relaxed">
                  Tackle high-volume curricula without burnout. Ingest textbook chapters and produce adaptive flash trials matched to upcoming exam dates.
                </p>
              </div>
              <div className="text-xs text-[#aa3600] font-bold uppercase tracking-wider">Exam Readiness Engine</div>
            </div>

            {/* Persona 2 */}
            <div className="bg-[#f4f2fd] p-6 rounded-2xl flex flex-col justify-between h-[340px] hover:shadow-md transition-shadow border border-[#e3e1ec]">
              <div>
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-black mb-4 shadow-sm">
                  <span className="material-symbols-outlined text-[20px]">terminal</span>
                </div>
                <h4 className="text-lg font-bold text-[#1a1b22] mb-2 leading-snug">Self-Taught Engineers</h4>
                <p className="text-sm text-[#444748] leading-relaxed">
                  Skip surface fluff. Learn through system architecture breakdowns, code challenges, and low-level protocol execution.
                </p>
              </div>
              <div className="text-xs text-[#aa3600] font-bold uppercase tracking-wider">Sandboxed Debugging</div>
            </div>

            {/* Persona 3 */}
            <div className="bg-[#f4f2fd] p-6 rounded-2xl flex flex-col justify-between h-[340px] hover:shadow-md transition-shadow border border-[#e3e1ec]">
              <div>
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-black mb-4 shadow-sm">
                  <span className="material-symbols-outlined text-[20px]">swap_horiz</span>
                </div>
                <h4 className="text-lg font-bold text-[#1a1b22] mb-2 leading-snug">Career Switchers</h4>
                <p className="text-sm text-[#444748] leading-relaxed">
                  Transfers concepts from your previous career via analogy. Understand technical abstractions using mental models you already possess.
                </p>
              </div>
              <div className="text-xs text-[#aa3600] font-bold uppercase tracking-wider">Analogous Mapping</div>
            </div>

            {/* Persona 4 */}
            <div className="bg-[#f4f2fd] p-6 rounded-2xl flex flex-col justify-between h-[340px] hover:shadow-md transition-shadow border border-[#e3e1ec]">
              <div>
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-black mb-4 shadow-sm">
                  <span className="material-symbols-outlined text-[20px]">bolt</span>
                </div>
                <h4 className="text-lg font-bold text-[#1a1b22] mb-2 leading-snug">Neurodivergent &amp; ADHD</h4>
                <p className="text-sm text-[#444748] leading-relaxed">
                  Micro-dosed 5-minute modular checkpoints, zero sensory distraction, dopamine-aligned milestone pacing, and instant cognitive pivots.
                </p>
              </div>
              <div className="text-xs text-[#aa3600] font-bold uppercase tracking-wider">Low-Friction Focus</div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7: FINAL HIGH-IMPACT CTA */}
      <section className="w-full max-w-[1340px] mx-auto px-4 md:px-12 py-16 md:py-24">
        <div className="bg-black text-white rounded-3xl p-8 md:p-16 text-center relative overflow-hidden shadow-2xl flex flex-col items-center">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]"></div>
          <div className="relative z-10 max-w-2xl flex flex-col items-center">
            <span className="text-xs font-bold uppercase tracking-widest text-[#c9c6c5] mb-4">
              Start the new paradigm
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4 leading-tight">
              Ideas no longer have to wait their turn.
            </h2>
            <p className="text-sm md:text-base text-neutral-300 max-w-xl mb-8 leading-relaxed">
              Join thousands of learners mastering complex topics at double the velocity with an intelligent companion that understands them.
            </p>
            <button
              onClick={() => onNavigate('onboarding-1')}
              className="bg-white text-black font-extrabold text-sm md:text-base rounded-full px-8 md:px-10 py-4 hover:bg-neutral-100 transition-transform hover:scale-[1.02] shadow-lg cursor-pointer"
            >
              Get started for free
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
