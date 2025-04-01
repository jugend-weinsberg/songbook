import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'fontsize', 
    loadChildren: () => import('./fontsize/fontsize.module').then( m => m.FontsizePageModule)
  },
  {
    path: 'kontakt', 
    loadChildren: () => import('./kontakt/kontakt.module').then( m => m.KontaktPageModule)
  },
  {
    path: 'imprint', 
    loadChildren: () => import('./imprint/imprint.module').then( m => m.ImprintPageModule)
  },
  {
    path: 'privacy', 
    loadChildren: () => import('./privacy/privacy.module').then( m => m.PrivacyPageModule)
  },
  {
    path: 'book/:bookFilename', // Korrekte Route mit Parameter
    loadComponent: () => import('./songs/songs.page').then( m => m.SongsPage)
  },
  {
    path: 'book/:bookFilename/song/:songNumber', // Zwei Parameter!
    loadComponent: () => import('./song/song.page').then( m => m.SongPage)
  }

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
