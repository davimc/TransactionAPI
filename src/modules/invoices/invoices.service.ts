import { Injectable } from '@nestjs/common';
import { TransactionsService } from '../transactions/transactions.service';
import { TransactionType } from '../transactions/enums/transaction-type';

@Injectable()
export class InvoicesService {
  constructor(private transactionsService: TransactionsService) {}

  async getTransactions(invoiceId: string) {
    const transactions =
      await this.transactionsService.findByInvoice(invoiceId);

    const payments = transactions
      .filter((t) => t.type === TransactionType.PAYMENT)
      .reduce((sum, t) => sum + Number(t.amount), 0);

    const refunds = transactions
      .filter((t) => t.type === TransactionType.REFUND)
      .reduce((sum, t) => sum + Number(t.amount), 0);

    return {
      invoiceId,
      transactions,
      balance: payments - refunds,
    };
  }
}
