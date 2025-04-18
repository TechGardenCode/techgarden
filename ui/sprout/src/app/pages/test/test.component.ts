import {
  Component,
} from '@angular/core';
import { RootFormField, RootInput } from '@techgarden/root-lib';

@Component({
  selector: 'sprout-test',
  imports: [RootInput, RootFormField],
  templateUrl: './test.component.html',
  styleUrl: './test.component.css'
})
export class TestComponent {}
