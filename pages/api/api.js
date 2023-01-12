import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  const { gender, age, symptoms } = req.body;
  const completion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: generatePrompt( gender, age, symptoms ),
    temperature: 0.7,
    max_tokens: 3648,
  });
  res.status(200).json({ result: completion.data.choices[0].text });
}
function generatePrompt(gender, age, symptoms) {
  return `suggest 5 sicknesses, its causes and solutions a ${age} years old ${gender} experiencing ${symptoms} may be having.`;
}