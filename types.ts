
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
  GAMEPLAY = 'gameplay'
}

export interface MBTIQuestion {
  id: number;
  dimension: 'EI' | 'SN' | 'TF' | 'JP';
  text: MultiLangString;
  minLabel: MultiLangString;
  maxLabel: MultiLangString;
  direction: number;
}

export interface MBTIResult {
  mbti: string;
  name: MultiLangString;
  emoji: string;
  tagline: MultiLangString;
  description: MultiLangString;
  strength: MultiLangString;
  warning: MultiLangString;
}

export interface ZodiacProfile {
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
  color: string;
  emoji: string;
  characterImg: string;
  boyfriend: ZodiacProfile;
  girlfriend: ZodiacProfile;
}
