import { IsNumber, IsString, IsIn, IsOptional } from 'class-validator';

export class TaskClass {
  @IsOptional()
  @IsString()
  createdBy: string;

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