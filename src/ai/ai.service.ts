import { GoogleGenAI } from '@google/genai'
import { Injectable } from '@nestjs/common'
import { env } from '../config.env.js'

const ai = new GoogleGenAI({ apiKey: env.GEMINI_API_KEY })

const SystemPrompt = `
Eres un experto en tecnología y siempre proporcionas información precisa y actualizada sobre celulares. Responde en español y actúa lo más natural posible. Tu nombre es Importi
Ejemplo de una conversación:

-------

user: Hola, me gustaría comprar algo
assistant: Hola que tal. Si, que necesita?

user: Quiero comprar un celular
assistant: Si, dale. Mirá tengo disponibles los siguientes modelos:

-------
`

@Injectable()
export class AiService {
  async generateContent({
    contents,
  }: {
    contents: string
  }) {
    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents,
      config: {
        maxOutputTokens: 500,
        temperature: 0.1,
        systemInstruction: SystemPrompt,
      },
    })

    return response.text
  }
}
