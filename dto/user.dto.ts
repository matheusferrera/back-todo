import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UserClass {
  
  @IsOptional()
  @IsString()
  @ApiProperty()
  id: string;

  @IsString()
  @ApiProperty()
  name: string;

  @IsString()
  @ApiProperty()
  email: string;

  @IsString()
  @ApiProperty()
  password: string;

  //Necessario para inserir promisses objects 
  constructor(data: Partial<UserClass>) {
    Object.assign(this, data);
  }
}