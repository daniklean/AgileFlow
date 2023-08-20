import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

import { ProjectEntity } from '../entities/projects.entity';
import { ProjectDTO, ProjectUpdateDTO } from '../dto/projects.dto';
import { ErrorManager } from '../../utils/http.manager';
import { UsersProjectsEntity } from '../../users/entities/usersProjects.entity';
import { ACCESS_LEVEL } from '../../config/roles';
import { UsersService } from '../../users/services/users.service';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(ProjectEntity)
    private readonly projectRepository: Repository<ProjectEntity>,
    @InjectRepository(UsersProjectsEntity)
    private readonly UsersProjectsEntityRepository: Repository<UsersProjectsEntity>,
    private readonly UsersService: UsersService,
  ) {}

  /**
   * createProject
body: ProjectDTO   */

  public async createProject(body: ProjectDTO, userId: string): Promise<any> {
    try {
      const userById = await this.UsersService.findUserByID(userId);
      const project = await this.projectRepository.save(body);
      return await this.UsersProjectsEntityRepository.save({
        accessLevel: ACCESS_LEVEL.OWNER,
        user: userById,
        project,
      });
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  /**
   * findProjects
   */

  public async findProjects(): Promise<ProjectEntity[] | null> {
    try {
      const projects: ProjectEntity[] = await this.projectRepository.find();
      if (projects.length === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'Not exits projects list',
        });
      }
      return projects;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  /**
   * findProjectByID
   */

  public async findProjectByID(id: string): Promise<ProjectEntity | null> {
    try {
      const project: ProjectEntity = await this.projectRepository
        .createQueryBuilder('projects')
        .where({ id })
        .leftJoinAndSelect('projects.usersIncludes', 'usersIncludes')
        .leftJoinAndSelect('usersIncludes.user', 'user')
        .getOne();
      if (!project) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'Not exits projects by ID',
        });
      }
      return project;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  /**
   * updateProject
   */

  public async updateProject(
    id: string,
    body: ProjectUpdateDTO,
  ): Promise<UpdateResult | null> {
    try {
      const projectUpdate: UpdateResult = await this.projectRepository.update(
        id,
        body,
      );
      if (projectUpdate.affected === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'Not update Project',
        });
      }
      return projectUpdate;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  /**
   * deleteProject
   */

  public async deleteProject(id: string): Promise<DeleteResult | null> {
    try {
      const projectDelete: DeleteResult = await this.projectRepository.delete(
        id,
      );
      if (projectDelete.affected === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'Not delete project',
        });
      }
      return projectDelete;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }
}
