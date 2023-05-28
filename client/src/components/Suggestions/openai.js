import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://api.openai.com/v1',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer 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', // Replace with your OpenAI API key
  },
});

export const callOpenAPI = async (data) => {
  try {
    const response = await instance.post('/engines/davinci-codex/completions', {
      prompt: data.prompt,
      max_tokens: data.maxTokens,
      temperature: data.temperature,
      top_p: data.topP,
      n: data.n,
    });
    return response.data.choices[0].text;
  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    throw error;
  }
};
export default callOpenAPI
