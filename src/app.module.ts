import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TransactionsService } from './modules/trasactions/transactions.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from 'typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.sqlite',
      entities: [Transaction],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService, TransactionsService],
})
export class AppModule {}
