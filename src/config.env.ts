import * as dotenv from 'dotenv'
dotenv.config()

import { number, object, preprocess, string } from 'zod'

const schema = object({
  // Variables de entorno de WhatsApp
  WHATSAPP_ACCESS_TOKEN: string().min(1, {
    message: 'WHATSAPP_ACCESS_TOKEN es requerido',
  }),
  WHATSAPP_VERIFY_TOKEN: string({
    message: 'WHATSAPP_VERIFY_TOKEN es requerido',
  }),
  WHATSAPP_PHONE_NUMBER_ID: string({
    message: 'WHATSAPP_PHONE_NUMBER_ID es requerido',
  }),
  WHATSAPP_APP_ID: preprocess((val) => Number(val), number().int()),
  WHATSAPP_APP_SECRET: string().min(1, {
    message: 'WHATSAPP_APP_SECRET es requerido',
  }),
  // Variables de entorno del servidor
  NODE_ENV: string().default('development'),
  PORT: number().default(3000),
  GEMINI_API_KEY: string().min(1, {
    message: 'GEMINI_API_KEY es requerido',
  }),
})

type Env = typeof schema._type

export let env: Env

try {
  env = schema.parse(process.env)
} catch (error) {
  //   console.error(`Error validando variables de entorno: ${error}`)
  throw new Error(`Error validando variables de entorno: ${error}`)
}
