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

import { UsersService } from '../services/users.service';
import { AssignedProjectDTO, UserDTO, UserUpdateDTO } from '../dto/users.dto';
import { PublicAccess } from '../../auth/decorators/public.decorator';
import { AuthGuard } from '../../auth/guards/auth.guard';

@Controller('users')
@UseGuards(AuthGuard)
export class UsersController {
  constructor(private readonly UsersService: UsersService) {}

  @Post('register')
  /**
   * registrerUser
   */
  public async registrerUser(@Body() body: UserDTO) {
    return await this.UsersService.createUser(body);
  }

  /**
   * allUsers
   */
  @Get('all')
  public async allUsers() {
    return await this.UsersService.findUsers();
  }

  /**
   * userFindByID
   */
 @PublicAccess()
  @Get(':id')
  public async userFindByID(@Param('id') id: string) {
    return await this.UsersService.findUserByID(id);
  }

  /**
   * updateUser
   */
  @Put('edit:id')
  public async updateUser(
    @Param('id') id: string,
    @Body() body: UserUpdateDTO,
  ) {
    return await this.UsersService.updateUser(id, body);
  }

  /**
   * deleteUser
   */
  @Delete('delete:id')
  public async deleteUser(@Param('id') id: string) {
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
