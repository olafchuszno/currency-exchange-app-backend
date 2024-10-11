import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { TransactionModel } from './transactions.model';

@Module({
  imports: [SequelizeModule.forFeature([TransactionModel])],
  providers: [TransactionsService],
  controllers: [TransactionsController],
})
export class TransactionsModule {}
