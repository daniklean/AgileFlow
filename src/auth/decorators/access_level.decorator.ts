import { SetMetadata } from '@nestjs/common';

import { ACCESS_LEVEL_KEY } from '../../config/keys.decorators';
import { ACCESS_LEVEL } from '../../config/roles';

export const AccessLevel = (level: keyof typeof ACCESS_LEVEL) =>
  SetMetadata(ACCESS_LEVEL_KEY, level);
