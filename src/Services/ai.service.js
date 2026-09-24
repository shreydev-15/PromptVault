const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const models = [
        "gemini-3.5-flash",
        "gemini-3.6-flash",
        "gemini-3.1-flash-lite",
        "gemini-3.5-flash-lite",
        "gemini-3-flash-preview",
    ];

async function generateTags(title, content) {
  for (const model of models) {
    try {
      const interaction = await ai.interactions.create({
        model,
        input: `
          Generate exactly 5 relevant tags for this prompt.

          Title: ${title}
          Content: ${content}

          Return only the tags separated by commas.
          Do not add explanations.
        `,
      });

      const rawText = interaction.output_text || '';
      const tags = rawText
        .split(',')
        .map((tag) => tag.trim())
        .filter(Boolean);

      console.log(model, tags);

      if (tags.length > 0) {
        return tags;
      }
    } catch (error) {
      console.log(`${model} failed:`, error.message);
    }
  }

  return [];
}

module.exports = generateTags