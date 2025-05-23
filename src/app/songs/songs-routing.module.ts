import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SongsPage } from './songs.page';

const routes: Routes = [
  {
    path: '',
    component: SongsPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SongsPageRoutingModule {}
