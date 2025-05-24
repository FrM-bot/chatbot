import { Test, type TestingModule } from '@nestjs/testing'
import { WebhooksService } from './webhooks.service.js'

describe('WebhooksService', () => {
  let service: WebhooksService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WebhooksService],
    }).compile()

    service = module.get<WebhooksService>(WebhooksService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
