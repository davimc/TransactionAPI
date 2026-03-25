import { CreateTransactionDto } from 'src/modules/transactions/dto/create-transaction.dto';
import { Transaction } from 'src/modules/transactions/entities/transaction.entity';
import { Currency } from 'src/modules/transactions/enums/currency-type';
import { TransactionType } from 'src/modules/transactions/enums/transaction-type';

export const CurrencyConfig = {
  [Currency.DOLLAR]: { rateToUSD: 1 },
  [Currency.EURO]: { rateToUSD: 1.1 },
  [Currency.REAIS]: { rateToUSD: 0.2 },
  [Currency.LIBRA]: { rateToUSD: 1.2 },
};

export function calculateBalanceInDollar(
  transactions: Transaction[],
): [number, number] {
  const payments = calculateTransactionType(
    transactions,
    TransactionType.PAYMENT,
  );
  const refunds = calculateTransactionType(
    transactions,
    TransactionType.REFUND,
  );

  return [payments, refunds];
}

function calculateTransactionType(
  transactions: Transaction[],
  type: TransactionType,
) {
  return transactions
    .filter((t) => t.type === type)
    .reduce(
      (sum, t) => sum + Number(t.amount * CurrencyConfig[t.currency].rateToUSD),
      0,
    );
}

export function convertValueToDollar(transaction: CreateTransactionDto) {
  return transaction.amount * CurrencyConfig[transaction.currency].rateToUSD;
}
