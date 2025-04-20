import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { WorkspaceModule } from './workspace/workspace.module';
import { FolderModule } from './folder/folder.module';
import { TagModule } from './tag/tag.module';
import { OrchestratorModule } from './orchestrator/orchestrator.module';
import { RequestContextMiddleware } from './common/middleware/request-context.middleware';
import { RequestContextService } from './common/service/request-context.service';
import { CommonModule } from './common/common.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, 'assets', 'notes'),
      serveRoot: '/assets/notes',
    }),
    ConfigModule.forRoot(),
    MongooseModule.forRoot(
      `mongodb://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_URL}`,
    ),
    UsersModule,
    AuthModule,
    WorkspaceModule,
    FolderModule,
    TagModule,
    CommonModule,
    OrchestratorModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
