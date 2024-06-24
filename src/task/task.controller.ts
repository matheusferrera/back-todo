import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskClass, TaskClassReqPost } from 'dto/task.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import * as jwt from 'jsonwebtoken';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse, ApiBody, ApiCreatedResponse } from '@nestjs/swagger';

@ApiTags('Tasks')
@Controller("task")
export class TaskController {


  constructor(private readonly taskService: TaskService) {}

  private getUserIdFromToken(req: Request): string {
    const token = req.headers["authorization"].replace('Bearer ', ''); 
    const decodeToken = jwt.verify(token, "secretKey")
    return decodeToken.sub as string;
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all tasks' })
  @ApiCreatedResponse({
    description: 'Returns all tasks for the authenticated user',
    type: TaskClass,
  })
  @Get('')
  async getTask(@Req() req: Request): Promise<TaskClass[]> {
    const userId = this.getUserIdFromToken(req);
    return this.taskService.getAllTasks(userId); // Passa o ID de quem esta fazendo a solicitacao para retornar somente as tasks dele
  }


  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new task' })
  @ApiBody({ type: TaskClassReqPost })
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: TaskClass,
  })
  @Post('')
  async createTask(@Body() bodyReq: TaskClass, @Req() req: Request): Promise<TaskClass> {
    const userId = this.getUserIdFromToken(req);
    return this.taskService.createTask({...bodyReq, createdBy: userId});
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a task by ID' })
  @ApiCreatedResponse({
    description: 'Returns the updated task',
    type: TaskClassReqPost,
  })
  @Put(':id')
  async updateTask(@Param('id') id: string, @Body() bodyReq: TaskClass, @Req() req: Request): Promise<TaskClass> {
    const userId = this.getUserIdFromToken(req);
    return this.taskService.updateTask(id, bodyReq, userId);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a task by ID' })
  @ApiResponse({ status: 200, description: 'Task deleted successfully' })
  @Delete(':id')
  async deleteTask(@Param('id') id: string, @Req() req: Request): Promise<void> {
    const userId = this.getUserIdFromToken(req);
    return this.taskService.deleteTask(id, userId);
  }
}
