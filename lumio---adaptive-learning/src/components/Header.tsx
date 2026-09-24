import React from 'react';
import { ScreenId } from '../types';

interface HeaderProps {
  onNavigate: (screen: ScreenId) => void;
  activeScreen?: ScreenId;
}

export const Header: React.FC<HeaderProps> = ({ onNavigate, activeScreen = 'landing' }) => {
  return (
    <header className="sticky top-0 left-0 right-0 w-full z-40 bg-[#fbf8ff]/85 backdrop-blur-xl border-b border-[#eeedf7] shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
      <div className="h-16 md:h-20 max-w-[1340px] mx-auto px-4 md:px-12 flex items-center justify-between">
        {/* Brand */}
        <button
          onClick={() => onNavigate('landing')}
          className="flex items-center gap-2.5 group cursor-pointer text-left"
        >
          <div className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-black flex items-center justify-center text-white transition-transform group-hover:scale-105 shadow-sm">
            <span className="material-symbols-outlined text-[18px] md:text-[20px] text-[#65fade]">
              auto_awesome
            </span>
          </div>
          <span className="font-extrabold text-xl md:text-2xl tracking-tight text-[#1a1b22]">
            Lumio
          </span>
          <div className="hidden sm:flex items-center gap-1 bg-[#eeedf7] px-2 py-0.5 rounded-full ml-1 text-[11px] font-semibold text-[#aa3600]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ff5e1a] animate-pulse"></span>
            <span>Adaptive</span>
          </div>
        </button>

        {/* Navigation links */}
        <nav className="hidden md:flex items-center gap-1.5 lg:gap-2">
          <button
            onClick={() => onNavigate('landing')}
            className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all cursor-pointer ${
              activeScreen === 'landing'
                ? 'bg-[#e8e7f1] text-[#1a1b22]'
                : 'text-[#444748] hover:text-[#1a1b22] hover:bg-[#eeedf7]'
            }`}
          >
            Product
          </button>
          <button
            onClick={() => onNavigate('onboarding-1')}
            className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all cursor-pointer ${
              activeScreen === 'onboarding-1' || activeScreen === 'onboarding-2'
                ? 'bg-[#e8e7f1] text-[#1a1b22]'
                : 'text-[#444748] hover:text-[#1a1b22] hover:bg-[#eeedf7]'
            }`}
          >
            Onboarding Flow
          </button>
          <button
            onClick={() => onNavigate('loading-states')}
            className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all cursor-pointer ${
              activeScreen === 'loading-states'
                ? 'bg-[#e8e7f1] text-[#1a1b22]'
                : 'text-[#444748] hover:text-[#1a1b22] hover:bg-[#eeedf7]'
            }`}
          >
            AI Engine
          </button>
          <button
            onClick={() => onNavigate('settings')}
            className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all cursor-pointer ${
              activeScreen === 'settings'
                ? 'bg-[#e8e7f1] text-[#1a1b22]'
                : 'text-[#444748] hover:text-[#1a1b22] hover:bg-[#eeedf7]'
            }`}
          >
            Settings
          </button>
          <button
            onClick={() => onNavigate('empty-states')}
            className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all cursor-pointer ${
              activeScreen === 'empty-states'
                ? 'bg-[#e8e7f1] text-[#1a1b22]'
                : 'text-[#444748] hover:text-[#1a1b22] hover:bg-[#eeedf7]'
            }`}
          >
            Templates
          </button>
        </nav>

        {/* Right Action buttons */}
        <div className="flex items-center gap-2 md:gap-3">
          <button
            onClick={() => onNavigate('login')}
            className="hidden sm:inline-block text-sm font-semibold text-[#444748] hover:text-[#1a1b22] px-3 py-1.5 transition-colors cursor-pointer"
          >
            Log in
          </button>
          <button
            onClick={() => onNavigate('register')}
            className="bg-black text-white text-xs md:text-sm font-bold rounded-full px-4 md:px-5 py-2 md:py-2.5 hover:bg-neutral-800 transition-all transform hover:scale-[1.02] shadow-sm cursor-pointer"
          >
            Start learning
          </button>
          <button
            onClick={() => onNavigate('settings')}
            className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center hover:scale-105 transition-transform cursor-pointer"
            title="Account & Settings"
          >
            <span className="material-symbols-outlined text-[18px]">person</span>
          </button>
        </div>
      </div>
    </header>
  );
};
