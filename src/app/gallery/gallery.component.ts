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
    {{ isLoading | json }}
    {{ photosList | json }}
    <section>
      <div *ngFor="let col of colsAsIterable; index as i" class="masonry-column">
        <!--<photo-smart 
          *ngFor="let id of photosList | masonry : colsAsIterable.length : i+1" 
          [id]="id"
        ></photo-smart>-->
      </div>
      <div>
        <div *ngIf="isLoading">loading..</div>
        <button *ngIf="!isLoading" (click)="loadNextPage.emit()">LOAD MORE</button>
      </div>
    </section>`,
})
export class GalleryComponent {
  @Input() isLoading: boolean;
  @Input() photosList: Array<string>;
  @Input() set nbColumns(v: number) {
    this.colsAsIterable = new Array(v).fill(1);
  };
  colsAsIterable: Array<1> = [];

  @Output() loadNextPage = new EventEmitter<null>();

}
