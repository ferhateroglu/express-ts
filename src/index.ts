import express from 'express';
import dotenv from 'dotenv';
import { dataSource } from './config/database';
import userRouter from './routes/user.router';
import retry from './utils/retry';

dotenv.config();

const app = express();
app.use(express.json());
app.use('/users', userRouter);

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
