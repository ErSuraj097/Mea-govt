import { NextResponse } from 'next/server';
import { Sambhasini } from '@/lib/SambhasiniService';

export async function POST(req: Request) {
  try {
    const { action, expectedText, spokenText, language = 'hi' } = await req.json();

    if (action === 'assess') {
      const assessment = await Sambhasini.assessSpokenAudio(expectedText || 'नमस्ते', spokenText || 'नमस्ते', language);
      return NextResponse.json({ success: true, assessment });
    }

    if (action === 'translate') {
      // Mock Sambhasini NMT (Neural Machine Translation)
      return NextResponse.json({
        success: true,
        sourceLanguage: 'en',
        targetLanguage: language,
        translatedText: expectedText ? `अनुवादित: ${expectedText}` : 'नमस्ते',
        engine: 'Sambhasini_ANUVADAK_V2',
      });
    }

    return NextResponse.json({ error: 'Unsupported action' }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ error: 'Sambhasini Pipeline Error', details: String(error) }, { status: 500 });
  }
}
