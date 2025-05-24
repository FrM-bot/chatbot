// biome-ignore lint: disable decorators
import { Body, Controller, Get, Post, Query, Res } from '@nestjs/common'
// biome-ignore lint/style/useImportType: <explanation>
import { WebhooksService } from './webhooks.service.js'
import type { Response } from 'express'

@Controller('webhooks')
export class WebhooksController {
  constructor(private readonly webhooksService: WebhooksService) {}

  @Post('/whatsapp')
  async receiveMessage(@Body() body, @Res() res: Response) {
    console.log('Mensaje recibido:', body)

    // Aquí puedes procesar y responder al mensaje

    const result = await this.webhooksService.handleSendMessageWhatsAppWebhook()

    console.log({ result })
    res.status(200).send()
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
