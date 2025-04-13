import { Note } from './note.type';

export type Folder = {
  id: string;
  title: string;
  icon?: string;
  color?: string;
  count?: number;
};

export type FolderWithNotes = Folder & {
  notes: Note[];
};

export type FolderGroup = {
  title: string;
  folders: Folder[];
};
