import { IsEnum, IsNumber, IsString, IsUUID } from 'class-validator';
import { TransactionType } from '../enums/transaction-type';

export class CreateTransactionDto {
  @IsUUID()
  invoiceId: string;

  @IsEnum(TransactionType)
  type: TransactionType;

  @IsNumber()
  amount: number;

  @IsString()
  currency: string;
}
