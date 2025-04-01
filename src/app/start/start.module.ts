import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StartPage } from './start.page';
import { HttpClientModule } from '@angular/common/http'; // Import this!

import { StartPageRoutingModule } from './start-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    StartPageRoutingModule,
    HttpClientModule
  ],
  declarations: [StartPage]
})
export class StartPageModule {}
