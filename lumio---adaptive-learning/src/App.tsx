import React, { useState } from 'react';
import { ScreenId } from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ScreenSwitcher } from './components/ScreenSwitcher';
import { LandingScreen } from './components/screens/LandingScreen';
import { OnboardingGoalsScreen } from './components/screens/OnboardingGoalsScreen';
import { OnboardingCalibrationScreen } from './components/screens/OnboardingCalibrationScreen';
import { RegisterScreen } from './components/screens/RegisterScreen';
import { LoginScreen } from './components/screens/LoginScreen';
import { LoadingSynthesisScreen } from './components/screens/LoadingSynthesisScreen';
import { ErrorResilienceScreen } from './components/screens/ErrorResilienceScreen';
import { MilestoneTransitionsScreen } from './components/screens/MilestoneTransitionsScreen';
import { SettingsScreen } from './components/screens/SettingsScreen';
import { EmptyStatesScreen } from './components/screens/EmptyStatesScreen';
import { MobileDemoScreen } from './components/screens/MobileDemoScreen';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('landing');
  const [isMobileFrame, setIsMobileFrame] = useState(false);

  // Render the selected screen
  const renderScreen = () => {
    switch (currentScreen) {
      case 'landing':
        return <LandingScreen onNavigate={setCurrentScreen} />;
      case 'onboarding-1':
        return <OnboardingGoalsScreen onNavigate={setCurrentScreen} />;
      case 'onboarding-2':
        return <OnboardingCalibrationScreen onNavigate={setCurrentScreen} />;
      case 'register':
        return <RegisterScreen onNavigate={setCurrentScreen} />;
      case 'login':
        return <LoginScreen onNavigate={setCurrentScreen} />;
      case 'loading-states':
        return <LoadingSynthesisScreen onNavigate={setCurrentScreen} />;
      case 'error-states':
        return <ErrorResilienceScreen onNavigate={setCurrentScreen} />;
      case 'milestone-states':
        return <MilestoneTransitionsScreen onNavigate={setCurrentScreen} />;
      case 'settings':
        return <SettingsScreen onNavigate={setCurrentScreen} />;
      case 'empty-states':
        return <EmptyStatesScreen onNavigate={setCurrentScreen} />;
      case 'mobile-demo':
        return <MobileDemoScreen onNavigate={setCurrentScreen} />;
      default:
        return <LandingScreen onNavigate={setCurrentScreen} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-surface text-on-surface font-sans selection:bg-primary/20 selection:text-primary">
      {/* Top Application Header */}
      <Header onNavigate={setCurrentScreen} activeScreen={currentScreen} />

      {/* Screen Switcher Floating Bar for quick evaluation of all screens */}
      <ScreenSwitcher
        currentScreen={currentScreen}
        onSelectScreen={setCurrentScreen}
        isMobileFrame={isMobileFrame}
        onToggleMobileFrame={() => setIsMobileFrame(!isMobileFrame)}
      />

      {/* Main Content Workspace with Optional Mobile Device Wrapper */}
      <main className="flex-1 w-full">
        {isMobileFrame && currentScreen !== 'mobile-demo' ? (
          <div className="py-8 px-4 flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] bg-neutral-900/10 dark:bg-neutral-950/40">
            <div className="mb-4 text-xs font-mono text-on-surface-variant flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>Viewport Simulation Mode (390 x 844 px)</span>
              <button
                onClick={() => setIsMobileFrame(false)}
                className="underline hover:text-primary ml-2"
              >
                Exit frame
              </button>
            </div>
            <div className="w-[390px] h-[844px] rounded-[48px] p-3.5 bg-neutral-900 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5)] ring-4 ring-neutral-800 overflow-hidden flex flex-col relative">
              <div className="w-full h-full rounded-[36px] overflow-y-auto bg-surface text-on-surface relative scrollbar-none">
                {renderScreen()}
              </div>
            </div>
          </div>
        ) : (
          renderScreen()
        )}
      </main>

      {/* Footer */}
      <Footer onNavigate={setCurrentScreen} />
    </div>
  );
}
