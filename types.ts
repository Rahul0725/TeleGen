export enum Tone {
  URGENT = 'Urgent',
  HYPE = 'Hype',
  TRUST = 'Trust',
  PROFESSIONAL = 'Professional',
  CASUAL = 'Casual',
  EDUCATIONAL = 'Educational'
}

export enum Language {
  ENGLISH = 'English',
  HINDI = 'Hindi',
  HINGLISH = 'Hinglish'
}

export interface PostParams {
  topic: string;
  tone: Tone;
  language: Language;
  cta: string;
}

export interface GenerationResult {
  content: string;
  error?: string;
}