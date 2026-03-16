import { IsEnum, IsNumber, IsString } from 'class-validator';
import { TransactionType } from '../enums/transaction-type';

export class CreateTransactionDto {
  @IsString()
  invoice_id: string;

  @IsEnum(TransactionType)
  type: TransactionType;

  @IsNumber()
  amount: number;

  @IsString()
  currency: string;
}
