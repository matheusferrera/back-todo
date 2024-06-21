import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskClass } from 'dto/task.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import * as jwt from 'jsonwebtoken';

@Controller("task")
export class TaskController {

  constructor(private readonly taskService: TaskService) {}

  private getUserIdFromToken(req: Request): string {
    const token = req.headers["authorization"].replace('Bearer ', ''); 
    const decodeToken = jwt.verify(token, "secretKey")
    return decodeToken.sub as string;
  }

  @UseGuards(JwtAuthGuard)
  @Get('')
  async getTask(@Req() req: Request): Promise<TaskClass[]> {
    const userId = this.getUserIdFromToken(req);
    return this.taskService.getAllTasks(userId); //Passa o ID de quem esta fazendo a solicitacao para retornar somente as tasks dele
  }

  @UseGuards(JwtAuthGuard)
  @Post('')
  async createTask(@Body() bodyReq: TaskClass, @Req() req: Request): Promise<TaskClass> {
    const userId = this.getUserIdFromToken(req);
    return this.taskService.createTask({...bodyReq, createdBy: userId});
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updateTask(@Param('id') id: string, @Body() bodyReq: TaskClass, @Req() req: Request): Promise<TaskClass> {
    const userId = this.getUserIdFromToken(req);
    return this.taskService.updateTask(id, bodyReq, userId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteTask(@Param('id') id: string, @Req() req: Request): Promise<void> {
    const userId = this.getUserIdFromToken(req);
    return this.taskService.deleteTask(id, userId);
  }
}