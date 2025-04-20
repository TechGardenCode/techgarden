import { forwardRef, Module } from '@nestjs/common';
import { OrchestratorService } from './orchestrator.service';
import { WorkspaceModule } from 'src/workspace/workspace.module';
import { FolderModule } from 'src/folder/folder.module';
import { CommonModule } from 'src/common/common.module';

@Module({
  imports: [
    CommonModule,
    forwardRef(() => WorkspaceModule),
    forwardRef(() => FolderModule),
  ],
  providers: [OrchestratorService],
  exports: [OrchestratorService],
})
export class OrchestratorModule {}
