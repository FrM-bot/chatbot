import { Test, type TestingModule } from '@nestjs/testing'
import { WebhooksController } from './webhooks.controller.js'

describe('WebhooksController', () => {
  let controller: WebhooksController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WebhooksController],
    }).compile()

    controller = module.get<WebhooksController>(WebhooksController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
