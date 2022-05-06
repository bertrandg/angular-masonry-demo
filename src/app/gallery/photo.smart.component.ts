import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IPhotoAugmented, StoreService } from '../state.service';

@Component({
  selector: 'photo-smart',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <photo
      [photoDetails]="photoDetails$ | async"
      (open)="open()"
    ></photo>`,
})
export class PhotoSmartComponent implements OnInit {
  @Input() id: string;
  
  photoDetails$: Observable<IPhotoAugmented>;

  constructor(private storeService: StoreService) {}

  ngOnInit() {
    this.photoDetails$ = this.storeService.getPhotoDetails(this.id);
  }

  open() {
    console.log('open photo ', this.id)
  }
}
