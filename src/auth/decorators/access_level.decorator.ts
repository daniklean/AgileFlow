import { SetMetadata } from '@nestjs/common';

import { ACCESS_LEVEL_KEY } from '../../config/keys.decorators';

export const AccessLevel = (level: number) =>
  SetMetadata(ACCESS_LEVEL_KEY, level);
