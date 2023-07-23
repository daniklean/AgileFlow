import { Global, Module } from '@nestjs/common';

import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { UsersModule } from '../users/users.module';
import { UsersService } from '../users/services/users.service';

@Global()
@Module({
  imports: [UsersModule],
  providers: [AuthService, UsersService],
  controllers: [AuthController],
})
export class AuthModule {}
