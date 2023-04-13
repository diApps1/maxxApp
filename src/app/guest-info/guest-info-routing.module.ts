import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GuestInfoPage } from './guest-info.page';

const routes: Routes = [
  {
    path: '',
    component: GuestInfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GuestInfoPageRoutingModule {}
