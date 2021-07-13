import express from 'express';
import dotenv from 'dotenv';
import connectDB from './utils/db.js';
import userRoute from './routes/userRoute.js';
import jobRoute from './routes/jobRoute.js';

const app = express();

dotenv.config();
connectDB();
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ msg: 'Index route' });
});

app.use('/user', userRoute);
app.use('/job', jobRoute);

app.listen(process.env.PORT, () => {
  console.log('Server running');
});
