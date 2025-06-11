export class UserEntityRequest {
  id?: number = 0;
  name?: string = '';
  username?: string = '';
  lastname?: string = '';
  email?: string = '';
  password?: string = '';
  passwordChange?: string = '';
  rol?: string = '';
  specialty?: string = '';
  phone?: string = '';
  id_doctor?: number = 0;
  id_paciente?: number = 0;
}

export class Doctor {
  id?: number = 0;
  name?: string = '';
  lastname?: string = '';
  specialty?: string = '';
}

export class Paciente {
  id?: number = 0;
  name?: string = '';
  lastname?: string = '';
  phone?: string = '';
}
