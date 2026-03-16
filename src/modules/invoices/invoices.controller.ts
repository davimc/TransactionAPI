import { Controller, Get, Param } from '@nestjs/common';
import { InvoicesService } from './invoices.service';

@Controller('invoices')
export class InvoicesController {
  constructor(private readonly service: InvoicesService) {}

  @Get(':invoice_id/transactions')
  get(@Param('invoice_id') invoice_id: string) {
    return this.service.getTransactions(invoice_id);
  }
}
