import { Component, HostListener, OnInit } from '@angular/core';
import { NoteEditorComponent } from '../../components/note-editor/note-editor.component';
import {
  RootButton,
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
import { delay, OperatorFunction } from 'rxjs';
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

  visibleEditorActions = 4;
  activePageBreakpoint: RootBreakpoint = 'sm';

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
