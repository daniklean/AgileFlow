import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TasksService } from './services/tasks.service';
import { TasksController } from './controllers/tasks.controller';
import { TasksEntity } from './entities/tasks.entity';
import { ProjectEntity } from '../projects/entities/projects.entity';
import { ProjectsService } from '../projects/services/projects.service';

@Module({
  imports: [TypeOrmModule.forFeature([TasksEntity, ProjectEntity])],
  providers: [TasksService, ProjectsService],
  controllers: [TasksController],
})
export class TasksModule {}
