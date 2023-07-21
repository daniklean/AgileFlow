import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { ProjectsService } from '../services/projects.service';
import { ProjectDTO, ProjectUpdateDTO } from '../dto/projects.dto';

@Controller('projects')
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
  @Get(':id')
  public async userFindByID(@Param('id') id: string) {
    return await this.projectsServices.findProjectByID(id);
  }

  /**
   * updateUser
   */
  @Put('edit:id')
  public async updateUser(
    @Param('id') id: string,
    @Body() body: ProjectUpdateDTO,
  ) {
    return await this.projectsServices.updateProject(id, body);
  }

  /**
   * deleteUser
   */
  @Delete('delete:id')
  public async deleteUser(@Param('id') id: string) {
    return await this.projectsServices.deleteProject(id);
  }
}
