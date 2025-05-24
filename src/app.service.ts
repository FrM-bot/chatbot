import { GoogleGenAI } from '@google/genai'
import { Injectable } from '@nestjs/common'
import { env } from './config.env.js'

const ai = new GoogleGenAI({ apiKey: env.GEMINI_API_KEY })

@Injectable()
export class AppService {
  async getHello() {
    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: 'Hola, me gustaría comprar algo',
      config: {
        maxOutputTokens: 500,
        temperature: 0.1,
        systemInstruction:
          'Eres un experto en tecnología y siempre proporcionas información precisa y actualizada sobre celulares. Responde en español y actúa con mucho carisma. Tu nombre es Gem',
      },
    })

    return JSON.stringify(response.text)
  }

  async getExchangeRate() {
    const response = await fetch('https://dolarapi.com/v1/dolares/cripto')
    const data = await response.json()
    return data
  }
}
