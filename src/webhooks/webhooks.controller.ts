import { Body, Controller, Get, Post, Query, Res } from '@nestjs/common'
import type { Response } from 'express'
// biome-ignore lint/style/useImportType: <explanation>
import { AiService } from '../ai/ai.service.js'
// biome-ignore lint/style/useImportType: <explanation>
import { WebhooksService } from './webhooks.service.js'

const Messages = new Map()

type Message = {
  id: string
  from: string
  timestamp: number
  text: {
    body: string
  }
  type: 'text'
}

@Controller('webhooks')
export class WebhooksController {
  constructor(
    private readonly webhooksService: WebhooksService,
    private readonly aiService: AiService
  ) {}

  @Post('/whatsapp')
  async receiveMessage(@Body() body, @Res() res: Response) {
    const { value, field } = body.entry[0].changes[0]
    if (value?.messages) {
      const { contacts, messages } = value

      const message = messages[0] as Message

      console.log({ value, field }, contacts, messages)

      const previousMessages = Messages.get(message.from)

      Messages.set(message.from, previousMessages)

      // Aquí puedes procesar y responder al mensaje

      const result = await this.aiService.generateContent({
        contents: message.text.body,
      })

      if (!result) return

      await this.webhooksService.handleSendMessageWhatsAppWebhook({
        to: message.from,
        body: result,
      })

      res.status(200).send()
    }
  }

  @Get('/whatsapp')
  async verifyWebhook(
    @Query('hub.mode') mode: string,
    @Query('hub.verify_token') token: string,
    @Query('hub.challenge') challenge: string,
    @Res() res: Response
  ) {
    const result = this.webhooksService.handleVerifyWhatsAppWebhook({
      mode,
      token,
      challenge,
    })

    if (result.success) res.status(200).send(result.challenge)
    else res.status(403).send(result.error)
  }
}
