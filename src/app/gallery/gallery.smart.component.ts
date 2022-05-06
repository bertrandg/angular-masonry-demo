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
  
  isLoading$ = this.storeService.isLoading$;
  photosList$ = this.storeService.photosList$;

  constructor(private storeService: StoreService) {}

  ngOnInit() {
    // Go load page 1
    this.loadNextPage();
  }

  loadNextPage() {
    this.storeService.loadNextPage();
  }
}
