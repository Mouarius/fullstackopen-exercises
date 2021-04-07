import express from 'express';
import diagnosesService from '../services/diagnosesService';

const diagnosesRouter = express.Router();

diagnosesRouter.get('/', (_req, res) => {
  res.status(200).send(diagnosesService.getEntries());
});

export default diagnosesRouter;