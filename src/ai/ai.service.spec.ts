import { Test, type TestingModule } from '@nestjs/testing'
import { AiService } from './ai.service.js'
// import { GoogleGenAI } from '@google/genai'
// import { env } from '../config.env.js'

// const ai = new GoogleGenAI({ apiKey: env.GEMINI_API_KEY })

describe('AiService', () => {
  let service: AiService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AiService],
    }).compile()

    service = module.get<AiService>(AiService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
