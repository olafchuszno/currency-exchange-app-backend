import { Controller, Get, Inject } from '@nestjs/common';
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
  async getRate(): Promise<{ exchange_rate: number }> {
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
