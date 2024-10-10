import { Injectable } from '@nestjs/common';
// import { CreateTransactionDto } from './dto/create-transaction.dto';
// import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { InjectModel } from '@nestjs/sequelize';
import { TransactionModel } from './transactions.model';
// import { Sequelize } from 'sequelize';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectModel(TransactionModel)
    private transactionModel: typeof TransactionModel,
  ) {}

  create(amountInEur: number, currencyRate: number) {
    return amountInEur * currencyRate;
  }

  async getConversionRate() {
    const conversionApiUrl = process.env.EXCHANGE_RATE_API_URL || '';
    const conversionApiKey = process.env.EXCHANGE_RATE_API_KEY || '';
    const apiKeyHeader = process.env.API_KEY_HEADER || '';

    return fetch(conversionApiUrl, {
      headers: {
        [apiKeyHeader]: conversionApiKey,
      },
    })
      .then((response) => response.json())
      .then((data) => data.exchange_rate as number)
      .catch(() => {
        throw new Error('Server error occurred getting conversion rate.');
      });
  }

  storeTransaction(transaction_eur_amount, currenty_exchange_rate) {
    const transaction_pln_amount =
      Math.round(transaction_eur_amount * 100) / 100;

    const transaction: Partial<TransactionModel> = {
      transaction_eur_amount: transaction_eur_amount,
      transaction_pln_amount: transaction_pln_amount,
      currenty_exchange_rate: currenty_exchange_rate,
    };

    return this.transactionModel.create(transaction);
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
