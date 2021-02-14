import patientsData from '../../data/patients.json';
import {v4 as uuidv4} from 'uuid';

import { NewPatient, Patient, PatientUnsensitive } from '../types';
import toNewPatient from '../utils';

const patients: Patient[] = patientsData.map(obj => {
  const object = toNewPatient(obj) as Patient;
  object.id = obj.id;
  return object;
});


const getUnsensitiveEntries = ():PatientUnsensitive[] => {
  return patients.map(({id, name, dateOfBirth, gender, occupation}) => ({
    id, name, dateOfBirth, gender, occupation 
  }));
};

const addPatient = (object:NewPatient):Patient => {
  const newPatient:Patient = {id: uuidv4(), ...object};
  patients.push(newPatient);
  return newPatient;
};

export default {getUnsensitiveEntries, addPatient};