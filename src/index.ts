import express from 'express';
import dotenv from 'dotenv';
import { dataSource } from './config/database';
import userRouter from './routes/user.router';

dotenv.config();

const app = express();
app.use(express.json());
app.use('/users', userRouter);

const startServer = async () => {
  try {
    await dataSource.initialize();
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

startServer();
