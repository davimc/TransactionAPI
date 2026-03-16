import { Injectable } from '@nestjs/common';
import { TransactionsService } from '../transactions/transactions.service';
import { TransactionType } from '../transactions/enums/transaction-type';

@Injectable()
export class InvoicesService {
  constructor(private transactionsService: TransactionsService) {}

  async getTransactions(invoice_id: string) {
    const transactions =
      await this.transactionsService.findByInvoice(invoice_id);

    const payments = transactions
      .filter((t) => t.type === TransactionType.PAYMENT)
      .reduce((sum, t) => sum + Number(t.amount), 0);

    const refunds = transactions
      .filter((t) => t.type === TransactionType.REFUND)
      .reduce((sum, t) => sum + Number(t.amount), 0);

    return {
      invoice_id,
      transactions,
      balance: payments - refunds,
    };
  }
}
