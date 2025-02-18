import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel } from '@ionic/angular/standalone';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

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
    CommonModule, IonList, IonItem, IonLabel, RouterModule,
    HttpClientModule
  ],
  standalone: true,
  providers: [HttpClient]
})
export class SongsPage implements OnInit {
  book: any; // Hier muss der korrekte Typ für 'book' stehen (z.B. ein Interface)
  bookFilename: string | null = null;
  songs: Song[] = [];
  buecher: string[] = [];

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router, private location: Location) { }

  ngOnInit() {
    this.bookFilename = this.route.snapshot.paramMap.get('bookFilename');
    if (this.bookFilename) {
      this.loadSongs(this.bookFilename);
    } else {
      this.router.navigate(['/home']);
    }
  }

  loadSongs(bookFilename: string) {
    const url = `assets/${bookFilename}`;

    this.http.get<Song[]>(url).subscribe({
      next: (data) => {
        this.songs = data;
        this.buecher = this.getUniqueBuecher(data);
        console.log("Songs:", this.songs); // Überprüfe die geladenen Songs
      },
      error: (error) => {
        console.error('Fehler beim Laden der Songs:', error);
        this.router.navigate(['/home']);
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
  
  goBack() {
    this.location.back();
  }
}