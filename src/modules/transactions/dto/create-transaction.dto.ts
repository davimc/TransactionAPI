import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  IsUUID,
} from 'class-validator';
import { TransactionType } from '../enums/transaction-type';

export class CreateTransactionDto {
  @IsUUID()
  @IsNotEmpty()
  invoice_id: string;

  @IsEnum(TransactionType)
  type: TransactionType;

  @IsNumber()
  @IsPositive()
  amount: number;

  @IsString()
  currency: string;
}
