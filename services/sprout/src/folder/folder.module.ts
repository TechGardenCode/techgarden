import { forwardRef, Module } from '@nestjs/common';
import { FolderService } from './folder.service';
import { FolderController } from './folder.controller';
import { OrchestratorModule } from 'src/orchestrator/orchestrator.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Folder, FolderSchema } from './schemas/folder.schemas';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Folder.name, schema: FolderSchema }]),
    forwardRef(() => OrchestratorModule),
  ],
  controllers: [FolderController],
  providers: [FolderService],
  exports: [FolderService],
})
export class FolderModule {}
