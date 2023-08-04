import { SetMetadata } from '@nestjs/common';

import { ADMIN_KEY } from '../../config/keys.decorators';
import { ROLES } from '../../config/roles';

export const AdminAccess = () => SetMetadata(ADMIN_KEY, ROLES.ADMIN);
