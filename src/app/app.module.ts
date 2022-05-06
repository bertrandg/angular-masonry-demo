import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { StoreService } from './state.service';
import { MasonryPipe } from './gallery/masonry.pipe';
import { GallerySmartComponent } from './gallery/gallery.smart.component';
import { GalleryComponent } from './gallery/gallery.component';
import { PhotoSmartComponent } from './gallery/photo.smart.component';
import { PhotoComponent } from './gallery/photo.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports:      [ 
    BrowserModule, 
    FormsModule,
    HttpClientModule,
  ],
  declarations: [ 
    AppComponent, 
    MasonryPipe,
    GallerySmartComponent,
    GalleryComponent,
    PhotoSmartComponent,
    PhotoComponent,
  ],
  bootstrap:    [ AppComponent ],
  providers:    [ StoreService ],
})
export class AppModule { }

