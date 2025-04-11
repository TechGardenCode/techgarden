import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RootComponent } from '@techgarden/root-lib';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'sprout';
}
