import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http'; // Import HttpClient und HttpClientModule
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

interface Song {
  buch: string;
  nummer: number;
  name: string;
  refrains: { [key: string]: string }; // Objekt für die Refrains
  strophen: { text: string; refrain: string; }[]; // Array für die Strophen
}

@Component({
  selector: 'app-song',
  templateUrl: './song.page.html',
  styleUrls: ['./song.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, HttpClientModule] // HttpClientModule hier hinzufügen!
})
export class SongPage implements OnInit {
  bookFilename: string | null = null;
  songNumber: number | null = null;
  song: Song | null = null;
  strophenKeys: string[] = []; // Deklaration *und* Initialisierung hier!


  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) { }

  ngOnInit() {
    setTimeout(() => {
      this.bookFilename = this.route.snapshot.paramMap.get('bookFilename');
      this.songNumber = Number(this.route.snapshot.paramMap.get('songNumber'));

      console.log("Buch:", this.bookFilename);
      console.log("Liednummer:", this.songNumber);

      if (this.bookFilename && this.songNumber) {
        this.loadSong(this.bookFilename, this.songNumber);
      } else {
        console.error("Fehlende Parameter!");
        this.router.navigate(['/home']);
      }
    }, 0);
  }

  loadSong(bookFilename: string, songNumber: number) {
    const url = `assets/${bookFilename}`;
    this.http.get<Song[]>(url).subscribe({
      next: (data) => {
        this.song = data.find(s => s.nummer === songNumber) ?? null;
        console.log("Song Daten:", this.song);

        // Hier die Änderung:
        if (this.song && this.song.strophen && this.song.refrains) { // Überprüfen, ob song, strophen und refrains existieren
          // Keine separate strophenKeys mehr notwendig, da wir direkt über song.strophen iterieren können.
        }

        if (!this.song) {
          console.error("Lied nicht gefunden!");
          this.router.navigate([`/book/${bookFilename}`]);
        }
      },
      error: (error) => {
        console.error("Fehler beim Laden der Songs:", error);
        this.router.navigate(['/home']);
      }
    });
  }
  
}