import request from 'supertest';
import express from 'express';
import bodyParser from 'body-parser';
import { AppDataSource } from '../ormconfig';
import { createEvent } from '../controllers/EventController';

// setup servidor manual
const app = express();
app.use(bodyParser.json());
app.post('/events', createEvent);

beforeAll(async () => {
  await AppDataSource.initialize();
});

afterAll(async () => {
  await AppDataSource.destroy();
});

describe('POST /events', () => {
  it('deve registrar um novo evento e retornar status 201', async () => {
    const res = await request(app)
      .post('/events')
      .send({
        userId: 'test-user',
        type: 'click',
        metadata: { button: 'submit', page: '/login' },
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.userId).toBe('test-user');
  });
});
