import { Injectable } from '@nestjs/common';
import { Folder, FolderGroup, FolderWithNotes } from 'src/model/folder.type';
import { NotesService } from 'src/notes/notes.service';

@Injectable()
export class FoldersService {
  quickLinks: Folder[] = [
    {
      id: 'random-id-1',
      icon: 'true',
      title: 'All notes',
      count: undefined,
    },
    {
      id: 'random-id-2',
      icon: 'true',
      title: 'Reminders',
      count: undefined,
    },
    {
      id: 'random-id-3',
      icon: 'true',
      title: 'Tasks',
      count: undefined,
    },
    {
      id: 'random-id-4',
      icon: 'true',
      title: 'Favorites',
      count: undefined,
    },
    {
      id: 'random-id-5',
      icon: 'true',
      title: 'Highlights',
      count: undefined,
    },
    {
      id: 'random-id-6',
      icon: 'true',
      title: 'Activity',
      count: undefined,
    },
    {
      id: 'random-id-7',
      icon: 'true',
      title: 'Saved search',
      count: undefined,
    },
    {
      id: 'random-id-8',
      icon: 'false',
      title: 'Test search',
      count: 12,
    },
    {
      id: 'random-id-9',
      icon: 'false',
      title: 'My notes',
      count: 2,
    },
  ];

  folders: Folder[] = [
    {
      id: 'random-id-10',
      icon: 'true',
      title: 'School',
      count: 102,
      color: 'text-zinc-800 dark:text-zinc-200',
    },
    {
      id: 'random-id-11',
      icon: 'true',
      title: 'Work',
      count: 12,
      color: 'text-green-800 dark:text-green-200',
    },
    {
      id: 'random-id-12',
      icon: 'true',
      title: 'Personal',
      count: 2,
      color: 'text-blue-800 dark:text-blue-200',
    },
    {
      id: 'random-id-13',
      icon: 'true',
      title: 'Test folder',
      count: 0,
      color: 'text-yellow-800 dark:text-yellow-200',
    },
    {
      id: 'random-id-14',
      icon: 'true',
      title: 'My folder',
      count: 0,
      color: 'text-purple-800 dark:text-purple-200',
    },
  ];

  tags: Folder[] = [
    {
      id: 'random-id-15',
      icon: 'true',
      title: 'Design',
      count: 25,
      color: 'text-orange-800 dark:text-orange-200',
    },
    {
      id: 'random-id-16',
      icon: 'true',
      title: 'Screenshots',
      count: 33,
      color: 'text-red-800 dark:text-red-200',
    },
  ];

  constructor(private readonly notesService: NotesService) {}

  getFolders() {
    const folders: FolderGroup[] = [
      {
        title: 'Quick links',
        folders: this.quickLinks,
      },
      {
        title: 'Folders',
        folders: this.folders,
      },
      {
        title: 'Tags',
        folders: this.tags,
      },
    ];
    return folders;
  }

  getFolderById(id: string): FolderWithNotes {
    const allFolders = [...this.quickLinks, ...this.folders, ...this.tags];
    const folder = allFolders.find((folder) => folder.id === id);
    if (!folder) {
      throw new Error('Folder not found');
    }
    const folderWithNotes = {
      ...folder,
      notes: this.notesService.getNotesByFolderId(id),
    };
    return folderWithNotes;
  }
}
