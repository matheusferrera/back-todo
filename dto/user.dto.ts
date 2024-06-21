import { IsNumber, IsString } from 'class-validator';

export class UserClass {
  @IsString()
  id: string;

  @IsString()
  name: string;

  @IsString()
  email: string;

  @IsString()
  password: string;

  //Necessario para inserir promisses objects 
  constructor(data: Partial<UserClass>) {
    Object.assign(this, data);
  }
}