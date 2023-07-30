import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';

import { UsersService } from '../../users/services/users.service';
import { PUBLIC_KEY } from '../../config/keys.decorators';
import { ErrorManager } from '../../utils/http.manager';
import { IUseToken } from '../interfaces/auth.interface';
import { useToken } from '../../utils/use.token';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly userServices: UsersService,
    private readonly reflector: Reflector,
  ) {}
  async canActivate(context: ExecutionContext) {
    try {
      const isPublic = this.reflector.get<boolean>(
        PUBLIC_KEY,
        context.getHandler(),
      );

      if (isPublic) {
        return true;
      }

      const req = context.switchToHttp().getRequest<Request>();

      const token = req.headers['x_header_access_token'];

      if (!token || Array.isArray(token)) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: '[TOKEN] INVALID',
        });
      }

      const manageToken: IUseToken | string = useToken(token);

      if (typeof manageToken === 'string') {
        throw new ErrorManager({
          type: 'UNAUTHORIZED',
          message: `[TOKEN] ${manageToken}`,
        });
      }

      if (manageToken.isExpired) {
        throw new ErrorManager({
          type: 'UNAUTHORIZED',
          message: `[TOKEN] Expired`,
        });
      }
      const { sub } = manageToken;

      const user = await this.userServices.findUserByID(sub);
      //const user = null;
      if (!user) {
        throw new ErrorManager({
          type: 'UNAUTHORIZED',
          message: `[USER] Not Exist`,
        });
      }
      req.idUser = user.id;
      req.roleUser = user.role;
      return true;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }
}
