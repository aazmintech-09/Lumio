import React from 'react';
import { ScreenId } from '../types';

interface FooterProps {
  onNavigate?: (screen: ScreenId) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="w-full bg-[#eeedf7]/60 border-t border-[#e3e1ec] mt-16 py-8 md:py-12">
      <div className="max-w-[1340px] mx-auto px-4 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-full bg-black flex items-center justify-center text-white">
            <span className="material-symbols-outlined text-[16px] text-[#65fade]">auto_awesome</span>
          </div>
          <span className="font-bold text-base tracking-tight text-[#1a1b22]">Lumio</span>
          <span className="text-xs text-[#444748] ml-2">
            © 2026 Lumio Adaptive Learning Inc. All rights reserved.
          </span>
        </div>

        <nav className="flex flex-wrap items-center gap-6 text-xs font-semibold text-[#444748]">
          <button
            onClick={() => onNavigate && onNavigate('error-states')}
            className="hover:text-black transition-colors cursor-pointer"
          >
            System Resilience
          </button>
          <button
            onClick={() => onNavigate && onNavigate('loading-states')}
            className="hover:text-black transition-colors cursor-pointer"
          >
            Engine Diagnostics
          </button>
          <button
            onClick={() => onNavigate && onNavigate('milestone-states')}
            className="hover:text-black transition-colors cursor-pointer"
          >
            Milestone Matrix
          </button>
          <button
            onClick={() => onNavigate && onNavigate('empty-states')}
            className="hover:text-black transition-colors cursor-pointer"
          >
            State Catalog
          </button>
          <button
            onClick={() => onNavigate && onNavigate('settings')}
            className="hover:text-black transition-colors cursor-pointer"
          >
            Settings
          </button>
        </nav>
      </div>
    </footer>
  );
};
