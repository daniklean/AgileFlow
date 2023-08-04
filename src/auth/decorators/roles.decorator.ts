import { SetMetadata } from '@nestjs/common';

import { ROLES_KEY } from '../../config/keys.decorators';
import { ROLES } from '../../config/roles';

export const Roles = (...roles: Array<keyof typeof ROLES>) =>
  SetMetadata(ROLES_KEY, roles);
