// src/user/user.controller.ts
import { Controller, Get, Post, Body, Param, UseGuards, Request, UnauthorizedException } from '@nestjs/common';
import { UserService } from './user.service';
import { UserClass } from '../../dto/user.dto';
import { AuthService } from '../auth/auth.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { LoginDto } from 'dto/login.dto';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService
  ) {}

  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<UserClass> {
    return this.userService.getUserById(id);
  }

  @Post('register')
  async register(@Body() userDto: UserClass): Promise<any> {
    
    return this.authService.register(userDto);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<any> {
    const user = await this.authService.validateUser(loginDto.email, loginDto.password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return this.authService.login(user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
