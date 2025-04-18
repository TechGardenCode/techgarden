import { Component, HostListener, OnInit } from '@angular/core';
import { NoteEditorComponent } from '../../components/note-editor/note-editor.component';
import {
  RootAvatar,
  RootButton,
  RootIconField,
  RootInput,
  RootLayoutService,
  RootShimmer,
  RootBreakpoint,
} from '@techgarden/root-lib';
import { CommonModule } from '@angular/common';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  heroArrowPath,
  heroArrowsPointingIn,
  heroArrowsPointingOut,
  heroBell,
  heroBoltSlash,
  heroChevronLeft,
  heroChevronRight,
  heroEllipsisHorizontal,
  heroFlag,
  heroHeart,
  heroPaperClip,
  heroPlus,
  heroShare,
  heroTag,
} from '@ng-icons/heroicons/outline';
import { HttpClient } from '@angular/common/http';
import { delay, of, OperatorFunction, tap } from 'rxjs';
import { ApiService } from '../../services/api.service';
import { ApiState } from '../../model/api-state.type';
import { AuthService } from '../../services/auth.service';
import { WorkspaceComponent } from './workspace/workspace.component';
import { NoteListComponent } from './note-list/note-list.component';

@Component({
  selector: 'app-index',
  imports: [
    CommonModule,
    NoteEditorComponent,
    RootButton,
    RootInput,
    RootIconField,
    NgIcon,
    RootShimmer,
    WorkspaceComponent,
    NoteListComponent,
  ],
  providers: [
    provideIcons({
      heroChevronLeft,
      heroChevronRight,
      heroArrowPath,
      heroPlus,
      heroBoltSlash,
      heroPaperClip,
      heroArrowsPointingOut,
      heroArrowsPointingIn,
      heroBell,
      heroShare,
      heroEllipsisHorizontal,
      heroTag,
      heroHeart,
      heroFlag,
    }),
  ],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css',
})
export class IndexComponent implements OnInit {
  sidebarState = {
    folders: {
      isVisible: false,
    },
    notes: {
      isVisible: false,
    },
  };
  isSidebarVisible = false;
  visibleEditorActions = 4;
  activePageBreakpoint: RootBreakpoint = 'sm';

  noteState: any = {
    data: undefined,
    loading: false,
    error: undefined,
    firstLoad: true,
  };

  folderState: any = {
    data: undefined,
    loading: false,
    error: undefined,
    firstLoad: true,
  };

  openedFolder: ApiState<any> = {
    data: undefined,
    loading: false,
    error: undefined,
    firstLoad: true,
  };

  noteContent: ApiState<any> = {
    data: {},
    loading: false,
    error: undefined,
    firstLoad: true,
  };

  quickLinks = [
    {
      id: 'random-id-1',
      icon: true,
      title: 'All notes',
      count: undefined,
    },
    {
      id: 'random-id-2',
      icon: true,
      title: 'Reminders',
      count: undefined,
    },
    {
      id: 'random-id-3',
      icon: true,
      title: 'Tasks',
      count: undefined,
    },
    {
      id: 'random-id-4',
      icon: true,
      title: 'Favorites',
      count: undefined,
    },
    {
      id: 'random-id-5',
      icon: true,
      title: 'Highlights',
      count: undefined,
    },
    {
      id: 'random-id-6',
      icon: true,
      title: 'Activity',
      count: undefined,
    },
    {
      id: 'random-id-7',
      icon: true,
      title: 'Saved search',
      count: undefined,
    },
    {
      id: 'random-id-8',
      icon: false,
      title: 'Test search',
      count: 12,
    },
    {
      id: 'random-id-9',
      icon: false,
      title: 'My notes',
      count: 2,
    },
  ];

  folders = [
    {
      id: 'random-id-10',
      icon: true,
      title: 'School',
      count: 102,
      color: 'text-zinc-800 dark:text-zinc-200',
    },
    {
      id: 'random-id-11',
      icon: true,
      title: 'Work',
      count: 12,
      color: 'text-green-800 dark:text-green-200',
    },
    {
      id: 'random-id-12',
      icon: true,
      title: 'Personal',
      count: 2,
      color: 'text-blue-800 dark:text-blue-200',
    },
    {
      id: 'random-id-13',
      icon: true,
      title: 'Test folder',
      count: 0,
      color: 'text-yellow-800 dark:text-yellow-200',
    },
    {
      id: 'random-id-14',
      icon: true,
      title: 'My folder',
      count: 0,
      color: 'text-purple-800 dark:text-purple-200',
    },
  ];

  tags = [
    {
      id: 'random-id-15',
      icon: true,
      title: 'Design',
      count: 25,
      color: 'text-orange-800 dark:text-orange-200',
    },
    {
      id: 'random-id-16',
      icon: true,
      title: 'Screenshots',
      count: 33,
      color: 'text-red-800 dark:text-red-200',
    },
  ];

  sampleNotes = [
    {
      id: 1,
      title: 'Hive city',
      date: '2023-10-01',
      content:
        'A hive city is a theoretical type of arcology or vertical city that closely resembles a beehive in its density and organization.',
      tags: ['tag1', 'tag2'],
    },
    {
      id: 2,
      title: 'A Room with a View',
      date: '2023-10-02',
      content:
        'A Room with a View is a 1908 novel by English writer E. M. Forster, about a young woman in the restrained culture of Edwardian-era England',
      tags: ['tag3', 'tag4'],
    },
    {
      id: 3,
      title: 'Hive city',
      date: '2023-10-03',
      content:
        'A hive city is a theoretical type of arcology or vertical city that closely resembles a beehive in its density and organization.',
      tags: ['tag5', 'tag6'],
    },
  ];

  editorActions = [
    {
      title: 'Attach file',
      icon: 'heroPaperClip',
    },
    {
      title: 'Notifications',
      icon: 'heroBell',
    },
    {
      title: 'Share',
      icon: 'heroShare',
    },
    {
      title: 'Expand',
      altTitle: 'Collapse',
      active: false,
      icon: 'heroArrowsPointingOut',
      altIcon: 'heroArrowsPointingIn',
      action: (active: boolean) => (active = !active),
    },
    {
      title: 'Add to favorites',
      icon: 'heroHeart',
    },
    {
      title: 'Pin note',
      icon: 'heroFlag',
    },
  ];

  constructor(
    private readonly rootLayoutService: RootLayoutService,
    private readonly apiService: ApiService,
    private readonly authService: AuthService,
  ) {}

  ngOnInit() {
    this.initSubs();
    this.getFolderGroups();
    this.onResize();
  }

  initSubs() {
    this.apiService.folder$.subscribe((folder) => {
      this.openedFolder = folder;
      if (this.openedFolder.loading || this.openedFolder.firstLoad) {
        return;
      }
      if (!this.openedFolder.data?.notes.length) {
        return;
      }
      const firstNote = this.openedFolder.data.notes[0];
      if (!firstNote) {
        return;
      }
      this.getNoteContentByNoteId(firstNote.id);
    });

    this.apiService.noteContent$.subscribe((noteContent) => {
      this.noteContent = noteContent;
    });
  }

  getFolderGroups() {
    this.apiService.getFolders().subscribe();
  }

  getFolderById(id: string) {
    this.apiService.getFolderById(id).subscribe();
  }

  getNoteContentByNoteId(noteId: string) {
    this.apiService.getNoteContentByNoteId(noteId).subscribe();
  }

  @HostListener('window:resize')
  onResize() {
    const pageWidth = window.innerWidth;
    const editorWidth = pageWidth - this.getLeftSidebarWidth() - 32;
    const availButtonsWidth = editorWidth - 208;
    const numButtons = Math.floor(Math.max(120, availButtonsWidth) / 40);
    this.visibleEditorActions = Math.min(
      Math.min(6, numButtons),
      this.editorActions.length,
    );
  }

  getLeftSidebarWidth(): number {
    const breakpoint = this.rootLayoutService.rootBreakpoint;
    switch (breakpoint) {
      case 'xs':
        return 0;
      case 'sm':
        return 224;
      case 'md':
        return 320;
      case 'lg':
      case 'xl':
      case '2xl':
      default:
        return 320 + 256;
    }
  }

  toggleSidebar(state?: 'folders' | 'notes') {
    this.isSidebarVisible = !this.isSidebarVisible;
    if (state) {
      const keys: ('folders' | 'notes')[] = ['folders', 'notes'];
      keys.forEach((key) => {
        if (key !== state) {
          this.sidebarState[key].isVisible = false;
        }
      });
      this.sidebarState[state].isVisible = !this.sidebarState[state].isVisible;
    }
  }

  demoDelay(min: number, range: number): OperatorFunction<any, any> {
    return delay(Math.random() * range + min);
  }

  logout() {
    this.authService.logout();
  }
}
