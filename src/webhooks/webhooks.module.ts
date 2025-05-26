import { Module } from '@nestjs/common'
import { AiService } from '../ai/ai.service.js'
import { WebhooksController } from './webhooks.controller.js'
import { WebhooksService } from './webhooks.service.js'

@Module({
  controllers: [WebhooksController],
  providers: [WebhooksService, AiService],
  exports: [WebhooksService],
})
export class WebhooksModule {}
