/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Gender, NewPatient } from "./types";
// import { validate as uuidValidate } from 'uuid';

const isString = (text: any): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseName = (name: any): string => {
  if(!name || !isString(name)){
    throw new Error('Incorrect or missing name : ' + name);
  }
  return name;
};


// const parseID = (id: any):string => {
//   if(!id || !isString(id) || !uuidValidate(id)){
//     throw new Error('Incorrect or missing id : ' + id);
//   }
//   return id;
// };

const isDate = (date:string):boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: any):string => {
  if(!date || !isString(date) || !isDate(date)){
    throw new Error('Incorrect or missing date : ' + date);
  }
  return date;
};

const isGender = (gender: any): gender is Gender => {
  return Object.values(Gender).includes(gender);
};

const parseGender = (gender:any):Gender => {
  if(!gender || !isGender(gender)){
    throw new Error('Incorrect or missing gender : ' + gender);
  }
  return gender;
};

const parseSSN = (ssn: any):string => {
  if(!ssn || !isString(ssn)){
    throw new Error('Incorrect or missing ssn : ' + ssn);
  }
  return ssn;
 };

const parseOccupation = (occupation: any):string => {
  if(!occupation || !isString(occupation)){
    throw new Error('Incorrect or missing occupation : ' + occupation);
  }
  return occupation;
};

const toNewPatient = (object: any): NewPatient => {
  return {
    name: parseName(object.name),
    dateOfBirth: parseDate(object.dateOfBirth),
    ssn: parseSSN(object.ssn),
    gender: parseGender(object.gender),
    occupation: parseOccupation(object.occupation)
  };
};

export default toNewPatient;