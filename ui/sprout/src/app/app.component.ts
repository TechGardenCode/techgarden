import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { environment } from '../environments/environment';
import posthog from 'posthog-js';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'sprout';

  ngOnInit(): void {
    posthog.init(environment.POSTHOG_KEY, {
      api_host: environment.POSTHOG_HOST,
    });
  }
}
