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

import { ProjectsService } from '../services/projects.service';
import { ProjectDTO, ProjectUpdateDTO } from '../dto/projects.dto';
import { AuthGuard } from '../../auth/guards/auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { AccessLevelGuard } from '../../auth/guards/access-level.guard';
import { AccessLevel } from '../../auth/decorators/access_level.decorator';

@Controller('projects')
@UseGuards(AuthGuard, RolesGuard, AccessLevelGuard)
export class ProjectsController {
  constructor(private readonly projectsServices: ProjectsService) {}

  @Post('register-project')
  /**
   * registrerUser
   */
  public async registrerUser(@Body() body: ProjectDTO) {
    return await this.projectsServices.createProject(body);
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
  @AccessLevel(50)
  @Put('edit:projectId')
  public async updateUser(
    @Param('projectId') id: string,
    @Body() body: ProjectUpdateDTO,
  ) {
    return await this.projectsServices.updateProject(id, body);
  }

  /**
   * deleteUser
   */
  @Delete('delete:projectId')
  public async deleteUser(@Param('projectId') id: string) {
    return await this.projectsServices.deleteProject(id);
  }
}
