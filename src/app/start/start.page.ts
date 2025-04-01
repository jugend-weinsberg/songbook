import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

interface Book {
  title: string;
  filename: string;
}

interface Song {
  buch: string;
  nummer: number;
  name: string;
}

@Component({
  selector: 'app-start',
  templateUrl: 'start.page.html',
  styleUrls: ['start.page.scss'],
  standalone: false,
})
export class StartPage {
  books: Book[] = [];
  allSongs: Song[] = [];
  searchResults: Song[] = [];
  searchTerm: string = '';
  isSearching: boolean = false;
  booksLoaded: boolean = false; // Neue Variable

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadBooks();
  }

  loadBooks() {
    this.http.get<Book[]>('assets/books.json').subscribe((books) => {
      this.books = books;
      this.loadAllSongs(books);
      this.booksLoaded = true; // Bücher wurden geladen
    });
  }

  loadAllSongs(books: Book[]) {
    books.forEach((book) => {
      this.http.get<Song[]>(`assets/${book.filename}`).subscribe((songs) => {
        this.allSongs = [...this.allSongs, ...songs];
      });
    });
  }

  search() {
    this.isSearching = true;
    this.searchTerm = '';
    this.searchResults = [];
  }

  performSearch() {
    if (this.searchTerm) {
      this.searchResults = this.allSongs.filter((song) =>
        song.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.searchResults = [];
    }
  }

  cancelSearch() {
    this.isSearching = false;
    this.searchTerm = '';
    this.searchResults = [];
  }
}