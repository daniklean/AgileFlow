import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { ProjectsService } from '../services/projects.service';
import { ProjectDTO, ProjectUpdateDTO } from '../dto/projects.dto';
import { AuthGuard } from '../../auth/guards/auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { AccessLevelGuard } from '../../auth/guards/access-level.guard';
import { AccessLevel } from '../../auth/decorators/access_level.decorator';
import { Roles } from '../../auth/decorators/roles.decorator';

@ApiTags('Projects')
@Controller('projects')
@UseGuards(AuthGuard, RolesGuard, AccessLevelGuard)
export class ProjectsController {
  constructor(private readonly projectsServices: ProjectsService) {}

  /**
   * registrerUser
   */
  @Roles('CREATOR')
  @Post('register-project/user-owner/:userId')
  public async registrerUser(
    @Body() body: ProjectDTO,
    @Param('userId') userId: string,
  ) {
    return await this.projectsServices.createProject(body, userId);
  }

  /**
   * allUsers
   */
  @Get('all')
  public async allUsers() {
    return await this.projectsServices.findProjects();
  }

  /**
   * userFindByID
   */
  @Get(':projectId')
  public async userFindByID(@Param('projectId') id: string) {
    return await this.projectsServices.findProjectByID(id);
  }

  /**
   * updateUser
   */
  @AccessLevel('OWNER')
  @Put(':projectId')
  public async updateUser(
    @Param('projectId') id: string,
    @Body() body: ProjectUpdateDTO,
  ) {
    return await this.projectsServices.updateProject(id, body);
  }

  /**
   * deleteUser
   */
  @Delete(':projectId')
  public async deleteUser(@Param('projectId') id: string) {
    return await this.projectsServices.deleteProject(id);
  }
}
