const MISTRAL_API_KEY = "qFqxprIZqHQuheMJZCRmIYSQ4Pj2uEnn"; // Get from Mistral platform
const MISTRAL_ENDPOINT = "https://api.mistral.ai/v1/chat/completions";

export async function generateRapLyrics(mood: string, keywords: string = ""): Promise<string> {
  try {
    // Sanitize inputs
    mood = mood.trim().slice(0, 50);
    keywords = keywords.trim().slice(0, 100);

    // Create system prompt for better control
    const systemPrompt = `You are a professional rap lyricist. Generate a 4-8 line rap verse that:
    - Focuses on ${mood}
    ${keywords ? `- Includes these elements: ${keywords}` : ''}
    - Uses AABB or ABAB rhyme schemes
    - Maintains consistent rhythm
    - Incorporates modern slang when appropriate`;

    // API call to Mistral
    const response = await fetch(MISTRAL_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${MISTRAL_API_KEY}`
      },
      body: JSON.stringify({
        model: "mistral-8x7b-instruct", // Use appropriate model
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: "Drop a fire verse right now" }
        ],
        temperature: 0.7,
        max_tokens: 250,
        top_p: 0.95,
        frequency_penalty: 0.2 // Similar to repetition_penalty
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Mistral API Error: ${errorData.message}`);
    }

    const data = await response.json();
    const generatedText = data.choices[0]?.message?.content || '';
    return cleanGeneratedText(generatedText);
  } catch (error) {
    console.error('Error generating lyrics:', error);
    return generateFallbackLyrics(mood, keywords);
  }
}

// Updated cleaning function for Mistral's output
function cleanGeneratedText(text: string): string {
  let cleaned = text
    .replace(/```.*```/gs, '') // Remove code blocks
    .replace(/\*\*/g, '') // Remove bold markers
    .replace(/\([^)]*\)/g, '') // Remove parentheses content
    .replace(/\[.*?\]/g, '') // Remove brackets content
    .split('\n')
    .map(line => line.trim())
    .filter(line => line.length > 0)
    .join('\n');

  // Enforce line limits
  const lines = cleaned.split('\n');
  if (lines.length > 8) {
    cleaned = lines.slice(0, 8).join('\n');
  }

  return cleaned;
}

// Fallback function if the model fails to load or takes too long
export function generateFallbackLyrics(mood: string, keywords: string = ""): string {
  const fallbacks: { [key: string]: string[] } = {
    heartbreak: [
      "Heart shattered like glass on the floor,\nTears falling, can't cry no more,\nTried to hold on, but you walked out that door,\nNow I'm picking up pieces, trying to restore.",
      "Midnight thoughts with nobody to call,\nRemember when you said you'd catch me if I fall?\nNow I'm free falling through memories and pain,\nLeftover love washing away in the rain."
    ],
    celebration: [
      "Popping bottles, raising up my glass,\nFrom nothing to something, how the time has passed,\nShining bright like diamonds in the sky,\nThis moment's ours, let's make it fly.",
      "Victory lap, confetti in the air,\nClimbed to the top, now we're standing there,\nThrough the struggle, we persevered,\nCelebrate the journey, everything we've pioneered."
    ],
    hustle: [
      "Grinding daily, no time to rest,\nPutting my skills to the ultimate test,\nEyes on the prize, won't settle for less,\nHustle hard, outwork the best.",
      "Alarm clock rings, I'm already awake,\nDreaming with open eyes, got moves to make,\nNo shortcuts to success, just paving my way,\nWatch me turn these dreams to reality today."
    ],
    diss: [
      "You claim you're real, but your actions are fake,\nTalking big game, but you've got no stake,\nI'm dropping truth bombs, while you just shake,\nMove aside now, for goodness sake.",
      "Your flow's weak like watered-down juice,\nTrying to compete but what's really the use?\nCan't keep up with my lyrical abuse,\nTime to tighten that mic, I think it's loose."
    ],
    reflective: [
      "Looking back at the roads I've walked,\nThe silent prayers, the times I've talked,\nTo my younger self, saying it'll be okay,\nThe storms pass, and there comes a brighter day.",
      "Watching city lights from my window view,\nThinking 'bout all the things I've been through,\nScars tell stories of how I grew,\nShaping my path with a different hue."
    ]
  };

  // Use a default mood if the provided one isn't in our fallbacks
  const moodKey = Object.keys(fallbacks).includes(mood) ? mood : 'reflective';
  
  // Select a random verse from the mood category
  const verses = fallbacks[moodKey];
  const randomIndex = Math.floor(Math.random() * verses.length);
  
  // Add keywords mention if provided
  if (keywords && keywords.trim()) {
    const keywordsList = keywords.split(',').map(k => k.trim());
    if (keywordsList.length > 0) {
      // Add a line mentioning one or two keywords
      const sample = keywordsList.slice(0, Math.min(2, keywordsList.length));
      const extraLine = `With ${sample.join(' and ')} on my mind, I keep it real,\nThis is how I truly feel.`;
      return verses[randomIndex] + '\n' + extraLine;
    }
  }
  
  return verses[randomIndex];
}
