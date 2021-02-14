import express from 'express';
import patientsService from '../services/patientsService';
import { NewPatient } from '../types';

const patientsRouter = express.Router();

patientsRouter.get('/', (_req, res) => {
  res.status(200).send(patientsService.getUnsensitiveEntries());
});

patientsRouter.post('/', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const {name, dateOfBirth, ssn, gender, occupation}:NewPatient = req.body;
  const newPatient = patientsService.addPatient({name, dateOfBirth, ssn, gender, occupation});

  res.send(newPatient);
});

export default patientsRouter;