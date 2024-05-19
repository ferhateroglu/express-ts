import express from 'express';
import dotenv from 'dotenv';
import { dataSource } from './config/database';

dotenv.config();

// import routes
import userRouter from './routes/userRoutes';

// create express app
const app = express();
app.use(express.json());

// attach routes
app.use('/users', userRouter);

// initialize the data source
dataSource
  .initialize()
  .then(() => {
    const port = process.env.PORT || 3000;
    // Start the server after the data source has been initialized
    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  })
  .catch((err: Error) => {
    console.error(err);
    process.exit(1);
  });
