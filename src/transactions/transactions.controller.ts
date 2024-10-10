import { Controller, Get, Post, Body } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';

@Controller('transaction')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post()
  async create(@Body() body: CreateTransactionDto) {
    const currentRate: number =
      await this.transactionsService.getConversionRate();

    const amountToExchange = body.transaction_eur_amount;

    if (!amountToExchange) {
      throw new Error('Bad request');
    }

    return this.transactionsService.storeTransaction(
      amountToExchange,
      currentRate,
    );
  }

  // @Post('/transaction')
  // async makeTransaction(
  //   @Body() body: CreateTransactionDto,
  // ): Promise<Transaction> {
  //   const currentRate: number = await this.appService.getConversionRate();

  //   const amountToExchange = body.amountToExchange;

  //   if (!amountToExchange) {
  //     throw new Error('Bad request');
  //   }

  //   const transactionAmount =
  //     Math.round(amountToExchange * currentRate * 100) / 100;

  //   return {
  //     transaction_eur_amount: amountToExchange,
  //     transaction_pln_amount: transactionAmount,
  //     currenty_exchange_rate: currentRate,
  //     timestamp: this.transactionsService.getTime(),
  //   };
  // }

  @Get()
  findAll() {
    return this.transactionsService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.transactionsService.findOne(+id);
  // }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateTransactionDto: UpdateTransactionDto,
  // ) {
  //   return this.transactionsService.update(+id, updateTransactionDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.transactionsService.remove(+id);
  // }
}
