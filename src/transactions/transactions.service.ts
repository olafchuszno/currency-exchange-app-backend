import { Injectable } from '@nestjs/common';
// import { CreateTransactionDto } from './dto/create-transaction.dto';
// import { UpdateTransactionDto } from './dto/update-transaction.dto';
// import { InjectModel } from '@nestjs/sequelize';
// import { TransactionModel } from './transactions.model';
// import { Sequelize } from 'sequelize';

@Injectable()
export class TransactionsService {
  // constructor(
  //   @InjectModel(TransactionModel)
  //   private transactionModel: typeof TransactionModel,
  //   private sequalize: Sequelize,
  // ) {}

  create(amountInEur: number, currencyRate: number) {
    return amountInEur * currencyRate;
  }

  findAll() {
    return `This action returns all transactions`;
  }

  findOne(id: number) {
    return `This action returns a #${id} transaction`;
  }

  getTime() {
    return new Date().toLocaleString('pl-PL', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  }

  remove(id: number) {
    return `This action removes a #${id} transaction`;
  }
}
