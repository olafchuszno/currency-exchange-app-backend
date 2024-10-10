import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { TransactionModel } from './transactions.model';
import { Sequelize } from 'sequelize';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      database: 'currency',
      username: 'postgres',
      password: 'test1234',
      models: [TransactionModel],
    }),
    TransactionsModule,
  ],
  providers: [TransactionsService, Sequelize],
  controllers: [TransactionsController],
})
export class TransactionsModule {}
