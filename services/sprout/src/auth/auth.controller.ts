import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
} from '@nestjs/common';
import { Public } from './auth.guard';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Public()
  @Post('login')
  signIn(@Body() signInDto: Record<string, string>) {
    return this.authService.signIn(signInDto.username, signInDto.password);
  }

  @HttpCode(HttpStatus.CREATED)
  @Public()
  @Post('register')
  createUser(@Body() signUpDto: Record<string, string>) {
    if (process.env.REGISTRATION_DISABLED === 'true') {
      throw new BadRequestException('Registration is currently disabled');
    }
    const { username, password } = signUpDto;
    return this.authService.createUser({ username, password });
  }

  @Get('profile')
  getProfile(@Request() req: { user: unknown }) {
    return req.user;
  }
}
