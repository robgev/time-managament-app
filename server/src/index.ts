import dotenv from 'dotenv';
import 'reflect-metadata';
import { createConnection } from 'typeorm';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import logger from 'morgan';

import usersRouter from './routes/users';
import apiRouter from './routes/api';
import authRouter from './routes/auth';

dotenv.config();

// create connection with database
// note that it's not active database connection
// TypeORM creates connection pools and uses them for your requests
createConnection().then(async (connection) => {
  // create express app
  const app = express();

  app.use(cors())
    .use(helmet())
    .use(logger('dev'))
    .use(express.json())
    .use(express.urlencoded({ extended: false }))
    .use('/users', usersRouter)
    .use('/api', apiRouter)
    .use('/auth', authRouter);

  // run app
  app.listen(8080, () => console.warn('App is running on port 8080'));
}).catch((error) => console.error('TypeORM connection error: ', error));
