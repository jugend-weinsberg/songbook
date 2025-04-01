import { Component } from '@angular/core';
import { NavController } from '@ionic/angular'; // Für die Navigation

@Component({
  selector: 'app-settings',
  templateUrl: 'settings.page.html',
  styleUrls: ['settings.page.scss'],
  standalone: false,
})
export class SettingsPage {

  constructor(private navCtrl: NavController) { }

  adjustFontSize() {
    this.navCtrl.navigateForward('/fontsize'); // Navigiert zur Kontaktseite
  }

  openContact() {
    // Hier implementierst du die Logik zum Öffnen der Kontaktseite.
    this.navCtrl.navigateForward('/kontakt'); // Navigiert zur Kontaktseite
  }

  openImprint() {
    // Hier implementierst du die Logik zum Öffnen der Impressum-Seite.
    this.navCtrl.navigateForward('/imprint'); // Navigiert zur Impressum-Seite
  }

  openPrivacy() {
    // Hier implementierst du die Logik zum Öffnen der Datenschutz-Seite.
    this.navCtrl.navigateForward('/privacy'); // Navigiert zur Datenschutz-Seite
  }
}

