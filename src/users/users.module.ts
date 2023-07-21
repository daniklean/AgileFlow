import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';
import { UsersEntity } from './entities/users.entity';
import { UsersProjectsEntity } from './entities/usersProjects.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UsersEntity, UsersProjectsEntity])],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
