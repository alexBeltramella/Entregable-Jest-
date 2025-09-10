import { Test, TestingModule } from '@nestjs/testing';
import { NotebooksController } from './notebooks.controller';
import { NotebooksService } from './notebooks.service';

describe('NotebooksController (integration-like)', () => {
  let notebooksController: NotebooksController;
  let notebooksService: NotebooksService;

  const mockNotebookService = {
    findAll: jest.fn(),
    create: jest.fn(),
  };

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [NotebooksController],
      providers: [
        {
          provide: NotebooksService,
          useValue: mockNotebookService,
        },
      ],
    }).compile();

    notebooksController = moduleRef.get<NotebooksController>(NotebooksController);
    notebooksService = moduleRef.get<NotebooksService>(NotebooksService);
  });

  it('el controlador debería estar definido', () => {
    expect(notebooksController).toBeTruthy();
  });

  it('findAll debería retornar la lista de notebooks', async () => {
    const notebooks = [{ id: 42, title: 'Lenovo', content: 'Pantalla rota' }];
    mockNotebookService.findAll.mockResolvedValueOnce(notebooks);

    const response = await notebooksController.findAll();
    expect(response).toEqual(notebooks);
    expect(mockNotebookService.findAll).toHaveBeenCalled();
  });

  it('create debería devolver la notebook creada', async () => {
    const payload = { title: 'HP', content: 'No enciende' };
    const saved = { id: 99, ...payload };
    mockNotebookService.create.mockResolvedValueOnce(saved);

    const response = await notebooksController.create(payload);
    expect(response).toEqual(saved);
    expect(mockNotebookService.create).toHaveBeenCalledWith(payload);
  });
});