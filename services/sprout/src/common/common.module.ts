import { Global, Module } from '@nestjs/common';
import { RequestContextService } from './service/request-context.service';
import { RequestContextGuard } from './guards/request-context.guard';
import { RequestContextMiddleware } from './middleware/request-context.middleware';

@Global()
@Module({
  providers: [
    RequestContextService,
    RequestContextGuard,
    RequestContextMiddleware,
  ],
  exports: [
    RequestContextService,
    RequestContextGuard,
    RequestContextMiddleware,
  ],
})
export class CommonModule {}
