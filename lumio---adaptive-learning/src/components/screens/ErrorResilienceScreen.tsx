import React, { useState } from 'react';
import { ScreenId } from '../../types';

interface ErrorResilienceScreenProps {
  onNavigate: (screen: ScreenId) => void;
}

export const ErrorResilienceScreen: React.FC<ErrorResilienceScreenProps> = ({ onNavigate }) => {
  const [retryState1, setRetryState1] = useState<'idle' | 'reconnecting' | 'success'>('idle');
  const [retryState2, setRetryState2] = useState<'idle' | 'reconnecting' | 'success'>('idle');
  const [copiedBundle, setCopiedBundle] = useState(false);

  const handleRetry1 = () => {
    setRetryState1('reconnecting');
    setTimeout(() => {
      setRetryState1('success');
      setTimeout(() => setRetryState1('idle'), 2000);
    }, 1200);
  };

  const handleRetry2 = () => {
    setRetryState2('reconnecting');
    setTimeout(() => {
      setRetryState2('success');
      setTimeout(() => setRetryState2('idle'), 2000);
    }, 1200);
  };

  const handleCopyBundle = () => {
    setCopiedBundle(true);
    setTimeout(() => setCopiedBundle(false), 2000);
  };

  return (
    <div className="w-full min-h-screen bg-[#fbf8ff] py-8 md:py-12 px-4 md:px-12">
      <div className="max-w-[1340px] mx-auto">
        {/* Top Context Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ffdbcf] text-[#822800] text-xs font-bold uppercase tracking-wider mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ff5e1a]"></span>
              RECOVERY PROTOCOLS
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold text-[#1a1b22] tracking-tight mb-2">
              System Resilience &amp; Error States
            </h1>
            <p className="text-sm md:text-base text-[#444748] max-w-2xl leading-relaxed">
              Graceful degradation that preserves learner cognitive momentum with diagnostic context and immediate recovery actions.
            </p>
          </div>

          {/* Status Pill */}
          <div className="flex flex-wrap items-center gap-2.5 bg-[#f4f2fd] px-4 py-2 rounded-2xl border border-[#e3e1ec] shadow-xs self-start md:self-auto">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#41ddc2]"></span>
              <span className="text-xs font-bold text-[#1a1b22]">Local Cache: Intact</span>
            </div>
            <span className="text-xs text-[#c4c7c7]">•</span>
            <div className="flex items-center gap-1 text-[#444748]">
              <span className="material-symbols-outlined text-[16px]">lock</span>
              <span className="text-xs font-semibold">Zero Session Loss</span>
            </div>
          </div>
        </div>

        {/* 4 Bento Recovery States */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-10">
          {/* 1. AI Companion Unavailable (7 cols) */}
          <section className="lg:col-span-7 bg-white rounded-3xl p-6 md:p-8 flex flex-col justify-between shadow-sm border border-[#eeedf7] relative overflow-hidden">
            <div>
              <div className="flex items-center justify-between gap-2 mb-6">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#eeedf7] text-[#1a1b22] text-xs font-bold">
                  <span className="w-2 h-2 rounded-full bg-[#ff5e1a] animate-pulse"></span>
                  NODE: RECALIBRATION_CYCLE
                </div>
                <span className="text-xs text-[#747878] font-mono">ERR_REASONING_MEM_TIMEOUT</span>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 mb-6">
                {/* Tactile Orb SVG */}
                <div className="relative w-20 h-20 rounded-full bg-[#eeedf7] flex items-center justify-center shrink-0">
                  <svg className="w-14 h-14 text-black" fill="none" viewBox="0 0 100 100">
                    <circle className="opacity-30" cx="50" cy="50" r="40" stroke="currentColor" strokeDasharray="6 4" strokeWidth="3"></circle>
                    <circle className="text-[#65fade]" cx="50" cy="50" fill="currentColor" r="26"></circle>
                    <path d="M38 50C38 43.3726 43.3726 38 50 38C56.6274 38 62 43.3726 62 50C62 56.6274 56.6274 62 50 62" stroke="#000000" strokeLinecap="round" strokeWidth="4"></path>
                    <circle cx="50" cy="50" fill="#000000" r="5"></circle>
                  </svg>
                  <div className="absolute -bottom-1 -right-1 bg-white p-1 rounded-full shadow-xs border border-[#eeedf7]">
                    <span className="material-symbols-outlined text-[16px] text-[#aa3600]">sync</span>
                  </div>
                </div>

                <div>
                  <h2 className="text-xl font-bold text-[#1a1b22] tracking-tight mb-1">
                    Adaptive Engine Briefly Offline
                  </h2>
                  <p className="text-xs text-[#444748] leading-relaxed">
                    Our reasoning models are recalibrating memory partitions. Your active session and local notes are securely cached.
                  </p>
                </div>
              </div>

              <div className="bg-[#f4f2fd] rounded-2xl p-4 mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs border border-[#e3e1ec]">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#444748] text-[18px]">save</span>
                  <span>Unsaved derivations: <strong className="font-bold text-black">0 lost</strong></span>
                </div>
                <div className="flex items-center gap-1.5 text-[#444748]">
                  <span className="material-symbols-outlined text-[16px]">schedule</span>
                  <span>Est. restoration: ~14s</span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                type="button"
                onClick={handleRetry1}
                className="px-6 py-2.5 bg-black text-white rounded-full text-xs font-bold transition-all hover:bg-neutral-800 flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <span>
                  {retryState1 === 'reconnecting' ? 'Re-establishing...' : retryState1 === 'success' ? 'Connected ✓' : 'Try Again Now'}
                </span>
                <span className="material-symbols-outlined text-[16px]">
                  {retryState1 === 'reconnecting' ? 'sync' : 'refresh'}
                </span>
              </button>
              <button
                type="button"
                onClick={() => alert('Launching offline interactive drills cached on device.')}
                className="px-5 py-2.5 bg-[#eeedf7] text-[#1a1b22] hover:bg-[#e8e7f1] rounded-full text-xs font-bold transition-colors cursor-pointer"
              >
                Continue with Offline Problem Drills
              </button>
            </div>
          </section>

          {/* 2. Sync Interrupted (5 cols) */}
          <section className="lg:col-span-5 bg-white rounded-3xl p-6 md:p-8 flex flex-col justify-between shadow-sm border border-[#eeedf7]">
            <div>
              <div className="flex items-center justify-between gap-2 mb-4">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ffdad6] text-[#93000a] text-xs font-bold">
                  <span className="material-symbols-outlined text-[14px]">wifi_off</span>
                  OFFLINE FALLBACK
                </div>
                <span className="text-xs text-[#747878] font-mono">HTTP_504_GATEWAY</span>
              </div>

              <h2 className="text-xl font-bold text-[#1a1b22] tracking-tight mb-1">
                Sync Interrupted
              </h2>
              <p className="text-xs text-[#444748] leading-relaxed mb-5">
                We lost connection to the real-time inference node. Any derivations or answers you entered in the last 2 minutes are preserved locally.
              </p>

              {/* Local Snapshot Queue */}
              <div className="bg-[#f4f2fd] rounded-2xl p-4 mb-6 border border-[#e3e1ec]">
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="text-[#444748]">Local Snapshot Queue</span>
                  <span className="text-black font-bold">4 items ready</span>
                </div>
                <div className="w-full bg-[#e8e7f1] h-2 rounded-full overflow-hidden">
                  <div className="bg-black h-full rounded-full w-4/5"></div>
                </div>
                <p className="text-[11px] text-[#747878] mt-2">
                  Timestamp: Local snapshot synced 42 seconds ago.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
              <button
                type="button"
                onClick={handleRetry2}
                className="px-6 py-2.5 bg-black text-white rounded-full text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer shadow-xs hover:bg-neutral-800"
              >
                <span>{retryState2 === 'reconnecting' ? 'Syncing...' : retryState2 === 'success' ? 'Buffer Flushed ✓' : 'Reconnect & Retry'}</span>
                <span className="material-symbols-outlined text-[16px]">cached</span>
              </button>
              <button
                type="button"
                onClick={() => alert('Diagnostic Ping: Packet latency 34ms, Gateway response status: Recalibrating')}
                className="px-5 py-2.5 bg-[#eeedf7] text-[#1a1b22] hover:bg-[#e8e7f1] rounded-full text-xs font-bold transition-colors text-center cursor-pointer"
              >
                Diagnose Network
              </button>
            </div>
          </section>

          {/* 3. Upload Failure (6 cols) */}
          <section className="lg:col-span-6 bg-white rounded-3xl p-6 md:p-8 flex flex-col justify-between shadow-sm border border-[#eeedf7]">
            <div>
              <div className="flex items-center justify-between gap-2 mb-4">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ffdbcf] text-[#822800] text-xs font-bold">
                  <span className="material-symbols-outlined text-[14px]">warning</span>
                  PARSER INCOMPATIBILITY
                </div>
                <span className="text-xs text-[#747878] font-mono">FILE_REJECTED</span>
              </div>

              <h2 className="text-xl font-bold text-[#1a1b22] tracking-tight mb-1">
                Upload Failure
              </h2>
              <p className="text-xs text-[#444748] mb-5 leading-relaxed">
                We could not deconstruct this file format. Convert to a standard PDF or paste markdown text directly.
              </p>

              {/* Document Diagnostic Card */}
              <div className="bg-[#f4f2fd] rounded-2xl p-4 mb-6 flex flex-col gap-2.5 border border-[#e3e1ec]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-[#ba1a1a] shadow-xs">
                    <span className="material-symbols-outlined text-[24px]">picture_as_pdf</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-bold text-[#1a1b22] truncate">Calculus_Syllabus_2025.pdf</span>
                      <span className="text-[11px] text-[#747878]">14.8 MB</span>
                    </div>
                    <div className="inline-flex items-center gap-1 mt-1 px-2.5 py-0.5 rounded-full bg-[#ffdad6] text-[#93000a] text-[10px] font-bold">
                      <span>PDF Parse Timeout (File exceeding OCR limit or encrypted)</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-[#eeedf7] text-[11px] text-[#444748]">
                  <span>Remedy: Flatten vector layers or export raw ASCII/LaTeX</span>
                  <button
                    onClick={() => alert('Inspection Guide: OCR accepts searchable text layers up to 500 pages.')}
                    className="text-black font-bold hover:underline cursor-pointer"
                  >
                    Inspection Guide
                  </button>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => alert('Opening file selection dialog...')}
                className="px-6 py-2.5 bg-black text-white rounded-full text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs hover:bg-neutral-800"
              >
                <span>Try Upload Again</span>
                <span className="material-symbols-outlined text-[16px]">upload_file</span>
              </button>
              <button
                type="button"
                onClick={() => alert('Paste modal opened: Markdown & LaTeX supported.')}
                className="px-5 py-2.5 bg-[#eeedf7] text-[#1a1b22] hover:bg-[#e8e7f1] rounded-full text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <span>Paste Text / Markdown</span>
                <span className="material-symbols-outlined text-[16px]">content_paste</span>
              </button>
            </div>
          </section>

          {/* 4. Curriculum Topology Conflict (6 cols) */}
          <section className="lg:col-span-6 bg-white rounded-3xl p-6 md:p-8 flex flex-col justify-between shadow-sm border border-[#eeedf7]">
            <div>
              <div className="flex items-center justify-between gap-2 mb-4">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#eeedf7] text-[#1a1b22] text-xs font-bold">
                  <span className="material-symbols-outlined text-[14px]">tune</span>
                  DAG SOLVER ERROR
                </div>
                <span className="text-xs text-[#747878] font-mono">CONSTRAINTS_UNSATISFIABLE</span>
              </div>

              <h2 className="text-xl font-bold text-[#1a1b22] tracking-tight mb-1">
                Curriculum Topology Conflict
              </h2>
              <p className="text-xs text-[#444748] mb-5 leading-relaxed">
                We couldn’t construct an optimal sequence with the current constraint set (High Rigor + 10 min/day target). Let’s relax the velocity parameters or select fewer concurrent topics.
              </p>

              <div className="bg-[#f4f2fd] rounded-2xl p-4 mb-6 border border-[#e3e1ec]">
                <div className="flex items-center justify-between text-xs mb-3">
                  <span className="font-bold text-[#1a1b22]">Active Mathematical Constraints</span>
                  <span className="text-[#ba1a1a] font-bold">Contradiction Found</span>
                </div>
                <div className="grid grid-cols-2 gap-3 mb-2">
                  <div className="p-3 rounded-xl bg-white border border-[#eeedf7]">
                    <span className="text-[11px] text-[#747878] block">Target Velocity</span>
                    <span className="text-base font-bold text-[#1a1b22]">10 min/day</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white border border-[#eeedf7]">
                    <span className="text-[11px] text-[#747878] block">Depth Goal</span>
                    <span className="text-base font-bold text-[#1a1b22]">Doctoral Rigor</span>
                  </div>
                </div>
                <p className="text-[11px] text-[#444748]">
                  Recommended: Increase daily time to 25 min or step down rigor to Applied Mastery.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => onNavigate('onboarding-2')}
                className="px-6 py-2.5 bg-black text-white rounded-full text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs hover:bg-neutral-800"
              >
                <span>Recalibrate Parameters</span>
                <span className="material-symbols-outlined text-[16px]">tune</span>
              </button>
              <button
                type="button"
                onClick={() => alert('Standard undergraduate baseline applied: 20 min/day.')}
                className="px-5 py-2.5 bg-[#eeedf7] text-[#1a1b22] hover:bg-[#e8e7f1] rounded-full text-xs font-bold transition-colors cursor-pointer"
              >
                Use Standard Baseline
              </button>
            </div>
          </section>
        </div>

        {/* Bottom Banner */}
        <div className="w-full bg-[#f4f2fd] rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 border border-[#e3e1ec]">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-black flex items-center justify-center text-white shrink-0 shadow-sm">
              <span className="material-symbols-outlined text-[24px]">shield</span>
            </div>
            <div>
              <h3 className="text-base font-bold text-[#1a1b22]">Continuous Learner Preservation</h3>
              <p className="text-xs md:text-sm text-[#444748] max-w-xl mt-0.5 leading-relaxed">
                Lumio keeps local micro-caches of your thoughts, active LaTeX scratchpads, and conceptual questions across all interruptions. You never lose cognitive work.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={handleCopyBundle}
              type="button"
              className="px-5 py-2.5 bg-white text-[#1a1b22] hover:bg-[#eeedf7] rounded-full text-xs font-bold transition-colors flex items-center gap-1.5 border border-[#eeedf7] shadow-xs cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">copy_all</span>
              <span>{copiedBundle ? 'Copied to Clipboard!' : 'Copy Debug Bundle'}</span>
            </button>
            <button
              onClick={() => onNavigate('loading-states')}
              type="button"
              className="px-5 py-2.5 bg-black text-white rounded-full text-xs font-bold flex items-center gap-1.5 hover:bg-neutral-800 transition-colors shadow-xs cursor-pointer"
            >
              <span>Live Node Map</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
