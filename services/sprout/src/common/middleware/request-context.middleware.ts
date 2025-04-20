import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { RequestContextService } from '../service/request-context.service';
import mongoose from 'mongoose';

@Injectable()
export class RequestContextMiddleware implements NestMiddleware {
  constructor(private readonly context: RequestContextService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const user = req.user;
    if (!user) {
      return next();
    }
    const userId = req.user!['sub'] as mongoose.Types.ObjectId; // assuming req.user is populated by auth
    if (userId) {
      this.context.userId = userId;
    }
    next();
  }
}
