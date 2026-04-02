const OpenAI = require('openai');
const { GoogleGenerativeAI } = require('@google/generative-ai');

// ── Clients ────────────────────────────────────────────────────────────────

const kieClient = new OpenAI({
  baseURL: process.env.KIE_AI_BASE_URL,
  apiKey:  process.env.KIE_AI_API_KEY,
});

const deepseekClient = new OpenAI({
  baseURL: process.env.DEEPSEEK_BASE_URL,
  apiKey:  process.env.DEEPSEEK_API_KEY,
});

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// ── System prompt ──────────────────────────────────────────────────────────

const SERENE_SYSTEM_PROMPT =
  'You are a compassionate, empathetic mental health AI companion named Serene. ' +
  'Your goal is to provide emotional support, listen actively, and suggest grounding techniques. ' +
  'You are NOT a doctor and should NOT give medical diagnoses or prescriptions. ' +
  'If a user expresses self-harm or crisis, encourage them to seek professional help and provide a ' +
  'generic message about help being available. Keep responses concise and calming.';

// ── Core completion with 3-tier fallback ───────────────────────────────────
// Tier 1: Kie.ai  →  Tier 2: DeepSeek  →  Tier 3: Gemini (native SDK, guaranteed)

const complete = async (messages, maxTokens = 500) => {
  // Tier 1 — Kie.ai
  try {
    const res = await kieClient.chat.completions.create({
      model:      process.env.KIE_AI_CHAT_MODEL,
      messages,
      max_tokens: maxTokens,
    });
    console.log('[AI] responded via Kie.ai');
    return res.choices[0].message.content.trim();
  } catch (err) {
    console.warn('[AI] Kie.ai failed:', err.message);
  }

  // Tier 2 — DeepSeek
  try {
    const res = await deepseekClient.chat.completions.create({
      model:      process.env.DEEPSEEK_MODEL,
      messages,
      max_tokens: maxTokens,
    });
    console.log('[AI] responded via DeepSeek');
    return res.choices[0].message.content.trim();
  } catch (err) {
    console.warn('[AI] DeepSeek failed:', err.message);
  }

  // Tier 3 — Gemini (native SDK, always available on free tier)
  console.log('[AI] falling back to Gemini');
  const systemMsg = messages.find(m => m.role === 'system');
  const userMessages = messages.filter(m => m.role !== 'system');

  const geminiModel = genAI.getGenerativeModel({
    model: process.env.GEMINI_MODEL || 'gemini-2.0-flash',
    ...(systemMsg ? { systemInstruction: systemMsg.content } : {}),
  });

  // Build Gemini history (all messages except the last user message)
  const lastUserMsg = userMessages[userMessages.length - 1];
  const history = userMessages.slice(0, -1).map(m => ({
    role:  m.role === 'user' ? 'user' : 'model',
    parts: [{ text: m.content }],
  }));

  const chat = geminiModel.startChat({ history, generationConfig: { maxOutputTokens: maxTokens } });
  const result = await chat.sendMessage(lastUserMsg.content);
  console.log('[AI] responded via Gemini');
  return result.response.text();
};

// ── Exported functions ─────────────────────────────────────────────────────

const getChatResponse = async (history, message) => {
  const messages = [
    { role: 'system', content: SERENE_SYSTEM_PROMPT },
    ...history.map(m => ({
      role:    m.role === 'user' ? 'user' : 'assistant',
      content: m.content,
    })),
    { role: 'user', content: message },
  ];
  return complete(messages, 500);
};

const reframeThought = async (thought) => {
  const messages = [
    {
      role: 'system',
      content:
        'You are a cognitive behavioral therapy assistant. Help users reframe negative thoughts ' +
        'into more balanced, constructive perspectives. Be supportive, brief, and practical.',
    },
    {
      role: 'user',
      content:
        `Help me reframe this negative thought into a more balanced, positive, or constructive one:\n\n"${thought}"\n\n` +
        'Provide the reframed thought and a brief supportive explanation.',
    },
  ];
  return complete(messages, 400);
};

const analyzeJournal = async (content) => {
  const messages = [
    {
      role: 'system',
      content:
        'You are a mental health analysis assistant. Analyze journal entries and respond ONLY in the exact format requested.',
    },
    {
      role: 'user',
      content:
        `Analyze this journal entry. Respond in exactly this format:\nSummary: [one sentence]\nEmotion: [one word]\n\nEntry: "${content}"`,
    },
  ];

  try {
    const text = await complete(messages, 100);
    const summaryMatch = text.match(/Summary:\s*(.*)/i);
    const emotionMatch = text.match(/Emotion:\s*(.*)/i);
    return {
      summary: summaryMatch ? summaryMatch[1].trim() : 'No summary available',
      emotion: emotionMatch ? emotionMatch[1].trim() : 'Neutral',
    };
  } catch (err) {
    console.error('[AI] Journal analysis failed on all providers:', err.message);
    return { summary: 'Analysis failed', emotion: 'Neutral' };
  }
};

module.exports = { getChatResponse, reframeThought, analyzeJournal };
