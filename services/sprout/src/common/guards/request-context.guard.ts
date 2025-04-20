import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { RequestContextService } from '../service/request-context.service';

@Injectable()
export class RequestContextGuard implements CanActivate {
  constructor(private readonly context: RequestContextService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (user?.sub) {
      this.context.userId = user.sub;
    }

    return true;
  }
}
