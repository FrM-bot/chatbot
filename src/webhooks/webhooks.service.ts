import { Injectable } from '@nestjs/common'
import axios from 'axios'
import { env } from '../config.env.js'

const Services = {
  whatsapp: {
    url: `https://graph.facebook.com/v22.0/${env.WHATSAPP_PHONE_NUMBER_ID}/messages`,
  },
}

@Injectable()
export class WebhooksService {
  handleVerifyWhatsAppWebhook({ mode, token, challenge }) {
    if (mode === 'subscribe' && token === env.WHATSAPP_VERIFY_TOKEN) {
      return {
        success: true,
        challenge,
      }
    }

    return {
      success: false,
      error: 'Invalid webhook verification',
    }
  }

  async handleSendMessageWhatsAppWebhook({
    to,
    body,
  }: {
    to: string
    body: string
  }) {
    const { data } = await axios.post(
      Services.whatsapp.url,
      {
        messaging_product: 'whatsapp',
        recipient_type: 'individual',
        to,
        type: 'text',
        text: {
          body,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${env.WHATSAPP_ACCESS_TOKEN}`,
        },
      }
    )

    return data
  }
}
