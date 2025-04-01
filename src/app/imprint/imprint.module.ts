import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ImprintPageRoutingModule } from './imprint-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ImprintPageRoutingModule
  ],
})
export class ImprintPageModule {} // PrivacyPage wird NICHT deklariert