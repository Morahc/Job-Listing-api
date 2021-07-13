import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import connectDB from './utils/db.js';
import userRoute from './routes/userRoute.js';
import jobRoute from './routes/jobRoute.js';

const app = express();

dotenv.config();
connectDB();
app.use(express.json());

app.use('/user', userRoute);
app.use('/job', jobRoute);

if (process.env.NODE_ENV === 'production') {
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, '/client/build')));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
} else {
  app.get('/', (req, res) => {
    res.json({ msg: 'Index route' });
  });
}

app.listen(process.env.PORT, () => {
  console.log('Server running');
});
