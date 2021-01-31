import dotenv from 'dotenv';
import 'reflect-metadata';
import { createConnection } from 'typeorm';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import logger from 'morgan';

import usersRouter from './routes/users';
import taskRouter from './routes/tasks';
import authRouter from './routes/auth';
import errorHandler from './middlewares/errorHandler';

dotenv.config();

// create connection with database
// note that it's not active database connection
// TypeORM creates connection pools and uses them for your requests
// eslint-disable-next-line
createConnection().then(async (connection) => {
  // create express app
  const app = express();

  app.use(cors())
    .use(helmet())
    .use(logger('dev'))
    .use(express.json())
    .use(express.urlencoded({ extended: false }))
    .use('/users', usersRouter)
    .use('/tasks', taskRouter)
    .use('/auth', authRouter)
    .use(errorHandler)
    .set('view engine', 'pug');

  // run app
  app.listen(8080, () => console.warn('App is running on port 8080'));
}).catch((error) => console.error('TypeORM connection error: ', error));
