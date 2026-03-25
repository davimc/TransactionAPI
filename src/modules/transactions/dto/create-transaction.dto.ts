import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
} from 'class-validator';
import { TransactionType } from '../enums/transaction-type';
import { Currency } from '../enums/currency-type';

export class CreateTransactionDto {
  @IsString()
  @IsNotEmpty()
  invoiceId: string;

  @IsEnum(TransactionType)
  type: TransactionType;

  @IsNumber()
  @IsPositive()
  amount: number;

  @IsEnum(Currency)
  currency: Currency;
}
