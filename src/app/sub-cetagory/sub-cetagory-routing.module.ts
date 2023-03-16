import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SubCetagoryPage } from './sub-cetagory.page';

const routes: Routes = [
  {
    path: '',
    component: SubCetagoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SubCetagoryPageRoutingModule {}
