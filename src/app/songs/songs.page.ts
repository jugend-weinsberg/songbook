import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular'; // ONLY import IonicModule
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Import FormsModule

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
  standalone: true,
  imports: [
    IonicModule, // ONLY IonicModule - remove individual component imports
    CommonModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [HttpClient, HttpClientModule ]
})
export class SongsPage implements OnInit {

  bookTitle: string = ''; // New property for the book title
  book: any; // Hier muss der korrekte Typ für 'book' stehen (z.B. ein Interface)
  bookFilename: string | null = null;
  songs: Song[] = [];
  buecher: string[] = [];
  sortAscending: boolean = true; // Standardmäßig nach Nummer sortieren
  isSearching: boolean = false; // Suchmodus
  searchTerm: string = ''; // Suchbegriff
  originalSongs: Song[] = []; // Speichert die ursprünglichen Lieder

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
        this.originalSongs = [...data]; // Speichere die ursprünglichen Lieder
        this.buecher = this.getUniqueBuecher(data);
        if (this.songs.length > 0) {
          this.bookTitle = this.songs[0].buch;
        }
        this.sortSongs();
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

  cancelSearch() {
    this.isSearching = false;
    this.searchTerm = '';
    this.songs = [...this.originalSongs]; // Zeige alle Lieder an
  }

  search() {
    this.isSearching = true;
    this.searchTerm = ''; // Suchbegriff zurücksetzen
    this.songs = [...this.originalSongs]; // Zeige alle Lieder an
  }

  performSearch() {
    if (this.searchTerm) {
      this.songs = this.originalSongs.filter(song =>
        song.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.songs = [...this.originalSongs]; // Zeige alle Lieder an, wenn der Suchbegriff leer ist
    }
  }

  toggleSort() {
    this.sortAscending = !this.sortAscending;
    this.sortSongs();
  }

  sortSongs() {
    this.songs.sort((a, b) => {
      if (this.sortAscending) {
        return a.nummer - b.nummer; // Nach Nummer sortieren (aufsteigend)
      } else {
        return a.name.localeCompare(b.name); // Nach Name sortieren (alphabetisch)
      }
    });
  }
}