import './config.env.js'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AiService } from './ai/ai.service.js'
import { AppController } from './app.controller.js'
import { AppService } from './app.service.js'
import { WebhooksModule } from './webhooks/webhooks.module.js'

@Module({
  imports: [ConfigModule.forRoot(), WebhooksModule],
  controllers: [AppController],
  providers: [AppService, AiService],
})
export class AppModule {}
