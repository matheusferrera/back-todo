import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { TaskModule } from './task/task.module';

@Module({
  imports: [UserModule, AuthModule, TaskModule],
  controllers: [AppController],
  providers: [AppService],
})
export class appModule {}