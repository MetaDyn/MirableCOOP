
export interface User {
  id: string;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  terms_accepted: boolean;
  privacy1_accepted: boolean;
  privacy2_accepted: boolean;
  privacy3_accepted: boolean;
  loyalty_card?: string;
  avatar_id?: string;
  tokens: number; // Mocked field as it wasn't in the JSON but required for UI
  city?: string;
  zip_code?: string;
}

export enum AppScreen {
  LOADING = 'LOADING',
  WELCOME = 'WELCOME',
  AVATAR_SELECTION = 'AVATAR_SELECTION',
  HOME = 'HOME',
  
  // Game Flows
  GAME_LOADING = 'GAME_LOADING',
  GAME_MAP = 'GAME_MAP',
  SETTINGS = 'SETTINGS',
  
  GAME_LEVEL = 'GAME_LEVEL', // Individual city level
  PRIZES = 'PRIZES',
  PROFILE = 'PROFILE',
}

export interface Avatar {
  id: string;
  name: string;
  description: string;
  image: string;
}

export interface GameSettings {
  music: boolean;
  sounds: boolean;
  vibration: boolean;
}

export type NavigationItem = 'HOME' | 'PRIZES' | 'GAME' | 'APP_GAME' | 'MENU';