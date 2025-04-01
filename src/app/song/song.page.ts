import { Component, OnInit, Inject } from '@angular/core'; // Import Inject
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Location } from '@angular/common';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

interface Song {
  buch: string;
  nummer: number;
  name: string;
  refrains: { [key: string]: string }; 
  strophen: { text: string; refrain: string; }[]; 
  tonart: string; // Hinzugefügt
}

@Component({
  selector: 'app-song',
  template: '<button (click)="goBack()">Zurück</button>',
  templateUrl: './song.page.html',
  styleUrls: ['./song.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, HttpClientModule ] 
})
export class SongPage implements OnInit {
  bookFilename: string | null = null;
  songNumber: number | null = null;
  song: Song | null = null;
  strophenKeys: string[] = []; 
  showImage: boolean = false; // Flag to control image visibility
  imageUrl: SafeUrl | null = null; // Store the safe URL for the image


  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    private location: Location,
    private sanitizer: DomSanitizer 
  ) {} 

  ngOnInit() {
    setTimeout(() => {
      this.bookFilename = this.route.snapshot.paramMap.get('bookFilename');
      this.songNumber = Number(this.route.snapshot.paramMap.get('songNumber'));


      if (this.bookFilename && this.songNumber) {
        this.loadSong(this.bookFilename, this.songNumber);
      } else {
        this.router.navigate(['/home']);
      }
    }, 0);
  }

  loadSong(bookFilename: string, songNumber: number) {
    const url = `assets/${bookFilename}`;
    this.http.get<Song[]>(url).subscribe({
      next: (data) => {
        this.song = data.find(s => s.nummer === songNumber) ?? null;

        // Hier die Änderung:
        if (this.song && this.song.strophen && this.song.refrains) { // Überprüfen, ob song, strophen und refrains existieren
          // Keine separate strophenKeys mehr notwendig, da wir direkt über song.strophen iterieren können.
        }

        if (!this.song) {
          this.router.navigate([`/book/${bookFilename}`]);
        }
      },
      error: (error) => {
        this.router.navigate(['/home']);
      }
    });
  }

  goBack() {
    this.location.back();
  }

  toggleFavorite() {
    // Hier die Logik zum Markieren/Entfernen als Favorit implementieren
  }

  changeView() {
    this.showImage = !this.showImage; // Toggle image visibility

    if (this.showImage && this.song) {
      this.loadImage();
    }
  }

  loadImage() {
    const imageName = `${this.bookFilename}-${this.song?.nummer}.jpg`; // Use safe navigation operator
    const imagePath = `assets/pic/${imageName}`;

    this.http.get(imagePath, { responseType: 'blob' }).subscribe({
      next: (blob) => {
        const urlCreator = window.URL || window.webkitURL;
        const imageUrl = urlCreator.createObjectURL(blob);
        this.imageUrl = this.sanitizer.bypassSecurityTrustUrl(imageUrl);
      },
      error: (error) => {
        console.error('Error loading image:', error);
        this.imageUrl = null;
        // Optionally display a placeholder image:
        // this.imageUrl = this.sanitizer.bypassSecurityTrustUrl('assets/pic/placeholder.jpg'); // Example placeholder
      }
    });
  }
  
  playNote() {
    if (this.song && this.song.tonart) {
      const tonart = this.song.tonart;
      const audioPath = `assets/sound/${tonart}.mp3`;
  
      const audio = new Audio(audioPath); // Erstelle ein neues Audio-Objekt
  
      audio.play().then(() => {
        console.log('Tonart wird abgespielt:', tonart);
      }).catch(error => {
        console.error('Fehler beim Abspielen der Tonart:', error);
        // Hier kannst du eine Fehlerbehandlung hinzufügen, z.B. eine Meldung anzeigen
      });
    } else {
      console.warn('Keine Tonart gefunden oder Song ist nicht geladen.');
    }
  }
}