import React from 'react';
import { ScreenId } from '../types';

interface ScreenSwitcherProps {
  currentScreen: ScreenId;
  onSelectScreen: (screen: ScreenId) => void;
  isMobileFrame: boolean;
  onToggleMobileFrame: () => void;
}

export const ScreenSwitcher: React.FC<ScreenSwitcherProps> = ({
  currentScreen,
  onSelectScreen,
  isMobileFrame,
  onToggleMobileFrame,
}) => {
  const screens: { id: ScreenId; label: string; badge?: string; icon: string }[] = [
    { id: 'landing', label: 'Landing Page', icon: 'auto_awesome' },
    { id: 'onboarding-1', label: 'Step 1: Goals', badge: '1/4', icon: 'flag' },
    { id: 'onboarding-2', label: 'Step 2: Calibration', badge: '2/4', icon: 'tune' },
    { id: 'register', label: 'Create Account', icon: 'person_add' },
    { id: 'login', label: 'Sign In', icon: 'login' },
    { id: 'loading-states', label: 'Cognitive Loading', badge: 'AI Live', icon: 'neurology' },
    { id: 'error-states', label: 'Resilience & Errors', icon: 'shield' },
    { id: 'milestone-states', label: 'Milestones & Mastery', icon: 'workspace_premium' },
    { id: 'settings', label: 'System Settings', icon: 'settings' },
    { id: 'empty-states', label: 'Empty States', icon: 'grid_view' },
    { id: 'mobile-demo', label: 'Mobile App View', badge: 'App', icon: 'smartphone' },
  ];

  return (
    <div className="sticky top-0 z-50 bg-[#1c1b1b] text-white border-b border-white/10 shadow-lg px-3 py-2">
      <div className="max-w-[1400px] mx-auto flex items-center justify-between gap-2 overflow-x-auto no-scrollbar text-xs">
        <div className="flex items-center gap-2 shrink-0 pr-2 border-r border-white/15">
          <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-black font-extrabold text-[11px]">
            L
          </div>
          <span className="font-bold tracking-tight text-white hidden sm:inline">Lumio Prototype</span>
        </div>

        {/* Screen Links Bar */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
          {screens.map((s) => {
            const isActive = currentScreen === s.id;
            return (
              <button
                key={s.id}
                onClick={() => onSelectScreen(s.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full whitespace-nowrap transition-all font-medium text-[11px] cursor-pointer ${
                  isActive
                    ? 'bg-white text-black font-bold shadow-sm'
                    : 'text-zinc-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <span className="material-symbols-outlined text-[14px]">{s.icon}</span>
                <span>{s.label}</span>
                {s.badge && (
                  <span
                    className={`text-[9px] px-1.5 py-0.2 rounded-full font-bold uppercase tracking-wider ${
                      isActive ? 'bg-[#ff5e1a] text-white' : 'bg-white/15 text-zinc-300'
                    }`}
                  >
                    {s.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Mobile Viewport Toggle */}
        <div className="shrink-0 flex items-center gap-2 pl-2 border-l border-white/15">
          <button
            onClick={onToggleMobileFrame}
            className={`flex items-center gap-1 px-2.5 py-1.2 rounded-full transition-all text-[11px] font-semibold cursor-pointer ${
              isMobileFrame
                ? 'bg-[#ff5e1a] text-white'
                : 'bg-white/10 text-zinc-300 hover:bg-white/20 hover:text-white'
            }`}
            title="Toggle simulated mobile device viewport"
          >
            <span className="material-symbols-outlined text-[14px]">
              {isMobileFrame ? 'desktop_windows' : 'smartphone'}
            </span>
            <span className="hidden md:inline">{isMobileFrame ? 'Full Width' : 'Mobile Frame'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
