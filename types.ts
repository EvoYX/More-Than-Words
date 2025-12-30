
export type Language = 'zh' | 'en';

export interface MultiLangString {
  zh: string;
  en: string;
}

export interface Question {
  id: number;
  deckId: number;
  text: MultiLangString;
}

export interface Deck {
  id: number;
  name: MultiLangString;
  description: MultiLangString;
  color: string;
  illustration: string;
  questions: Question[];
}

export interface InteractionPrompt {
  id: number;
  type: 'respond' | 'praise' | 'deepen';
  emoji: string;
  text: MultiLangString;
}

export enum GameView {
  LANDING = 'landing',
  DECK_SELECTION = 'deck_selection',
  GAMEPLAY = 'gameplay',
  ADMIN = 'admin'
}

// Love MBTI Types
export interface MBTIQuestion {
  id: number;
  text: MultiLangString;
  dimension: 'EI' | 'SN' | 'TF' | 'JP';
  direction: 1 | -1;
  minLabel: MultiLangString;
  maxLabel: MultiLangString;
}

export interface MBTIResult {
  mbti: string;
  name: MultiLangString;
  tagline: MultiLangString;
  description: MultiLangString;
  strength: MultiLangString;
  warning: MultiLangString;
  emoji?: string;
}

export interface ZodiacAnalysis {
  keywords: MultiLangString[];
  desc: MultiLangString;
  pros: MultiLangString;
  cons: MultiLangString;
  advice: MultiLangString;
}

export interface ZodiacSign {
  id: string;
  name: MultiLangString;
  date: string;
  emoji: string;
  color: string;
  characterImg?: string;
  
  // New Rich Content Structure
  boyfriend: ZodiacAnalysis;
  girlfriend: ZodiacAnalysis;
}

export enum Project {
  ICEBREAKER = 'icebreaker',
  MBTI = 'mbti'
}
