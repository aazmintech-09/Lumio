import React, { useState } from 'react';
import { ScreenId } from '../../types';

interface EmptyStatesScreenProps {
  onNavigate: (screen: ScreenId) => void;
}

type EmptyTab = 'paths' | 'notebook' | 'materials' | 'analytics' | 'reviews';

export const EmptyStatesScreen: React.FC<EmptyStatesScreenProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<EmptyTab>('paths');
  const [searchQuery, setSearchQuery] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const tabs: { id: EmptyTab; label: string; icon: string; count: number }[] = [
    { id: 'paths', label: 'Adaptive Learning Paths', icon: 'alt_route', count: 0 },
    { id: 'notebook', label: 'Synthesis Notebooks', icon: 'menu_book', count: 0 },
    { id: 'materials', label: 'Generated Flashcards & Drills', icon: 'layers', count: 0 },
    { id: 'analytics', label: 'Cognitive Velocity Analytics', icon: 'insights', count: 0 },
    { id: 'reviews', label: 'Socratic Peer Review Queue', icon: 'forum', count: 0 },
  ];

  return (
    <div className="min-h-screen bg-surface text-on-surface pb-24">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3 rounded-xl bg-surface-container-highest border border-outline-variant shadow-2xl text-on-surface animate-bounce">
          <span className="material-symbols-outlined text-primary text-xl">check_circle</span>
          <span className="text-sm font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Screen Header */}
      <div className="border-b border-outline-variant/60 bg-surface-container-lowest/60 backdrop-blur-md sticky top-16 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2 py-0.5 rounded text-[11px] font-mono tracking-wider bg-secondary-container text-on-secondary-container uppercase font-semibold">
                  Zero-Data Paradigm
                </span>
                <span className="text-xs text-on-surface-variant font-mono">Screen 10 of 10</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-on-surface">
                Reusable Empty States & Action Catalysts
              </h1>
              <p className="text-sm text-on-surface-variant mt-1 max-w-2xl">
                Elevating empty workspaces from blank voids into high-conversion pedagogical springboards with contextual catalysts.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => showToast('Initial demonstration template loaded')}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-surface-container-high hover:bg-surface-container-highest text-on-surface border border-outline-variant/60 transition-colors"
              >
                <span className="material-symbols-outlined text-base">auto_fix_high</span>
                Populate Demo Content
              </button>
              <button
                onClick={() => onNavigate('landing')}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-primary hover:bg-primary/90 text-on-primary shadow-sm transition-all"
              >
                <span className="material-symbols-outlined text-base">rocket_launch</span>
                Explore Platform
              </button>
            </div>
          </div>

          {/* Sub Navigation Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pt-6 pb-1 scrollbar-none">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? 'bg-primary text-on-primary shadow-sm ring-1 ring-primary/30'
                    : 'bg-surface-container hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface'
                }`}
              >
                <span className="material-symbols-outlined text-base">{tab.icon}</span>
                <span>{tab.label}</span>
                <span className={`ml-1 px-1.5 py-0.2 rounded-full text-[10px] font-mono ${
                  activeTab === tab.id ? 'bg-white/20 text-white' : 'bg-surface-container-highest text-on-surface-variant'
                }`}>
                  {tab.count}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Global Filter Bar */}
        <div className="mb-8 flex flex-col sm:flex-row items-center justify-between gap-4 p-3 rounded-2xl bg-surface-container-low border border-outline-variant/50">
          <div className="relative w-full sm:w-80">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-lg">
              search
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search concepts, documents, or nodes..."
              className="w-full pl-9 pr-4 py-2 text-xs bg-surface-container-lowest rounded-xl border border-outline-variant/60 focus:outline-none focus:ring-2 focus:ring-primary/40 text-on-surface"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-surface-container-lowest border border-outline-variant/60 text-xs text-on-surface-variant">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
              <span>Catalog State: Clean Slate (0 / 10,000 Nodes)</span>
            </div>
            <button
              onClick={() => onNavigate('settings')}
              className="p-2 rounded-xl bg-surface-container-lowest border border-outline-variant/60 text-on-surface-variant hover:text-on-surface transition-colors"
              title="Filter Settings"
            >
              <span className="material-symbols-outlined text-base">tune</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Adaptive Learning Paths */}
        {activeTab === 'paths' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 rounded-3xl bg-surface-container-low border border-outline-variant/70 p-8 sm:p-12 flex flex-col items-center justify-center text-center relative overflow-hidden group">
              {/* Subtle backdrop grid */}
              <div className="absolute inset-0 bg-[radial-gradient(#6049a6_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none"></div>

              {/* Illustration */}
              <div className="relative mb-6">
                <div className="w-28 h-28 rounded-3xl bg-primary/10 border border-primary/20 flex items-center justify-center relative shadow-inner">
                  <svg className="w-16 h-16 text-primary" viewBox="0 0 64 64" fill="none">
                    <circle cx="20" cy="44" r="8" stroke="currentColor" strokeWidth="2.5" strokeDasharray="3 3" />
                    <circle cx="44" cy="20" r="8" stroke="currentColor" strokeWidth="2.5" />
                    <circle cx="44" cy="44" r="8" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="2.5" />
                    <path d="M26 40L38 28" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                    <path d="M28 44H36" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                    <path d="M44 28V36" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                  </svg>
                  <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-secondary text-on-secondary flex items-center justify-center text-xs font-bold shadow-md">
                    +
                  </div>
                </div>
              </div>

              <h2 className="text-xl sm:text-2xl font-bold text-on-surface mb-2">
                No active learning trajectories synthesized yet
              </h2>
              <p className="text-sm text-on-surface-variant max-w-md mb-8">
                Your adaptive canvas is ready. Seed a curriculum from a syllabus, paste course topics, or select a pre-calibrated cognitive pathway below.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-3">
                <button
                  onClick={() => onNavigate('onboarding-1')}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold bg-primary hover:bg-primary/90 text-on-primary shadow-md hover:shadow-lg transition-all"
                >
                  <span className="material-symbols-outlined text-base">alt_route</span>
                  Generate First Learning Path
                </button>
                <button
                  onClick={() => showToast('Import dialog opened')}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-surface-container-high hover:bg-surface-container-highest text-on-surface border border-outline-variant transition-colors"
                >
                  <span className="material-symbols-outlined text-base">upload_file</span>
                  Import Syllabus (.pdf, .md)
                </button>
              </div>

              {/* Quick Template Starters */}
              <div className="w-full mt-10 pt-8 border-t border-outline-variant/60 text-left">
                <span className="text-[11px] font-mono tracking-wider uppercase text-on-surface-variant font-semibold">
                  Or start from a curated foundational blueprint:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-3">
                  {[
                    { title: 'Quantum Computing Foundations', time: '14 hrs', nodes: 38, icon: 'science' },
                    { title: 'Distributed Systems & Paxos', time: '22 hrs', nodes: 54, icon: 'hub' },
                    { title: 'Organic Chemistry Synthesis', time: '18 hrs', nodes: 46, icon: 'biotech' },
                  ].map((preset, i) => (
                    <button
                      key={i}
                      onClick={() => showToast(`Loaded template: ${preset.title}`)}
                      className="p-3 rounded-xl bg-surface-container-lowest hover:bg-surface-container border border-outline-variant/60 text-left group/item transition-all"
                    >
                      <div className="flex items-center gap-2 text-primary mb-1">
                        <span className="material-symbols-outlined text-base">{preset.icon}</span>
                        <span className="text-xs font-bold text-on-surface truncate">{preset.title}</span>
                      </div>
                      <div className="flex items-center justify-between text-[11px] text-on-surface-variant font-mono">
                        <span>{preset.time}</span>
                        <span>{preset.nodes} nodes</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar Guide */}
            <div className="space-y-6">
              <div className="p-6 rounded-3xl bg-surface-container-low border border-outline-variant/70">
                <div className="flex items-center gap-2 text-primary mb-3">
                  <span className="material-symbols-outlined">lightbulb</span>
                  <h3 className="text-sm font-bold text-on-surface">How Path Synthesis Works</h3>
                </div>
                <p className="text-xs text-on-surface-variant leading-relaxed mb-4">
                  Unlike linear course video checklists, Lumio analyzes your prerequisite DAG (Directed Acyclic Graph) in real time. As you solve derivations, the graph prunes already-mastered concepts and focuses on friction bottlenecks.
                </p>
                <div className="space-y-3">
                  <div className="flex items-start gap-2.5 text-xs text-on-surface">
                    <span className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">1</span>
                    <span>Define target mastery destination</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs text-on-surface">
                    <span className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">2</span>
                    <span>Run a 3-minute diagnostic calibration</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs text-on-surface">
                    <span className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">3</span>
                    <span>Engage in Socratic canvas dialogues</span>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-3xl bg-gradient-to-br from-primary-container/40 to-secondary-container/40 border border-primary/20">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-primary text-on-primary">
                  Pro-Tip
                </span>
                <h4 className="text-sm font-bold text-on-surface mt-2 mb-1">
                  Connect your Zotero or Obsidian vault
                </h4>
                <p className="text-xs text-on-surface-variant mb-4">
                  Synchronize your existing markdown notes to instantly map what you already know against exam standards.
                </p>
                <button
                  onClick={() => onNavigate('settings')}
                  className="w-full py-2 px-3 rounded-xl bg-surface-container-lowest hover:bg-surface-container text-xs font-semibold text-primary border border-outline-variant/60 transition-colors"
                >
                  Configure Integrations
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Synthesis Notebooks */}
        {activeTab === 'notebook' && (
          <div className="rounded-3xl bg-surface-container-low border border-outline-variant/70 p-12 flex flex-col items-center justify-center text-center">
            <div className="w-24 h-24 rounded-3xl bg-secondary/10 border border-secondary/20 flex items-center justify-center text-secondary mb-6 shadow-inner">
              <span className="material-symbols-outlined text-4xl">auto_stories</span>
            </div>
            <h2 className="text-2xl font-bold text-on-surface mb-2">Synthesis Notebook is pristine</h2>
            <p className="text-sm text-on-surface-variant max-w-md mb-6">
              Every derivation, LaTeX proof, canvas diagram, and Socratic reflection you pin during a session gathers here into an immutable knowledge codex.
            </p>
            <div className="flex items-center gap-3">
              <button
                onClick={() => showToast('New empty notebook created')}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold bg-primary text-on-primary shadow-sm hover:bg-primary/90 transition-all"
              >
                <span className="material-symbols-outlined text-base">add</span>
                Create Notebook Page
              </button>
              <button
                onClick={() => onNavigate('landing')}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-surface-container-high text-on-surface hover:bg-surface-container-highest transition-colors"
              >
                <span className="material-symbols-outlined text-base">draw</span>
                Open Freehand Canvas
              </button>
            </div>
          </div>
        )}

        {/* Tab 3: Generated Materials */}
        {activeTab === 'materials' && (
          <div className="rounded-3xl bg-surface-container-low border border-outline-variant/70 p-12 flex flex-col items-center justify-center text-center">
            <div className="w-24 h-24 rounded-3xl bg-tertiary-container/30 border border-tertiary-container flex items-center justify-center text-tertiary mb-6">
              <span className="material-symbols-outlined text-4xl">style</span>
            </div>
            <h2 className="text-2xl font-bold text-on-surface mb-2">No generated review decks available</h2>
            <p className="text-sm text-on-surface-variant max-w-md mb-6">
              When you encounter cognitive friction in quizzes or derivations, Lumio automatically isolates confusing formulas into high-yield spaced repetition decks.
            </p>
            <button
              onClick={() => showToast('AI flashcard generation initiated')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold bg-primary text-on-primary shadow-sm hover:bg-primary/90 transition-all"
            >
              <span className="material-symbols-outlined text-base">flash_on</span>
              Synthesize 20 Spaced-Repetition Cards
            </button>
          </div>
        )}

        {/* Tab 4: Cognitive Velocity Analytics */}
        {activeTab === 'analytics' && (
          <div className="rounded-3xl bg-surface-container-low border border-outline-variant/70 p-12 flex flex-col items-center justify-center text-center">
            <div className="w-24 h-24 rounded-3xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-6">
              <span className="material-symbols-outlined text-4xl">stacked_line_chart</span>
            </div>
            <h2 className="text-2xl font-bold text-on-surface mb-2">Insufficient telemetry for velocity metrics</h2>
            <p className="text-sm text-on-surface-variant max-w-md mb-6">
              Complete at least one 10-minute calibration session to unlock latency histograms, confidence decay predictions, and cognitive friction telemetry.
            </p>
            <button
              onClick={() => onNavigate('onboarding-2')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold bg-primary text-on-primary shadow-sm hover:bg-primary/90 transition-all"
            >
              <span className="material-symbols-outlined text-base">play_circle</span>
              Start Diagnostic Calibration
            </button>
          </div>
        )}

        {/* Tab 5: Socratic Peer Review Queue */}
        {activeTab === 'reviews' && (
          <div className="rounded-3xl bg-surface-container-low border border-outline-variant/70 p-12 flex flex-col items-center justify-center text-center">
            <div className="w-24 h-24 rounded-3xl bg-secondary/10 border border-secondary/20 flex items-center justify-center text-secondary mb-6">
              <span className="material-symbols-outlined text-4xl">rate_review</span>
            </div>
            <h2 className="text-2xl font-bold text-on-surface mb-2">Peer review queue is clear</h2>
            <p className="text-sm text-on-surface-variant max-w-md mb-6">
              All submitted proofs and code derivations have been reviewed. Share your workspace or join an academic cohort to examine peer derivations.
            </p>
            <button
              onClick={() => showToast('Cohort invitation link copied to clipboard')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold bg-primary text-on-primary shadow-sm hover:bg-primary/90 transition-all"
            >
              <span className="material-symbols-outlined text-base">group_add</span>
              Join Learning Cohort
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
