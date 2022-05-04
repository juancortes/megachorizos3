import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PersonaPageComponent } from './containers';

const routes: Routes = [
  {
    path: '',
    component: PersonaPageComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})

export class PersonaRoutingModule {
}
