import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'book/:filename', // Korrekte Route mit Parameter
    loadComponent: () => import('./songs/songs.page').then( m => m.SongsPage)
  }
];