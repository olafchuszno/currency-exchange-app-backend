import { Controller, Get, Post, Body } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { TransactionModel } from './transactions.model';

@Controller('transaction')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post()
  async create(@Body() body: CreateTransactionDto) {
    const currentRate: number =
      await this.transactionsService.getConversionRate();

    const transactionEurAmount = body.transaction_eur_amount;

    if (!transactionEurAmount) {
      throw new Error('Bad request');
    }

    return this.transactionsService.storeTransaction(
      transactionEurAmount,
      currentRate,
    );
  }

  @Get()
  findAll(): Promise<TransactionModel[]> {
    return this.transactionsService.getAllTransactions();
  }
}
