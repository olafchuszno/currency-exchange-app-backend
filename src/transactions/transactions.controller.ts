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

  @Get()
  findAll() {
    return this.transactionsService.getAllTransactions();
  }
}
