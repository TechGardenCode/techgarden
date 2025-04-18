import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, of, tap } from 'rxjs';
import { ApiState } from '../model/api-state.type';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  folders: ApiState<any[]> = {
    data: [],
    loading: false,
    error: undefined,
    firstLoad: true,
  };
  foldersSubject = new BehaviorSubject(this.folders);
  folders$ = this.foldersSubject.asObservable();

  folder: ApiState<any> = {
    data: undefined,
    loading: false,
    error: undefined,
    firstLoad: true,
  };
  folderSubject = new BehaviorSubject(this.folder);
  folder$ = this.folderSubject.asObservable();

  noteContent: ApiState<{ content: string; id: string }> = {
    data: undefined,
    loading: false,
    error: undefined,
    firstLoad: true,
  };
  noteContentSubject = new BehaviorSubject(this.noteContent);
  noteContent$ = this.noteContentSubject.asObservable();

  constructor(private readonly http: HttpClient) {}

  getFolders() {
    this.apiLoading(this.folders);
    this.foldersSubject.next(this.folders);
    this.apiLoading(this.folder);
    this.folderSubject.next(this.folder);
    this.apiLoading(this.noteContent);
    this.noteContentSubject.next(this.noteContent);

    return this.http.get(`${environment.apiUrl}/folders`).pipe(
      tap({
        next: (response) => {
          this.folders.data = response as any[];
          this.folders.loading = false;
          this.folders.error = undefined;
          this.foldersSubject.next(this.folders);
        },
        error: (error) => {
          this.folders.loading = false;
          this.folders.error = error;
          this.foldersSubject.next(this.folders);
        },
      }),
    );
  }

  getFolderById(id: string) {
    if (this.folder.data?.id === id) {
      return of();
    }

    this.apiLoading(this.folder);
    this.folderSubject.next(this.folder);
    this.apiLoading(this.noteContent);
    this.noteContentSubject.next(this.noteContent);

    return this.http.get(`${environment.apiUrl}/folders/${id}`).pipe(
      tap({
        next: (response) => {
          this.folder.data = response as any;
          this.folder.loading = false;
          this.folder.error = undefined;
          this.folderSubject.next(this.folder);
        },
        error: (error) => {
          this.folder.loading = false;
          this.folder.error = error;
          this.folderSubject.next(this.folder);
        },
      }),
    );
  }

  getNoteContentByNoteId(noteId: string) {
    if (this.noteContent.data?.id === noteId) {
      return of();
    }
    this.apiLoading(this.noteContent);
    this.noteContentSubject.next(this.noteContent);

    return this.http
      .get(`${environment.apiUrl}/notes/content/${noteId}`, {
        responseType: 'text',
      })
      .pipe(
        tap({
          next: (response) => {
            this.noteContent.data = { content: response, id: noteId };
            this.noteContent.loading = false;
            this.noteContent.error = undefined;
            this.noteContentSubject.next(this.noteContent);
          },
          error: (error) => {
            this.noteContent.loading = false;
            this.noteContent.error = error;
            this.noteContentSubject.next(this.noteContent);
          },
        }),
      );
  }

  apiLoading(apiState: ApiState<unknown>) {
    apiState.loading = true;
    apiState.firstLoad = false;
    apiState.data = undefined;
  }
}
