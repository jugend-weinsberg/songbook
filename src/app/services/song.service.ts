import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SongService {
  private jsonUrl = 'assets/songs.json'; // Falls die Datei lokal liegt
  // private jsonUrl = 'https://dein-server.de/songs.json'; // Falls du sie vom Server lädst

  constructor(private http: HttpClient) {}

  getSongs(): Observable<any> {
    return this.http.get<any>(this.jsonUrl);
  }
}
