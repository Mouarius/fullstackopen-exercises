import express from 'express';
import patientsService from '../services/patientsService';
import toNewPatient from '../utils';

const patientsRouter = express.Router();

patientsRouter.get('/', (_req, res) => {
  res.status(200).send(patientsService.getUnsensitiveEntries());
});

patientsRouter.post('/', (req, res) => {
  const newPatient = toNewPatient(req.body);
  const addedNewPatient = patientsService.addPatient(newPatient);
  res.json(addedNewPatient);
});

export default patientsRouter;