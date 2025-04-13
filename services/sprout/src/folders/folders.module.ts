import { Module } from '@nestjs/common';
import { FoldersController } from './folders.controller';
import { FoldersService } from './folders.service';
import { NotesModule } from 'src/notes/notes.module';

@Module({
  imports: [NotesModule],
  controllers: [FoldersController],
  providers: [FoldersService],
})
export class FoldersModule {}
