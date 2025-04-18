import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroArrowPath } from '@ng-icons/heroicons/outline';
import { RootAvatar, RootButton, RootShimmer } from '@techgarden/root-lib';
import { ApiState } from '../../../model/api-state.type';
import { ApiService } from '../../../services/api.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'sprout-index-workspace',
  imports: [CommonModule, RootAvatar, NgIcon, RootShimmer, RootButton],
  providers: [provideIcons({ heroArrowPath })],
  templateUrl: './workspace.component.html',
  styleUrl: './workspace.component.css',
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'flex flex-col gap-4',
  },
})
export class WorkspaceComponent implements OnInit {
  folderGroups: ApiState<any[]> = {
    data: undefined,
    loading: false,
    error: undefined,
    firstLoad: true,
  };

  constructor(
    private readonly apiService: ApiService,
    private readonly authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.apiService.folders$.subscribe((folders) => {
      this.folderGroups = folders;
      if (this.folderGroups.loading || this.folderGroups.firstLoad) {
        return;
      }
      const firstFolderGroup = folders.data?.[0];
      if (!firstFolderGroup) {
        return;
      }
      const firstFolder = firstFolderGroup.folders?.[0];
      if (!firstFolder) {
        return;
      }
      this.getFolderById(firstFolder.id);
    });
  }

  logout() {
    this.authService.logout();
  }

  getFolderGroups() {
    this.apiService.getFolders().subscribe();
  }

  getFolderById(id: string) {
    this.apiService.getFolderById(id).subscribe();
  }
}
