import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel } from '@ionic/angular/standalone';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface Book {
  title: string;
  filename: string;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    IonHeader, IonToolbar, IonTitle, IonContent, 
    CommonModule, IonList, IonItem, IonLabel, RouterModule,
    HttpClientModule // Add HttpClientModule here!
  ],
  standalone: true,
  providers: [HttpClient] // and HttpClient here
})
export class HomePage {
  books: Book[] = [];
  selectedBook: string | null = null; // Für das aktuell ausgewählte Buch
  bookData: any[] = []; // Für die Daten des ausgewählten Buchs

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadBooks();
  }

  loadBooks() {
    this.http.get<Book[]>('assets/books.json').subscribe(data => {
      this.books = data;
    });
  }

  loadBookData(book: Book) {
    this.selectedBook = book.title; // Setze das ausgewählte Buch
    this.http.get<any[]>(`assets/${book.filename}`).subscribe(data => {
      this.bookData = data;
    });
  }
}