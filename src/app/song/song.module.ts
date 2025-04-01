import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SongPage } from './song.page';
import { SongPageRoutingModule } from './song-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    SongPageRoutingModule,
  ],
  declarations: [SongPage]
})
export class SongPageModule {}
