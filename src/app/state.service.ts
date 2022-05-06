import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class StoreService {
  photosList$ = new BehaviorSubject<IList>({page: 0, isLoading: false, ids: []});
  photosDetails$ = new BehaviorSubject<IDetails>({});

  constructor(private http: HttpClient) { }

  loadNextPage() {
    if(this.photosList$.value.isLoading) {
      return;
    }

    this.photosList$.next({
      ...this.photosList$.value,
      isLoading: true,
    });

    const pageToLoad = this.photosList$.value.page + 1;

    this.loadPhotos(pageToLoad).subscribe({
      next: results => {
        this.photosDetails$.next({
          ...this.photosDetails$.value,
          ...results.reduce((acc, r) => {
            acc[r.id] = {
              ...r,
              nb_likes: 0,
              nb_comments: 0,
            };
            return acc;
          }, {}),
        });

        this.photosList$.next({
          page: pageToLoad,
          isLoading: false,
          ids: [...this.photosList$.value.ids, ...results.map(r => r.id)],
        });
      },
      error: err => {
        console.error('WTF MARTY >', err);
      },
    });
  }

  private loadPhotos(page: number) {
    const url = `https://picsum.photos/v2/list?page=${ page }&limit=10`;
    return this.http.get<Array<IPhoto>>(url);
  }
}


interface IList {
  page: number;
  isLoading: boolean;
  ids: Array<string>;
}

interface IDetails {
  [id: string]: IPhotoAugmented;
}

interface IPhotoAugmented extends IPhoto {
  nb_likes: number;
  nb_comments: number;
}

interface IPhoto {
  id: string;
  author: string;
  width: number;
  height: number;
  url: string;
  download_url: string;
}