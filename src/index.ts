import express from 'express';
import dotenv from 'dotenv';
import { dataSource } from './config/database';

dotenv.config();

// import routes
import { UserRouter } from './routes/userRoutes';

// create router instances
const userRouter = new UserRouter(dataSource);

// initialize the data source
dataSource
  .initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err: Error) => {
    console.error('Error during Data Source initialization:', err);
  });

// create express app
const app = express();
app.use(express.json());

// attach routes
app.use('/users', userRouter.attach());

// start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
