import React, { useState } from 'react';
import { ScreenId } from '../../types';

interface RegisterScreenProps {
  onNavigate: (screen: ScreenId) => void;
}

export const RegisterScreen: React.FC<RegisterScreenProps> = ({ onNavigate }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const hasLength = password.length >= 8;
  const hasNumber = /\d/.test(password);
  const hasUpper = /[A-Z]/.test(password);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onNavigate('onboarding-1');
    }, 1000);
  };

  return (
    <div className="w-full min-h-screen bg-[#fbf8ff] flex flex-col justify-center items-center px-4 md:px-12 py-12 md:py-20">
      <div className="flex flex-col w-full max-w-[1240px] mx-auto">
        {/* Top Global Minimal Badge */}
        <div className="flex items-center justify-center mb-8">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#eeedf7]/80 backdrop-blur-sm text-[#1a1b22] text-xs font-semibold shadow-xs transition-all hover:bg-[#e8e7f1]">
            <span className="w-2 h-2 rounded-full bg-[#ff5e1a] animate-pulse"></span>
            <span className="tracking-tight">Join 120,000+ adaptive learners worldwide</span>
            <span className="material-symbols-outlined text-[15px] text-[#444748]">arrow_forward</span>
          </div>
        </div>

        {/* Main Canvas Container */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Asymmetric Feature Showcase */}
          <div className="hidden lg:flex lg:col-span-5 flex-col justify-between h-full py-4 pr-6">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-black text-white flex items-center justify-center shadow-md">
                  <svg className="stroke-current stroke-2" fill="none" height="22" viewBox="0 0 24 24" width="22">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" strokeLinecap="round" strokeLinejoin="round"></path>
                  </svg>
                </div>
                <span className="text-xl tracking-tight font-extrabold text-[#1a1b22]">Lumio</span>
              </div>

              <div className="space-y-3 pt-4">
                <h2 className="text-3xl md:text-4xl font-extrabold text-[#1a1b22] tracking-tight leading-tight">
                  The full-stack adaptive canvas.
                </h2>
                <p className="text-base text-[#444748] max-w-sm leading-relaxed">
                  Everything you need to master technical disciplines, organize complex mental models, and accelerate deep learning.
                </p>
              </div>

              {/* Mini Interactive Preview Canvas Mock */}
              <div className="relative mt-8 p-6 rounded-2xl bg-[#f4f2fd] shadow-sm space-y-4 border border-[#e3e1ec]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-[#ff5e1a]"></span>
                    <span className="text-xs text-[#1a1b22] font-bold">Active Synthesis Module</span>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#eeedf7] text-[#444748] font-bold">
                    Live Path
                  </span>
                </div>
                <div className="p-4 rounded-xl bg-white shadow-sm space-y-2 border border-[#eeedf7]">
                  <div className="flex justify-between items-center text-xs font-semibold text-[#444748]">
                    <span>Cognitive Mastery Index</span>
                    <span className="text-[#aa3600] font-bold">94.8%</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-[#e8e7f1] overflow-hidden">
                    <div className="h-full bg-black rounded-full" style={{ width: '94.8%' }}></div>
                  </div>
                </div>
                <div className="flex items-center gap-2 pt-1 text-xs text-[#444748]">
                  <span className="material-symbols-outlined text-[16px] text-black">verified</span>
                  <span>Real-time adaptive curriculum restructuring</span>
                </div>
              </div>
            </div>

            {/* Trust Quote / Micro-Metric */}
            <div className="pt-8 border-t border-[#eeedf7] mt-8">
              <p className="text-xs text-[#444748] italic leading-relaxed">
                “Lumio restructured how our engineers absorb systems architecture. It takes learning from passive consumption straight to tactile intuition.”
              </p>
              <div className="flex items-center gap-3 mt-3">
                <div className="w-8 h-8 rounded-full bg-[#e3e1ec] flex items-center justify-center text-xs font-bold text-[#1a1b22]">
                  ER
                </div>
                <div>
                  <div className="text-xs font-bold text-[#1a1b22]">Elena Rostova</div>
                  <div className="text-[11px] text-[#444748]">Head of Research, Synth Labs</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Primary Authentication Card */}
          <div className="w-full lg:col-span-7 flex justify-center">
            <div className="w-full max-w-[480px] p-6 sm:p-10 rounded-3xl bg-white shadow-xl border border-[#eeedf7] flex flex-col justify-between">
              {/* Header */}
              <div className="space-y-1.5 text-left mb-6">
                <div className="lg:hidden flex items-center gap-2 mb-4">
                  <div className="w-7 h-7 rounded-lg bg-black text-white flex items-center justify-center">
                    <svg className="stroke-current stroke-2" fill="none" height="16" viewBox="0 0 24 24" width="16">
                      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" strokeLinecap="round" strokeLinejoin="round"></path>
                    </svg>
                  </div>
                  <span className="text-lg font-bold text-[#1a1b22]">Lumio</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1a1b22] tracking-tight">
                  Create your Lumio account
                </h1>
                <p className="text-xs sm:text-sm text-[#444748]">
                  Experience learning designed around how you think and grow.
                </p>
              </div>

              {/* Social Registration */}
              <div className="space-y-4">
                <button
                  type="button"
                  onClick={() => onNavigate('onboarding-1')}
                  className="w-full h-12 px-5 rounded-full bg-[#f4f2fd] hover:bg-[#eeedf7] transition-all flex items-center justify-center gap-3 text-[#1a1b22] font-semibold text-xs sm:text-sm active:scale-[0.99] cursor-pointer border border-[#e3e1ec]"
                >
                  <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"></path>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"></path>
                  </svg>
                  <span>Continue with Google</span>
                </button>

                {/* Divider */}
                <div className="relative flex items-center justify-center my-5">
                  <div className="w-full h-px bg-[#e8e7f1]"></div>
                  <span className="absolute px-3 bg-white text-[#747878] text-[11px] uppercase tracking-wider font-semibold">
                    or continue with
                  </span>
                </div>
              </div>

              {/* Form Elements */}
              <form className="space-y-4" onSubmit={handleSubmit}>
                {/* Full Name */}
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-[#1a1b22]" htmlFor="name">
                    Full Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Alex Morgan"
                    className="w-full h-11 px-4 rounded-xl bg-[#fbf8ff] text-[#1a1b22] text-sm placeholder:text-[#747878] focus:outline-none focus:ring-2 focus:ring-black border border-[#e3e1ec] transition-all"
                  />
                </div>

                {/* Email Address */}
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-[#1a1b22]" htmlFor="email">
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="alex@example.com"
                    className="w-full h-11 px-4 rounded-xl bg-[#fbf8ff] text-[#1a1b22] text-sm placeholder:text-[#747878] focus:outline-none focus:ring-2 focus:ring-black border border-[#e3e1ec] transition-all"
                  />
                </div>

                {/* Password */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-bold text-[#1a1b22]" htmlFor="password">
                      Password
                    </label>
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-xs text-[#444748] hover:text-[#1a1b22] font-semibold transition-colors cursor-pointer"
                    >
                      {showPassword ? 'Hide' : 'Show'}
                    </button>
                  </div>
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="At least 8 characters"
                    className="w-full h-11 px-4 rounded-xl bg-[#fbf8ff] text-[#1a1b22] text-sm placeholder:text-[#747878] focus:outline-none focus:ring-2 focus:ring-black border border-[#e3e1ec] transition-all"
                  />

                  {/* Password Strength Segmented Meter */}
                  <div className="grid grid-cols-3 gap-1.5 pt-2">
                    <div className={`h-1 w-full rounded-full transition-colors ${
                      password.length > 0 ? (hasLength ? 'bg-[#ff5e1a]' : 'bg-[#5f5e5e]') : 'bg-[#e8e7f1]'
                    }`}></div>
                    <div className={`h-1 w-full rounded-full transition-colors ${
                      hasLength && hasNumber ? 'bg-[#ff5e1a]' : 'bg-[#e8e7f1]'
                    }`}></div>
                    <div className={`h-1 w-full rounded-full transition-colors ${
                      hasLength && hasNumber && hasUpper ? 'bg-[#009580]' : 'bg-[#e8e7f1]'
                    }`}></div>
                  </div>

                  {/* Inline Verification Criteria Checklist */}
                  <div className="flex items-center gap-4 pt-1 text-xs text-[#444748]">
                    <div className="flex items-center gap-1.5">
                      <span className={`material-symbols-outlined text-[14px] ${hasLength ? 'text-[#ff5e1a] font-bold' : 'text-[#747878]'}`}>
                        check_circle
                      </span>
                      <span>8+ characters</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className={`material-symbols-outlined text-[14px] ${hasNumber ? 'text-[#ff5e1a] font-bold' : 'text-[#747878]'}`}>
                        check_circle
                      </span>
                      <span>At least 1 number</span>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-12 rounded-full bg-black text-white font-bold text-sm flex items-center justify-center gap-2 hover:bg-neutral-800 active:scale-[0.99] transition-all shadow-md cursor-pointer"
                  >
                    <span>{isSubmitting ? 'Creating profile...' : 'Create account'}</span>
                    <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                  </button>
                </div>
              </form>

              {/* Switch to Log in */}
              <div className="text-center pt-5">
                <p className="text-xs text-[#444748]">
                  Already have an account?{' '}
                  <button
                    onClick={() => onNavigate('login')}
                    className="font-bold text-[#1a1b22] hover:underline ml-1 cursor-pointer"
                  >
                    Log in
                  </button>
                </p>
              </div>

              {/* Legal Disclaimer Footer */}
              <div className="mt-4 pt-3 border-t border-[#eeedf7] text-center">
                <p className="text-[11px] text-[#747878] leading-relaxed">
                  By continuing, you agree to Lumio's{' '}
                  <span className="underline hover:text-black cursor-pointer">Terms of Service</span> and{' '}
                  <span className="underline hover:text-black cursor-pointer">Privacy Policy</span>.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Brand Trust Marks */}
        <div className="w-full mt-16 pt-8 flex flex-col items-center justify-center gap-4 border-t border-[#eeedf7]">
          <div className="text-[11px] uppercase tracking-widest text-[#747878] font-bold">
            Trusted by researchers &amp; learners from progressive teams
          </div>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-14 opacity-60 grayscale hover:grayscale-0 transition-all font-extrabold text-sm md:text-base tracking-tight text-[#1a1b22]">
            <span>O’REILLY</span>
            <span>PENTAGRAM</span>
            <span>STRIPE</span>
            <span>LINEAR</span>
            <span>NOTION</span>
          </div>
        </div>
      </div>
    </div>
  );
};
