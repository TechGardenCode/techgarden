import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { QuillModule } from 'ngx-quill';

@Component({
  selector: 'sprout-note-editor',
  imports: [QuillModule, FormsModule],
  templateUrl: './note-editor.component.html',
  styleUrl: './note-editor.component.css',
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'flex flex-col grow max-h-full',
  },
})
export class NoteEditorComponent {
  @Input() content: string = '';
  @Output() contentChange: EventEmitter<string> = new EventEmitter<string>();
}
