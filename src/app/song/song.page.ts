import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-song',
  templateUrl: './song.page.html',
  styleUrls: ['./song.page.scss'],
})
export class SongPage implements OnInit {
  songId: string | null = null;
  song: any | null = null; // Das ausgewählte Lied

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {

    // Hier musst du die Logik implementieren, um das Lied mit der ID zu finden
    // Zum Beispiel, wenn du die Songdaten bereits in einer Variable hast:
    // this.song = this.songs.find(s => s.id === this.songId);
  }
}