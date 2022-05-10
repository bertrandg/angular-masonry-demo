import { ChangeDetectionStrategy, Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';
import { IPhotoAugmented } from '../state.service';

@Component({
  selector: 'photo-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div>
      <img [src]="url" />
      <p>{{ photoDetails.nbLikes }}</p>
      <p>{{ photoDetails.nbComments }}</p>
    </div>`,
})
export class PhotoItemComponent {
  @Input() photoDetails: IPhotoAugmented;

  @Output() open = new EventEmitter<null>();

  @HostBinding('click')
  click() {
    this.open.emit();
  }

  get url() {
    return `https://picsum.photos/id/${ this.photoDetails.id }/200/300`;
  }
}
