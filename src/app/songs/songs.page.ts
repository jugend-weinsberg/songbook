import { Component, OnInit } from '@angular/core'; // Import OnInit
import { IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel } from '@ionic/angular/standalone';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router'; // Import ActivatedRoute und Router

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
    HttpClientModule,
    RouterModule
  ],
  standalone: true,
  providers: [HttpClient]
})
export class SongsPage implements OnInit { // Implement OnInit
  bookFilename: string | null = null;
  songs: Song[] = [];
  buecher: string[] = [];

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) { }

  ngOnInit() {
    this.bookFilename = this.route.snapshot.paramMap.get('bookFilename');
    if (this.bookFilename) {
      this.loadSongs(this.bookFilename); // Rufe loadSongs mit dem Dateinamen auf
    } else {
      this.router.navigate(['/home']);
    }
  }

  loadSongs(bookFilename: string) { // Parameter hinzufügen und Typ definieren
    const url = `assets/${bookFilename}`; // Korrekte URL-Zusammensetzung
    console.log("Lade URL:", url); // Debugging
    this.http.get<Song[]>(url).subscribe({ // Korrekte Syntax für subscribe
      next: (data) => {
        this.songs = data;
        this.buecher = this.getUniqueBuecher(data);
        console.log('Songs:', this.songs); // Log die geladenen Songs
        console.log('Bücher:', this.buecher);
      },
      error: (error) => {
        console.error('Fehler beim Laden der Songs:', error);
        this.router.navigate(['/home']); // Bei Fehler zurück zur Home-Seite
      }
    });
  }

  getUniqueBuecher(songs: Song[]): string[] {
    const uniqueBuecher = new Set<string>();
    for (const song of songs) {
      uniqueBuecher.add(song.buch);
    }
    return Array.from(uniqueBuecher);
  }
}