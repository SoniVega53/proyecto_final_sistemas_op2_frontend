export class UserEntityRequest {
  id?: number;
  name?: string;
  username?: string;
  lastname?: string;
  email?: string;
  password?: string;
  passwordChange?: string;
  rol?: string;
  specialty?: string;
  phone?: string;
  id_doctor?: number;
  id_paciente?: number;
}

export class Doctor {
  id?: number;
  name?: string;
  lastname?: string;
  specialty?: string;
}

export class Paciente {
  id?: number;
  name?: string;
  lastname?: string;
  phone?: string;
}
