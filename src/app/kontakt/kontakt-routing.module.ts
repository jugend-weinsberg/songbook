import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { KontaktPage } from './kontakt.page';

const routes: Routes = [
  {
    path: '',
    component: KontaktPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KontaktPageRoutingModule {}
