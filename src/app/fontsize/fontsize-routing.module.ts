import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FontsizePage } from './fontsize.page';

const routes: Routes = [
  {
    path: '',
    component: FontsizePage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FontsizePageRoutingModule {}
