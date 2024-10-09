import { Body, Controller, Get, Inject, Post, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

interface Transaction {
  transaction_amount: number;
  timestamp: string;
}

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

  @Post('/transaction')
  async makeTransaction(
    @Body() body: { amountToExchange: number },
  ): Promise<Transaction> {
    const currentRate: number = await this.appService.getConversionRate();

    const amountToExchange = body.amountToExchange;

    if (!amountToExchange) {
      throw new Error('Bad request');
    }

    const transactionAmount =
      Math.round(amountToExchange * currentRate * 100) / 100;

    return {
      transaction_amount: transactionAmount,
      timestamp: getTime(),
    };
  }

  @Get('/transaction')
  checkTransaction() {
    return { response: 'transaction GET works' };
  }
}

function getTime() {
  return new Date().toLocaleString('pl-PL', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
}
