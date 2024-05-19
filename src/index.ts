import express from 'express';
import dotenv from 'dotenv';
import { dataSource } from './config/database';
import { userRouter } from './routes';
import { retry } from './utils';
import { errorMiddleware } from './middlewares';

dotenv.config();

const app = express();
app.use(express.json());

// Routes
app.use('/users', userRouter);

// Error handling middleware
app.use(errorMiddleware);

const startServer = async () => {
  const connectToDatabase = async () => {
    await dataSource.initialize();
  };

  const maxRetries = 5;
  const retryDelay = 5000;

  await retry(connectToDatabase, maxRetries, retryDelay);

  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
};

startServer();
