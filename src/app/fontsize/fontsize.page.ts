import { Component, OnDestroy, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Location } from '@angular/common';

@Component({
  selector: 'app-fontsize',
  templateUrl: './fontsize.page.html',
  styleUrls: ['./fontsize.page.scss'],
  standalone: true,  // Behalte dies, da es eine Standalone-Komponente ist
  imports: [IonicModule] // Hier IonicModule und CommonModule importieren
})

export class FontsizePage implements OnInit, OnDestroy {
  fontSize: number = 16;

  constructor(private location: Location) {}

  ngOnInit() {
    this.loadFontSize();
    window.addEventListener('storage', this.handleStorageChange.bind(this));
  }

  ngOnDestroy() {
    window.removeEventListener('storage', this.handleStorageChange.bind(this));
  }

  handleStorageChange(event: StorageEvent) {
    if (event.key === 'fontSize') {
      this.loadFontSize();
    }
  }

  increaseFontSize() {
    this.fontSize++;
    this.checkFontSizeRange();
    this.applyFontSize();
    this.saveFontSize();
  }

  decreaseFontSize() {
    this.fontSize--;
    this.checkFontSizeRange();
    this.applyFontSize();
    this.saveFontSize();
  }

  checkFontSizeRange() {
    const minSize = 10;
    const maxSize = 30;

    this.fontSize = Math.max(minSize, Math.min(maxSize, this.fontSize));
  }

  applyFontSize() {
    document.documentElement.style.setProperty('--app-font-size', `${this.fontSize}px`);
  }

  saveFontSize() {
    localStorage.setItem('fontSize', this.fontSize.toString());
  }

  loadFontSize() {
    const savedSize = localStorage.getItem('fontSize');
    if (savedSize) {
      const parsedSize = parseInt(savedSize, 10);
      if (!isNaN(parsedSize)) {
        this.fontSize = parsedSize;
      }
    }
    this.applyFontSize();
  }

  goBack() {
    this.location.back();
  }
}