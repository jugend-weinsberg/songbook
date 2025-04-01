import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SongsPage } from './songs.page';
import { SongsPageRoutingModule } from './songs-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    SongsPageRoutingModule,
  ],
  declarations: [SongsPage]
})
export class SongsPageModule {}
