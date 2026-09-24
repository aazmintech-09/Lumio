import React, { useState } from 'react';
import { ScreenId } from '../../types';

interface MobileDemoScreenProps {
  onNavigate: (screen: ScreenId) => void;
}

type MobileScreenView = 'onboarding' | 'canvas' | 'graph' | 'milestones' | 'profile';

export const MobileDemoScreen: React.FC<MobileDemoScreenProps> = ({ onNavigate }) => {
  const [activeMobileView, setActiveMobileView] = useState<MobileScreenView>('canvas');
  const [deviceModel, setDeviceModel] = useState<'iphone' | 'pixel' | 'clean'>('iphone');
  const [scale, setScale] = useState<number>(1);
  const [inputText, setInputText] = useState('');
  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'ai' | 'user'; text: string; time: string }>>([
    {
      sender: 'ai',
      text: 'Welcome to your quantum mechanics session. We are analyzing the transition probability between state |0⟩ and |1⟩ under a continuous resonant Hamiltonian. What is the Rabi frequency formula?',
      time: '9:41 AM',
    },
    {
      sender: 'user',
      text: 'Ω = (d · E0) / ℏ, where d is the transition dipole moment and E0 is the electric field amplitude.',
      time: '9:42 AM',
    },
    {
      sender: 'ai',
      text: 'Exact! Now, consider when detuning Δ is non-zero. Does the maximum transition probability reach 1.0 or is it bounded strictly below unity?',
      time: '9:42 AM',
    },
  ]);
  const [selectedChip, setSelectedChip] = useState<string | null>(null);

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    const userMsg = {
      sender: 'user' as const,
      text: text,
      time: '9:43 AM',
    };

    setChatMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setSelectedChip(null);

    setTimeout(() => {
      const aiReply = {
        sender: 'ai' as const,
        text: 'Brilliant deduction. Because P_max = Ω² / (Ω² + Δ²), any finite non-zero detuning strictly dampens the transition amplitude below 1.0, though the oscillation frequency increases to Ω_eff = √(Ω² + Δ²).',
        time: '9:43 AM',
      };
      setChatMessages((prev) => [...prev, aiReply]);
    }, 700);
  };

  return (
    <div className="min-h-screen bg-surface-container-lowest text-on-surface py-8 px-4 sm:px-6">
      {/* Top Banner & Control Deck */}
      <div className="max-w-5xl mx-auto mb-8 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary mb-3">
          <span className="material-symbols-outlined text-sm">phone_iphone</span>
          Interactive Mobile Device Simulator
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-on-surface">
          Lumio Mobile Adaptive Engine
        </h1>
        <p className="text-sm text-on-surface-variant max-w-xl mx-auto mt-2">
          Experience Lumio's responsive mobile experience designed for rapid commuter micro-derivations, tactile gesture canvas, and instant Socratic dialogue.
        </p>

        {/* Simulator controls */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <div className="inline-flex p-1 rounded-xl bg-surface-container border border-outline-variant/60 text-xs font-medium">
            <button
              onClick={() => setDeviceModel('iphone')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                deviceModel === 'iphone' ? 'bg-primary text-on-primary shadow-xs' : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              iPhone 16 Pro
            </button>
            <button
              onClick={() => setDeviceModel('pixel')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                deviceModel === 'pixel' ? 'bg-primary text-on-primary shadow-xs' : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              Google Pixel 9
            </button>
            <button
              onClick={() => setDeviceModel('clean')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                deviceModel === 'clean' ? 'bg-primary text-on-primary shadow-xs' : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              Borderless View
            </button>
          </div>

          <div className="inline-flex p-1 rounded-xl bg-surface-container border border-outline-variant/60 text-xs font-medium">
            <button
              onClick={() => setScale(0.9)}
              className={`px-2.5 py-1.5 rounded-lg ${scale === 0.9 ? 'bg-surface-container-highest font-bold' : 'text-on-surface-variant'}`}
            >
              90%
            </button>
            <button
              onClick={() => setScale(1)}
              className={`px-2.5 py-1.5 rounded-lg ${scale === 1 ? 'bg-surface-container-highest font-bold' : 'text-on-surface-variant'}`}
            >
              100%
            </button>
          </div>

          <button
            onClick={() => onNavigate('landing')}
            className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-surface-container-high hover:bg-surface-container-highest text-on-surface border border-outline-variant transition-colors"
          >
            Back to Desktop Canvas
          </button>
        </div>
      </div>

      {/* Device Viewport Center Stage */}
      <div className="flex justify-center items-center pb-12 overflow-x-auto">
        <div
          style={{ transform: `scale(${scale})`, transformOrigin: 'top center' }}
          className={`transition-all duration-300 ${
            deviceModel === 'iphone'
              ? 'w-[390px] h-[844px] rounded-[52px] p-3.5 bg-neutral-900 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.4),0_0_0_1px_rgba(255,255,255,0.1)] ring-8 ring-neutral-800'
              : deviceModel === 'pixel'
              ? 'w-[400px] h-[860px] rounded-[42px] p-3 bg-neutral-950 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.4)] ring-6 ring-neutral-700'
              : 'w-[390px] h-[844px] rounded-3xl border-2 border-outline-variant shadow-xl'
          }`}
        >
          {/* Inner Phone Screen Container */}
          <div className="w-full h-full rounded-[40px] overflow-hidden bg-surface text-on-surface flex flex-col relative select-none">
            {/* Status Bar */}
            <div className="pt-3 px-6 pb-2 flex items-center justify-between text-xs font-semibold tracking-tight text-on-surface z-30 shrink-0">
              <span className="font-mono text-[13px]">9:41</span>

              {/* Dynamic Island / Notch */}
              {deviceModel === 'iphone' && (
                <div className="w-28 h-6 bg-black rounded-full flex items-center justify-between px-3 -mt-1 shadow-inner">
                  <div className="w-2.5 h-2.5 rounded-full bg-neutral-900 border border-neutral-700 flex items-center justify-center">
                    <div className="w-1 h-1 rounded-full bg-blue-600/40"></div>
                  </div>
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 animate-pulse"></div>
                </div>
              )}
              {deviceModel === 'pixel' && (
                <div className="w-3.5 h-3.5 rounded-full bg-black -mt-1 ring-2 ring-neutral-900"></div>
              )}

              <div className="flex items-center gap-1.5 text-xs text-on-surface">
                <span className="material-symbols-outlined text-[15px]">signal_cellular_4_bar</span>
                <span className="material-symbols-outlined text-[15px]">wifi</span>
                <span className="material-symbols-outlined text-[17px]">battery_full</span>
              </div>
            </div>

            {/* Mobile App Header */}
            <div className="px-4 py-2.5 bg-surface-container-lowest/80 backdrop-blur-md border-b border-outline-variant/60 flex items-center justify-between shrink-0 z-20">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-white font-bold text-xs shadow-xs">
                  L
                </div>
                <div>
                  <h2 className="text-xs font-bold leading-none text-on-surface">Lumio Adaptive</h2>
                  <span className="text-[10px] text-primary font-mono leading-none">Quantum Foundations</span>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-300 text-[10px] font-bold">
                  <span className="material-symbols-outlined text-xs">local_fire_department</span>
                  <span>14</span>
                </div>
                <button
                  onClick={() => onNavigate('settings')}
                  className="p-1 rounded-full text-on-surface-variant hover:text-on-surface"
                >
                  <span className="material-symbols-outlined text-lg">more_vert</span>
                </button>
              </div>
            </div>

            {/* View Content Body */}
            <div className="flex-1 overflow-y-auto overscroll-contain">
              {/* VIEW 1: Socratic Learning Canvas */}
              {activeMobileView === 'canvas' && (
                <div className="flex flex-col h-full justify-between p-3">
                  {/* Pacing HUD */}
                  <div className="p-2.5 rounded-2xl bg-surface-container border border-outline-variant/60 mb-2">
                    <div className="flex items-center justify-between text-[11px] font-medium text-on-surface-variant mb-1">
                      <span className="flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                        Optimal Flow (Load: 42%)
                      </span>
                      <span className="font-mono text-primary font-bold">Node 4 of 12</span>
                    </div>
                    <div className="w-full h-1.5 bg-surface-container-highest rounded-full overflow-hidden">
                      <div className="w-1/3 h-full bg-primary rounded-full"></div>
                    </div>
                  </div>

                  {/* Chat messages */}
                  <div className="flex-1 space-y-3 overflow-y-auto pr-1">
                    {chatMessages.map((msg, i) => (
                      <div
                        key={i}
                        className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                      >
                        <div
                          className={`max-w-[85%] rounded-2xl p-3 text-xs leading-relaxed ${
                            msg.sender === 'user'
                              ? 'bg-primary text-on-primary rounded-tr-xs shadow-xs'
                              : 'bg-surface-container-high text-on-surface rounded-tl-xs border border-outline-variant/50 shadow-xs'
                          }`}
                        >
                          {msg.text}
                        </div>
                        <span className="text-[9px] text-on-surface-variant mt-1 px-1 font-mono">
                          {msg.time}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Quick response chips */}
                  <div className="pt-2">
                    <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
                      {[
                        'Strictly bounded < 1.0 due to detuning damping',
                        'It reaches 1.0 if pulse length is adjusted',
                        'Derive using Bloch Sphere rotation matrix',
                      ].map((chip, idx) => (
                        <button
                          key={idx}
                          onClick={() => {
                            setSelectedChip(chip);
                            handleSendMessage(chip);
                          }}
                          className="px-2.5 py-1 rounded-xl text-[10px] font-medium bg-surface-container-high hover:bg-surface-container-highest text-on-surface border border-outline-variant/70 whitespace-nowrap active:scale-95 transition-transform"
                        >
                          {chip}
                        </button>
                      ))}
                    </div>

                    {/* Chat Input */}
                    <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-surface-container-lowest border border-outline-variant shadow-sm">
                      <button className="p-1.5 text-on-surface-variant hover:text-on-surface">
                        <span className="material-symbols-outlined text-base">mic</span>
                      </button>
                      <input
                        type="text"
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                        placeholder="Type derivation step or formula..."
                        className="flex-1 bg-transparent text-xs text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none"
                      />
                      <button
                        onClick={() => handleSendMessage()}
                        disabled={!inputText.trim()}
                        className="p-1.5 rounded-xl bg-primary disabled:opacity-40 text-on-primary transition-opacity"
                      >
                        <span className="material-symbols-outlined text-base">send</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* VIEW 2: Dynamic Knowledge Graph */}
              {activeMobileView === 'graph' && (
                <div className="p-3 h-full flex flex-col justify-between">
                  <div>
                    <h3 className="text-xs font-bold text-on-surface mb-1">Knowledge DAG Navigator</h3>
                    <p className="text-[11px] text-on-surface-variant mb-3">
                      Tap any node to drill into prerequisites.
                    </p>

                    {/* Interactive Mobile Graph Node Visualizer */}
                    <div className="h-72 rounded-2xl bg-surface-container-low border border-outline-variant relative overflow-hidden flex items-center justify-center p-4">
                      <div className="absolute inset-0 bg-[radial-gradient(#6049a6_1px,transparent_1px)] [background-size:16px_16px] opacity-15"></div>

                      {/* SVG Graph */}
                      <svg className="w-full h-full" viewBox="0 0 300 240">
                        {/* Connecting lines */}
                        <line x1="80" y1="60" x2="150" y2="120" stroke="#8975cb" strokeWidth="2" strokeDasharray="3 3" />
                        <line x1="220" y1="60" x2="150" y2="120" stroke="#483387" strokeWidth="2.5" />
                        <line x1="150" y1="120" x2="90" y2="190" stroke="#483387" strokeWidth="2.5" />
                        <line x1="150" y1="120" x2="210" y2="190" stroke="#8975cb" strokeWidth="2" strokeDasharray="3 3" />

                        {/* Nodes */}
                        <g className="cursor-pointer">
                          <circle cx="80" cy="60" r="20" fill="#ede7f6" stroke="#6049a6" strokeWidth="2" />
                          <text x="80" y="64" textAnchor="middle" fontSize="10" fill="#483387" fontWeight="bold">Hilbert</text>
                        </g>

                        <g className="cursor-pointer">
                          <circle cx="220" cy="60" r="20" fill="#ede7f6" stroke="#6049a6" strokeWidth="2" />
                          <text x="220" y="64" textAnchor="middle" fontSize="10" fill="#483387" fontWeight="bold">Bra-Ket</text>
                        </g>

                        <g className="cursor-pointer">
                          <circle cx="150" cy="120" r="26" fill="#483387" stroke="#8975cb" strokeWidth="3" />
                          <text x="150" y="124" textAnchor="middle" fontSize="11" fill="#ffffff" fontWeight="bold">Rabi Osc</text>
                        </g>

                        <g className="cursor-pointer">
                          <circle cx="90" cy="190" r="20" fill="#e8f5e9" stroke="#2e7d32" strokeWidth="2" />
                          <text x="90" y="194" textAnchor="middle" fontSize="9" fill="#1b5e20" fontWeight="bold">Detuning</text>
                        </g>

                        <g className="cursor-pointer">
                          <circle cx="210" cy="190" r="20" fill="#fdf2e9" stroke="#e65100" strokeWidth="2" />
                          <text x="210" y="194" textAnchor="middle" fontSize="9" fill="#bf360c" fontWeight="bold">Ramsey</text>
                        </g>
                      </svg>

                      {/* Tap tooltip */}
                      <div className="absolute bottom-2 left-2 right-2 p-2 rounded-xl bg-surface-container-highest/90 backdrop-blur-xs text-[10px] text-on-surface flex items-center justify-between">
                        <span>Active Target: <strong>Rabi Oscillations</strong></span>
                        <span className="font-mono text-primary font-bold">88% Mastery</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 rounded-2xl bg-surface-container-low border border-outline-variant/60">
                    <div className="text-xs font-bold text-on-surface mb-1">Recommended Next Prerequisite</div>
                    <p className="text-[11px] text-on-surface-variant mb-2">
                      Detuning resonance calculations under non-adiabatic rapid passage.
                    </p>
                    <button
                      onClick={() => setActiveMobileView('canvas')}
                      className="w-full py-2 rounded-xl text-xs font-semibold bg-primary text-on-primary text-center"
                    >
                      Begin 5-Min Micro Derivation
                    </button>
                  </div>
                </div>
              )}

              {/* VIEW 3: Milestones & Streaks */}
              {activeMobileView === 'milestones' && (
                <div className="p-4 space-y-4">
                  <div className="p-4 rounded-3xl bg-gradient-to-br from-primary-container to-secondary-container text-on-primary-container">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-mono uppercase tracking-wider font-bold">Velocity Streak</span>
                      <span className="material-symbols-outlined text-amber-500">local_fire_department</span>
                    </div>
                    <div className="text-3xl font-extrabold tracking-tight">14 Days</div>
                    <p className="text-xs opacity-80 mt-1">42 consecutive derivations completed without cognitive regression.</p>
                  </div>

                  <div className="space-y-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-on-surface-variant font-mono">
                      Recent Milestones
                    </span>

                    {[
                      { title: 'Vector Space Mastery', badge: 'Certified', icon: 'verified', time: 'Yesterday' },
                      { title: 'Dirac Notation Fluency', badge: 'Top 5%', icon: 'military_tech', time: '3 days ago' },
                      { title: 'Hermitian Operators', badge: 'Unbroken', icon: 'shield', time: '1 week ago' },
                    ].map((item, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-2xl bg-surface-container-low border border-outline-variant/50 flex items-center justify-between"
                      >
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                            <span className="material-symbols-outlined text-base">{item.icon}</span>
                          </div>
                          <div>
                            <div className="text-xs font-bold text-on-surface">{item.title}</div>
                            <div className="text-[10px] text-on-surface-variant">{item.time}</div>
                          </div>
                        </div>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-secondary-container text-on-secondary-container font-mono">
                          {item.badge}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* VIEW 4: Onboarding Quick Tour */}
              {activeMobileView === 'onboarding' && (
                <div className="p-4 flex flex-col justify-between h-full text-center">
                  <div className="pt-4">
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4">
                      <span className="material-symbols-outlined text-3xl">psychology</span>
                    </div>
                    <h3 className="text-lg font-bold text-on-surface">Cognitive Calibration</h3>
                    <p className="text-xs text-on-surface-variant mt-2 max-w-xs mx-auto leading-relaxed">
                      Lumio continuously monitors hesitation timestamps and derivation efficiency to adjust Socratic guidance.
                    </p>

                    <div className="mt-6 space-y-2 text-left">
                      {['First-principles physics', 'Distributed system design', 'MCAT organic biochemistry'].map(
                        (opt, i) => (
                          <div
                            key={i}
                            className="p-3 rounded-2xl bg-surface-container-low border border-outline-variant/60 flex items-center justify-between text-xs"
                          >
                            <span className="font-semibold text-on-surface">{opt}</span>
                            <span className="material-symbols-outlined text-primary text-base">check_circle</span>
                          </div>
                        ),
                      )}
                    </div>
                  </div>

                  <button
                    onClick={() => setActiveMobileView('canvas')}
                    className="w-full py-2.5 rounded-xl bg-primary text-on-primary font-bold text-xs shadow-sm mt-4"
                  >
                    Enter Live Canvas Session
                  </button>
                </div>
              )}

              {/* VIEW 5: Profile & Settings */}
              {activeMobileView === 'profile' && (
                <div className="p-4 space-y-3">
                  <div className="flex items-center gap-3 p-3 rounded-2xl bg-surface-container-low border border-outline-variant/50">
                    <div className="w-12 h-12 rounded-full bg-primary text-on-primary flex items-center justify-center text-base font-bold shadow-xs">
                      AT
                    </div>
                    <div>
                      <div className="text-xs font-bold text-on-surface">Aazmin Tech</div>
                      <div className="text-[11px] text-on-surface-variant font-mono">Cognitive Scholar • Level 18</div>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    {[
                      { icon: 'tune', label: 'Cognitive Pacing Sensitivity', val: 'Adaptive (Medium)' },
                      { icon: 'volume_up', label: 'Audio Socratic Stream', val: 'Active (Lyra v3)' },
                      { icon: 'shield', label: 'Local Telemetry Encryption', val: 'Enabled' },
                      { icon: 'palette', label: 'Dark Mode Canvas', val: 'Auto' },
                    ].map((row, i) => (
                      <div
                        key={i}
                        className="p-2.5 rounded-xl bg-surface-container-low border border-outline-variant/40 flex items-center justify-between text-xs"
                      >
                        <div className="flex items-center gap-2 text-on-surface">
                          <span className="material-symbols-outlined text-sm text-primary">{row.icon}</span>
                          <span className="font-medium text-[11px]">{row.label}</span>
                        </div>
                        <span className="text-[10px] text-on-surface-variant font-mono">{row.val}</span>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => onNavigate('settings')}
                    className="w-full py-2 rounded-xl text-xs font-semibold bg-surface-container-high text-on-surface border border-outline-variant"
                  >
                    Open Full System Settings
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Bottom Navigation Bar */}
            <div className="h-14 px-2 bg-surface-container-lowest/90 backdrop-blur-md border-t border-outline-variant/60 flex items-center justify-around shrink-0 z-30">
              {[
                { id: 'canvas' as const, label: 'Canvas', icon: 'draw' },
                { id: 'graph' as const, label: 'Graph', icon: 'account_tree' },
                { id: 'milestones' as const, label: 'Streaks', icon: 'local_fire_department' },
                { id: 'onboarding' as const, label: 'Tour', icon: 'explore' },
                { id: 'profile' as const, label: 'Profile', icon: 'person' },
              ].map((tab) => {
                const isActive = activeMobileView === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveMobileView(tab.id)}
                    className={`flex flex-col items-center justify-center w-14 py-1 rounded-xl transition-all ${
                      isActive ? 'text-primary font-bold' : 'text-on-surface-variant hover:text-on-surface'
                    }`}
                  >
                    <span className={`material-symbols-outlined text-lg ${isActive ? 'text-primary' : ''}`}>
                      {tab.icon}
                    </span>
                    <span className="text-[9px] leading-tight mt-0.5">{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Home indicator bar (iPhone gesture line) */}
            {deviceModel === 'iphone' && (
              <div className="w-full flex justify-center pb-1.5 pt-0.5 bg-surface-container-lowest shrink-0">
                <div className="w-32 h-1 bg-on-surface/30 rounded-full"></div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
