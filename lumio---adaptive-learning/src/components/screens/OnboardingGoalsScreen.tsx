import React, { useState } from 'react';
import { ScreenId } from '../../types';

interface OnboardingGoalsScreenProps {
  onNavigate: (screen: ScreenId) => void;
}

export const OnboardingGoalsScreen: React.FC<OnboardingGoalsScreenProps> = ({ onNavigate }) => {
  const [selectedGoals, setSelectedGoals] = useState<string[]>(['Master Technical Skills']);
  const [selectedPace, setSelectedPace] = useState<'bite' | 'steady' | 'intensive'>('steady');
  const [selectedModalities, setSelectedModalities] = useState<string[]>(['Interactive Sandboxes', 'Conversational AI Tutor']);

  const toggleGoal = (goal: string) => {
    if (selectedGoals.includes(goal)) {
      setSelectedGoals(selectedGoals.filter((g) => g !== goal));
    } else {
      setSelectedGoals([...selectedGoals, goal]);
    }
  };

  const toggleModality = (modality: string) => {
    if (selectedModalities.includes(modality)) {
      setSelectedModalities(selectedModalities.filter((m) => m !== modality));
    } else {
      setSelectedModalities([...selectedModalities, modality]);
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#fbf8ff] flex flex-col justify-center items-center px-4 md:px-12 py-10">
      <div className="flex flex-col w-full max-w-6xl mx-auto py-4">
        {/* Top Progress Stepper */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10 md:mb-14">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-black text-white font-bold text-sm">
              1
            </div>
            <div>
              <div className="text-xs font-bold text-[#aa3600] tracking-wider uppercase">Step 1 of 4</div>
              <div className="text-base md:text-lg font-bold text-[#1a1b22]">Your Learning Goals</div>
            </div>
          </div>

          {/* Stepper Track */}
          <div className="flex items-center gap-2">
            <div className="h-1.5 w-12 rounded-full bg-black transition-all"></div>
            <div className="h-1.5 w-6 rounded-full bg-[#e8e7f1] transition-all"></div>
            <div className="h-1.5 w-6 rounded-full bg-[#e8e7f1] transition-all"></div>
            <div className="h-1.5 w-6 rounded-full bg-[#e8e7f1] transition-all"></div>
            <span className="text-xs font-bold text-[#444748] ml-2">25%</span>
          </div>
        </div>

        {/* Hero Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-12 md:mb-16">
          <div className="lg:col-span-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ffdbcf] text-[#822800] text-xs font-bold mb-4">
              <span className="w-2 h-2 rounded-full bg-[#ff5e1a] animate-pulse"></span>
              <span>Lumio Adaptive Setup</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#1a1b22] tracking-tight leading-tight mb-4">
              Let’s make<br className="hidden sm:inline" /> learning yours.
            </h1>
            <p className="text-base md:text-lg text-[#444748] max-w-xl leading-relaxed">
              Tell Lumio a little about what you want to learn so we can build an adaptive, real-time experience tailored around your mind and rhythm.
            </p>
          </div>

          {/* Live Synthesis Card */}
          <div className="lg:col-span-4 flex flex-col justify-end">
            <div className="p-5 md:p-6 rounded-2xl bg-white shadow-sm border border-[#eeedf7] flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[#444748]">Session Context</span>
                <span className="material-symbols-outlined text-[#aa3600] text-xl">auto_awesome</span>
              </div>
              <div className="h-1.5 w-full bg-[#eeedf7] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#ff5e1a] transition-all duration-500 rounded-full"
                  style={{ width: `${Math.min(100, Math.max(25, selectedGoals.length * 28 + (selectedPace === 'intensive' ? 25 : 15)))}%` }}
                ></div>
              </div>
              <p className="text-xs text-[#444748] leading-relaxed">
                {selectedGoals.length > 0
                  ? `Targeting ${selectedGoals.length} domain${selectedGoals.length > 1 ? 's' : ''} at ${
                      selectedPace === 'bite' ? '10m/day' : selectedPace === 'steady' ? '25m/day' : '45m/day'
                    }. Lumio model tuned and ready.`
                  : 'Select primary interests and preferred cadence to preview your model.'}
              </p>
            </div>
          </div>
        </div>

        {/* Configuration Canvas */}
        <div className="flex flex-col gap-12 md:gap-16">
          {/* Section 1: Focus Areas */}
          <section className="flex flex-col gap-6">
            <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-1">
              <div>
                <span className="text-xs font-bold text-[#aa3600] uppercase tracking-widest">Focus Areas</span>
                <h2 className="text-2xl md:text-3xl font-extrabold text-[#1a1b22] tracking-tight mt-1">What brings you here today?</h2>
              </div>
              <span className="text-xs text-[#444748]">Select all that apply</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { title: 'Master Technical Skills', desc: 'Coding, LLM architecture, systems engineering & data.', icon: 'terminal' },
                { title: 'Pass Certifications', desc: 'Targeted prep for AWS, CFA, GRE, or specialized licensure.', icon: 'verified' },
                { title: 'Fluency & Language', desc: 'Active recall dialogue, native idioms, and cognitive immersion.', icon: 'translate' },
                { title: 'Deep Curiosities', desc: 'Philosophy, behavioral economics, history, and pure science.', icon: 'psychology' },
              ].map((goal) => {
                const isSelected = selectedGoals.includes(goal.title);
                return (
                  <button
                    key={goal.title}
                    type="button"
                    onClick={() => toggleGoal(goal.title)}
                    className={`text-left p-6 rounded-2xl transition-all duration-200 flex flex-col justify-between h-56 cursor-pointer border ${
                      isSelected
                        ? 'bg-[#e5e2e1] border-black shadow-md'
                        : 'bg-white border-[#eeedf7] hover:border-[#c4c7c7] shadow-sm hover:shadow-md'
                    }`}
                  >
                    <div className="flex items-start justify-between w-full">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                        isSelected ? 'bg-black text-white' : 'bg-[#eeedf7] text-[#1a1b22]'
                      }`}>
                        <span className="material-symbols-outlined text-[22px]">{goal.icon}</span>
                      </div>
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors ${
                        isSelected ? 'bg-black text-white' : 'bg-[#e8e7f1]'
                      }`}>
                        <span className={`material-symbols-outlined text-[14px] ${isSelected ? 'opacity-100' : 'opacity-0'}`}>
                          check
                        </span>
                      </div>
                    </div>
                    <div>
                      <div className="font-bold text-base text-[#1a1b22] mb-1">{goal.title}</div>
                      <div className="text-xs text-[#444748] leading-relaxed">{goal.desc}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </section>

          {/* Section 2: Preferred Pace */}
          <section className="flex flex-col gap-6">
            <div>
              <span className="text-xs font-bold text-[#aa3600] uppercase tracking-widest">Commitment Cadence</span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-[#1a1b22] tracking-tight mt-1">Select your daily learning rhythm</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Pace 1 */}
              <div
                onClick={() => setSelectedPace('bite')}
                className={`cursor-pointer p-7 rounded-2xl transition-all duration-200 flex flex-col justify-between border ${
                  selectedPace === 'bite'
                    ? 'bg-white border-2 border-black shadow-md'
                    : 'bg-white border-[#eeedf7] hover:border-[#c4c7c7] shadow-sm'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="inline-flex px-3 py-1 rounded-full bg-[#eeedf7] text-xs font-semibold text-[#1a1b22]">
                      10 mins/day
                    </span>
                    <span className="material-symbols-outlined text-[#444748]">timer</span>
                  </div>
                  <h3 className="text-xl font-bold text-[#1a1b22] mb-1">Bite-sized</h3>
                  <p className="text-xs text-[#444748] leading-relaxed mb-6">
                    Designed for hyper-busy schedules. One breakthrough concept and practical checkpoint every day.
                  </p>
                </div>
                <div className="flex items-center gap-1.5 h-3">
                  <span className="h-2 w-full rounded-full bg-black"></span>
                  <span className="h-2 w-full rounded-full bg-[#eeedf7]"></span>
                  <span className="h-2 w-full rounded-full bg-[#eeedf7]"></span>
                </div>
              </div>

              {/* Pace 2 (Steady) */}
              <div
                onClick={() => setSelectedPace('steady')}
                className={`cursor-pointer p-7 rounded-2xl transition-all duration-200 flex flex-col justify-between relative overflow-hidden border ${
                  selectedPace === 'steady'
                    ? 'bg-white border-2 border-[#ff5e1a] shadow-lg'
                    : 'bg-white border-[#eeedf7] hover:border-[#c4c7c7] shadow-sm'
                }`}
              >
                <div className="absolute top-0 right-0 w-20 h-20 bg-[#ffdbcf]/50 rounded-bl-full pointer-events-none"></div>
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="inline-flex px-3 py-1 rounded-full bg-[#ffdbcf] text-[#822800] text-xs font-bold">
                      25 mins/day
                    </span>
                    <span className="material-symbols-outlined text-[#aa3600]">trending_up</span>
                  </div>
                  <h3 className="text-xl font-bold text-[#1a1b22] mb-1">Steady Progress</h3>
                  <p className="text-xs text-[#444748] leading-relaxed mb-6">
                    The optimal cognitive retention threshold. Deep explanations combined with interactive drills.
                  </p>
                </div>
                <div className="flex items-center gap-1.5 h-3">
                  <span className="h-2 w-full rounded-full bg-black"></span>
                  <span className="h-2 w-full rounded-full bg-black"></span>
                  <span className="h-2 w-full rounded-full bg-[#eeedf7]"></span>
                </div>
              </div>

              {/* Pace 3 (Intensive) */}
              <div
                onClick={() => setSelectedPace('intensive')}
                className={`cursor-pointer p-7 rounded-2xl transition-all duration-200 flex flex-col justify-between border ${
                  selectedPace === 'intensive'
                    ? 'bg-white border-2 border-black shadow-md'
                    : 'bg-white border-[#eeedf7] hover:border-[#c4c7c7] shadow-sm'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="inline-flex px-3 py-1 rounded-full bg-[#eeedf7] text-xs font-semibold text-[#1a1b22]">
                      45+ mins/day
                    </span>
                    <span className="material-symbols-outlined text-[#444748]">bolt</span>
                  </div>
                  <h3 className="text-xl font-bold text-[#1a1b22] mb-1">Intensive Immersion</h3>
                  <p className="text-xs text-[#444748] leading-relaxed mb-6">
                    Accelerated mastery for career shifts and urgent deadlines. End-to-end sandbox project execution.
                  </p>
                </div>
                <div className="flex items-center gap-1.5 h-3">
                  <span className="h-2 w-full rounded-full bg-black"></span>
                  <span className="h-2 w-full rounded-full bg-black"></span>
                  <span className="h-2 w-full rounded-full bg-black"></span>
                </div>
              </div>
            </div>
          </section>

          {/* Section 3: Modalities */}
          <section className="flex flex-col gap-6">
            <div>
              <span className="text-xs font-bold text-[#aa3600] uppercase tracking-widest">Modalities</span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-[#1a1b22] tracking-tight mt-1">How your brain digests best</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  id: 'Interactive Sandboxes',
                  badge: 'Visual & Node-Based',
                  icon: 'account_tree',
                  desc: 'Visual schematics, drag-and-drop systems, and canvas manipulations that clarify complex architectures.',
                  img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD7wXbEpQpCIIh7jRHK1Wv-hWRhGP2cY0gn816-Mh8kJL5fjQxaUG7NuDmdf79CF3y0p-zTlxVdUm1PxQOeuBUbfmyTeEyZoYeofXPEl2WRNjz2Sqtqls53XlHVNCxXglSj6FibSk6Uo-H8m7spZ62hKCXI5owFcZ6RZNI_KkkKgvzINQKPpkRBkS-NQvAM24g0V3glLXBH-9Yu4JOyDVn3z5uFwAtGjbxmanyBYOs-XdILIUN6NL1V',
                },
                {
                  id: 'Conversational AI Tutor',
                  badge: 'Socratic Dialogue',
                  icon: 'forum',
                  desc: 'Inquisitive back-and-forth guidance that challenges your assertions and reveals hidden knowledge gaps.',
                  img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC7s6l8iNo33NcfLQHLqOBOI2_PkvDeUABNFQc1UiJuCSlcHgFwZoJa_uXd2mBy71vfP6BPkxXFGmy3KjHx6FuVhA98wjDC80Heh278TraW8fxlnQFvmFW26LXRO4bAm3bimouis8HGmPqUTTqR7QgC32v5OWkXMJguX1h375nGSPsNz7NzzdWV-Tj0M6c8e7vmZ6NhiyWdqmHH66ySIG7eeSMp5Weu0U59NRc868KLnZpLfL_AqfCO',
                },
                {
                  id: 'Problem Sets & Drills',
                  badge: 'Build to Learn',
                  icon: 'code_blocks',
                  desc: 'High-frequency practical verification. Build small artifacts and debug broken systems from day one.',
                  img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDWR7UAEdyJJj42LRViWhr8Axt8202xUx6UpEoMSB4EDoiCnOOp5TvU2VOZuLYpczxXv8R_RO56P80ObuY-SUuOAf2jWNbv54qdy00DCkiKtiBrMzLYK0pKYXvIxtdye-oeV3SjTpRVgpcixCfQn4l4358WSXmHjxIOxCI5grwDHqkT1QaH_NlPjM-7JvhN9-43i2etehiPR1FZ5EH3OSrVyVOie3YkDHEVm4ordesOVaf53t3iYQHk',
                },
              ].map((mod) => {
                const isSelected = selectedModalities.includes(mod.id);
                return (
                  <div
                    key={mod.id}
                    onClick={() => toggleModality(mod.id)}
                    className={`cursor-pointer flex flex-col justify-between p-6 rounded-2xl bg-white shadow-sm border transition-all ${
                      isSelected ? 'border-2 border-black ring-1 ring-black/10' : 'border-[#eeedf7] hover:border-[#c4c7c7]'
                    }`}
                  >
                    <div className="w-full h-44 rounded-xl overflow-hidden bg-[#f4f2fd] mb-5 relative flex items-center justify-center">
                      <img src={mod.img} alt={mod.id} className="w-full h-full object-cover" />
                      <div className="absolute bottom-3 left-3 px-3 py-1 rounded-full bg-black text-white text-xs font-semibold">
                        {mod.badge}
                      </div>
                      {isSelected && (
                        <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-black text-white flex items-center justify-center">
                          <span className="material-symbols-outlined text-[14px]">check</span>
                        </div>
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="material-symbols-outlined text-black text-[20px]">{mod.icon}</span>
                        <h4 className="text-base font-bold text-[#1a1b22]">{mod.id}</h4>
                      </div>
                      <p className="text-xs text-[#444748] leading-relaxed">{mod.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </div>

        {/* Bottom Action Bar */}
        <div className="mt-16 pt-6 border-t border-[#eeedf7] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-[#444748]">
            <span className="material-symbols-outlined text-[18px]">lock</span>
            <span>Your curriculum updates dynamically as you complete checkpoints.</span>
          </div>

          <div className="flex items-center gap-4 w-full sm:w-auto justify-end">
            <button
              onClick={() => onNavigate('onboarding-2')}
              className="text-xs font-semibold text-[#444748] hover:text-[#1a1b22] px-4 py-3 rounded-full hover:bg-[#eeedf7] transition-all cursor-pointer"
            >
              Skip for now
            </button>
            <button
              onClick={() => onNavigate('onboarding-2')}
              className="group flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-black text-white font-bold text-xs md:text-sm shadow-md hover:bg-neutral-800 hover:scale-[1.01] transition-all cursor-pointer"
            >
              <span>Get started</span>
              <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">
                arrow_forward
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
