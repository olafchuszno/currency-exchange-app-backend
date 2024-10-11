import { Controller, Get, Inject, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Controller()
export class AppController {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly appService: AppService,
  ) {}

  @Get('/rate')
  async getRate(@Req() request: Request): Promise<{ exchange_rate: number }> {
    if (
      request.headers[process.env.API_KEY_HEADER] !==
      process.env.THIS_API_ACCEPTED_KEY
    ) {
      throw new Error('Api token recieved from the frontend is incorrect');
    }

    const cachedExchangeRate: undefined | number =
      await this.cacheManager.get('exchange_rate');

    if (cachedExchangeRate) {
      return {
        exchange_rate: cachedExchangeRate,
      };
    }

    const conversionRate: number = await this.appService.getConversionRate();

    this.cacheManager.set('exchange_rate', conversionRate, 60000);

    return {
      exchange_rate: conversionRate,
    };
  }
}
