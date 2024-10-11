import { Module, Inject } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Cache } from 'cache-manager';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { CACHE_MANAGER, CacheModule } from '@nestjs/cache-manager';
import { TransactionsModule } from './transactions/transactions.module';
import { TransactionModel } from './transactions/transactions.model';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CacheModule.register(),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'host.docker.internal',
      port: 5432,
      database: 'currency',
      username: 'postgres',
      password: 'test1234',
      autoLoadModels: true,
      synchronize: true,
      models: [TransactionModel],
    }),
    TransactionsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}
}
