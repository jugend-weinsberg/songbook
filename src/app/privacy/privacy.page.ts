import { Component } from '@angular/core';
import { Location } from '@angular/common'; // Importiere Location



@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.page.html',
  styleUrls: ['./privacy.page.scss'],
  standalone: false,  // Behalte dies, da es eine Standalone-Komponente ist
})
export class PrivacyPage {
  constructor(private location: Location) { }
  
  goBack() {
    this.location.back();
  }
}