import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { TransactionType } from '../enums/transaction-type';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  invoiceId: string;

  @Column({
    type: 'text',
  })
  type: TransactionType;

  @Column('decimal')
  amount: number;

  @Column()
  currency: string;
}
