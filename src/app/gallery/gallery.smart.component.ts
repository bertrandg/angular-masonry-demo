import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { StoreService } from '../state.service';

@Component({
  selector: 'gallery-smart',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <gallery
      [nbColumns]="nbColumns"
      [isLoading]="isLoading$ | async"
      [photosList]="photosList$ | async"
      (loadNextPage)="loadNextPage()"
    ></gallery>`,
})
export class GallerySmartComponent implements OnInit {
  @Input() nbColumns: number;
  
  isLoading$ = this.storeService.getIsLoading();
  photosList$ = this.storeService.getPhotosList();

  constructor(private storeService: StoreService) {
    console.log('GallerySmartComponent');
  }

  ngOnInit() {
    // Go load page 1
    this.loadNextPage();
  }

  loadNextPage() {
    this.storeService.loadNextPage();
  }
}
