import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { NgIcon } from '@ng-icons/core';
import {
  RootButton,
  RootIconField,
  RootInput,
  RootShimmer,
} from '@techgarden/root-lib';
import { ApiService } from '../../../services/api.service';
import { ApiState } from '../../../model/api-state.type';

@Component({
  selector: 'sprout-note-list',
  imports: [
    CommonModule,
    RootIconField,
    RootButton,
    RootInput,
    NgIcon,
    RootShimmer,
  ],
  templateUrl: './note-list.component.html',
  styleUrl: './note-list.component.css',
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'flex flex-col gap-4',
  },
})
export class NoteListComponent implements OnInit {
  openedFolder: ApiState<any> = {
    data: undefined,
    loading: false,
    error: undefined,
    firstLoad: true,
  };

  constructor(private readonly apiService: ApiService) {}

  ngOnInit(): void {
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
  }


  getNoteContentByNoteId(noteId: string) {
      this.apiService.getNoteContentByNoteId(noteId).subscribe();
  }

}
