import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from '../../users/services/users.service';
import { ErrorManager } from '../../utils/http.manager';
import { ISingJWT, IPayloadToken, ISingUserJWT } from '../interfaces/auth.interface';
import { UsersEntity } from '../../users/entities/users.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userServices: UsersService,
    private readonly jwtService: JwtService,
  ) { }

  public async userValidate(usernameOrEmail: string, password: string) {
    try {
      const userByEmailOrUsername = await this.userServices.findBy(
        usernameOrEmail,
      );

      const isPasswordValid = await bcrypt.compare(
        password,
        userByEmailOrUsername.password,
      );

      if (!isPasswordValid) {
        throw new ErrorManager({
          type: 'UNAUTHORIZED',
          message: 'Password incorrect try again',
        });
      }

      return userByEmailOrUsername;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async signJWT({ payload }: ISingJWT) {
    return this.jwtService.sign(payload);
  }

  public async generateJWT(user: UsersEntity): Promise<ISingUserJWT> {
    const getUser = await this.userServices.findUserByID(user.id);

    const payload: IPayloadToken = {
      role: getUser.role,
      sub: getUser.id,
    };

    return {
      accessToken: await this.signJWT({
        payload
      }),
      user,
    };
  }
}
