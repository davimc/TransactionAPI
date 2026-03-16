import { IsEnum, isNumber, isString } from 'class-validator';

export class CreateTransactionDto {
  @isString()
  invoice_id: string;

  @IsEnum(TransactionType)
  type: PaymentType;

  @isNumber()
  amount: number;

  @isString()
  currency: string;
}
