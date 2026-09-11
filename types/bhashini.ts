export type SambhasiniServiceType = 'asr' | 'tts' | 'translation' | 'ocr' | 'cadence';

export interface SambhasiniPipelineConfig {
  pipelineInferenceAPIEndPoint: {
    inferenceApiKey: {
      name: string;
      value: string;
    };
    callbackUrl: string;
  };
  pipelineResponseConfig: Array<{
    taskType: SambhasiniServiceType;
    config: Array<{
      serviceId: string;
      modelId: string;
      language: {
        sourceLanguage: string;
        targetLanguage?: string;
      };
    }>;
  }>;
}

export interface PhoneticAnalysisResult {
  transcript: string;
  targetScript: string;
  confidence: number;
  wordBreakdown: Array<{
    word: string;
    score: number; // 0 - 100
    phonemeCadence: 'perfect' | 'acceptable' | 'retroflex_flag' | 'aspirated_flag';
    suggestedIpa: string;
  }>;
  overallScore: number;
  fluencyScore: number;
  feedback: string;
}

export interface VoiceCallSession {
  sessionId: string;
  status: 'idle' | 'calling' | 'connected' | 'ended';
  durationSeconds: number;
  callerNumber?: string;
  targetLanguage: string;
  level: string;
  liveTranscription: Array<{
    speaker: 'agent' | 'user';
    text: string;
    timestamp: string;
  }>;
}
