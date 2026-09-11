import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { message, history } = await req.json();

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    const inputLower = message.toLowerCase();

    // AI Hindi Chatbot Logic Engine Simulation
    let botHindiResponse = '';
    let englishExplanation = '';
    let grammarCorrection = '';

    if (inputLower.includes('नमस्ते') || inputLower.includes('hello') || inputLower.includes('hi')) {
      botHindiResponse = 'नमस्ते! मैं आपका हिंदी AI सहायक हूँ। आज आप क्या सीखना चाहते हैं?';
      englishExplanation = 'Greetings! I am your Hindi AI Assistant. What would you like to learn today?';
    } else if (inputLower.includes('मुझे बाजार जाना है') || inputLower.includes('baajar')) {
      botHindiResponse = 'उत्तम वाक्य! लेकिन अधिक स्वाभाविक रूप से आप कह सकते हैं: "मैं बाज़ार जा रहा हूँ।"';
      englishExplanation = 'Great sentence! More naturally in present continuous: "Main baajar jaa raha hoon."';
      grammarCorrection = 'Grammar Suggestion: Use "जा रहा हूँ" for ongoing action.';
    } else if (inputLower.includes('नाम') || inputLower.includes('name')) {
      botHindiResponse = 'मेरा नाम हिंदी LMS AI गुरु है। आपका क्या नाम है?';
      englishExplanation = 'My name is Hindi LMS AI Guru. What is your name?';
    } else if (inputLower.includes('पानी') || inputLower.includes('water')) {
      botHindiResponse = 'पानी को हिंदी में "जल" या "पानी" कहते हैं। उदाहरण: "मुझे पानी चाहिए।"';
      englishExplanation = 'Water is called "Paani" or "Jal" in Hindi. Example: "I need water."';
    } else {
      botHindiResponse = `बहुत अच्छा वाक्य: "${message}"। हिंदी में बातचीत जारी रखने के लिए धन्यवाद!`;
      englishExplanation = `Very nice Hindi sentence: "${message}". Thank you for practicing conversational Hindi with me!`;
      grammarCorrection = 'Structure looks good! Pronunciation clarity: 95%.';
    }

    return NextResponse.json({
      success: true,
      botHindiResponse,
      englishExplanation,
      grammarCorrection,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to process AI chat' }, { status: 500 });
  }
}
