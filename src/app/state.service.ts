import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class StoreService {
  private currentPage = 0;
  private isLoading$ = new BehaviorSubject<boolean>(false);
  private photosList$ = new BehaviorSubject<Array<string>>([]);
  private photosDetails$ = new BehaviorSubject<{[id: string]: IPhotoAugmented}>({});

  constructor(private http: HttpClient) { }

  loadNextPage() {
    if(this.isLoading$.value) {
      return;
    }

    this.isLoading$.next(true);

    const pageToLoad = this.currentPage + 1;

    this.loadPhotos(pageToLoad).subscribe({
      next: results => {
        this.photosDetails$.next({
          ...this.photosDetails$.value,
          ...results.reduce((acc, r) => {
            acc[r.id] = {
              ...r,
              nbLikes: 0,
              nbComments: 0,
            };
            return acc;
          }, {}),
        });

        this.photosList$.next([
          ...this.photosList$.value, 
          ...results.map(r => r.id)
        ]);

        this.isLoading$.next(false);
        
        this.currentPage = pageToLoad;
      },
      error: err => {
        this.isLoading$.next(false);

        console.error('WTF MARTY >', err);
      },
    });
  }

  private loadPhotos(page: number) {
    const url = `https://picsum.photos/v2/list?page=${ page }&limit=10`;
    return this.http.get<Array<IPhoto>>(url);
  }

  getIsLoading() {
    return this.isLoading$.asObservable();
  }

  getPhotosList() {
    return this.photosList$.asObservable();
  }

  getPhotoDetails(id: string) {
    return this.photosDetails$.pipe(
      map(d => d[id]),
      distinctUntilChanged(),
    );
  }
}


export interface IPhotoAugmented extends IPhoto {
  nbLikes: number;
  nbComments: number;
}

interface IPhoto {
  id: string;
  author: string;
  width: number;
  height: number;
  url: string;
  download_url: string;
}