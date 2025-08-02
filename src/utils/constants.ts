/**
 * Application constants
 */

// Routes
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  SIGNUP: '/signup',
  DASHBOARD: '/dashboard',
  CHOOSE_PLAN: '/choose-plan',
  LEARN: '/laer',
  ADMIN_KIDS: '/admin-kids',
  CONGRATULATIONS: '/congratulations',
  CONTACT: '/kontakt',
  ABOUT: '/om-os',
  SUBJECTS: '/fag',
  PRICING: '/priser',
  PRIVACY: '/privatlivspolitik',
  TERMS: '/servicevilkaar'
} as const;

// UI Constants
export const NAVBAR_HEIGHT = {
  MOBILE: 'h-12',
  DESKTOP: 'h-14'
} as const;

export const AVATAR_COLORS = [
  'bg-purple-500',
  'bg-blue-500', 
  'bg-green-500',
  'bg-yellow-500',
  'bg-pink-500',
  'bg-indigo-500',
  'bg-red-500',
  'bg-teal-500'
] as const;

// Learning Constants
export const POINTS_PER_LESSON = 10;
export const MIN_QUIZ_SCORE = 0;
export const MAX_QUIZ_SCORE = 100;

// Storage Keys
export const STORAGE_KEYS = {
  LEARNING_PROGRESS: 'learning_progress',
  LANGUAGE_PREFERENCE: 'language_preference'
} as const;

// Default Values
export const DEFAULT_CHILD_NAME = 'default';
export const DEFAULT_AVATAR_COLOR = 'bg-purple-500';

// App Metadata
export const APP_NAME = 'Dugsi';
export const APP_DESCRIPTION = 'Dansk Somaliske Læring - En sjov og interaktiv måde for børn at lære somalisk sprog gennem dansk.';