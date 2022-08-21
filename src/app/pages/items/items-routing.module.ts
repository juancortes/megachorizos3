import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { ItemsPageComponent } from './containers';

const routes: Routes = [
  {
    path: '',
    component: ItemsPageComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})

export class ItemsRoutingModule {
}
