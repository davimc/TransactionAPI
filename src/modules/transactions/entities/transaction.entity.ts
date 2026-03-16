import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  invoceId: string;

  @Column({
    type: 'text',
  })
  type: TransactionType;

  @Column('decimal')
  amount: number;

  @Column()
  currency: string;
}
