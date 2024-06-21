import { IsNumber, IsString, IsIn } from 'class-validator';

export class TaskClass {
  @IsNumber()
  id: number;

  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsIn(['pending', 'in-progress', 'completed'])
  status: 'pending' | 'in-progress' | 'completed';

  //Necessario para inserir promisses objects 
  constructor(data: Partial<TaskClass>) {
    Object.assign(this, data);
  }
}