import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsIn, IsOptional } from 'class-validator';

export class TaskClass {
  @IsOptional()
  @IsString()
  @ApiProperty()
  createdBy: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  id: string;

  @IsString()
  @ApiProperty()
  title: string;

  @IsString()
  @ApiProperty()
  description: string;

  @ApiProperty()
  @IsIn(['pending', 'in-progress', 'completed'])
  status: 'pending' | 'in-progress' | 'completed';

  //Necessario para inserir promisses objects 
  constructor(data: Partial<TaskClass>) {
    Object.assign(this, data);
  }
}

export class TaskClassReqPost {
  @IsOptional()
  @IsString()
  @ApiProperty()
  createdBy: string;


  @IsString()
  @ApiProperty()
  title: string;

  @IsString()
  @ApiProperty()
  description: string;

  @ApiProperty()
  @IsIn(['pending', 'in-progress', 'completed'])
  status: 'pending' | 'in-progress' | 'completed';

  //Necessario para inserir promisses objects 
  constructor(data: Partial<TaskClass>) {
    Object.assign(this, data);
  }
}