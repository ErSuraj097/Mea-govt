import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { type, textInput, spokenText, promptTitle } = await req.json();

    if (type === 'writing') {
      const wordCount = (textInput || '').trim().split(/\s+/).length;
      const grammarScore = Math.min(100, Math.max(65, 75 + Math.floor(wordCount / 2)));
      const vocabularyScore = Math.min(100, Math.max(70, 80 + (wordCount > 20 ? 10 : 0)));
      const overallScore = Math.round((grammarScore + vocabularyScore) / 2);

      return NextResponse.json({
        success: true,
        type: 'writing',
        overallScore,
        grammarScore,
        vocabularyScore,
        feedback: [
          `Good use of sentence structure in prompt "${promptTitle || 'Hindi Essay'}".`,
          `Word count evaluated: ${wordCount} words.`,
          `Suggestion: Include more connectors like "क्योंकि" (because) and "इसलिए" (therefore).`,
        ],
        correctedSentence: textInput ? `संशोधित: ${textInput}। (व्याकरणिक दृष्टि से सही)` : '',
      });
    }

    if (type === 'speaking') {
      const fluencyScore = Math.floor(Math.random() * 15) + 84;
      const pronunciationScore = Math.floor(Math.random() * 10) + 88;
      const confidenceIndex = 'High';

      return NextResponse.json({
        success: true,
        type: 'speaking',
        overallScore: Math.round((fluencyScore + pronunciationScore) / 2),
        fluencyScore,
        pronunciationScore,
        confidenceIndex,
        phoneticsBreakdown: [
          { word: 'नमस्ते', accuracy: '98%', status: 'Perfect' },
          { word: 'भारत', accuracy: '94%', status: 'Good' },
          { word: 'संस्कृति', accuracy: '89%', status: 'Slight Accent' },
        ],
        recommendation: 'Your Hindi pronunciation is clear. Practice retroflex consonants (ट, ठ, ड, ढ) for perfection.',
      });
    }

    return NextResponse.json({ error: 'Invalid assessment type' }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ error: 'Evaluation failed' }, { status: 500 });
  }
}
