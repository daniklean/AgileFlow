import { SetMetadata } from '@nestjs/common';

import { PUBLIC_KEY } from '../../config/keys.decorators';

export const PublicAccess = () => SetMetadata(PUBLIC_KEY, true);
