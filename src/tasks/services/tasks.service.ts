import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TasksEntity } from '../entities/tasks.entity';
import { ProjectsService } from '../../projects/services/projects.service';
import { TasksDTO } from '../dto/tasks.dto';
import { ErrorManager } from '../../utils/http.manager';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TasksEntity)
    private readonly tasksRepository: Repository<TasksEntity>,
    private readonly projectService: ProjectsService,
  ) {}

  /**
   * createTask
   */
  public async createTask(
    body: TasksDTO,
    projectId: string,
  ): Promise<TasksEntity | null> {
    try {
      const project = await this.projectService.findProjectByID(projectId);
      if (!project) {
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: 'Not exits project finded',
        });
      }
      return await this.tasksRepository.save({
        ...body,
        project,
      });
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }
}
