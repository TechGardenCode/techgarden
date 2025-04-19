import {
  Controller,
  Get,
  Body,
  Patch,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AccessTokenGuard } from 'src/auth/guards/access-token.guard';
import { User } from './schemas/user.schema';
import { Types } from 'mongoose';
import { Request } from 'express';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AccessTokenGuard)
  @Get()
  findById(@Req() req: Request) {
    const userId = req.user!['sub'] as Types.ObjectId;
    return this.usersService.findById(userId);
  }

  @UseGuards(AccessTokenGuard)
  @Patch()
  update(@Req() req: Request, @Body() user: User) {
    const userId = req.user!['sub'] as Types.ObjectId;
    return this.usersService.update(userId, user);
  }

  @UseGuards(AccessTokenGuard)
  @Delete()
  remove(@Req() req: Request) {
    const userId = req.user!['sub'] as Types.ObjectId;
    return this.usersService.remove(userId);
  }
}
