import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Request } from 'express';

import { ADMIN_KEY, PUBLIC_KEY, ROLES_KEY } from '../../config/keys.decorators';
import { ROLES } from '../../config/roles';
import { ErrorManager } from '../../utils/http.manager';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const isPublic = this.reflector.get<boolean>(
        PUBLIC_KEY,
        context.getHandler(),
      );

      if (isPublic) {
        return true;
      }
      const roles = this.reflector.get<Array<keyof typeof ROLES>>(
        ROLES_KEY,
        context.getHandler(),
      );

      const admin = this.reflector.get<string>(ADMIN_KEY, context.getHandler());

      const req = context.switchToHttp().getRequest<Request>();

      const { roleUser } = req;

      if (roles === undefined) {
        if (!admin) {
          return true;
        } else if (admin && roleUser == admin) {
          return true;
        } else {
          throw new ErrorManager({
            type: 'UNAUTHORIZED',
            message: 'Not permission for request',
          });
        }
      }

      if (roleUser === ROLES.ADMIN) {
        return true;
      }

      const totalRole = roles.some((role) => role === roleUser);
      if (!totalRole) {
        throw new ErrorManager({
          type: 'UNAUTHORIZED',
          message: 'Not permission for request',
        });
      }
      return true;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }
}
