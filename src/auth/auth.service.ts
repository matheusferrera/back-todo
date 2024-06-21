// O servico e responsavel pelo login e validacao dos usuarios
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { UserClass } from '../../dto/user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userService.getUserByEmail(email);
    if (user && await bcrypt.compare(pass, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id, name: user.name };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(userDto: UserClass): Promise<any> {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(userDto.password, salt);
    const user = await this.userService.createUser({ ...userDto, password: hashedPassword });
    return user;
  }
}