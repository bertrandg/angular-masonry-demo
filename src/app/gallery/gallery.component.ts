import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'gallery',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [`
    section {
      display: grid;
      grid-auto-flow: column;
    }
    
    .masonry-column {

    }`],
  template: `
    <section>
      <div *ngFor="let col of cols; index as i" class="masonry-column">
        <photo-item-smart 
          *ngFor="let id of photosList | masonry : nbCols : i+1" 
          [id]="id"
        ></photo-item-smart>
      </div>
    </section>
      <div>
        <div *ngIf="isLoading">loading..</div>
        <button *ngIf="!isLoading" (click)="loadNextPage.emit()">LOAD MORE</button>
      </div>`,
})
export class GalleryComponent {
  @Input() isLoading: boolean;
  @Input() photosList: Array<string>;
  @Input() set nbColumns(v: number) {
    this.nbCols = v;
    this.cols = new Array(v).fill(1);
    console.log('this.cols = ', this.cols)
  };
  nbCols = 0;
  cols: Array<number> = [];

  @Output() loadNextPage = new EventEmitter<null>();

  constructor() {
    console.log('GalleryComponent');
  }
}
