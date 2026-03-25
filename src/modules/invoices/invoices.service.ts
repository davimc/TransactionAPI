import { Injectable } from '@nestjs/common';
import { TransactionsService } from '../transactions/transactions.service';
import { TransactionType } from '../transactions/enums/transaction-type';
import { calculateTransactionsBalanceInDollar } from 'src/utils/api.monetaria';

@Injectable()
export class InvoicesService {
  constructor(private transactionsService: TransactionsService) {}

  async getTransactions(invoiceId: string) {
    const transactions =
      await this.transactionsService.findByInvoice(invoiceId);

    const [payments, refunds] =
      calculateTransactionsBalanceInDollar(transactions);

    return {
      invoiceId,
      transactions,
      balance: '$' + (payments - refunds),
    };
  }
}
