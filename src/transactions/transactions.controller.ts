import { Controller, Get, Post, Body } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { AppService } from 'src/app.service';
// import { UpdateTransactionDto } from './dto/update-transaction.dto';

interface Transaction {
  transaction_eur_amount: number;
  transaction_pln_amount: number;
  currenty_exchange_rate: number;
  timestamp: string;
}

@Controller('transactions')
export class TransactionsController {
  constructor(
    private readonly transactionsService: TransactionsService,
    private readonly appService: AppService,
  ) {}

  // @Post()
  // create(@Body() createTransactionDto: CreateTransactionDto): Transaction {
  //   return {
  //     transaction_eur_amount: createTransactionDto.amountToExchange,
  //     transaction_pln_amount: AppService.
  //   };
  //   // return this.transactionsService.create(createTransactionDto);
  // }

  @Post('/transaction')
  async makeTransaction(
    @Body() body: CreateTransactionDto,
  ): Promise<Transaction> {
    const currentRate: number = await this.appService.getConversionRate();

    const amountToExchange = body.amountToExchange;

    if (!amountToExchange) {
      throw new Error('Bad request');
    }

    const transactionAmount =
      Math.round(amountToExchange * currentRate * 100) / 100;

    return {
      transaction_eur_amount: amountToExchange,
      transaction_pln_amount: transactionAmount,
      currenty_exchange_rate: currentRate,
      timestamp: this.transactionsService.getTime(),
    };
  }

  @Get()
  findAll() {
    return this.transactionsService.findAll();
  }

  getCurrencyExchangeRate() {
    return;
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
