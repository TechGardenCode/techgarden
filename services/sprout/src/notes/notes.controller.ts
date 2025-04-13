import { Controller, Get, Param } from '@nestjs/common';
import { NotesService } from './notes.service';

@Controller('/notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Get('/:noteId')
  getNote(
    @Param('folderId') folderId: string,
    @Param('noteId') noteId: string,
  ) {
    return this.notesService.getNoteByFolderIdAndNoteId(folderId, noteId);
  }

  @Get('/content/:noteId')
  getNoteContentByNoteId(@Param('noteId') noteId: string) {
    return this.notesService.getNoteContentById(noteId);
  }
}
