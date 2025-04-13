import { ChangeDetectionStrategy, Component, ElementRef, Input, ViewChild, ViewEncapsulation } from '@angular/core';
import { SafeHtmlPipe } from '../../pipes/safe-html.pipe';

@Component({
  selector: 'sprout-note-editor',
  imports: [SafeHtmlPipe],
  templateUrl: './note-editor.component.html',
  styleUrl: './note-editor.component.css',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'root-note-editor w-full h-full',
  }
})
export class NoteEditorComponent {
  @ViewChild('editor') editor!: ElementRef<HTMLElement>;
  @Input() content?: string = '';

  onKeydown(event: KeyboardEvent) {
    // console.log(window.getSelection());
    // if (this.isModifierKeyPressed(event) && /1|2|3|4|5|6/gi.test(event.key)) {
    //   event.preventDefault();
    //   event.stopPropagation();
    //   if (!event.target) return;
    //   const target = event.target as HTMLElement;
    //   target.classList.add('text-2xl');
    //   console.log(event.target);
    // }
    // if (event.key === 'Enter') {
    //   event.preventDefault();
    //   event.stopPropagation();
    //   console.log('Enter key pressed');
    // }
  }

  isModifierKeyPressed(event: KeyboardEvent): boolean {
    const isMac = /Macintosh|Mac|Mac OS|MacIntel|MacPPC|Mac68K/gi.test(
      window.navigator.userAgent,
    );

    if (isMac) {
      return event.metaKey;
    } else {
      return event.ctrlKey;
    }
  }
}
