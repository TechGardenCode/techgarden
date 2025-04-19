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
import { AuthService } from './auth.service';
import { AuthModel } from './model/auth.model';
import { RefreshTokenGuard } from './guards/refresh-token.guard';
import { AccessTokenGuard } from './guards/access-token.guard';
import { Types } from 'mongoose';
import { User } from 'src/users/schemas/user.schema';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('signup')
  signup(@Body() user: User) {
    return this.authService.signUp(user);
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
    const userId = req.user!['sub'] as Types.ObjectId;
    const refreshToken = req.user!['refreshToken'] as string;
    return this.authService.refreshTokens(userId, refreshToken);
  }

  @UseGuards(AccessTokenGuard)
  @HttpCode(HttpStatus.OK)
  @Get('logout')
  logout(@Req() req: Request) {
    return this.authService.logout(req.user!['sub'] as Types.ObjectId);
  }
}
