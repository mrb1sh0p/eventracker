import 'reflect-metadata';
import express from 'express';
import bodyParser from 'body-parser';
import { AppDataSource } from './ormconfig';
import { createEvent } from './controllers/EventController';

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post('/events', createEvent);

AppDataSource.initialize()
  .then(() => {
    console.log('Conectado ao banco de dados');
    app.listen(port, () => {
      console.log(`Servidor rodando em http://localhost:${port}`);
    });
  })
  .catch((error) => console.error('Erro ao inicializar banco:', error));
