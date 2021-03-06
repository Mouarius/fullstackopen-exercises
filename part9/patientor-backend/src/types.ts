export interface Diagnose {
  code: string,
  name: string,
  latin?: string
}

export type NewPatient = Omit<Patient, 'id'>;

export interface Patient{
  id: string,
  name: string,
  dateOfBirth: string,
  gender: Gender,
  occupation: string,
  ssn: string
}

export type PatientUnsensitive = Omit<Patient, 'ssn'>;

export enum Gender {
  Female = 'female', Male = 'male', Other = 'other'
}