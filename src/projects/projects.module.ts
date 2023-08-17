import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProjectsController } from './controllers/projects.controller';
import { ProjectsService } from './services/projects.service';
import { ProjectEntity } from './entities/projects.entity';
import { UsersProjectsEntity } from '../users/entities/usersProjects.entity';
import { UsersService } from '../users/services/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProjectEntity, UsersProjectsEntity])],
  controllers: [ProjectsController],
  providers: [ProjectsService, UsersService],
})
export class ProjectsModule {}
