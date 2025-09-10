import { Test, TestingModule } from '@nestjs/testing';
import { NotebooksService } from './notebooks.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Notebook } from './entities/notebook.entity';
import { Repository } from 'typeorm';

describe('NotebooksService', () => {
  let service: NotebooksService;
  let repo: Repository<Notebook>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NotebooksService,
        {
          provide: getRepositoryToken(Notebook),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            find: jest.fn(),
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<NotebooksService>(NotebooksService);
    repo = module.get<Repository<Notebook>>(getRepositoryToken(Notebook));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
