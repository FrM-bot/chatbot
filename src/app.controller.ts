import { Controller, Get } from '@nestjs/common'
// biome-ignore lint/style/useImportType: <explanation>
import { AppService } from './app.service.js'

@Controller('/api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/ai')
  getHello() {
    return this.appService.getHello()
  }

  @Get('/exchange-rate')
  getExchangeRate() {
    return this.appService.getExchangeRate()
  }
}
