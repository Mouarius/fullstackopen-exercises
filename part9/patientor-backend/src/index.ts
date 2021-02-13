import express from 'express';
import cors from 'cors';
import diagnosesRouter from './routes/diagnoses';
const app = express();

const PORT = 3001;
const baseURL = '/api';

app.use(cors());

app.get(`${baseURL}/ping`, (_req, res) => {
  res.send('pong');
});

app.use('/api/diagnoses', diagnosesRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});