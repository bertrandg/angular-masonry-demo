import { ChangeDetectionStrategy, Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';
import { IPhotoAugmented } from '../state.service';

@Component({
  selector: 'photo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div>
      <img [src]="photoDetails.download_url" />
      <p>{{ photoDetails.nbLikes }}</p>
      <p>{{ photoDetails.nbComments }}</p>
    </div>`,
})
export class PhotoComponent {
  @Input() photoDetails: IPhotoAugmented;

  @Output() open = new EventEmitter<null>();

  @HostBinding('click')
  click() {
    this.open.emit();
  }
}
