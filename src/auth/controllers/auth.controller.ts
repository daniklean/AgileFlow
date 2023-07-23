import { Body, Controller, Post } from '@nestjs/common';

import { AuthService } from '../services/auth.service';
import { IAuthLogin } from '../interfaces/auth.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() { username, password }: IAuthLogin) {
    const userValidate = await this.authService.userValidate(
      username,
      password,
    );

    const jwt = await this.authService.generateJWT(userValidate);

    return jwt;
  }
}
