import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular'; // Importiere IonicModule
import { Location } from '@angular/common'; // Importiere Location



@Component({
  selector: 'app-kontakt',
  templateUrl: './kontakt.page.html',
  styleUrls: ['./kontakt.page.scss'],
  standalone: true,  // Behalte dies, da es eine Standalone-Komponente ist
  imports: [IonicModule] // Hier IonicModule und CommonModule importieren
})
export class KontaktPage {
  constructor(private location: Location) { }
  
  goBack() {
    this.location.back();
  }
}