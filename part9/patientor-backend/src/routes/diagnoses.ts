import express from 'express';
import diagnosesService from '../services/diagnosesServices';

const diagnosesRouter = express.Router();

diagnosesRouter.get('/', (_req, res) => {
  res.status(200).send(diagnosesService.getEntries());
});

export default diagnosesRouter;