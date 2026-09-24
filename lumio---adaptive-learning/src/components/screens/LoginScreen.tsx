import React, { useState } from 'react';
import { ScreenId } from '../../types';

interface LoginScreenProps {
  onNavigate: (screen: ScreenId) => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onNavigate }) => {
  const [email, setEmail] = useState('alex@lumiodesign.com');
  const [password, setPassword] = useState('••••••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setTimeout(() => {
      setIsLoggingIn(false);
      onNavigate('landing');
    }, 900);
  };

  return (
    <div className="w-full min-h-screen bg-[#fbf8ff] flex flex-col justify-center items-center px-4 md:px-12 py-12 md:py-20">
      <div className="w-full max-w-[1240px] mx-auto flex flex-col items-center justify-center">
        {/* Top Brand Mark & Title */}
        <div className="flex flex-col items-center mb-8 text-center relative z-10">
          <div
            onClick={() => onNavigate('landing')}
            className="w-12 h-12 rounded-full bg-black flex items-center justify-center text-white shadow-md mb-4 transition-transform hover:scale-105 cursor-pointer"
          >
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
              <circle cx="7" cy="7" r="4"></circle>
              <circle cx="17" cy="7" r="4"></circle>
              <circle cx="12" cy="17" r="5"></circle>
            </svg>
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#eeedf7] text-[#444748] text-xs font-semibold uppercase tracking-wider mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ff5e1a] animate-pulse"></span>
            Adaptive Creative Workspace
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#1a1b22] tracking-tight">
            Welcome back to Lumio
          </h1>
          <p className="text-xs md:text-sm text-[#444748] mt-1.5 max-w-sm">
            Pick up right where your personalized journey left off.
          </p>
        </div>

        {/* Main Authentication Modal Card */}
        <div className="w-full max-w-[460px] bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-[#eeedf7] relative z-10">
          <form className="flex flex-col gap-4" onSubmit={handleLogin}>
            {/* Email Input Field */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-[#1a1b22]" htmlFor="login-email">
                Email address
              </label>
              <div className="relative flex items-center">
                <span className="material-symbols-outlined absolute left-3.5 text-[#747878] text-lg pointer-events-none select-none">
                  mail
                </span>
                <input
                  id="login-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="alex@lumiodesign.com"
                  className="w-full pl-10 pr-4 py-3 bg-[#f4f2fd] rounded-xl text-[#1a1b22] placeholder:text-[#747878] text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-black border border-[#e3e1ec] transition-all"
                />
              </div>
            </div>

            {/* Password Input Field */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-[#1a1b22]" htmlFor="login-password">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => alert('Password reset link sent to demo account.')}
                  className="text-xs text-[#444748] hover:text-[#aa3600] font-semibold transition-colors cursor-pointer"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative flex items-center">
                <span className="material-symbols-outlined absolute left-3.5 text-[#747878] text-lg pointer-events-none select-none">
                  lock
                </span>
                <input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-11 py-3 bg-[#f4f2fd] rounded-xl text-[#1a1b22] placeholder:text-[#747878] text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-black border border-[#e3e1ec] transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label="Toggle password visibility"
                  className="absolute right-3.5 text-[#747878] hover:text-black transition-colors flex items-center justify-center p-1 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-lg">
                    {showPassword ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>
            </div>

            {/* Remember Me Checkbox & Version Pill */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2.5 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="w-4 h-4 rounded accent-black cursor-pointer"
                />
                <span className="text-xs text-[#444748]">Remember this device</span>
              </label>
              <span className="text-[11px] text-[#005045] bg-[#e6fbf7] px-2.5 py-0.5 rounded-full flex items-center gap-1 font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-[#009580]"></span>
                v2.4
              </span>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full mt-2 py-3.5 px-6 rounded-full bg-black text-white font-bold text-sm hover:bg-neutral-800 transition-all shadow-md hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>{isLoggingIn ? 'Authenticating...' : 'Log in to Lumio'}</span>
              <span className="material-symbols-outlined text-base">arrow_forward</span>
            </button>
          </form>

          {/* Minimal Divider */}
          <div className="relative flex items-center justify-center my-6">
            <div className="w-full h-px bg-[#e8e7f1]"></div>
            <span className="absolute bg-white px-3 text-[11px] uppercase tracking-widest text-[#747878] font-bold">
              or
            </span>
          </div>

          {/* Social Authentication */}
          <div className="flex flex-col gap-2.5">
            <button
              type="button"
              onClick={() => onNavigate('landing')}
              className="w-full py-3 px-5 rounded-full bg-white hover:bg-[#f4f2fd] text-[#1a1b22] font-semibold text-xs sm:text-sm transition-all shadow-sm flex items-center justify-center gap-3 border border-[#eeedf7] cursor-pointer"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z" fill="#4285F4"></path>
                <path d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.27 21.41 7.35 24 12 24z" fill="#34A853"></path>
                <path d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 10.03 0 12s.45 3.82 1.25 5.42l4.03-3.15z" fill="#FBBC05"></path>
                <path d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.35 0 3.27 2.59 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z" fill="#EA4335"></path>
              </svg>
              <span>Continue with Google</span>
            </button>
            <button
              type="button"
              onClick={() => onNavigate('landing')}
              className="w-full py-3 px-5 rounded-full bg-white hover:bg-[#f4f2fd] text-[#1a1b22] font-semibold text-xs sm:text-sm transition-all shadow-sm flex items-center justify-center gap-3 border border-[#eeedf7] cursor-pointer"
            >
              <svg className="w-4 h-4 fill-current text-black" viewBox="0 0 24 24">
                <path clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" fillRule="evenodd"></path>
              </svg>
              <span>Continue with GitHub</span>
            </button>
          </div>

          {/* Footer Registration Prompt */}
          <div className="mt-6 pt-4 text-center bg-[#f4f2fd] rounded-xl p-3 border border-[#e3e1ec]">
            <p className="text-xs text-[#444748]">
              Don't have an account?{' '}
              <button
                onClick={() => onNavigate('register')}
                className="font-bold text-[#1a1b22] hover:text-[#aa3600] underline underline-offset-4 ml-1 cursor-pointer"
              >
                Create account
              </button>
            </p>
          </div>

          {/* Trust & Encryption Badge */}
          <div className="mt-4 flex items-center justify-center gap-1.5 text-xs text-[#747878]">
            <span className="material-symbols-outlined text-sm text-[#009580]">verified_user</span>
            <span>End-to-end 256-bit encrypted authentication</span>
          </div>
        </div>

        {/* Active Teams & Trusted Network Proof Strip */}
        <div className="mt-8 w-full max-w-[620px] flex flex-col items-center gap-3">
          <span className="text-[11px] uppercase tracking-wider text-[#747878] font-bold text-center">
            Trusted by product builders and innovators worldwide
          </span>
          <div className="flex items-center justify-center gap-6 opacity-60 flex-wrap">
            <div className="flex items-center gap-1 font-bold text-base tracking-tighter text-[#1a1b22]">
              <span className="w-2.5 h-2.5 bg-black rounded-full inline-block"></span> NEXUS
            </div>
            <div className="flex items-center gap-1 font-bold text-base tracking-tight text-[#1a1b22]">
              ARC<span className="text-[#aa3600] font-light">SYSTEMS</span>
            </div>
            <div className="flex items-center gap-1 font-bold text-base tracking-widest text-[#1a1b22]">
              FLOW·LAB
            </div>
            <div className="flex items-center gap-1 font-bold text-base text-[#1a1b22]">
              VERV<span className="text-xs -mt-2">™</span>
            </div>
          </div>
        </div>

        {/* Quick Switch Workspace Capsule */}
        <div
          onClick={() => alert('Enterprise SSO directory connector is active.')}
          className="mt-6 flex items-center gap-3 px-4 py-2 bg-[#eeedf7] rounded-full shadow-sm text-xs text-[#444748] hover:text-[#1a1b22] transition-all cursor-pointer"
        >
          <div className="w-5 h-5 rounded-full bg-[#aa3600] flex items-center justify-center text-white font-bold text-[10px]">
            S
          </div>
          <span>Looking for <strong>Studio Enterprise SSO</strong>?</span>
          <span className="material-symbols-outlined text-sm">arrow_forward</span>
        </div>
      </div>
    </div>
  );
};
