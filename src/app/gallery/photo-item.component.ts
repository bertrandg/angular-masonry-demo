import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, HostBinding, HostListener, Input, OnInit, Output } from '@angular/core';
import { IPhotoAugmented } from '../state.service';

@Component({
  selector: 'photo-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: [`./photo-item.component.scss`],
  templateUrl: `./photo-item.component.html`,
})
export class PhotoItemComponent implements OnInit {
  @Input() photoDetails: IPhotoAugmented;

  @Output() open = new EventEmitter<null>();

  imageSrc: string;
  isLoaded = false;
  randomNum = Math.round(Math.random()*10) + 1;
  randomDelay = Math.round(Math.random()*10)/10/2;
  randomValue = Math.round(Math.random() * 800);

  @HostBinding('style.height.px')
  containerHeight: number;
  
  @HostBinding('class')
  get cssClasses(): string {
    return `bg-color-variant-${ this.randomNum }`;
  };

  @HostListener('click')
  click() {
    this.open.emit();
  }

  constructor(private cdRef: ChangeDetectorRef) {}

  ngOnInit() {
    const _w = (this.photoDetails.width > this.photoDetails.height) ? this.photoDetails.width - this.randomValue : this.photoDetails.width;
    const _h = (this.photoDetails.height > this.photoDetails.width) ? this.photoDetails.height - this.randomValue : this.photoDetails.height;
    const imageSize = getThumbnailSize(_w, _h, 400, 400);

    this.imageSrc = `https://picsum.photos/id/${ this.photoDetails.id }/${ imageSize.w }/${ imageSize.h }`;

    const containerSize = getThumbnailSize(_w, _h, 250, 400);
    this.containerHeight = containerSize.h - 1;
  }

  imageLoaded() {
    setTimeout(() => {
      this.isLoaded = true;
      this.cdRef.markForCheck();
    }, this.randomDelay);
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