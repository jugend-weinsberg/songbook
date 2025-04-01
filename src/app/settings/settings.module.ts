import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SettingsPage } from './settings.page';
import { FontsizePageModule } from '../fontsize/fontsize.module';
import { KontaktPageModule } from '../kontakt/kontakt.module';
import { ImprintPageModule } from '../imprint/imprint.module';
import { PrivacyPageModule } from '../privacy/privacy.module';


import { SettingsPageRoutingModule } from './settings-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    SettingsPageRoutingModule,
    FontsizePageModule,
    KontaktPageModule,
    ImprintPageModule,
    PrivacyPageModule    
  ],
  declarations: [SettingsPage]
})
export class SettingsPageModule {}
