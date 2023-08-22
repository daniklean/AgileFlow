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

import { UsersService } from '../services/users.service';
import { AssignedProjectDTO, UserDTO, UserUpdateDTO } from '../dto/users.dto';
import { PublicAccess } from '../../auth/decorators/public.decorator';
import { AuthGuard } from '../../auth/guards/auth.guard';
import { Roles } from '../../auth/decorators/roles.decorator';
import { RolesGuard } from '../../auth/guards/roles.guard';

@ApiTags('Users')
@Controller('users')
@UseGuards(AuthGuard, RolesGuard)
export class UsersController {
  constructor(private readonly UsersService: UsersService) {}

  /**
   * registrerUser
   */
  @PublicAccess()
  @Post('register')
  public async registrerUser(@Body() body: UserDTO) {
    return await this.UsersService.createUser(body);
  }

  /**
   * allUsers
   */
  @Roles('ADMIN')
  @Get('all')
  public async allUsers() {
    return await this.UsersService.findUsers();
  }

  /**
   * userFindByID
   */

  @Get(':userId')
  public async userFindByID(@Param('userId') id: string) {
    return await this.UsersService.findUserByID(id);
  }

  /**
   * updateUser
   */
  @Put(':userId')
  public async updateUser(
    @Param('userId') id: string,
    @Body() body: UserUpdateDTO,
  ) {
    return await this.UsersService.updateUser(id, body);
  }

  /**
   * deleteUser
   */
  @Delete(':userId')
  public async deleteUser(@Param('userId') id: string) {
    return await this.UsersService.deleteUser(id);
  }

  @Post('assigned-project')
  /**
   * assignedProject
   */
  public async assignedProject(@Body() body: AssignedProjectDTO) {
    return await this.UsersService.assignedProjectRelation(body);
  }
}
