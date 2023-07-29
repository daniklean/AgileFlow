import { JwtPayload } from 'jsonwebtoken';

import { ROLES } from '../../config/roles';

export interface IPayloadToken {
  sub: string;
  role: ROLES;
}

export interface ISingJWT {
  payload: JwtPayload;
  secret: string;
  expires: number | string;
}

export interface IAuthLogin {
  username: string;
  password: string;
}

export interface IAuthTokenResult {
  role: string;
  sub: string;
  iat: number;
  exp: number;
}

export interface IUseToken {
  role: string;
  sub: string;
  isExpired: boolean;
}
