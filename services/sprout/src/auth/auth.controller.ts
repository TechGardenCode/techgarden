import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { CreateUserModel } from 'src/users/model/create-user.model';
import { AuthService } from './auth.service';
import { AuthModel } from './model/auth.model';
import { RefreshTokenGuard } from './guards/refresh-token.guard';
import { AccessTokenGuard } from './guards/access-token.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('signup')
  signup(@Body() createUserModel: CreateUserModel) {
    return this.authService.signUp(createUserModel);
  }

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  signin(@Body() data: AuthModel) {
    return this.authService.signIn(data);
  }

  @UseGuards(RefreshTokenGuard)
  @HttpCode(HttpStatus.OK)
  @Get('refresh')
  refresh(@Req() req: Request) {
    if (!req.user || !req.user['sub'] || !req.user['refreshToken']) {
      throw new BadRequestException(
        'User information is missing in the request.',
      );
    }
    const userId: string = req.user['sub'];
    const refreshToken: string = req.user['refreshToken'];
    return this.authService.refreshTokens(userId, refreshToken);
  }

  @UseGuards(AccessTokenGuard)
  @HttpCode(HttpStatus.OK)
  @Get('logout')
  logout(@Req() req: Request) {
    return this.authService.logout(req.user!['sub']);
  }
}
