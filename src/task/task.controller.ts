import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskClass } from 'dto/task.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller("task")
export class TaskController {
  constructor(private readonly TaskService: TaskService) {}

  @Get('')
  getTask(): Promise<TaskClass[]> {
    return this.TaskService.getAllTasks();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getTaskById(@Param('id') id: string): Promise<TaskClass | null> {
    return this.TaskService.getTask(id);
  }

  @Post('')
  createTask(@Body() bodyReq: TaskClass): Promise<TaskClass> {
    return this.TaskService.createTask(bodyReq);
  }
}
