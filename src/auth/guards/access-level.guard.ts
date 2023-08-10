import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Request } from 'express';

import {
  ACCESS_LEVEL_KEY,
  ADMIN_KEY,
  PUBLIC_KEY,
  ROLES_KEY,
} from '../../config/keys.decorators';
import { ACCESS_LEVEL, ROLES } from '../../config/roles';
import { ErrorManager } from '../../utils/http.manager';
import { UsersService } from '../../users/services/users.service';

@Injectable()
export class AccessLevelGuard implements CanActivate {
  constructor(
    private readonly userService: UsersService,
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

      const roles = this.reflector.get<Array<keyof typeof ROLES>>(
        ROLES_KEY,
        context.getHandler(),
      );

      const accessLevel = this.reflector.get<keyof typeof ACCESS_LEVEL>(
        ACCESS_LEVEL_KEY,
        context.getHandler(),
      );

      const admin = this.reflector.get<string>(ADMIN_KEY, context.getHandler());

      const req = context.switchToHttp().getRequest<Request>();

      const { roleUser, idUser } = req;

      if (accessLevel === undefined) {
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
      }

      if (roleUser === ROLES.ADMIN || roleUser === ROLES.CREATOR) {
        return true;
      }

      const user = await this.userService.findUserByID(idUser);

      const userExistInProject = user.projectsIncludes.find(
        (project) => project.project.id === req.params.projectId,
      );

      if (!userExistInProject) {
        throw new ErrorManager({
          type: 'UNAUTHORIZED',
          message: 'Not you belong for project requested',
        });
      }

      if (ACCESS_LEVEL[accessLevel] > userExistInProject.accessLevel) {
        throw new ErrorManager({
          type: 'UNAUTHORIZED',
          message: 'Need access level necessary for request',
        });
      }
      return true;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }
}
