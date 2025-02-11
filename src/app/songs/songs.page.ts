import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel } from '@ionic/angular/standalone';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; // Importiere RouterModule

interface Song {
  buch: string;
  nummer: number;
  name: string;
  strophentext: { [key: string]: string };
  refraintext: string;
}

@Component({
  selector: 'app-songs',
  templateUrl: 'songs.page.html',
  styleUrls: ['songs.page.scss'],
  imports: [
    IonHeader, IonToolbar, IonTitle, IonContent, 
    CommonModule, IonList, IonItem, IonLabel,
    HttpClientModule, // Add HttpClientModule here!
    RouterModule // Füge RouterModule zu den Imports hinzu

  ],
  standalone: true,
  providers: [HttpClient] // and HttpClient here
})
export class SongsPage {
  songs: Song[] = [];
  buecher: string[] = []; // Array für die eindeutigen Buchtitel

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadSongs();
  }

  loadSongs() {
    this.http.get<Song[]>('assets/book1.json').subscribe({
      next: (data) => {
        this.songs = data;
        this.buecher = this.getUniqueBuecher(data); // Eindeutige Buchtitel extrahieren
        console.log('Bücher:', this.buecher);
      },
      error: (error) => {
        console.error('Fehler beim Laden der Songs:', error);
      }
    });
  }

  getUniqueBuecher(songs: Song[]): string[] {
    const uniqueBuecher = new Set<string>(); // Set verwenden, um Duplikate zu entfernen
    for (const song of songs) {
      uniqueBuecher.add(song.buch);
    }
    return Array.from(uniqueBuecher); // Set in ein Array umwandeln
  }
}