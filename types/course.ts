export type CEFRLevel = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';

export interface ScheduledLanguage {
  code: string;
  name: string;
  nativeName: string;
  script: string;
  speakersCount: string;
  family: 'Indo-Aryan' | 'Dravidian' | 'Tibeto-Burman' | 'Austroasiatic';
  isOfficialScheduleVIII: boolean;
  cefrModulesAvailable: number;
}

export interface LessonUnit {
  id: string;
  title: string;
  nativeTitle: string;
  type: 'vocabulary' | 'grammar' | 'dialogue' | 'phonetics' | 'quiz';
  xpReward: number;
  durationMinutes: number;
  content: {
    instructions?: string;
    vocabularyList?: Array<{
      term: string;
      scriptTerm: string;
      ipa: string;
      translation: string;
      audioSample?: string;
    }>;
    dialogueScript?: Array<{
      speaker: string;
      text: string;
      audioUrl?: string;
    }>;
    quizQuestions?: Array<{
      id: string;
      prompt: string;
      options: string[];
      correctIndex: number;
      explanation: string;
    }>;
  };
}

export interface CourseLevel {
  id: string;
  levelCode: CEFRLevel;
  title: string;
  description: string;
  units: LessonUnit[];
  isLocked: boolean;
  progressPercent: number;
}
