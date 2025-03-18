import  OpenAI  from 'openai';

const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY

if (!apiKey) {
    throw Error("OPENAI_API_KEY is not set")
}

const openai = new OpenAI({
    apiKey, dangerouslyAllowBrowser: true
  });

export default openai
