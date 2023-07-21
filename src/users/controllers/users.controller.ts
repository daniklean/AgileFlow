import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { UsersService } from '../services/users.service';
import { UserDTO, UserUpdateDTO } from '../dto/users.dto';

@Controller('users')
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
}
