import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/rate')
  async getRate(@Req() request: Request): Promise<{ exchange_rate: number }> {
    console.log(
      '--- api key we got from frontend:',
      request.headers[process.env.API_KEY_HEADER],
    );

    if (
      request.headers[process.env.API_KEY_HEADER] !==
      process.env.THIS_API_ACCEPTED_KEY
    ) {
      throw new Error('Api token recieved from the frontend is incorrect');
    }

    console.log(
      'returning this data:',
      await this.appService.getConversionRate(),
    );

    const conversionRate = await this.appService.getConversionRate();

    console.log('returning rate to frontend');

    return {
      exchange_rate: conversionRate,
    };
  }

  @Post('/transaction')
  async makeTransaction(@Body() body: { amountToExchange: number }) {
    const currentRate: number = await this.appService.getConversionRate();

    console.log('--- request ---', body);
    console.log('--- amount to exchange ---', body['amountToExchange']);

    const amountToExchange = body.amountToExchange;

    if (!amountToExchange) {
      throw new Error('Bad request');
    }

    return { transaction_amount: amountToExchange * currentRate };
  }

  @Get('/transaction')
  checkTransaction() {
    return { response: 'transaction GET works' };
  }

  // @Get('/rateWithToken')
  // async getRate(@Req() request: Request): Promise<string> {
  //   console.log({ request });

  //   return await this.appService.getConversionRate();
  // }
}
