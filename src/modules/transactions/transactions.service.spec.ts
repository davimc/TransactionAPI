import { Test, TestingModule } from '@nestjs/testing';
import { TransactionsService } from './transactions.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Transaction } from './entities/transaction.entity';
import { TransactionType } from './enums/transaction-type';
import { CreateTransactionDto } from './dto/create-transaction.dto';

describe('TransactionsService', () => {
  let service: TransactionsService;
  let repository: Repository<Transaction>;

  const mockRepository = {
    find: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TransactionsService,
        {
          provide: getRepositoryToken(Transaction),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<TransactionsService>(TransactionsService);
    repository = module.get(getRepositoryToken(Transaction));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should create a payment transaction', async () => {
    mockRepository.find.mockResolvedValue([]);
    mockRepository.create.mockReturnValue({});
    mockRepository.save.mockResolvedValue({});

    const dto = {
      invoice_id: '08c2dda4-bf2b-4dc3-8578-23c5b9c1e680',
      type: TransactionType.PAYMENT,
      amount: 100,
      currency: 'USD',
    };

    const result = await service.create(dto);

    expect(mockRepository.save).toHaveBeenCalled();
    expect(result).toBeDefined();
  });
});
