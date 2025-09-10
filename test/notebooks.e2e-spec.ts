import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notebook } from '../src/notebooks/entities/notebook.entity';

describe('Notebooks (e2e)', () => {
    let app: INestApplication;
    let repo: Repository<Notebook>;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
        imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();

        repo = moduleFixture.get<Repository<Notebook>>(
        getRepositoryToken(Notebook),
        );
    });

    afterAll(async () => {
        await app.close();
    });

    beforeEach(async () => {
        await repo.query(`DELETE FROM notebook;`);
    });

    it('/notebooks (POST)', async () => {
        const response = await request(app.getHttpServer())
        .post('/notebooks')
        .send({ title: 'HP', content: 'No anda teclado' })
        .expect(201);

        expect(response.body).toMatchObject({
        id: expect.any(Number),
        title: 'HP',
        content: 'No anda teclado',
        });
    });

    it('/notebooks (GET)', async () => {
        await repo.save({ title: 'HP', content: 'No anda teclado' });

        const response = await request(app.getHttpServer())
        .get('/notebooks')
        .expect(200);

        expect(response.body).toEqual([
        {
            id: expect.any(Number),
            title: 'HP',
            content: 'No anda teclado',
        },
        ]);
    });
});