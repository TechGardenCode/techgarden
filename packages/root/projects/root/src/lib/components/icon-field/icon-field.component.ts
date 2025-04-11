import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'root-icon-field',
  imports: [],
  templateUrl: './icon-field.component.html',
  styleUrl: './icon-field.component.css',
  host: {
    class: 'root-icon-field relative',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class RootIconField {}
