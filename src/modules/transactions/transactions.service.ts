import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction } from './entities/transaction.entity';
import { Repository } from 'typeorm';
import { TransactionType } from './enums/transaction-type';
import {
  calculateBalanceInDollar,
  convertValueToDollar,
} from 'src/utils/api.monetaria';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private readonly repository: Repository<Transaction>,
  ) {}
  async create(dto: CreateTransactionDto) {
    const transactions = await this.findByInvoice(dto.invoiceId);

    // dto.amount = convertValueToDollar(dto);
    this.validateTransaction(dto, transactions);

    const transaction = this.repository.create(dto);
    return this.repository.save(transaction);
  }

  async findByInvoice(invoice_id: string) {
    return this.repository.find({
      where: { invoiceId: invoice_id },
    });
  }

  private validateTransaction(
    dto: CreateTransactionDto,
    transactions: Transaction[],
  ) {
    const [payments, refunds] = calculateBalanceInDollar(transactions);
    const convertedAmount = convertValueToDollar(dto);
    if (dto.type === TransactionType.REFUND) {
      if (payments === 0) throw new BadRequestException('No payment found');

      if (refunds + convertedAmount > payments)
        throw new BadRequestException('Refund exceeds payment');
    }
  }
}
