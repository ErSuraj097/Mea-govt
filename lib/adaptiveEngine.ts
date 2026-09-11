import { SkillSplitScore, GoalTrackId } from './bidirectionalData';

export interface DiagnosticQuestion {
  id: string;
  skill: 'listening' | 'speaking' | 'reading' | 'writing';
  difficulty: 'A1' | 'A2' | 'B1' | 'B2';
  questionEng: string;
  questionHindi: string;
  transliteration?: string;
  audioPromptText?: string;
  options: {
    textEng: string;
    textHindi: string;
    isCorrect: boolean;
    concept: string; // e.g. 'ergative-ne', 'retroflex-phonetics', 'diplomatic-honorifics'
  }[];
  explanation: string;
}

export const DIAGNOSTIC_QUESTIONS: DiagnosticQuestion[] = [
  {
    id: 'diag_1',
    skill: 'reading',
    difficulty: 'A1',
    questionEng: 'Select the correct formal greeting used when addressing an Ambassador or High Commissioner:',
    questionHindi: 'राजदूत अथवा उच्चायुक्त को संबोधित करते समय प्रयुक्त उपयुक्त औपचारिक अभिवादन चुनें:',
    transliteration: 'Rajdoot athva uchhayukt ko sambodhit karte samay prayukta aupacharik abhivadan chunein:',
    options: [
      { textEng: 'Namaste Mahamahim (नमस्ते महामहिम)', textHindi: 'नमस्ते महामहिम', isCorrect: true, concept: 'diplomatic-honorifics' },
      { textEng: 'Hey dost (हे दोस्त)', textHindi: 'हे दोस्त', isCorrect: false, concept: 'informal-slang' },
      { textEng: 'Shubh Ratri (शुभ रात्रि)', textHindi: 'शुभ रात्रि', isCorrect: false, concept: 'time-greeting' },
      { textEng: 'Alvida (अलविदा)', textHindi: 'अलविदा', isCorrect: false, concept: 'farewell' },
    ],
    explanation: '"महामहिम" (Excellency) is the mandatory official honorific for Heads of Mission in Indian diplomatic protocol.',
  },
  {
    id: 'diag_2',
    skill: 'listening',
    difficulty: 'A1',
    questionEng: 'Listen/Read: "हम दोनों देशों के बीच द्विपक्षीय व्यापार बढ़ाने के लिए प्रतिबद्ध हैं।" What is the primary topic?',
    questionHindi: '"हम दोनों देशों के बीच द्विपक्षीय व्यापार बढ़ाने के लिए प्रतिबद्ध हैं।" का मुख्य विषय क्या है?',
    transliteration: 'Hum donon deshon ke beech dvipaksheeya vyapar badhane ke liye pratibaddh hain.',
    audioPromptText: 'हम दोनों देशों के बीच द्विपक्षीय व्यापार बढ़ाने के लिए प्रतिबद्ध हैं।',
    options: [
      { textEng: 'Enhancing bilateral trade between both nations', textHindi: 'द्विपक्षीय व्यापार संवर्धन', isCorrect: true, concept: 'trade-vocabulary' },
      { textEng: 'Booking tourist flight tickets', textHindi: 'पर्यटन टिकट बुकिंग', isCorrect: false, concept: 'travel-transit' },
      { textEng: 'Cancelling cultural festival events', textHindi: 'सांस्कृतिक कार्यक्रम रद्द करना', isCorrect: false, concept: 'event-management' },
      { textEng: 'Opening local grocery stores', textHindi: 'स्थानीय दुकान खोलना', isCorrect: false, concept: 'general-market' },
    ],
    explanation: '"द्विपक्षीय व्यापार" specifically translates to "Bilateral Trade" in official economic governance.',
  },
  {
    id: 'diag_3',
    skill: 'speaking',
    difficulty: 'A2',
    questionEng: 'Which Devanagari retroflex character distinguishes "ड" (Da as in Dakiya) from dental "द" (Da as in Desh)?',
    questionHindi: 'मूर्धन्य वर्ण "ड" और दंत्य वर्ण "द" का सही उच्चारण भेद पहचानें:',
    transliteration: 'Moordhanya varn Da aur dantya varn Da ka sahi uchharan bhed pehchanein:',
    options: [
      { textEng: 'Retroflex: Tongue curls back to hard palate (ड vs द)', textHindi: 'मूर्धन्य: जिह्वा का ऊपरी तालु को स्पर्श करना', isCorrect: true, concept: 'retroflex-phonetics' },
      { textEng: 'Both have identical acoustic nasal sounds', textHindi: 'दोनों की ध्वनि पूर्णतः समान है', isCorrect: false, concept: 'nasalization' },
      { textEng: 'Only used in vowels, not consonants', textHindi: 'यह केवल स्वरों में प्रयुक्त होता है', isCorrect: false, concept: 'vowel-class' },
      { textEng: 'Pronounced using the lips only (bilabial)', textHindi: 'केवल ओष्ठ से बोला जाता है', isCorrect: false, concept: 'labial-phonetics' },
    ],
    explanation: 'Devanagari retroflex series (ट, ठ, ड, ढ, ण) involves curling the tongue back to the hard palate.',
  },
  {
    id: 'diag_4',
    skill: 'writing',
    difficulty: 'B1',
    questionEng: 'Choose the grammatically correct transitive past tense sentence using the ergative case marker "ने" (ne):',
    questionHindi: 'सकर्मक भूतकाल में "ने" परसर्ग का व्याकरणिक रूप से सही प्रयोग चुनें:',
    transliteration: 'Sakarmak bhootkaal mein "ne" pasarg ka vyakaranik roop se sahi prayog chunein:',
    options: [
      { textEng: 'विदेश मंत्री ने संयुक्त वक्तव्य जारी किया। (Videsh Mantri ne sanyukt vaktavya jaari kiya)', textHindi: 'विदेश मंत्री ने संयुक्त वक्तव्य जारी किया।', isCorrect: true, concept: 'ergative-ne' },
      { textEng: 'विदेश मंत्री संयुक्त वक्तव्य जारी किया ने।', textHindi: 'विदेश मंत्री संयुक्त वक्तव्य जारी किया ने।', isCorrect: false, concept: 'ergative-ne' },
      { textEng: 'विदेश मंत्री ने संयुक्त वक्तव्य जा रही है।', textHindi: 'विदेश मंत्री ने संयुक्त वक्तव्य जा रही है।', isCorrect: false, concept: 'gender-agreement' },
      { textEng: 'विदेश मंत्री को संयुक्त वक्तव्य खाया।', textHindi: 'विदेश मंत्री को संयुक्त वक्तव्य खाया।', isCorrect: false, concept: 'semantic-syntax' },
    ],
    explanation: 'In Hindi transitive past tense, the subject takes "ने" (ne) and the verb agrees with the direct object "संयुक्त वक्तव्य" (masculine singular -> जारी किया).',
  },
  {
    id: 'diag_5',
    skill: 'reading',
    difficulty: 'B2',
    questionEng: 'Identify the exact Hindi terminology for "Mutual Legal Assistance Treaty (MLAT)":',
    questionHindi: '"Mutual Legal Assistance Treaty (MLAT)" का सटीक आधिकारिक पारिभाषिक शब्द पहचानें:',
    transliteration: 'Mutual Legal Assistance Treaty ka sateek aadhikarik paribhashik shabd pehchanein:',
    options: [
      { textEng: 'पारस्परिक विधिक सहायता संधि (Parasparik Vidhik Sahayata Sandhi)', textHindi: 'पारस्परिक विधिक सहायता संधि', isCorrect: true, concept: 'diplomatic-treaties' },
      { textEng: 'साधारण व्यापारिक सूचना पत्र', textHindi: 'साधारण व्यापारिक सूचना पत्र', isCorrect: false, concept: 'general-notice' },
      { textEng: 'निजी अदालत याचिका', textHindi: 'निजी अदालत याचिका', isCorrect: false, concept: 'civil-plea' },
      { textEng: 'विदेशी पासपोर्ट वीजा नियम', textHindi: 'विदेशी पासपोर्ट वीजा नियम', isCorrect: false, concept: 'visa-rules' },
    ],
    explanation: 'Official MEA and Ministry of Home Affairs glossaries standardize MLAT as "पारस्परिक विधिक सहायता संधि".',
  },
];

export interface DiagnosticResult {
  overallCEFR: 'A1' | 'A2' | 'B1' | 'B2';
  scorePercent: number;
  skillSplit: SkillSplitScore;
  weakAreas: string[];
  strongAreas: string[];
  recommendedGoalTrack: GoalTrackId;
  recommendedStartingLesson: string;
}

export function evaluateDiagnostic(
  answers: { questionId: string; selectedOptionIdx: number }[],
  preferredGoalTrack: GoalTrackId = 'diplomatic'
): DiagnosticResult {
  let listeningScore = 0;
  let speakingScore = 0;
  let readingScore = 0;
  let writingScore = 0;

  let listeningCount = 0;
  let speakingCount = 0;
  let readingCount = 0;
  let writingCount = 0;

  const weakAreas: string[] = [];
  const strongAreas: string[] = [];

  answers.forEach((ans) => {
    const q = DIAGNOSTIC_QUESTIONS.find((item) => item.id === ans.questionId);
    if (!q) return;

    const opt = q.options[ans.selectedOptionIdx];
    const isCorrect = opt?.isCorrect || false;

    if (q.skill === 'listening') {
      listeningCount++;
      if (isCorrect) listeningScore += 100;
      else weakAreas.push('Spoken Audio Comprehension & Intonation');
    } else if (q.skill === 'speaking') {
      speakingCount++;
      if (isCorrect) speakingScore += 100;
      else weakAreas.push('Retroflex Consonants & Phonetics (ट/ठ/ड/ढ vs त/थ/द/ध)');
    } else if (q.skill === 'reading') {
      readingCount++;
      if (isCorrect) readingScore += 100;
      else weakAreas.push('Formal Devanagari Protocol Vocabulary');
    } else if (q.skill === 'writing') {
      writingCount++;
      if (isCorrect) writingScore += 100;
      else weakAreas.push('Transitive Past Tense Ergative "ने" (ne) Rules');
    }

    if (isCorrect && opt?.concept) {
      strongAreas.push(opt.concept.replace('-', ' ').toUpperCase());
    }
  });

  const finalL = listeningCount > 0 ? Math.round(listeningScore / listeningCount) : 75;
  const finalS = speakingCount > 0 ? Math.round(speakingScore / speakingCount) : 70;
  const finalR = readingCount > 0 ? Math.round(readingScore / readingCount) : 80;
  const finalW = writingCount > 0 ? Math.round(writingScore / writingCount) : 65;

  const avgScore = Math.round((finalL + finalS + finalR + finalW) / 4);

  let cefr: 'A1' | 'A2' | 'B1' | 'B2' = 'A1';
  if (avgScore >= 85) cefr = 'B2';
  else if (avgScore >= 70) cefr = 'B1';
  else if (avgScore >= 50) cefr = 'A2';
  else cefr = 'A1';

  let startingLesson = 'lesson_dip_101';
  if (preferredGoalTrack === 'trade') startingLesson = 'lesson_trade_101';
  if (preferredGoalTrack === 'travel') startingLesson = 'lesson_travel_101';

  return {
    overallCEFR: cefr,
    scorePercent: avgScore,
    skillSplit: {
      listening: finalL,
      speaking: finalS,
      reading: finalR,
      writing: finalW,
      overallCEFR: cefr,
      lastAssessed: new Date().toISOString().split('T')[0],
    },
    weakAreas: Array.from(new Set(weakAreas)),
    strongAreas: Array.from(new Set(strongAreas)),
    recommendedGoalTrack: preferredGoalTrack,
    recommendedStartingLesson: startingLesson,
  };
}
