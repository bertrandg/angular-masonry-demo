import { ChangeDetectionStrategy, Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';
import { IPhotoAugmented } from '../state.service';

@Component({
  selector: 'photo-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [`
    :host {
      display: block;
      position: relative;
    }
    :host > img {
      width: 100%;
      height: auto;
    }
    :host > div {
      position: absolute;
      bottom: 0;
      right: 0;
    }
    `],
  template: `
    <img [src]="url" />
    <div>
      <div>{{ photoDetails.nbLikes }}</div>
      <div>{{ photoDetails.nbComments }}</div>
    </div>
    `,
})
export class PhotoItemComponent {
  @Input() photoDetails: IPhotoAugmented;

  @Output() open = new EventEmitter<null>();

  randomValue = Math.round(Math.random() * 800);

  @HostBinding('click')
  click() {
    this.open.emit();
  }

  get url() {
    if(!this.photoDetails) {
      return '';
    }

    const _w = (this.photoDetails.width > this.photoDetails.height) ? this.photoDetails.width - this.randomValue : this.photoDetails.width;
    const _h = (this.photoDetails.height > this.photoDetails.width) ? this.photoDetails.height - this.randomValue : this.photoDetails.height;
    const size = getThumbnailSize(_w, _h, 400, 400);

    return `https://picsum.photos/id/${ this.photoDetails.id }/${ size.w }/${ size.h }`;
  }
}



function getThumbnailSize(currW: number, currH: number, maxW: number, maxH: number): {w: number, h: number} {
  if(currW < maxW && currH < maxH) {
    return {
      w: currW,
      h: currH,
    };
  }

  const ratioW = currW / maxW;
  const ratioH = currH / maxH;

  if(ratioW > ratioH) {
    return {
      h: Math.round(currH / ratioW),
      w: maxW,
    };
  }

  return {
      w: Math.round(currW / ratioH),
      h:  maxH,
  }

}