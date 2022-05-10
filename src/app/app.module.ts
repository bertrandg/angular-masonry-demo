import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

import { AppComponent } from './app.component';
import { StoreService } from './state.service';
import { MasonryPipe } from './gallery/masonry.pipe';
import { GallerySmartComponent } from './gallery/gallery.smart.component';
import { GalleryComponent } from './gallery/gallery.component';
import { PhotoItemSmartComponent } from './gallery/photo-item.smart.component';
import { PhotoItemComponent } from './gallery/photo-item.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [ 
    BrowserModule, 
    CommonModule, 
    FormsModule,
    HttpClientModule,
    MatIconModule,
  ],
  declarations: [ 
    AppComponent, 
    GallerySmartComponent,
    GalleryComponent,
    PhotoItemSmartComponent,
    PhotoItemComponent,
    MasonryPipe,
  ],
  bootstrap: [ AppComponent ],
  providers: [ StoreService ],
})
export class AppModule { }

