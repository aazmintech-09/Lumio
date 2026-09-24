export type ScreenId =
  | 'landing'
  | 'onboarding-1'
  | 'onboarding-2'
  | 'register'
  | 'login'
  | 'loading-states'
  | 'error-states'
  | 'milestone-states'
  | 'settings'
  | 'empty-states'
  | 'mobile-demo';

export type MobileTab = 'dashboard' | 'pathways' | 'materials' | 'diagnostics' | 'settings';

export interface UserCalibrationState {
  academicStage: string;
  selectedSubjects: string[];
  examTarget: string;
  selectedFrictions: string[];
  pace: 'bite' | 'steady' | 'intensive';
  modalities: string[];
}
