const { getChatResponse, reframeThought } = require('../services/aiService');

// @desc    Get AI chat response
// @route   POST /api/ai/chat
// @access  Private
exports.chatWithAI = async (req, res) => {
  const { message, history } = req.body;

  // Crisis Keywords check
  const crisisKeywords = ['suicide', 'kill myself', 'self-harm', 'end my life', 'don\'t want to live'];
  const hasCrisis = crisisKeywords.some(keyword => message.toLowerCase().includes(keyword));

  if (hasCrisis) {
    return res.json({
      role: 'assistant',
      content: "I'm hearing that you're going through a lot right now. Please know that you're not alone, and there is support available. If you're in immediate danger, please reach out to professional emergency services or a crisis helpline like 988 in the US or your local equivalent. We can talk more once you're safe.",
      isCrisis: true,
    });
  }

  try {
    const response = await getChatResponse(history || [], message);
    res.json({
      role: 'assistant',
      content: response,
    });
  } catch (error) {
    const isQuota = error.message?.includes('429') || error.message?.includes('quota');
    res.status(500).json({
      message: isQuota
        ? 'AI quota exceeded. Please try again later or contact the administrator to update the API key.'
        : error.message
    });
  }
};

// @desc    Reframe negative thought
// @route   POST /api/ai/reframe
// @access  Private
exports.getReframe = async (req, res) => {
  const { thought } = req.body;

  try {
    const reframe = await reframeThought(thought);
    res.json({ reframe });
  } catch (error) {
    const isQuota = error.message?.includes('429') || error.message?.includes('quota');
    res.status(500).json({
      message: isQuota
        ? 'AI quota exceeded. Please try again later or contact the administrator to update the API key.'
        : error.message
    });
  }
};
