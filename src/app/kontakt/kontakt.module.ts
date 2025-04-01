import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { KontaktPageRoutingModule } from './kontakt-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    KontaktPageRoutingModule
  ],
})
export class KontaktPageModule {} // PrivacyPage wird NICHT deklariert