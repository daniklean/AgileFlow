import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

import { UsersEntity } from '../entities/users.entity';
import { UserDTO, UserUpdateDTO } from '../dto/users.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly userRepository: Repository<UsersEntity>,
  ) {}

  public async createUser(body: UserDTO): Promise<UsersEntity | null> {
    try {
      return await this.userRepository.save(body);
    } catch (error) {
      throw new Error(error);
    }
  }

  public async findUsers(): Promise<UsersEntity[] | null> {
    try {
      return await this.userRepository.find();
    } catch (error) {
      throw new Error(error);
    }
  }

  public async findUserByID(id: string): Promise<UsersEntity | null> {
    try {
      return await this.userRepository
        .createQueryBuilder('user')
        .where({ id })
        .getOne();
    } catch (error) {
      throw new Error(error);
    }
  }

  public async updateUser(
    id: string,
    body: UserUpdateDTO,
  ): Promise<UpdateResult | null> {
    try {
      const user: UpdateResult = await this.userRepository.update(id, body);
      if (user.affected === 0) {
        return null;
      }
      return user;
    } catch (error) {
      throw new Error(error);
    }
  }

  public async deleteUser(id: string): Promise<DeleteResult | null> {
    try {
      const user: DeleteResult = await this.userRepository.delete(id);
      if (user.affected === 0) {
        return null;
      }
      return user;
    } catch (error) {
      throw new Error(error);
    }
  }
}
