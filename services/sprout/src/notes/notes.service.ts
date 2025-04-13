/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Injectable } from '@nestjs/common';
import { Note } from 'src/model/note.type';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';

@Injectable()
export class NotesService {
  sampleNotes: Note[] = [
    {
      id: 'note-id-1',
      folderId: '',
      title: 'Hive city',
      date: '2023-10-01',
      content:
        'A hive city is a theoretical type of arcology or vertical city that closely resembles a beehive in its density and organization.',
      tags: ['tag1', 'tag2'],
    },
    {
      id: 'note-id-2',
      folderId: '',
      title: 'A Room with a View',
      date: '2023-10-02',
      content:
        'A Room with a View is a 1908 novel by English writer E. M. Forster, about a young woman in the restrained culture of Edwardian-era England',
      tags: ['tag3', 'tag4'],
    },
    {
      id: 'note-id-3',
      folderId: '',
      title: 'Hive city',
      date: '2023-10-03',
      content:
        'A hive city is a theoretical type of arcology or vertical city that closely resembles a beehive in its density and organization.',
      tags: ['tag5', 'tag6'],
    },
  ];

  constructor(private readonly httpService: HttpService) {}

  async fetchNoteHtml(noteId: string) {
    const filePath = `http://localhost:3000/assets/notes/${noteId}.html`;
    const { data } = await firstValueFrom(
      this.httpService.get<string>(filePath).pipe(
        catchError((error) => {
          console.log(error);
          throw new Error('An error occurred');
        }),
      ),
    );
    return data;
  }

  getNotesByFolderId(folderId: string): Note[] {
    this.sampleNotes.map((note) => {
      return { ...note, folderId };
    });
    return this.sampleNotes;
  }

  getNoteByFolderIdAndNoteId(folderId: string, noteId: string): Note {
    const note = this.sampleNotes.find((note) => note.id === noteId);
    if (!note) {
      throw new Error('Note not found');
    }
    return { ...note, folderId };
  }

  async getNoteContentById(noteId: string): Promise<string> {
    const note = this.sampleNotes.find((note) => note.id === noteId);
    if (!note) {
      throw new Error('Note not found');
    }
    const htmlId = (
      ((parseInt(noteId.split('-')[noteId.split('-').length - 1]) + 1) % 2) +
      1
    ).toString();
    return await this.fetchNoteHtml(htmlId);
  }
}
