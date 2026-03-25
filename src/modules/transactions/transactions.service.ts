import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction } from './entities/transaction.entity';
import { Repository } from 'typeorm';
import { TransactionType } from './enums/transaction-type';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private readonly repository: Repository<Transaction>,
  ) {}
  async create(dto: CreateTransactionDto) {
    const transactions = await this.repository.find({
      where: { invoiceId: dto.invoice_id },
    });

    if (dto.type === TransactionType.REFUND && transactions.length === 0) {
      throw new BadRequestException('Cannot refund without payment');
    }
    const payments = transactions
      .filter((t) => t.type === TransactionType.PAYMENT)
      .reduce((sum, t) => sum + Number(t.amount), 0);

    const refunds = transactions
      .filter((t) => t.type === TransactionType.REFUND)
      .reduce((sum, t) => sum + Number(t.amount), 0);

    if (dto.type === TransactionType.REFUND) {
      if (payments === 0) throw new BadRequestException('No payment found');

      if (refunds + dto.amount > payments)
        throw new BadRequestException('Refund exceeds payment');
    }

    const transaction = this.repository.create(dto);

    return this.repository.save(transaction);
  }

  async findByInvoice(invoice_id: string) {
    return this.repository.find({
      where: { invoiceId: invoice_id },
    });
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} transaction`;
  // }

  // update(id: number, updateTransactionDto: UpdateTransactionDto) {
  //   return `This action updates a #${id} transaction`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} transaction`;
  // }
}
