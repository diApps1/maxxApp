import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ServiceProvidersDetailPage } from './service-providers-detail.page';

const routes: Routes = [
  {
    path: '',
    component: ServiceProvidersDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServiceProvidersDetailPageRoutingModule {}
